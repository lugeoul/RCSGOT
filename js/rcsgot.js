document.addEventListener('DOMContentLoaded', loadPosts, false);
var xhr;

function init()
{
    //  document.getElementById("testButton").onclick = loadPosts;
}

function loadPosts()
{
    console.log("loaded");
    xhr = new XMLHttpRequest()
    xhr.open("GET", "http://steamcommunity.com/market/?&format=json", true)
    xhr.send();
    xhr.onreadystatechange = displayResponse;
}

function displayResponse()
{
    if (xhr.readyState == 4 && xhr.status == 200)
    {
        console.log(xhr.response);
        var arr = JSON.parse(xhr.response);
        console.log(arr);
        var posts = arr.data.children
        var output = '<pre>';


        for (var i = 0; i < posts.length; i++)
        {
            output += 'author: ';
            output += posts[i].data.author;
            output += '</br> <div style="padding-left: 50px">';
            output += 'title: ';
            output += posts[i].data.title;
            output += '</br> time: ';
            output += posts[i].data.created;
            output += '</br> <div style="padding-left: 50px">';
            output += posts[i].data.selftext;
            output += '</div></br>'
            output += '</div></br>'
        }

        output += '</pre>';
        
        document.getElementById("body").innerHTML = output;
    }
}

function searchForPrice(text)
{
    if(text == null)
    {
        console.log("input string is empty!")
        return "";
    }

}