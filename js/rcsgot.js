document.addEventListener('DOMContentLoaded', loadSteamMarketItems(730, 0, 100), false);

var xhr;
var app = [];
var html_ActualPages = document.implementation.createHTMLDocument("temp");
app["Counter-Strike: Global Offensive"] = 730;

//function init()
//{
//    //  document.getElementById("testButton").onclick = loadPosts;
//}

//function loadSteamMarketItems(start, count) {
//    xhr = new XMLHttpRequest();
//    xhr.open("GET", "http://steamcommunity.com/market/search/render/?queue=CounterStrike&start=" + 0 + "&count=" + 100, true);
//    xhr.send();
//    xhr.onreadystatechange = displayResponse;
//}

//function displayResponse()
//{
//    if (xhr.readyState == 4 && xhr.status == 200)
//    {
//        console.log(xhr.response);
//        var arr = JSON.parse(xhr.response);
//        console.log(arr);
//        var output = '<pre>';



//        for (var i = 0; i < arr.length; i++)
//        {
//            output += arr[i];
//        }

//        output += '</pre>';
        
//        document.getElementById("body").innerHTML = arr.results_html;
//    }
//}


var s_JSON = '{';
var actualPage = 0;
var html_ActualPages;
var lastCycle = false;
var steamMarketJSON;

function steamMarketToJSONCycle(numOfPages)
{
    if (actualPage >= 0)
    {
        html_ActualPages.getElementsByTagName("body")[0].innerHTML = JSON.parse(xhr.response).results_html;
        for (var i = 0; i < numOfPages; i++)
        {
            s_JSON +=
                '"' + html_ActualPages.getElementById("result_" + i + "_name").innerHTML + '" :' +
                    '{' +
                        '"price" : "' + html_ActualPages.getElementById("result_" + i).getElementsByClassName("market_table_value")[0].getElementsByTagName("span")[0].innerHTML + '",' + //make it a number
                        '"icon" : "' + html_ActualPages.getElementById("result_" + i + "_image").src + '",' +
                        '"game" : "' + html_ActualPages.getElementById("result_" + i).getElementsByClassName("market_listing_game_name")[0].innerHTML + '",' +
                        '"listings" : "' + html_ActualPages.getElementById("result_" + i).getElementsByClassName("market_listing_num_listings_qty")[0].innerHTML + '"' +
                    '}';
            if (!lastCycle || i != numOfPages - 1)
            {
                s_JSON += ',';
            }
            actualPage++;
        }

        if (!lastCycle)
            loadSteamMarketItems(730, actualPage, actualPage + numOfPages)
        
        console.log(actualPage);
    }

    if (lastCycle)
    {
        console.log(JSON.parse(xhr.response))
        s_JSON += '}';
        steamMarketJSON = JSON.parse(s_JSON);
        console.log(steamMarketJSON)
    }
}

function loadSteamMarketItems(game, start, count)
{
    xhr = new XMLHttpRequest();
    xhr.open("GET", "http://steamcommunity.com/market/search/render/?appid=730&start=" + start + "&count=" + count, true);
    xhr.send();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            if (count >= JSON.parse(xhr.response).total_count)
            {
                lastCycle = true;
                count = JSON.parse(xhr.response).total_count;
                console.log(count - start);
            }
            steamMarketToJSONCycle(count - start);
        }
    };
}