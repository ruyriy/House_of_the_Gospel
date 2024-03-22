// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker зарегистрирован:', registration);
    })
    .catch(function(error) {
      console.error('Ошибка при регистрации Service Worker:', error);
    });
}

// Воспроизведение аудио в Service Worker
self.addEventListener('fetch', function(event) {
  if (event.request.url.endsWith('.mp3')) {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          return response.arrayBuffer();
        })
        .then(function(buffer) {
          return self.audioContext.decodeAudioData(buffer);
        })
        .then(function(decodedData) {
          var source = self.audioContext.createBufferSource();
          source.buffer = decodedData;
          source.connect(self.audioContext.destination);
          source.start(0);
        })
        .catch(function(error) {
          console.error('Ошибка при воспроизведении аудио:', error);
        })
    );
  }
});
