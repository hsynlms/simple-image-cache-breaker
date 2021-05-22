# Simple image cache breaker
Simple image cache breaker is an extension for Google Chrome web browser. It detects `image` elements on the active browser tab and adds/replaces `version` information in the URL.

```
// example - image URL before cache break:
https://mustapp.com/static/images/logo_icon.svg

// example - image URL after cache break:
https://mustapp.com/static/images/logo_icon.svg?v=1570536292618
```

# How to install?

1. Download Simple image cache breaker extension on your computer and put the files into a folder.
2. Open the Chrome Extension Management page by navigating to `chrome://extensions`.
3. The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
4. Enable `Developer Mode` by clicking the toggle switch next to Developer mode.
5. Click the `LOAD UNPACKED` button and select the extension directory.
