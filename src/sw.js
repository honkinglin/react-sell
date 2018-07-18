(function() {
    if('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
      navigator.serviceWorker.register('/react-sell/dist/service-worker.js');
    }
})();
