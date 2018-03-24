let slogansData = slogans;
let slogansIndex = 0;

$(document).ready(function() {
    $("#success-alert").hide();
    $("#failure-alert").hide();
    $('.input-form-field').onScreenKeyboard({
        rewireTab : true,
        leftPosition: '50%'
    });
});

renderSlogan = function(searchKey) {
    
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
    
    $('#results').html("");
    log('#results', slogansData[slogansIndex][searchKey][0]);
}

submitEmail = function() {

    var email = document.getElementsByClassName('input-form-field')[0].value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
        console.log("VALID");
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
    }
    else {
        console.log("NOT VALID");
        $("#failure-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#failure-alert").slideUp(500);
        });
        return;
    }

    console.log(email);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({ "email": email }));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("RESPONSE TEXT --> ", xhr.responseText);
        }
    }
}
