import Hls from 'hls.js';

const video = document.getElementById('video');
const playlistTextBox = document.getElementById('playlist');
const sourceDomain = document.getElementById('domain');

// bind them together

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => {
    const playlistText = playlistTextBox.value;

    let expectSegmentUrlInNextLine = false;
    const lines = playlistText.split('\n');
    const processedLines = [];
    
    for (const line of lines) {
      let isSpecialCase = false;

      if (expectSegmentUrlInNextLine) {
          // prepend domain
          if (!line.startsWith('http')) {
            let origin = sourceDomain.value;
            const newLine = origin + line;
            processedLines.push(newLine);
            isSpecialCase = true;
          }
          expectSegmentUrlInNextLine = false;
        }
      
      if (!isSpecialCase) {
        processedLines.push(line);
      }

      if (line.includes('#EXTINF:')) {
        expectSegmentUrlInNextLine = true;
      }
    }

    const enc = new TextEncoder();
    console.log('###', processedLines);
    const blob = new Blob([enc.encode(processedLines.join('\n'))]);

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
});

function setupTimelineChart() {
  const canvas = document.querySelector('#timeline-chart');
  const chart = new TimelineChart(canvas, {
    responsive: false,
  });

  resizeHandlers.push(() => {
    chart.resize();
  });

  chart.resize();

  return chart;
}

setupTimelineChart();