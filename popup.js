document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('timeSpent', (data) => {
    const timeList = document.getElementById('time-list');
    const timeSpent = data.timeSpent || {};

    if (Object.keys(timeSpent).length === 0) {
      timeList.innerHTML = '<p>No time tracked yet.</p>';
      return;
    }

    for (let url in timeSpent) {
      const li = document.createElement('li');
      const time = timeSpent[url].time / 1000; // Convert to seconds
      const formattedTime = formatTime(time);

      const website = document.createElement('span');
      website.classList.add('website');
      website.textContent = url;

      const timeElement = document.createElement('span');
      timeElement.classList.add('time');
      timeElement.textContent = formattedTime;

      li.appendChild(website);
      li.appendChild(timeElement);
      timeList.appendChild(li);
    }
  });
});

// Format time in seconds to HH:MM:SS
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(secs)}`;
}

// Add leading zero for single digit numbers
function padZero(num) {
  return num < 10 ? '0' + num : num;
}
