document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('#profileTabs .nav-link');
  const sections = document.querySelectorAll('.tab-section');

  // --- TABS LOGIC ---
  if (tabs.length > 0 && sections.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        sections.forEach(s => s.classList.add('d-none'));

        const targetId = tab.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.remove('d-none');
          targetSection.style.opacity = 0;
          targetSection.style.transition = 'opacity 0.4s';
          setTimeout(() => (targetSection.style.opacity = 1), 10);
        }

        const navbar = document.querySelector('.navbar');
        if (navbar && userInteracted) {
          window.scrollTo({
            top: navbar.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // --- Lưu tab đang mở ---
  const savedTab = localStorage.getItem('activeTab');
  if (savedTab) {
    const tab = document.querySelector(`[data-section="${savedTab}"]`);
    if (tab) tab.click();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      localStorage.setItem('activeTab', tab.getAttribute('data-section'));
    });
  });


  // --- SCROLL REVEAL ANIMATION ---
  const fadeElements = document.querySelectorAll('.fade-in');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    fadeElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) el.classList.add('visible');
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // --- DARK MODE TOGGLE ---
  const toggle = document.createElement('button');
  toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  toggle.classList.add('btn', 'btn-outline-secondary', 'position-fixed');
  toggle.style.bottom = '30px';
  toggle.style.left = '30px';
  toggle.style.zIndex = '99';
  document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    const animItems = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;
  animItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if (top < triggerBottom) item.classList.add('visible');
  });
});



});
