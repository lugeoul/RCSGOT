//<script src="../js/rcsgot.js"></script>

document.addEventListener('DOMContentLoaded', loadReddit, false);

var xhr;
var app = [];
var html_ActualPages = document.implementation.createHTMLDocument("temp");
app["Counter-Strike: Global Offensive"] = 730;


var s_JSON = '{';
var actualPage = 0;
var html_ActualPages;
var lastCycle = false;
var steamMarketJSON;

var scanned = [];
var redditComments;
var newestComment = 0;

var continueLoading = true;

function loadReddit()
{
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.reddit.com/r/GlobalOffensiveTrade/new/.json", true);
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
                    console.log("new comment!! time:" + redditComments[i - 1].data.created);
                    displayComment(redditComments[i - 1].data);
                    newestComment = redditComments[i - 1].data.created;
                }
            }
        }
    };
    if (continueLoading)
        setTimeout(function () { loadReddit() }, 2000);
}

var test = document.createElement('div');

function displayComment(comment)
{
    test.innerHTML = comment.selftext_html;
    document.getElementsByClassName('contents')[0].innerHTML =
        comment.title +
        "</br>---------------------------------------------------------------------------------------------</br>" +
        test.innerText +
        "</br>=============================================================================================</br>" +
        "=============================================================================================</br></br>" +
        document.getElementsByClassName('contents')[0].innerHTML;
}

function notScannedYet()
{
    
}


function scanComment()
{

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

