let slogansData = slogans;
let slogansIndex = 0;

$(document).ready(function() {
    $("#success-alert").hide();
    $("#failure-alert").hide();
    $("#duplicate-alert").hide();
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

showSuccessStatus = function() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#success-alert").slideUp(500);
    });
}


showFailureStatus = function() {
    $("#failure-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#failure-alert").slideUp(500);
    });
}

showDuplicateStatus = function() {
    $("#duplicate-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#duplicate-alert").slideUp(500);
    });
}

submitEmail = function() {

    var email = document.getElementsByClassName('input-form-field')[0].value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!re.test(String(email).toLowerCase())) {
        showFailureStatus();
        return;
    }

    var xhr_check_user = new XMLHttpRequest();
    xhr_check_user.open("POST", "http://localhost:3000/user", true);
    xhr_check_user.setRequestHeader("Content-type", "application/json");
    xhr_check_user.send(JSON.stringify({ "email": email }));
    xhr_check_user.onreadystatechange = function() {
        if (xhr_check_user.readyState == XMLHttpRequest.DONE) {
            if (JSON.parse(xhr_check_user.responseText).length == 0) {
                var xhr_new_user = new XMLHttpRequest();
                xhr_new_user.open("POST", "http://localhost:3000/", true);
                xhr_new_user.setRequestHeader("Content-type", "application/json");
                xhr_new_user.send(JSON.stringify({ "email": email }));
                xhr_new_user.onreadystatechange = function() {
                    if (xhr_new_user.readyState == XMLHttpRequest.DONE) {
                        if (xhr_new_user.responseText !== "ok") {
                            showFailureStatus();
                        }
                        else {
                            showSuccessStatus();
                            $('.input-form-field').val('');
                        }
                    }
                }
            }
            else {
                showDuplicateStatus();
            }
        }
    }
}



