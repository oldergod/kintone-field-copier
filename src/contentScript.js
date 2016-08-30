const url = new URL(window.location);
if (/\/k\/\d+\//.test(url.pathname)) {
  const script = document.createElement('script');
  script.src = chrome.extension.getURL('injectedContentScript.js');
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}
