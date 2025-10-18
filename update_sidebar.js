#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the list of HTML files from sidebar_tools.txt
const sidebarToolsFile = 'sidebar_tools.txt';
const finalSidebarFile = 'final_sidebar.html';

if (!fs.existsSync(sidebarToolsFile)) {
    console.error(`❌ ${sidebarToolsFile} not found`);
    process.exit(1);
}

if (!fs.existsSync(finalSidebarFile)) {
    console.error(`❌ ${finalSidebarFile} not found`);
    process.exit(1);
}

// Read the sidebar content
const sidebarContent = fs.readFileSync(finalSidebarFile, 'utf8');

// Read the list of HTML files
const htmlFiles = fs.readFileSync(sidebarToolsFile, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line.endsWith('.html'));

console.log(`🔄 Updating sidebar in ${htmlFiles.length} HTML files...`);

let successCount = 0;
let errorCount = 0;

htmlFiles.forEach(file => {
    try {
        if (!fs.existsSync(file)) {
            console.log(`⚠️  File not found: ${file}`);
            errorCount++;
            return;
        }

        // Read the current HTML file
        let htmlContent = fs.readFileSync(file, 'utf8');
        
        // Check if the file already has the final_sidebar.html included
        if (htmlContent.includes('final_sidebar.html')) {
            console.log(`✅ ${file} already has final_sidebar.html included`);
            successCount++;
            return;
        }

        // Check if the file has common-sidebar.js included
        if (htmlContent.includes('common-sidebar.js')) {
            // Replace common-sidebar.js with final_sidebar.html
            htmlContent = htmlContent.replace(
                /<script src="common-sidebar\.js"><\/script>/g,
                ''
            );
        }

        // Check if the file has sidebar-include.js included
        if (htmlContent.includes('sidebar-include.js')) {
            // Replace sidebar-include.js with final_sidebar.html
            htmlContent = htmlContent.replace(
                /<script src="sidebar-include\.js"><\/script>/g,
                ''
            );
        }

        // Add the final_sidebar.html include before the closing </body> tag
        if (htmlContent.includes('</body>')) {
            htmlContent = htmlContent.replace(
                '</body>',
                `    <!-- Include Final Sidebar -->
    <div id="sidebar-container"></div>
    <script>
        // Load final_sidebar.html content
        fetch('final_sidebar.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('sidebar-container').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading sidebar:', error);
            });
    </script>
</body>`
            );
        } else {
            // If no </body> tag, add it at the end
            htmlContent += `
    <!-- Include Final Sidebar -->
    <div id="sidebar-container"></div>
    <script>
        // Load final_sidebar.html content
        fetch('final_sidebar.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('sidebar-container').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading sidebar:', error);
            });
    </script>
</body>
</html>`;
        }

        // Ensure the body has the correct class for sidebar
        if (htmlContent.includes('<body')) {
            htmlContent = htmlContent.replace(
                /<body([^>]*)>/,
                (match, attributes) => {
                    if (attributes.includes('lg:ml-72')) {
                        return match; // Already has the class
                    }
                    return `<body${attributes} class="h-screen lg:ml-72">`;
                }
            );
        }

        // Write the updated content back to the file
        fs.writeFileSync(file, htmlContent, 'utf8');
        console.log(`✅ Updated ${file}`);
        successCount++;

    } catch (error) {
        console.error(`❌ Error updating ${file}:`, error.message);
        errorCount++;
    }
});

console.log(`\n📊 Summary:`);
console.log(`  ✅ Successfully updated: ${successCount} files`);
console.log(`  ❌ Errors: ${errorCount} files`);
console.log(`  📁 Total files processed: ${htmlFiles.length}`);

if (errorCount === 0) {
    console.log(`\n🎉 All files updated successfully!`);
} else {
    console.log(`\n⚠️  Some files had errors. Please check the output above.`);
}
