(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  document.querySelector('#year').textContent = new Date().getFullYear();
  const form = document.querySelector('#enquiry-form');
  const feedback = document.querySelector('#form-feedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `adsOW campaign enquiry — ${data.get('business')}`;
    const body = [
      'Hello adsOW,', '',
      'I would like to enquire about a potential advertising campaign.', '',
      `Name: ${data.get('name')}`,
      `Business: ${data.get('business')}`,
      `Email: ${data.get('email')}`,
      `Preferred area: ${data.get('area') || 'Not specified'}`,
      `Preferred duration: ${data.get('duration')}`,
      '', 'Campaign details:', data.get('message') || 'Not specified', '',
      'Please let me know about next steps and availability.', '', 'Thank you.'
    ].join('\n');
    feedback.textContent = 'Opening your email app with the enquiry prepared…';
    window.location.href = `mailto:vellanki.srikar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
