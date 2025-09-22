export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js';
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.log('SW registered:', registration);
          registration.onupdatefound = () => {
            const installing = registration.installing;
            if (installing) {
              installing.onstatechange = () => {
                if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                  // new update available
                  window.dispatchEvent(new CustomEvent('swUpdated'));
                }
              };
            }
          };
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('Service worker registration failed:', err);
        });
    });
  }
}
