const navigationLinks = [...document.querySelectorAll('.section-nav a')];
const sections = [...document.querySelectorAll('main > section')];
let framePending = false;
function updateNavigation() {
  const marker = window.innerHeight * 0.3;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) current = section;
  }
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    current = sections[sections.length - 1];
  }
  for (const link of navigationLinks) {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  framePending = false;
}
function scheduleUpdate() {
  if (!framePending) {
    framePending = true;
    requestAnimationFrame(updateNavigation);
  }
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
updateNavigation();
