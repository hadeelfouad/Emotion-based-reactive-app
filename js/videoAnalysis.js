
// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
let divRoot = $("#affdex_elements")[0];
let width = 640;
let height = 480;
let faceMode = affdex.FaceDetectorMode.LARGE_FACES;
let smiling = false;
let lastMove = Date.now();

//Construct a CameraDetector and specify the image width / height and face detector mode.
let detector = new affdex.CameraDetector(divRoot, width, height, faceMode);


//Enable detection of all Expressions, Emotions and Emojis classifiers.
detector.detectAllEmotions();
detector.detectAllExpressions();
detector.detectAllEmojis();
detector.detectAllAppearance();

//Add a callback to notify when the detector is initialized and ready for runing.
detector.addEventListener("onInitializeSuccess", function() {
  log('#logs', "The detector reports initialized");
  //Display canvas instead of video feed because we want to draw the feature points on it
  $("#face_video_canvas").css("display", "block");
  $("#face_video").css("display", "none");
});

function log(node_name, msg) {
  $(node_name).append("<span>" + msg + "</span><br />")
}

//function executes when Start button is pushed.
function onStart() {
  if (detector && !detector.isRunning) {
    $("#logs").html("");
    detector.start();
  }
  // log('#logs', "Clicked the start button");
}

//function executes when the Stop button is pushed.
function onStop() {
  // log('#logs', "Clicked the stop button");
  if (detector && detector.isRunning) {
    detector.removeEventListener();
    detector.stop();
  }
};

//function executes when the Reset button is pushed.
function onReset() {
  // log('#logs', "Clicked the reset button");
  if (detector && detector.isRunning) {
    detector.reset();

    $('#results').html("");
  }
};

//Add a callback to notify when camera access is allowed
detector.addEventListener("onWebcamConnectSuccess", function() {
  log('#logs', "Webcam access allowed");
});

//Add a callback to notify when camera access is denied
detector.addEventListener("onWebcamConnectFailure", function() {
  log('#logs', "webcam denied");
});

//Add a callback to notify when detector is stopped
detector.addEventListener("onStopSuccess", function() {
  // log('#logs', "The detector reports stopped");
  $("#results").html("");
});

//Add a callback to receive the results from processing an image.
//The faces object contains the list of the faces detected in an image.
//Faces object contains probabilities for all the different expressions, emotions and appearance metrics
detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
  if (Date.now() - lastMove > 5000) {
    $('#results').html("");
    log('#results', "Detecting...");
    // log('#results', "Timestamp: " + timestamp.toFixed(2));
    // log('#results', "Number of faces found: " + faces.length);
    if (faces.length > 0) {
      // log('#results', "Appearance: " + JSON.stringify(faces[0].appearance));
      log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
        if (key == "joy" && Number(val) > 60) {
          renderSlogan("happy");
          lastMove = Date.now();
          console.log("smile");
        }
        else if (key == "sadness" && Number(val) > 30) {
          renderSlogan("funny");
          lastMove = Date.now();
          console.log("sadness");
        }
        else if (key == "disgust" && Number(val) > 60) {
          renderSlogan("disgust");
          lastMove = Date.now();
          console.log("disgust");
        }
        else if (key == "contempt" && Number(val) > 60) {
          renderSlogan("contempt");
          lastMove = Date.now();
          console.log("contempt");
        }
        else if (key == "anger" && Number(val) > 60) {
          renderSlogan("anger");
          lastMove = Date.now();
          console.log("anger");
        }
        else if (key == "fear" && Number(val) > 60) {
          renderSlogan("fear");
          lastMove = Date.now();
          console.log("fear");
        }
        else if (key == "surprise" && Number(val) > 60) {
          renderSlogan("surprise");
          lastMove = Date.now();
          console.log("surprise");
        }
        return val.toFixed ? Number(val.toFixed(0)) : val;
      }));
      // log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function(key, val) {
      //   return val.toFixed ? Number(val.toFixed(0)) : val;
      // }));
      // log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
      drawFeaturePoints(image, faces[0].featurePoints);
    }
  }
});

//Draw the detected facial feature points on the image
function drawFeaturePoints(img, featurePoints) {
  if ($('#face_video_canvas')[0] !== undefined && $('#face_video_canvas')[0] !== null) {
    let contxt = $('#face_video_canvas')[0].getContext('2d');

      let hRatio = contxt.canvas.width / img.width;
      let vRatio = contxt.canvas.height / img.height;
      let ratio = Math.min(hRatio, vRatio);

      let left = { x: featurePoints[0].x, y: featurePoints[0].y };
      let top = { x: featurePoints[0].x, y: featurePoints[0].y };
      let right = { x: featurePoints[0].x, y: featurePoints[0].y };
      let bottom = { x: featurePoints[0].x, y: featurePoints[0].y };

      contxt.strokeStyle = "#FFFFFF";
      for (let id in featurePoints) {

        /////////////////////// Bounding box points ///////////////////
        // minimum horizontal point
        if (featurePoints[id].x < left.x) {
          left.x = featurePoints[id].x;
          left.y = featurePoints[id].y;
        }

        // maximum horizontal point
        if (featurePoints[id].x > right.x) {
          right.x = featurePoints[id].x;
          right.y = featurePoints[id].y;
        }

        // maximum vertical point --> bottom
        if (featurePoints[id].y > bottom.y) {
          bottom.x = featurePoints[id].x;
          bottom.y = featurePoints[id].y;
        }

        // minimum vertical point
        if (featurePoints[id].y < top.y) {
          top.x = featurePoints[id].x;
          top.y = featurePoints[id].y;
        }

        ////////////////////////////////////////////////////////////////

        contxt.beginPath();
        contxt.arc(featurePoints[id].x,
          featurePoints[id].y, 2, 0, 2 * Math.PI);
        contxt.stroke();
      }

      // drawing newly acquired points + rectangle
      contxt.beginPath();
      contxt.arc(left.x + ((right.x - left.x) / 2), top.y - 85, 2, 0, 2 * Math.PI);
      contxt.stroke();

      contxt.beginPath();
      contxt.arc(left.x + ((right.x - left.x) / 2), bottom.y + 20, 2, 0, 2 * Math.PI);
      contxt.stroke();

      contxt.beginPath();
      contxt.arc(left.x - 30, top.y + ((bottom.y - top.y) / 2), 2, 0, 2 * Math.PI);
      contxt.stroke();

      contxt.beginPath();
      contxt.arc(right.x + 30, top.y + ((bottom.y - top.y) / 2), 2, 0, 2 * Math.PI);
      contxt.stroke();

      let faceWidth = right.x + 30 - (left.x - 30);
      let faceHeight = bottom.y + 20 - (top.y - 85);

      contxt.rect(left.x - 30, top.y - 85, faceWidth, faceHeight);
      contxt.stroke();
  }
}
