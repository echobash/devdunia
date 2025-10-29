// Tools Data - extracted from the main page
const toolsData = [
  // Encoders/Decoders
  { name: "JSON to PHP", description: "Convert JSON data to PHP arrays", category: "encoders", url: "../php-to-json.html", icon: "🔄" },
  { name: "JSON Beautifier", description: "Format and validate JSON data", category: "encoders", url: "../json-beautifier.html", icon: "✨" },
  { name: "JSON Minifier", description: "Compress JSON for production", category: "encoders", url: "../json-minifier.html", icon: "📦" },
  { name: "String Transformer", description: "Transform text between formats", category: "encoders", url: "../string-transformer.html", icon: "🔄" },
  { name: "URL Encoder", description: "Encode URLs safely", category: "encoders", url: "../url-encoder.html", icon: "🔗" },
  { name: "URL Decoder", description: "Decode URL-encoded strings", category: "encoders", url: "../url-decoder.html", icon: "🔓" },
  { name: "Base64 Encoder", description: "Encode to Base64 format", category: "encoders", url: "../base64-encoder.html", icon: "📤" },
  { name: "Base64 Decoder", description: "Decode Base64 strings", category: "encoders", url: "../base64-decoder.html", icon: "📥" },
  { name: "Base32 Encoder", description: "Encode to Base32 format", category: "encoders", url: "../base32encode/index.html", icon: "📤" },
  { name: "Base32 Decoder", description: "Decode Base32 strings", category: "encoders", url: "../base32decode/index.html", icon: "📥" },
  { name: "Hash Generator", description: "Generate secure hashes", category: "encoders", url: "../hash-generator.html", icon: "🔐" },
  { name: "JWT Decoder", description: "Decode JWT tokens", category: "encoders", url: "../jwt-decoder.html", icon: "🎫" },
  { name: "CSV to JSON", description: "Convert CSV to JSON", category: "encoders", url: "../csv-json-converter.html", icon: "📊" },
  { name: "YAML ⇄ JSON", description: "Convert between YAML and JSON", category: "encoders", url: "../yaml-json-converter.html", icon: "⚖️" },
  { name: "XML Formatter", description: "Format and validate XML", category: "encoders", url: "../xml-formatter.html", icon: "📄" },

  // VAPT Tools
  { name: "Clickjacking Checker", description: "Test clickjacking vulnerabilities", category: "vapt", url: "../clickjacking-checker.html", icon: "🔒" },
  { name: "HTTP Headers", description: "Analyze HTTP response headers", category: "vapt", url: "../http-response-header-printer.html", icon: "📋" },
  { name: "OWASP Top 10", description: "Learn about security vulnerabilities", category: "vapt", url: "../owasp-top10.html", icon: "🐛" },
  { name: "Email Header Analyzer", description: "Analyze email headers for security", category: "vapt", url: "../email-header-analyzer.html", icon: "📧" },

  // Generators
  { name: "Password Generator", description: "Generate secure passwords", category: "generators", url: "../password-generator.html", icon: "🔑" },
  { name: "UUID Generator", description: "Generate unique identifiers", category: "generators", url: "../guid-generator.html", icon: "🆔" },
  { name: "QR Generator", description: "Create QR codes", category: "generators", url: "../qr-generator.html", icon: "📱" },
  { name: "GUID Generator", description: "Generate GUIDs", category: "generators", url: "../guid-generator.html", icon: "🎯" },
  { name: "Lorem Ipsum", description: "Generate placeholder text", category: "generators", url: "../lorem-ipsum-generator.html", icon: "📝" },

  // API & Integration Tools
  { name: "cURL Describer", description: "Convert cURL to code", category: "api", url: "../curl-describer.html", icon: "🔄" },
  { name: "Cron Describer", description: "Explain cron expressions", category: "api", url: "../cron-describer.html", icon: "⏰" },
  { name: "Regex Tester", description: "Test regular expressions", category: "api", url: "../regex-tester.html", icon: "🔍" },

  // Development Tools
  { name: "SQL Formatter", description: "Format SQL queries", category: "dev", url: "../sql-formatter.html", icon: "🗄️" },
  { name: "API Response Tester", description: "Test API responses", category: "dev", url: "../payment-tester.html", icon: "🧪" },
  { name: "Environment Generator", description: "Generate .env files", category: "dev", url: "../env-generator.html", icon: "🌍" },
  { name: "Elasticsearch Tools", description: "Elasticsearch utilities", category: "dev", url: "../elasticsearch-tools.html", icon: "🔍" },
  { name: "Markdown Editor", description: "Live markdown editor", category: "dev", url: "../markdown-editor.html", icon: "📝" },
  { name: "Diff Checker", description: "Compare text differences", category: "dev", url: "../diff-checker.html", icon: "🔍" },
  { name: "Mermaid Renderer", description: "Create beautiful diagrams", category: "dev", url: "../mermaid-renderer.html", icon: "🌊" },
  { name: "Data Structures", description: "Visualize data structures", category: "dev", url: "../data-structures.html", icon: "🏗️" },
  { name: "Array", description: "Array operations and algorithms", category: "dev", url: "../datastructures/array-ds.html", icon: "📋" },
  { name: "Linked List", description: "Linked list implementations", category: "dev", url: "../datastructures/linkedlist-ds.html", icon: "🔗" },
  { name: "Stack", description: "Stack data structure", category: "dev", url: "../datastructures/stack-ds.html", icon: "📚" },
  { name: "Queue", description: "Queue data structure", category: "dev", url: "../datastructures/queue-ds.html", icon: "🚶" },
  { name: "Emoji Picker", description: "Browse and copy 100+ emojis instantly", category: "dev", url: "../emoji_picker/index.html", icon: "😀" },
  { name: "IP Address Tool", description: "Get your IP address and location info", category: "dev", url: "../ip-address.html", icon: "🌍" },

  // Network Protocols
  { name: "Network Protocols", description: "Complete guide to networking protocols", category: "network", url: "../network-protocols.html", icon: "🌐" },
  { name: "HTTP Protocol", description: "Hypertext Transfer Protocol guide", category: "network", url: "../http-protocol.html", icon: "🌐" },
  { name: "TCP Protocol", description: "Transmission Control Protocol guide", category: "network", url: "../tcp-protocol.html", icon: "🔗" },
  { name: "UDP Protocol", description: "User Datagram Protocol guide", category: "network", url: "../udp-protocol.html", icon: "⚡" },
  { name: "OSI Model", description: "7-layer network model guide", category: "network", url: "../osi-model.html", icon: "🏗️" },

  // Database Tools
  { name: "PostgreSQL Guide", description: "PostgreSQL utilities and commands", category: "database", url: "../postgresql-guide.html", icon: "🐘" },
  { name: "Redis Command Explorer", description: "Explore Redis commands", category: "database", url: "../redis-command-explorer.html", icon: "📚" },

  // Python Toolkit
  { name: "Requests Library", description: "HTTP library examples", category: "python", url: "../python-requests.html", icon: "🌐" },
  { name: "urllib", description: "urllib examples", category: "python", url: "../python-urllib.html", icon: "🔗" },
  { name: "Flask API", description: "Flask API templates", category: "python", url: "../python-flask.html", icon: "🌶️" },
  { name: "Pandas", description: "Data manipulation examples", category: "python", url: "../python-pandas.html", icon: "🐼" },
  { name: "OpenAI API", description: "OpenAI integration examples", category: "python", url: "../python-openai.html", icon: "🤖" },
  { name: "Jupyter Notebooks", description: "Notebook templates", category: "python", url: "../jupyter-notebooks.html", icon: "📓" },
  { name: "Prophet", description: "Time series forecasting", category: "python", url: "../prophet.html", icon: "📈" },
  { name: "Plotly", description: "Interactive visualizations", category: "python", url: "../plotly.html", icon: "📊" },
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const toolsTableBody = document.getElementById('toolsTableBody');
const noResults = document.getElementById('noResults');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalToolsEl = document.getElementById('totalTools');
const categoryCountEl = document.getElementById('categoryCount');

// State
let currentFilter = 'all';
let currentSearch = '';

// Initialize
function init() {
  updateStats();
  renderTools();
  setupEventListeners();
}

// Update stats
function updateStats() {
  totalToolsEl.textContent = toolsData.length;
  const categories = new Set(toolsData.map(tool => tool.category));
  categoryCountEl.textContent = categories.size;
}

// Render tools table
function renderTools() {
  const filteredTools = getFilteredTools();
  
  if (filteredTools.length === 0) {
    toolsTableBody.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }
  
  noResults.classList.add('hidden');
  
  toolsTableBody.innerHTML = filteredTools.map((tool, index) => `
    <tr class="tool-row" data-category="${tool.category}">
      <td class="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 text-xs sm:text-sm">${index + 1}</td>
      <td class="px-4 sm:px-6 py-3 sm:py-4">
        <div class="tool-name-wrapper flex items-center space-x-2 sm:space-x-3" data-url="${tool.url}">
          <span class="text-base sm:text-xl">${tool.icon}</span>
          <span class="font-medium text-white text-xs sm:text-base">${tool.name}</span>
        </div>
      </td>
      <td class="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 text-xs sm:text-sm hidden md:table-cell">${tool.description}</td>
      <td class="px-4 sm:px-6 py-3 sm:py-4">
        <span class="category-badge category-${tool.category}">
          ${getCategoryName(tool.category)}
        </span>
      </td>
      <td class="px-4 sm:px-6 py-3 sm:py-4 text-center hidden md:table-cell">
        <a href="${tool.url}" class="action-btn">
          Open Tool
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </td>
    </tr>
  `).join('');
  
  // Add click handlers for mobile
  addMobileClickHandlers();
}

// Get filtered tools
function getFilteredTools() {
  let filtered = toolsData;
  
  // Apply category filter
  if (currentFilter !== 'all') {
    filtered = filtered.filter(tool => tool.category === currentFilter);
  }
  
  // Apply search filter
  if (currentSearch) {
    const searchLower = currentSearch.toLowerCase();
    filtered = filtered.filter(tool => 
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
}

// Get category display name
// Get category display name
function getCategoryName(category) {
  const categoryMap = {
    'encoders': {
      full: '🔧 Encoders/Decoders',
      short: '🔧 Enc/Dec'
    },
    'vapt': {
      full: '🛡️ VAPT Tools',
      short: '🛡️ VAPT'
    },
    'generators': {
      full: '⚡ Generators',
      short: '⚡ Gen'
    },
    'api': {
      full: '🌐 API Tools',
      short: '🌐 API'
    },
    'dev': {
      full: '🛠️ Dev Tools',
      short: '🛠️ Dev'
    },
    'network': {
      full: '🌐 Network',
      short: '🌐 Net'
    },
    'database': {
      full: '🗄️ Database',
      short: '🗄️ DB'
    },
    'python': {
      full: '🐍 Python',
      short: '🐍 Py'
    }
  };
  
  const categoryData = categoryMap[category] || { full: category, short: category };
  return `<span class="category-full">${categoryData.full}</span><span class="category-short">${categoryData.short}</span>`;
}

// Setup event listeners
function setupEventListeners() {
  // Search input
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    renderTools();
    
    if (currentSearch) {
      clearSearchBtn.classList.remove('hidden');
    } else {
      clearSearchBtn.classList.add('hidden');
    }
  });
  
  // Clear search
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    clearSearchBtn.classList.add('hidden');
    renderTools();
  });
  
  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Update current filter
      currentFilter = btn.dataset.category;
      
      // Render filtered tools
      renderTools();
    });
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape to clear search
    if (e.key === 'Escape') {
      if (currentSearch) {
        searchInput.value = '';
        currentSearch = '';
        clearSearchBtn.classList.add('hidden');
        renderTools();
        searchInput.blur();
      }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}


function addMobileClickHandlers() {
  const toolNameWrappers = document.querySelectorAll('.tool-name-wrapper');
  
  toolNameWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', function(e) {
      // Only handle click on mobile (screen width < 768px)
      if (window.innerWidth < 768) {
        const url = this.dataset.url;
        window.location.href = url;
      }
    });
    
    // Add mobile link class on mobile screens
    if (window.innerWidth < 768) {
      wrapper.classList.add('tool-name-mobile-link');
    }
  });
}

// Update mobile link class on window resize
window.addEventListener('resize', () => {
  const toolNameWrappers = document.querySelectorAll('.tool-name-wrapper');
  toolNameWrappers.forEach(wrapper => {
    if (window.innerWidth < 768) {
      wrapper.classList.add('tool-name-mobile-link');
    } else {
      wrapper.classList.remove('tool-name-mobile-link');
    }
  });
});
// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);