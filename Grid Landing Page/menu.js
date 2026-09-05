// Keep menu variables local rather than adding names to the browser's global scope.
(() => {
  const toggle = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#site-menu');
  const overlay = document.querySelector('#menu-overlay');
  const icon = document.querySelector('#menu-icon');
  const background = [document.querySelector('main'), document.querySelector('footer')];

  if (!toggle || !menu || !overlay || !icon || background.some(element => !element)) return;

  let previousOverflow = '';

  function setMenuOpen(open) {
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    icon.src = open ? './assets/images/icon-close.svg' : './assets/images/icon-menu.svg';
    menu.hidden = !open;
    overlay.hidden = !open;

    // Inert prevents keyboard and screen-reader navigation into the dimmed page.
    background.forEach(element => { element.inert = open; });

    if (open) {
      if (!wasOpen) previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      menu.querySelector('a[href]').focus();
    } else {
      document.body.style.overflow = previousOverflow;
      toggle.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener('click', () => setMenuOpen(menu.hidden));
  overlay.addEventListener('click', () => setMenuOpen(false));

  menu.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    setMenuOpen(false);
    const destination = document.querySelector(link.getAttribute('href'));
    if (destination) {
      // Following a section link should move keyboard focus to that section too.
      destination.tabIndex = -1;
      destination.focus({ preventScroll: true });
    }
  });

  document.addEventListener('keydown', event => {
    if (menu.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setMenuOpen(false);
      return;
    }

    if (event.key === 'Tab') {
      const links = menu.querySelectorAll('a[href]');
      const lastLink = links[links.length - 1];
      if (event.shiftKey && document.activeElement === toggle) {
        event.preventDefault();
        lastLink.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        toggle.focus();
      }
    }
  });

  // Only hide navigation once its controls are wired up successfully.
  menu.hidden = true;
  document.body.classList.add('menu-ready');
  toggle.hidden = false;
})();
