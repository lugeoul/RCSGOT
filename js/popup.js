document.addEventListener('DOMContentLoaded', init, false);

function init()
{
    console.log("\"site\" loaded");
    document.getElementById("testButton").onclick = loadPosts;
}

function loadPosts()
{
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "http://www.reddit.com/r/GlobalOffensiveTrade/.json", true)
    xhr.send();
    //console.log(JSON.parse(xhr.response));
    chrome.tabs.create({ "active": true });
}
