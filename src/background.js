const goToTab = (index, tabType) => {
  const pinned = tabType === 'pinned' || tabType === 'essential';
  chrome.tabs.query({ currentWindow: true, pinned }, async (tabs) => {
    if (tabs.length === 0) return;

    if (tabType === 'pinned' || tabType === 'essential') {
      return chrome.storage.sync.get({ essentialsCount: 0 }, (config) => {
        let targetTab;

        if (tabType === 'essential') {
          targetTab = index === 99 ? tabs[config.essentialsCount - 1] : tabs[index];
        } else {
          targetTab = index === 99 ? tabs.at(-1) : tabs[index + config.essentialsCount];
        }

        if (targetTab) chrome.tabs.update(targetTab.id, { active: true });
      });
    }

    let targetTab = index === 99 ? tabs.at(-1) : tabs[index];
    if (targetTab) chrome.tabs.update(targetTab.id, { active: true });
  });
};

chrome.commands.onCommand.addListener((command) => {
  const match = command.match(/select-(pinned|unpinned|essential)-tab-(\d+)/);
  if (match) {
    const [, tabType, num] = match;
    const index = parseInt(num, 10) - 1;
    goToTab(index, tabType);
  }
});
