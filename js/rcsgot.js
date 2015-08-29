//<script src="../js/rcsgot.js"></script>

document.addEventListener('DOMContentLoaded', LoadReddit, false);

var xhr;
var app = [];
app["Counter-Strike: Global Offensive"] = 730;


var s_JSON = '{';
var actualPage = 0;
var lastCycle = false;
var steamMarketJSON;

var scanned = [];
var redditComments;
var newestComment = 0;

var continueLoading = true;
var colorAdd = 1;

var playUncolor = true;
var unColorStarted = false;
var firstRun = true;

function LoadReddit()
{
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.reddit.com/r/GlobalOffensiveTrade/search.json?sort=new&restrict_sr=on&q=flair%3AStore&feature=legacy_search", true);
    xhr.send();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            redditComments = JSON.parse(xhr.responseText).data.children;
            for (var i = redditComments.length; i > 0; i--)
            {
                if (redditComments[i - 1].data.created > newestComment)
                {
                    if (!firstRun)
                        NotifyNewTrade(redditComments[i - 1].data.title);
                    //console.log("new comment!! time:" + redditComments[i - 1].data.created + "name: " + redditComments[i - 1].data.title);
                    DisplayComment(redditComments[i - 1].data);
                    newestComment = redditComments[i - 1].data.created;
                }
            }
            firstRun = false;
        }
    };
    if (continueLoading)
    {
        if (!unColorStarted)
        {
            setInterval(UnColor, 15);
            unColorStarted = true;
        }
        setTimeout(function () { LoadReddit( )}, 5000);
    }
    console.log("reload");
}

var test = document.createElement('div');
var elementsToUnColor = [];

function NotifyNewTrade(message)
{
    if (!("Notification" in window))
    {
        alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted")
    {
        var notification = new Notification(message);
        
        notification.onclick = function (x) { window.focus(); };
    }
    else if (Notification.permission !== 'denied')
    {
        Notification.requestPermission
        (
            function (permission)
            {
                if (permission === "granted")
                {
                    var notification = new Notification(message);
                    notification.onclick = function (x) { window.focus(); };
                }
            }
        );
    }
}


function DisplayComment(comment)
{
    test.innerHTML = comment.selftext_html;
    document.getElementById('content').innerHTML =
        "<div id ='" + comment.id + "'>" +
        comment.title +
        "</br></br>" +
        comment.created +
        "</br>---------------------------------------------------------------------------------------------</br>" +
        test.innerText +
        "</br>==========================================================================================================================================================================================</br>" +
        "==========================================================================================================================================================================================</br>" +
        "==========================================================================================================================================================================================</br></br>" +
        "<div>" +
        document.getElementById('content').innerHTML;
    document.getElementById(comment.id).style.backgroundColor = RGBToHex([220, 0, 0]);
    elementsToUnColor.push(comment.id);
}

function NotScannedYet()
{
    
}


function ScanComment()
{

}

function UnColor()
{
    for (var i = 0; i < elementsToUnColor.length; i++)
    {
        var rgb = ColorStringToRGB(document.getElementById(elementsToUnColor[i]).style.backgroundColor);
        rgb[0] = +rgb[0] + colorAdd;
        rgb[1] = +rgb[1] + colorAdd;
        rgb[2] = +rgb[2] + colorAdd;
        document.getElementById(elementsToUnColor[i]).style.backgroundColor = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";

        if(rgb[0] >= 255 && rgb[1] >= 255 && rgb[2] >= 255)
        {
            elementsToUnColor.splice(i, 1);
            i--;
        }
    }
}

function ColorStringToRGB(hex)
{
    return hex.substring(4, hex.length - 1).replace(/ /g, '').split(',');
}

var hexLetters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

function ColorComponentToHex(intValue)
{
    if (intValue > 255)
        intValue = 255;
    else if (intValue < 0)
        intValue = 0;
    
    var hexString = "";
    hexString += hexLetters[Math.floor(intValue / 16)];
    hexString += hexLetters[intValue % 16];
    return hexString;
}

function RGBToHex(rgb)
{
    var hexColor = "#";
    hexColor += ColorComponentToHex(rgb[0]);
    hexColor += ColorComponentToHex(rgb[1]);
    hexColor += ColorComponentToHex(rgb[2]);
    return hexColor;
}

//var xhr;
//var app = [];
//var html_ActualPages = document.implementation.createHTMLDocument("temp");
//app["Counter-Strike: Global Offensive"] = 730;


//var s_JSON = '{';
//var actualPage = 0;
//var html_ActualPages;
//var lastCycle = false;
//var steamMarketJSON;

//function steamMarketToJSONCycle(numOfPages)
//{
//    if (actualPage >= 0)
//    {
//        html_ActualPages.getElementsByTagName("body")[0].innerHTML = JSON.parse(xhr.response).results_html;
//        for (var i = 0; i < numOfPages; i++)
//        {
//            s_JSON +=
//                '"' + html_ActualPages.getElementById("result_" + i + "_name").innerHTML + '" :' +
//                    '{' +
//                        '"price" : "' + html_ActualPages.getElementById("result_" + i).getElementsByClassName("market_table_value")[0].getElementsByTagName("span")[0].innerHTML + '",' + //make it a number
//                        '"icon" : "' + html_ActualPages.getElementById("result_" + i + "_image").src + '",' +
//                        '"game" : "' + html_ActualPages.getElementById("result_" + i).getElementsByClassName("market_listing_game_name")[0].innerHTML + '",' +
//                        '"listings" : "' + html_ActualPages.getElementById("result_" + i).getElementsByClassName("market_listing_num_listings_qty")[0].innerHTML + '"' +
//                    '}';
//            if (!lastCycle || i != numOfPages - 1)
//            {
//                s_JSON += ',';
//            }
//            actualPage++;
//        }

//        if (!lastCycle)
//            setTimeout(function () { loadSteamMarketItems(730, actualPage, actualPage + numOfPages) }, 3000);
        
//        console.log(actualPage);
//    }

//    if (lastCycle)
//    {
//        console.log(JSON.parse(xhr.response))
//        s_JSON += '}';
//        steamMarketJSON = JSON.parse(s_JSON);
//        localStorage.setItem("CSGOMarketList", JSON.stringify(steamMarketJSON));
//        console.log(localStorage.CSGOMarketList);
//    }
//}

//function loadSteamMarketItems(game, start, count)
//{
//    xhr = new XMLHttpRequest();
//    xhr.open("GET", "http://steamcommunity.com/market/search/render/?appid=730&start=" + start + "&count=" + count, true);
//    xhr.send();
//    xhr.onreadystatechange = function ()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            if (count >= JSON.parse(xhr.response).total_count)
//            {
//                lastCycle = true;
//                count = JSON.parse(xhr.response).total_count;
//                console.log(count - start);
//            }
//            steamMarketToJSONCycle(count - start);
//        }
//    };
//}

