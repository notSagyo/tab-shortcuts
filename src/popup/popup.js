const input = document.getElementById('essentialsCount');

chrome.storage.sync.get({ essentialsCount: 0 }, (data) => {
  input.value = data.essentialsCount;
});

input.addEventListener('change', () => {
  const value = parseInt(input.value);

  if (!isNaN(value)) {
    chrome.storage.sync.set({ essentialsCount: value });
  }
});
