const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'メニューを開く');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'メニューを閉じる' : 'メニューを開く');
    navigation.classList.toggle('is-open', opening);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  navigation.querySelectorAll('[data-open-demo]').forEach((button) => button.addEventListener('click', closeMenu));
  window.matchMedia('(max-width: 740px)').addEventListener('change', closeMenu);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const demoDialog = document.querySelector('#demo-dialog');
document.querySelectorAll('[data-open-demo]').forEach((button) => {
  button.addEventListener('click', () => demoDialog?.showModal());
});
document.querySelectorAll('[data-close-demo]').forEach((button) => {
  button.addEventListener('click', () => demoDialog?.close());
});
demoDialog?.addEventListener('click', (event) => {
  if (event.target !== demoDialog) return;
  const bounds = demoDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) demoDialog.close();
});
