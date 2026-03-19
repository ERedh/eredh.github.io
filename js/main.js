/* ============================================
   EREDH — Main JS
   Tab navigation, sidebar, hamburger menu
   ============================================ */

// --- Tab Navigation ---
function switchTab(tabId) {
  // Deactivate all tabs
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active-tab'));
  document.querySelectorAll('.nav-links li').forEach(el => el.classList.remove('active'));

  // Activate target
  const target = document.getElementById(tabId);
  if (target) {
    target.classList.add('active-tab');
  }

  // Mark nav item
  document.querySelectorAll('.nav-links li').forEach(el => {
    if (el.dataset.tab === tabId) el.classList.add('active');
  });

  // Close mobile menu
  document.querySelector('.nav-links').classList.remove('show');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Reset scrollable areas
  document.querySelectorAll('.scrollable-area').forEach(el => el.scrollTop = 0);
}

// --- Sidebar scroll-to-sub ---
function scrollToSub(id) {
  const el = document.getElementById(id);
  const scrollArea = el ? el.closest('.scrollable-area') : null;
  if (el && scrollArea) {
    scrollArea.scrollTo({
      top: el.offsetTop - 20,
      behavior: 'smooth'
    });
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Update sidebar active state
  const sidebar = el ? el.closest('.research-layout') : null;
  if (sidebar) {
    sidebar.querySelectorAll('.research-sidebar li').forEach(li => li.classList.remove('active-sub'));
    // Find the li that triggered this
    sidebar.querySelectorAll('.research-sidebar li').forEach(li => {
      if (li.getAttribute('onclick') && li.getAttribute('onclick').includes(id)) {
        li.classList.add('active-sub');
      }
    });
  }
}

function scrollToTop() {
  const activeTab = document.querySelector('.tab-content.active-tab');
  if (activeTab) {
    const scrollArea = activeTab.querySelector('.scrollable-area');
    if (scrollArea) {
      scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  // Nav link clicks
  document.querySelectorAll('.nav-links li').forEach(li => {
    li.addEventListener('click', () => {
      const tab = li.dataset.tab;
      if (tab) switchTab(tab);
    });
  });

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('show');
    });
  }
});
