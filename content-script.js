init();

function init() {
    if(document.readyState == 'complete') {
        var ctxmenu = document.createElement('script');
        ctxmenu.src = typeof browser != 'undefined' ? browser.runtime.getURL('ctxmenu.js') : chrome.runtime.getURL('ctxmenu.js');
        (document.head||document.documentElement).appendChild(ctxmenu);
        ctxmenu.onload = function() {
            ctxmenu.remove();
        };

        var s = document.createElement('script');
        s.src = typeof browser != 'undefined' ? browser.runtime.getURL('extra-tools.js') : chrome.runtime.getURL('extra-tools.js');
        (document.head||document.documentElement).appendChild(s);
        s.onload = function() {
            s.remove();
        };
    } else {
        setTimeout(init, 100);
    }
}