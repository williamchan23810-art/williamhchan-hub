/**
 * WHC Studios Game Portal & Hub Controller
 * Developed by Senior Frontend Developer
 */

// 1. Featured Projects Database (Consolidated into Games and Apps)
const PROJECTS_DATA = [
  {
    id: "sudoku-16",
    title: "Sudoku 16",
    category: "Games",
    categoryKey: "games",
    description: "Challenge your mind with an expanded 16x16 grid sudoku puzzle for advanced logic thinkers.",
    url: "https://super-sudoku-16.netlify.app/",
    ctaText: "Play Now",
    themeColor: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.15)",
    tags: ["Logic", "16x16 Grid", "Puzzles"],
    logoImage: "assets/portfolio/sudoku-icon.png"
  },
  {
    id: "us-states-explorer",
    title: "US States Explorer",
    category: "Apps",
    categoryKey: "apps",
    description: "Learn and master US states, capitals, flags, and seals through interactive exploration.",
    url: "https://game-us-states-explorer.netlify.app/",
    ctaText: "Open App",
    themeColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.15)",
    tags: ["Interactive Map", "Education", "Geography"],
    logoImage: "assets/portfolio/us-states-icon.png"
  },
  {
    id: "guess-the-country",
    title: "Guess the Country",
    category: "Games",
    categoryKey: "games",
    description: "Test your global knowledge by guessing countries based on map locations, flags, and facts.",
    url: "https://guess-thecountry.netlify.app/",
    ctaText: "Play Now",
    themeColor: "#14b8a6",
    glowColor: "rgba(20, 184, 166, 0.15)",
    tags: ["Trivia", "Quiz Game", "Geography"],
    logoImage: "assets/portfolio/guess-country-icon.png"
  },
  {
    id: "chinese-chess",
    title: "Chinese Chess / Xiangqi",
    category: "Games",
    categoryKey: "games",
    description: "Play the ancient, traditional Chinese strategy game of warfare and tactical maneuvers.",
    url: "https://game-chinese-chess.netlify.app/",
    ctaText: "Play Now",
    themeColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.15)",
    tags: ["Classic Board", "Strategy", "Tactics"],
    logoImage: "assets/portfolio/chinese-chess-icon.png"
  },
  {
    id: "whc-song-list",
    title: "WHC Studio Song List",
    category: "Apps",
    categoryKey: "apps",
    description: "Browse, filter, and search through the official music catalog and song list of William H. Chan Studios.",
    url: "https://williamhchanstudiosonglist.netlify.app/",
    ctaText: "Open App",
    themeColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.15)",
    tags: ["Music Database", "Search Tool", "Utilities"],
    logoImage: "assets/portfolio/songlist-icon.png"
  },
  {
    id: "quick-photo-album",
    title: "Quick Photo Album",
    category: "Apps",
    categoryKey: "apps",
    description: "Create, organize, and view stunning photography albums and custom slideshows in your browser.",
    url: "https://app-slideshow.netlify.app/",
    ctaText: "Open App",
    themeColor: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.15)",
    tags: ["SlideShow", "Photo Viewer", "Utilities"],
    logoImage: "assets/portfolio/slideshow-icon.jpg"
  }
];

// 2. Application State Variables
let currentFilter = "all";
let searchQuery = "";

// 3. Document Selectors
const gridContainer = document.getElementById("grid-container");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResultsElement = document.getElementById("no-results");
const searchQueryDisplay = document.getElementById("search-query-display");
const clearSearchBtn = document.getElementById("clear-search-btn");
const copyCodeBtn = document.getElementById("copy-code-btn");

// 4. Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  updateCategoryCounts();
  setupEventListeners();
});

// 5. Setup Interactive Event Handlers
function setupEventListeners() {
  // Category Filter click triggers
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-category");
      renderGrid();
    });
  });

  // Reactive Search input trigger
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderGrid();
    updateCategoryCounts();
  });

  // Clear search and filters button
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    currentFilter = "all";
    
    filterButtons.forEach(b => {
      if (b.getAttribute("data-category") === "all") {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });

    renderGrid();
    updateCategoryCounts();
  });

  // Keyboard shortcut - Press '/' to focus search input
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      const activeEl = document.activeElement.tagName;
      if (activeEl !== "INPUT" && activeEl !== "TEXTAREA") {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  // Integration Code Clipboard Copier
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener("click", () => {
      const codeText = `<script src="https://williamhchan-hub.netlify.app/whc-banner.js"></script>`;
      navigator.clipboard.writeText(codeText)
        .then(() => {
          showCopySuccessState();
        })
        .catch(err => {
          console.error("Failed to copy code banner snippet: ", err);
        });
    });
  }
}

// 6. Grid Renderer with Filter Integration
function renderGrid() {
  gridContainer.style.opacity = "0.7";

  setTimeout(() => {
    // Filter the project list
    const filteredProjects = PROJECTS_DATA.filter(project => {
      const matchesCategory = currentFilter === "all" || project.categoryKey === currentFilter;
      
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery) ||
        project.category.toLowerCase().includes(searchQuery) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        
      return matchesCategory && matchesSearch;
    });

    // Clear grid
    gridContainer.innerHTML = "";

    if (filteredProjects.length === 0) {
      gridContainer.classList.add("hidden");
      noResultsElement.classList.remove("hidden");
      searchQueryDisplay.textContent = searchQuery || currentFilter;
    } else {
      gridContainer.classList.remove("hidden");
      noResultsElement.classList.add("hidden");

      // Generate HTML for each card
      filteredProjects.forEach(proj => {
        const card = document.createElement("article");
        card.className = "project-card";
        card.setAttribute("data-category", proj.categoryKey);
        
        // Generate tags HTML string
        const tagsHtml = proj.tags.map(t => `<span class="feature-tag">${t}</span>`).join("");

        // Build icon element based on image availability
        let iconHtml = "";
        if (proj.logoImage) {
          iconHtml = `<div class="card-icon-wrapper"><img src="${proj.logoImage}" alt="${proj.title} Icon" class="card-icon-img"></div>`;
        } else {
          // Fallback to gradient SVG (not active, since all apps have icons now, but maintained for resiliency)
          iconHtml = `
            <div class="card-icon-wrapper" style="background: linear-gradient(135deg, ${proj.themeColor}, ${darkenColor(proj.themeColor, 15)}); padding: 12px; color: #ffffff; border: none;">
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </div>
          `;
        }

        card.innerHTML = `
          <div class="card-glow" style="background: radial-gradient(circle at top right, ${proj.glowColor}, transparent 60%);"></div>
          <div class="card-header">
            ${iconHtml}
            <span class="category-tag tag-${proj.categoryKey}">${proj.category}</span>
          </div>
          <div class="card-body">
            <h3>${proj.title}</h3>
            <p class="description">${proj.description}</p>
            <div class="tags-container">
              ${tagsHtml}
            </div>
          </div>
          <div class="card-footer">
            <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background-color: ${proj.themeColor}; box-shadow: 0 4px 12px ${proj.glowColor};">
              ${proj.ctaText}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        `;
        gridContainer.appendChild(card);
      });
    }

    gridContainer.style.opacity = "1";
  }, 100);
}

// 7. Update Category Badges Dynamically (Games & Apps)
function updateCategoryCounts() {
  const counts = {
    all: 0,
    games: 0,
    apps: 0
  };

  PROJECTS_DATA.forEach(proj => {
    const matchesSearch = 
      searchQuery === "" ||
      proj.title.toLowerCase().includes(searchQuery) ||
      proj.description.toLowerCase().includes(searchQuery) ||
      proj.category.toLowerCase().includes(searchQuery) ||
      proj.tags.some(tag => tag.toLowerCase().includes(searchQuery));

    if (matchesSearch) {
      counts.all++;
      counts[proj.categoryKey]++;
    }
  });

  document.getElementById("count-all").textContent = counts.all;
  document.getElementById("count-games").textContent = counts.games;
  document.getElementById("count-apps").textContent = counts.apps;
}

// 8. Utility function to darken a hex color (for beautiful gradients)
function darkenColor(hex, percent) {
  let num = parseInt(hex.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = (num >> 8 & 0x00FF) - amt,
      B = (num & 0x0000FF) - amt;
      
  return "#" + (
    0x1000000 + 
    (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 + 
    (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 + 
    (B < 255 ? (B < 0 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

// 9. Display temporary success indication when integration code is copied
function showCopySuccessState() {
  const copyText = copyCodeBtn.querySelector(".copy-text");
  const copyIcon = copyCodeBtn.querySelector(".copy-check-icon");
  
  copyText.textContent = "Copied!";
  copyIcon.classList.remove("hidden");
  copyCodeBtn.style.borderColor = "#10b981";
  copyCodeBtn.style.backgroundColor = "rgba(16, 185, 129, 0.08)";
  
  setTimeout(() => {
    copyText.textContent = "Copy Snippet";
    copyIcon.classList.add("hidden");
    copyCodeBtn.style.borderColor = "";
    copyCodeBtn.style.backgroundColor = "";
  }, 2200);
}
