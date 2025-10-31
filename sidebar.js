// Common Sidebar JavaScript for DevDunia

document.addEventListener('DOMContentLoaded', function() {
    // Track tool usage
    function trackToolUsage(toolName, toolUrl) {
        let recentTools = JSON.parse(localStorage.getItem('recentTools') || '[]');
        
        // Remove if already exists
        recentTools = recentTools.filter(tool => tool.url !== toolUrl);
        
        // Add to beginning
        recentTools.unshift({ name: toolName, url: toolUrl });
        
        // Keep only last 5
        recentTools = recentTools.slice(0, 5);
        
        localStorage.setItem('recentTools', JSON.stringify(recentTools));
    }

    // Add click tracking to all tool links
    document.querySelectorAll('.sidebar-item[href$=".html"]').forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.querySelector('.sidebar-text')?.textContent.trim() || 'Unknown Tool';
            const toolUrl = this.getAttribute('href');
            trackToolUsage(toolName, toolUrl);
        });
    });

    // Set active sidebar item based on current page
    function setActiveSidebarItem() {
        const currentPage = window.location.pathname.split('/').pop();
        const sidebarItems = document.querySelectorAll('.sidebar-item[href$=".html"]');
        
        sidebarItems.forEach(item => {
            item.classList.remove('active');
            const itemHref = item.getAttribute('href');
            if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
                item.classList.add('active');
            }
        });
    }

    // Initialize active item
    setActiveSidebarItem();
});
