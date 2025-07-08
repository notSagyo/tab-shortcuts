function goToTab(index, pinned) {
  chrome.tabs.query({ currentWindow: true, pinned }, (tabs) => {
    if (tabs.length === 0) return;
    const targetTab = index === 9 ? tabs.at(-1) : tabs[index];
    if (targetTab) chrome.tabs.update(targetTab.id, { active: true });
  });
}

chrome.commands.onCommand.addListener((command) => {
  const match = command.match(/select-(pinned|unpinned)-tab-(\d+)/);
  if (match) {
    const [, pinned, num] = match;
    const index = parseInt(num, 10) - 1;
    goToTab(index, pinned === 'pinned');
  }
});
