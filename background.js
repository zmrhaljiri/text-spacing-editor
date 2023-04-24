// Listen to custom key strokes
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle') {
    chrome.runtime.sendMessage('toggle');
  }
});
