/**
 * WHC Studios Universal Cross-Promotion Banner
 * Self-contained embeddable snippet.
 */
(function() {
  // Prevent duplicate rendering
  if (document.getElementById('whc-promo-banner-root')) {
    return;
  }

  // 1. Configuration Constants
  const HUB_URL = "https://williamhchan-hub.netlify.app/"; // Target URL of central hub
  const STORAGE_KEY = "whc-hub-banner-dismissed";
  
  // 2. Embedded CSS Styles (Namespaced to prevent clashing)
  const bannerStyles = `
    #whc-promo-banner-root {
      all: initial;
      box-sizing: border-box;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      position: relative;
      z-index: 2147483647; /* Maximum possible z-index to overlay all pages */
      display: block;
      width: 100%;
    }
    #whc-promo-banner-root * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .whc-banner-container {
      background: linear-gradient(90deg, #090b11 0%, #121824 50%, #090b11 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      width: 100%;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 48px 10px 16px;
      position: relative;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease, height 0.4s ease, padding 0.4s ease;
      opacity: 1;
      transform-origin: top;
    }
    .whc-banner-collapsed {
      transform: scaleY(0);
      opacity: 0;
      height: 0 !important;
      min-height: 0 !important;
      padding: 0 !important;
      overflow: hidden;
      border-bottom-width: 0 !important;
      pointer-events: none;
    }
    .whc-banner-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      text-align: center;
    }
    .whc-banner-tag {
      background: linear-gradient(135deg, #6366f1, #ec4899);
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 3px 8px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
      display: inline-block;
    }
    .whc-banner-message {
      color: #d1d5db;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.2px;
    }
    .whc-banner-btn {
      color: #818cf8;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: color 0.2s ease, transform 0.2s ease;
    }
    .whc-banner-btn:hover {
      color: #a5b4fc;
      transform: translateX(2px);
    }
    .whc-banner-close-btn {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .whc-banner-close-btn:hover {
      background-color: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }
    
    /* Small launcher icon visible when banner is closed */
    .whc-launcher-tab {
      position: fixed;
      bottom: 24px;
      left: 24px;
      background: linear-gradient(135deg, #121824, #090b11);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      z-index: 2147483646;
      transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease;
      opacity: 0;
      transform: scale(0.6) translateY(20px);
      pointer-events: none;
    }
    .whc-launcher-tab-visible {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }
    .whc-launcher-tab:hover {
      transform: translateY(-4px) scale(1.05);
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 15px 30px rgba(99, 102, 241, 0.25);
    }
    .whc-launcher-icon {
      font-size: 15px;
    }
    
    @media (max-width: 640px) {
      .whc-banner-container {
        padding: 12px 40px 12px 12px;
      }
      .whc-banner-message {
        font-size: 12px;
        width: 100%;
      }
      .whc-banner-content {
        gap: 6px;
      }
      .whc-launcher-tab {
        bottom: 16px;
        left: 16px;
        padding: 8px 12px;
        font-size: 11px;
      }
    }
  `;

  // 3. Inject CSS styles into the document head
  const styleNode = document.createElement('style');
  styleNode.textContent = bannerStyles;
  document.head.appendChild(styleNode);

  // 4. Create root nodes in page body
  const rootNode = document.createElement('div');
  rootNode.id = 'whc-promo-banner-root';
  
  // Inject HTML template inside the root node
  rootNode.innerHTML = `
    <div class="whc-banner-container whc-banner-collapsed" id="whc-banner-element">
      <div class="whc-banner-content">
        <span class="whc-banner-tag">WHC Studio</span>
        <span class="whc-banner-message">Looking for more? Explore our library of web games & apps!</span>
        <a href="${HUB_URL}" target="_blank" rel="noopener" class="whc-banner-btn" id="whc-banner-link-element">
          Browse Hub
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
      <button class="whc-banner-close-btn" id="whc-banner-close-btn" aria-label="Dismiss banner">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <div class="whc-launcher-tab" id="whc-launcher-element" title="Browse WHC Studio Games & Apps">
      <span class="whc-launcher-icon">🎮</span>
      <span>More Games</span>
    </div>
  `;

  // Inject root element as the first child of the body tag
  if (document.body.firstChild) {
    document.body.insertBefore(rootNode, document.body.firstChild);
  } else {
    document.body.appendChild(rootNode);
  }

  // Get references to elements
  const banner = document.getElementById('whc-banner-element');
  const closeBtn = document.getElementById('whc-banner-close-btn');
  const launcher = document.getElementById('whc-launcher-element');
  const linkElement = document.getElementById('whc-banner-link-element');

  // 5. Manage Banner States
  const isDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';

  if (isDismissed) {
    // Show launcher right away
    launcher.classList.add('whc-launcher-tab-visible');
  } else {
    // Reveal banner with a slight delay for better transitions
    setTimeout(() => {
      banner.classList.remove('whc-banner-collapsed');
    }, 300);
  }

  // 6. Handle Close Trigger
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Collapse banner
    banner.classList.add('whc-banner-collapsed');
    sessionStorage.setItem(STORAGE_KEY, 'true');
    
    // Show float launcher after collapse transition ends
    setTimeout(() => {
      launcher.classList.add('whc-launcher-tab-visible');
    }, 400);
  });

  // 7. Handle Launcher Click
  launcher.addEventListener('click', function() {
    window.open(HUB_URL, '_blank', 'noopener');
  });

})();
