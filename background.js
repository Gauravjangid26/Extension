let timeSpent = {};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  const url = tab.url;

  if (!url) return;

  // Start tracking time for the new tab
  if (!timeSpent[url]) {
    timeSpent[url] = { time: 0, lastUpdated: Date.now() };
  } else {
    const elapsedTime = Date.now() - timeSpent[url].lastUpdated;
    timeSpent[url].time += elapsedTime;
    timeSpent[url].lastUpdated = Date.now();
  }

  // Update time spent in the storage
  chrome.storage.local.set({ timeSpent });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  chrome.tabs.get(tabId, (tab) => {
    const url = tab.url;
    if (url && timeSpent[url]) {
      const elapsedTime = Date.now() - timeSpent[url].lastUpdated;
      timeSpent[url].time += elapsedTime;
      chrome.storage.local.set({ timeSpent });
    }
  });
});
