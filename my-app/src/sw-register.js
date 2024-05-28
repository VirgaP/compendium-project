export default function LocalServiceWorkerRegister() {
    const swPath = `${process.env.REACT_APP_PUBLIC_URL}sw.js`;
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register(swPath).then(registration => {
          console.log('Service worker registered');
        });
      });
    }
  }