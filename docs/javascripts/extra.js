// Custom JavaScript for Learn Spezi tutorial website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all custom functionality
    initializeCodeCopy();
    initializeSmoothScrolling();
    initializeSearchEnhancement();
    initializeProgressTracking();
    initializeInteractiveElements();
    
    // Add loading animation
    addLoadingAnimation();
});

// Enhanced code copy functionality
function initializeCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        copyButton.title = 'Copy code';
        
        // Style the button
        copyButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 4px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        
        // Add button to code block
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        // Show button on hover
        pre.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        // Copy functionality
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg>';
                copyButton.title = 'Copied!';
                
                setTimeout(() => {
                    copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                    copyButton.title = 'Copy code';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.md-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced search functionality
function initializeSearchEnhancement() {
    const searchInput = document.querySelector('.md-search__input');
    
    if (searchInput) {
        // Add search suggestions
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            if (query.length > 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });
        
        // Add keyboard navigation
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.blur();
                hideSearchSuggestions();
            }
        });
    }
}

// Show search suggestions
function showSearchSuggestions(query) {
    // This would typically fetch suggestions from a search API
    // For now, we'll just show a placeholder
    let suggestionsContainer = document.querySelector('.search-suggestions');
    
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
        `;
        
        const searchContainer = document.querySelector('.md-search');
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(suggestionsContainer);
    }
    
    // Mock suggestions based on query
    const suggestions = [
        'Getting Started with Spezi',
        'Core Concepts Overview',
        'Module Development Guide',
        'HealthKit Integration',
        'User Onboarding',
        'Bluetooth Device Connectivity'
    ].filter(suggestion => 
        suggestion.toLowerCase().includes(query)
    );
    
    suggestionsContainer.innerHTML = suggestions.map(suggestion => 
        `<div class="suggestion-item" style="padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #f0f0f0;">
            ${suggestion}
        </div>`
    ).join('');
    
    suggestionsContainer.style.display = 'block';
}

// Hide search suggestions
function hideSearchSuggestions() {
    const suggestionsContainer = document.querySelector('.search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Progress tracking for tutorial completion
function initializeProgressTracking() {
    const progressKey = 'spezi-tutorial-progress';
    
    // Load progress from localStorage
    let progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    // Track page visits
    const currentPage = window.location.pathname;
    if (!progress[currentPage]) {
        progress[currentPage] = {
            visited: true,
            visitedAt: new Date().toISOString(),
            timeSpent: 0
        };
    }
    
    // Save progress
    localStorage.setItem(progressKey, JSON.stringify(progress));
    
    // Show progress indicator
    showProgressIndicator(progress);
}

// Show progress indicator
function showProgressIndicator(progress) {
    const totalPages = Object.keys(progress).length;
    const visitedPages = Object.values(progress).filter(p => p.visited).length;
    const percentage = Math.round((visitedPages / totalPages) * 100);
    
    // Create progress bar
    let progressBar = document.querySelector('.tutorial-progress');
    
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'tutorial-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: #e0e0e0;
            z-index: 1001;
        `;
        
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #3f51b5, #7986cb);
            width: ${percentage}%;
            transition: width 0.3s ease;
        `;
        
        progressBar.appendChild(progressFill);
        document.body.appendChild(progressBar);
    } else {
        const progressFill = progressBar.querySelector('.progress-fill');
        progressFill.style.width = `${percentage}%`;
    }
}

// Interactive elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.grid.cards > *');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click tracking for external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track external link clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click_external_link', {
                    'link_url': this.href,
                    'link_text': this.textContent
                });
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.md-search__input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close search suggestions
        if (e.key === 'Escape') {
            hideSearchSuggestions();
        }
    });
}

// Loading animation
function addLoadingAnimation() {
    // Add a subtle loading animation to the page
    const content = document.querySelector('.md-content');
    
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Utility function to debounce function calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll handling
const handleScroll = debounce(() => {
    const scrollTop = window.pageYOffset;
    const progressBar = document.querySelector('.tutorial-progress');
    
    if (progressBar) {
        // Add scroll-based progress indicator
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        const progressFill = progressBar.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.background = `linear-gradient(90deg, #3f51b5 ${scrollPercentage}%, #7986cb ${scrollPercentage}%)`;
        }
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Add theme toggle enhancement
function enhanceThemeToggle() {
    const themeToggle = document.querySelector('[data-md-color-scheme]');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Add a subtle animation when switching themes
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
}

// Initialize theme toggle enhancement
document.addEventListener('DOMContentLoaded', enhanceThemeToggle);

// Add print functionality
function addPrintButton() {
    const printButton = document.createElement('button');
    printButton.innerHTML = '🖨️ Print';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3f51b5;
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 20px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: all 0.2s ease;
    `;
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    
    document.body.appendChild(printButton);
}

// Initialize print button
document.addEventListener('DOMContentLoaded', addPrintButton); 