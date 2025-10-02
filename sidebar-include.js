// Sidebar HTML content as a string
const sidebarHTML = `    <!-- Common Sidebar for DevDunia -->
    <aside class="sidebar">
        <div class="p-4">
            <!-- Logo -->
            <div class="flex items-center justify-center mb-8">
                <a href="index.html" class="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center px-4 py-2">
                    <span class="text-white font-bold text-sm">DevDunia</span>
                </a>
            </div>

            <!-- Powered by echobash.com -->
            <div class="text-center mb-4">
                <p class="text-xs text-gray-500">
                    Powered by <a href="https://echobash.com" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors">echobash.com</a>
                </p>
            </div>

        <!-- Encoders/Decoders Section -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">Encoders</div>
            <a href="index.html#encoders" class="sidebar-item">
                <div class="sidebar-icon">🔐</div>
                <span class="sidebar-text">Encoders/Decoders</span>
            </a>
            <a href="json-decoder.html" class="sidebar-item">
                <div class="sidebar-icon">📄</div>
                <span class="sidebar-text">JSON Decoder</span>
            </a>
            <a href="base64-encoder.html" class="sidebar-item">
                <div class="sidebar-icon">🔢</div>
                <span class="sidebar-text">Base64 Encoder</span>
            </a>
            <a href="url-encoder.html" class="sidebar-item">
                <div class="sidebar-icon">🔗</div>
                <span class="sidebar-text">URL Encoder</span>
            </a>
            <a href="html-entities.html" class="sidebar-item">
                <div class="sidebar-icon">🏷️</div>
                <span class="sidebar-text">HTML Entities</span>
            </a>
            <a href="rot13-encoder.html" class="sidebar-item">
                <div class="sidebar-icon">🔄</div>
                <span class="sidebar-text">ROT13 Encoder</span>
            </a>
            <a href="caesar-cipher.html" class="sidebar-item">
                <div class="sidebar-icon">🔐</div>
                <span class="sidebar-text">Caesar Cipher</span>
            </a>
            <a href="ascii-converter.html" class="sidebar-item">
                <div class="sidebar-icon">🔤</div>
                <span class="sidebar-text">ASCII Converter</span>
            </a>
        </div>

        <!-- Formatters Section -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">Formatters</div>
            <a href="index.html#formatters" class="sidebar-item">
                <div class="sidebar-icon">📝</div>
                <span class="sidebar-text">Formatters</span>
            </a>
            <a href="json-beautifier.html" class="sidebar-item">
                <div class="sidebar-icon">✨</div>
                <span class="sidebar-text">JSON Beautifier</span>
            </a>
            <a href="json-minifier.html" class="sidebar-item">
                <div class="sidebar-icon">📦</div>
                <span class="sidebar-text">JSON Minifier</span>
            </a>
            <a href="yaml-json-converter.html" class="sidebar-item">
                <div class="sidebar-icon">🔄</div>
                <span class="sidebar-text">YAML ⇄ JSON</span>
            </a>
            <a href="xml-formatter.html" class="sidebar-item">
                <div class="sidebar-icon">📋</div>
                <span class="sidebar-text">XML Formatter</span>
            </a>
            <a href="csv-json-converter.html" class="sidebar-item">
                <div class="sidebar-icon">📊</div>
                <span class="sidebar-text">CSV ⇄ JSON</span>
            </a>
            <a href="sql-formatter.html" class="sidebar-item">
                <div class="sidebar-icon">🗃️</div>
                <span class="sidebar-text">SQL Formatter</span>
            </a>
            <a href="string-transformer.html" class="sidebar-item">
                <div class="sidebar-icon">🔄</div>
                <span class="sidebar-text">String Transformer</span>
            </a>
        </div>

        <!-- Generators Section -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">Generators</div>
            <a href="index.html#generators" class="sidebar-item">
                <div class="sidebar-icon">⚡</div>
                <span class="sidebar-text">Generators</span>
            </a>
            <a href="hash-generator.html" class="sidebar-item">
                <div class="sidebar-icon">🔐</div>
                <span class="sidebar-text">Hash Generator</span>
            </a>
            <a href="guid-generator.html" class="sidebar-item">
                <div class="sidebar-icon">🆔</div>
                <span class="sidebar-text">GUID Generator</span>
            </a>
            <a href="password-generator.html" class="sidebar-item">
                <div class="sidebar-icon">🔑</div>
                <span class="sidebar-text">Password Generator</span>
            </a>
            <a href="qr-generator.html" class="sidebar-item">
                <div class="sidebar-icon">📱</div>
                <span class="sidebar-text">QR Code Generator</span>
            </a>
            <a href="lorem-ipsum-generator.html" class="sidebar-item">
                <div class="sidebar-icon">📝</div>
                <span class="sidebar-text">Lorem Ipsum</span>
            </a>
            <a href="leetcode-commit-message.html" class="sidebar-item">
                <div class="sidebar-icon">💻</div>
                <span class="sidebar-text">Leetcode Commit</span>
            </a>
        </div>

        <!-- API Tools Section -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">API Tools</div>
            <a href="index.html#api-tools" class="sidebar-item">
                <div class="sidebar-icon">🔌</div>
                <span class="sidebar-text">API & Integration</span>
            </a>
                <a href="api-tester.html" class="sidebar-item">
                    <div class="sidebar-icon">⚡</div>
                    <span class="sidebar-text">API Response Tester</span>
                </a>
                <a href="http-response-header-printer.html" class="sidebar-item">
                    <div class="sidebar-icon">📡</div>
                    <span class="sidebar-text">HTTP Header Printer</span>
                </a>
            <a href="curl-describer.html" class="sidebar-item">
                <div class="sidebar-icon">🌐</div>
                <span class="sidebar-text">cURL Describer</span>
            </a>
            <a href="regex-tester.html" class="sidebar-item">
                <div class="sidebar-icon">🔍</div>
                <span class="sidebar-text">Regex Tester</span>
            </a>
            <a href="cron-describer.html" class="sidebar-item">
                <div class="sidebar-icon">⏰</div>
                <span class="sidebar-text">Cron Describer</span>
            </a>
        </div>

        <!-- Development Tools Section -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">Dev Tools</div>
            <a href="index.html#dev-tools" class="sidebar-item">
                <div class="sidebar-icon">🛠️</div>
                <span class="sidebar-text">Development Tools</span>
            </a>
            <a href="jwt-decoder.html" class="sidebar-item">
                <div class="sidebar-icon">🔓</div>
                <span class="sidebar-text">JWT Decoder</span>
            </a>
            <a href="env-generator.html" class="sidebar-item">
                <div class="sidebar-icon">⚙️</div>
                <span class="sidebar-text">Environment Generator</span>
            </a>
                <a href="word-counter.html" class="sidebar-item">
                    <div class="sidebar-icon">📊</div>
                    <span class="sidebar-text">Word Counter</span>
                </a>
            </div>

            <!-- Payments Section -->
            <div class="sidebar-section">
                <div class="sidebar-section-title">Payments</div>
                <a href="index.html#payments" class="sidebar-item">
                    <div class="sidebar-icon">💳</div>
                    <span class="sidebar-text">Payments</span>
                </a>
                <a href="payment-tester.html" class="sidebar-item">
                    <div class="sidebar-icon">🧪</div>
                    <span class="sidebar-text">Payment Tester</span>
                </a>
            </div>

        <!-- Python Section -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">Python</div>
            <a href="index.html#python" class="sidebar-item">
                <div class="sidebar-icon">🐍</div>
                <span class="sidebar-text">Python Toolkit</span>
            </a>
            <a href="python-urllib.html" class="sidebar-item">
                <div class="sidebar-icon">🌐</div>
                <span class="sidebar-text">Python urllib</span>
            </a>
            <a href="python-openai.html" class="sidebar-item">
                <div class="sidebar-icon">🤖</div>
                <span class="sidebar-text">OpenAI API</span>
            </a>
            <a href="jupyter-notebooks.html" class="sidebar-item">
                <div class="sidebar-icon">📓</div>
                <span class="sidebar-text">Jupyter Notebooks</span>
            </a>
            <a href="prophet.html" class="sidebar-item">
                <div class="sidebar-icon">📈</div>
                <span class="sidebar-text">Prophet</span>
            </a>
            <a href="plotly.html" class="sidebar-item">
                <div class="sidebar-icon">📊</div>
                <span class="sidebar-text">Plotly</span>
            </a>
        </div>

        <!-- Information Section -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">Info</div>
            <a href="index.html#info" class="sidebar-item">
                <div class="sidebar-icon">ℹ️</div>
                <span class="sidebar-text">Information</span>
            </a>
            <a href="ip-address.html" class="sidebar-item">
                <div class="sidebar-icon">🌐</div>
                <span class="sidebar-text">IP Address</span>
            </a>
        </div>

        <!-- GitHub Link -->
        <div class="sidebar-section mt-8">
            <a href="https://github.com/echobash/devdunia" target="_blank" class="sidebar-item">
                <div class="sidebar-icon">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </div>
                <span class="sidebar-text">GitHub</span>
            </a>
        </div>
    </div>
</aside>`;

// Function to load sidebar
function loadSidebar() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = sidebarHTML;
    }
}

// Auto-load sidebar when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadSidebar();
});
