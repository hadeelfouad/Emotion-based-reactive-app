let slogansData = slogans;
let slogansIndex = 0;

renderGIF = function(searchKey) {
    
    let gifs;
    let xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + searchKey + "&api_key=tAhiCMj64bRyq1EzaXsy0eyj6Om2QidE&limit=35");
    
    switch(searchKey) {
        case "happy":
            slogansIndex = 0; break;
        case "funny":
            slogansIndex = 1; break;
        case "disgust":
            slogansIndex = 2; break;
        case "contempt":
            slogansIndex = 3; break;
        case "anger":
            slogansIndex = 4; break;
        case "fear":
            slogansIndex = 5; break;
        case "surprise":
            slogansIndex = 6; break;
    }

    console.log("SLOGANS DATA: ", slogansData);
    console.log("SLOGANS DATA SK: ", slogansData[slogansIndex][searchKey]);
    $('#results').html("");
    log('#results', "SLOGANS --> " + slogansData[slogansIndex][searchKey][0]);

    xhr.done(function(data) {
        gifs = data;
        index = Math.floor((Math.random() * 35));

        let img = document.createElement("img");
        img.src = gifs.data[index].images.original.url;
        img.width = 640;
        img.height = 480;
        let mainDiv = document.getElementById("gifs");
        emptyGIF();
        mainDiv.appendChild(img);
        
        
    });
}

emptyGIF = function() {
    document.getElementById("gifs").innerHTML = "";
}
