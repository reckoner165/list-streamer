import Hls from 'hls.js';

const video = document.getElementById('video');
const playlistTextBox = document.getElementById('playlist');

// bind them together

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => {
    const playlistText = playlistTextBox.value;
    // console.log('##', playlistText);

    const enc = new TextEncoder();
    const blob = new Blob([enc.encode(playlistText)]);

    const hls = new Hls({
        debug: true,
    });

    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log('video and hls.js are now bound together !');
      });
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log(
          'manifest loaded, found ' + data.levels.length + ' quality level'
        );
      });
    hls.loadSource(URL.createObjectURL(blob));
    hls.attachMedia(video);
})