#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get all HTML files in current directory and subdirectories
function getAllHtmlFiles(dir = '.') {
    let htmlFiles = [];
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && item !== 'node_modules' && !item.startsWith('.')) {
            htmlFiles = htmlFiles.concat(getAllHtmlFiles(fullPath));
        } else if (stat.isFile() && item.endsWith('.html')) {
            htmlFiles.push(fullPath);
        }
    }
    
    return htmlFiles;
}

console.log('🧹 Cleaning up sidebar references in all HTML files...');

const htmlFiles = getAllHtmlFiles();
let successCount = 0;
let errorCount = 0;

htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Remove old sidebar script references
        const oldSidebarPatterns = [
            /<script src="sidebar\.js"><\/script>/g,
            /<script src="sidebar-include\.js"><\/script>/g,
            /<script src="common-sidebar\.js"><\/script>/g,
            /<script src="modern-sidebar\.js"><\/script>/g
        ];
        
        oldSidebarPatterns.forEach(pattern => {
            if (pattern.test(content)) {
                content = content.replace(pattern, '');
                modified = true;
            }
        });
        
        // Remove old sidebar CSS references
        const oldSidebarCSS = /<link rel="stylesheet" href="sidebar\.css">/g;
        if (oldSidebarCSS.test(content)) {
            content = content.replace(oldSidebarCSS, '');
            modified = true;
        }
        
        // Ensure body has correct class for sidebar
        if (content.includes('<body')) {
            const bodyMatch = content.match(/<body([^>]*)>/);
            if (bodyMatch) {
                const bodyTag = bodyMatch[0];
                const attributes = bodyMatch[1];
                
                if (!attributes.includes('lg:ml-72')) {
                    const newBodyTag = `<body${attributes} class="h-screen lg:ml-72">`;
                    content = content.replace(bodyTag, newBodyTag);
                    modified = true;
                }
            }
        }
        
        // Check if final_sidebar.html is already included
        if (!content.includes('final_sidebar.html')) {
            // Add final_sidebar.html include
            if (content.includes('</body>')) {
                const sidebarInclude = `
    <!-- Include Final Sidebar -->
    <div id="sidebar-container"></div>
    <script>
        // Load final_sidebar.html content
        fetch('${file.includes('/') ? '../' : ''}final_sidebar.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('sidebar-container').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading sidebar:', error);
            });
    </script>
</body>`;
                
                content = content.replace('</body>', sidebarInclude);
                modified = true;
            }
        }
        
        // Remove any old sidebar container divs that might exist
        const oldSidebarContainers = [
            /<div id="sidebar-container"><\/div>/g,
            /<div class="sidebar"><\/div>/g,
            /<!-- Sidebar -->[\s\S]*?<\/div>/g
        ];
        
        oldSidebarContainers.forEach(pattern => {
            if (pattern.test(content)) {
                content = content.replace(pattern, '');
                modified = true;
            }
        });
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✅ Cleaned up ${file}`);
            successCount++;
        } else {
            console.log(`✅ ${file} already clean`);
            successCount++;
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        errorCount++;
    }
});

console.log(`\n📊 Cleanup Summary:`);
console.log(`  ✅ Successfully processed: ${successCount} files`);
console.log(`  ❌ Errors: ${errorCount} files`);
console.log(`  📁 Total files processed: ${htmlFiles.length}`);

if (errorCount === 0) {
    console.log(`\n🎉 All files cleaned up successfully!`);
    console.log(`📋 All HTML files now use only final_sidebar.html`);
} else {
    console.log(`\n⚠️  Some files had errors. Please check the output above.`);
}
