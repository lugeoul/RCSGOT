document.addEventListener('DOMContentLoaded', init, false);

function init()
{
    document.getElementById("testButton").onclick = openRCSGOTTab;
}

function openRCSGOTTab()
{
    chrome.tabs.create({"url":"../html/rcsgot.html", "active": true });
}
