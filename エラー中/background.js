chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.ib, {
      code: 'document.getElementById("keyword").focus();'
    });
  });