// Footer HTML content as a string
const footerHTML = `<!-- Common Footer for DevDunia -->
<footer class="py-12 border-t border-slate-700/50 dark:border-slate-700/50 light:border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
            <!-- Connect with maintainer section -->
            <div class="mb-8">
                <h3 class="text-lg font-semibold text-white mb-6 dark:text-white light:text-gray-900">Connect with maintainer</h3>
                <div class="flex justify-center space-x-6">
                    <!-- GitHub -->
                    <a href="https://github.com/echobash" target="_blank" class="text-gray-400 hover:text-white transition-colors dark:text-gray-400 dark:hover:text-white light:text-gray-600 light:hover:text-gray-900" aria-label="GitHub">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>

                    <!-- LinkedIn -->
                    <a href="https://linkedin.com/in/echobash" target="_blank" class="text-gray-400 hover:text-white transition-colors dark:text-gray-400 dark:hover:text-white light:text-gray-600 light:hover:text-gray-900" aria-label="LinkedIn">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>

                    <!-- X (Twitter) -->
                    <a href="https://twitter.com/echobash" target="_blank" class="text-gray-400 hover:text-white transition-colors dark:text-gray-400 dark:hover:text-white light:text-gray-600 light:hover:text-gray-900" aria-label="X (Twitter)">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </a>

                    <!-- Instagram -->
                    <a href="https://instagram.com/echobash" target="_blank" class="text-gray-400 hover:text-white transition-colors dark:text-gray-400 dark:hover:text-white light:text-gray-600 light:hover:text-gray-900" aria-label="Instagram">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.584.12 4.775.302 4.082.566c-.726.28-1.34.689-1.957 1.306C1.508 2.49.99 3.104.71 3.83c-.264.693-.446 1.502-.5 2.708C.14 7.996.126 8.396.126 12.017s.014 4.021.067 5.227c.054 1.206.236 2.015.5 2.708.28.726.689 1.34 1.306 1.957.617.617 1.231 1.026 1.957 1.306.693.264 1.502.446 2.708.5C7.996 23.86 8.396 23.874 12.017 23.874s4.021-.014 5.227-.067c1.206-.054 2.015-.236 2.708-.5.726-.28 1.34-.689 1.957-1.306.617-.617 1.026-1.231 1.306-1.957.264-.693.446-1.502.5-2.708.053-1.206.067-1.606.067-5.227s-.014-4.021-.067-5.227c-.054-1.206-.236-2.015-.5-2.708-.28-.726-.689-1.34-1.306-1.957C21.51 1.508 20.896.99 20.17.71c-.693-.264-1.502-.446-2.708-.5C16.038.14 15.638.126 12.017.126 12.017.126 12.017 0 12.017 0zm0 2.163c3.584 0 4.006.014 5.417.078 1.302.058 2.022.27 2.504.446.526.192 1.02.472 1.477.93.455.457.738.951.93 1.477.176.482.388 1.202.446 2.504.064 1.411.078 1.833.078 5.417s-.014 4.006-.078 5.417c-.058 1.302-.27 2.022-.446 2.504-.192.526-.472 1.02-.93 1.477-.457.455-.951.738-1.477.93-.482.176-1.202.388-2.504.446-1.411.064-1.833.078-5.417.078s-4.006-.014-5.417-.078c-1.302-.058-2.022-.27-2.504-.446-.526-.192-1.02-.472-1.477-.93-.455-.457-.738-.951-.93-1.477-.176-.482-.388-1.202-.446-2.504C2.163 8.423 2.149 8.001 2.149 4.417s.014-4.006.078-5.417c.058-1.302.27-2.022.446-2.504.192-.526.472-1.02.93-1.477.457-.455.951-.738 1.477-.93.482-.176 1.202-.388 2.504-.446C8.011 2.177 8.433 2.163 12.017 2.163zm0 3.781c-3.72 0-6.735 3.015-6.735 6.735s3.015 6.735 6.735 6.735 6.735-3.015 6.735-6.735-3.015-6.735-6.735-6.735zm0 11.111c-2.407 0-4.356-1.949-4.356-4.356s1.949-4.356 4.356-4.356 4.356 1.949 4.356 4.356-1.949 4.356-4.356 4.356zm6.406-11.389c-.917 0-1.661.744-1.661 1.661s.744 1.661 1.661 1.661 1.661-.744 1.661-1.661-.744-1.661-1.661-1.661z"/>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Existing footer content -->
            <p class="text-gray-400 text-lg dark:text-gray-400 light:text-gray-600">
                Powered by <a href="https://echobash.com" target="_blank" class="text-purple-400 hover:text-purple-300 transition-colors font-semibold dark:text-purple-400 dark:hover:text-purple-300 light:text-purple-600 light:hover:text-purple-700">echobash.com</a>
            </p>
            <p class="text-gray-500 text-sm mt-2 dark:text-gray-500 light:text-gray-400">
                Made with ❤️ for the developer community
            </p>
        </div>
    </div>
</footer>`;

// Function to load footer
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
}

// Auto-load footer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});
