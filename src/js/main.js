document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('#profileTabs .nav-link');
  const sections = document.querySelectorAll('.tab-section');

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
        if (navbar) {
          window.scrollTo({
            top: navbar.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

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
});
