prediction_1 = "";
prediction_2 = "";

Webcam.set({

    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90

});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{

    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });

}


console.log("ml5 version : ",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9dage14tP/model.json',modelLoaded);

function modelLoaded()
{

    console.log("model loaded");

}


function speak()
{

    synth = window.speechSynthesis;
    speak_data_1 = "The first Prediction is " + prediction_1;
    speak_data_2 = "And the second Prediction is " + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);

}


function check()
{

    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);

}

function gotResult(error, results)
{

    if(error)
    {

        console.error(error);

    }
    
    else
    {

        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "Victory")
        {

            document.getElementById("update_meaning").innerHTML = "Victory";

        }
        if(results[0].label == "Good")
        {

            document.getElementById("update_meaning").innerHTML = "Good";

        }
        if(results[0].label == "Super")
        {

            document.getElementById("update_meaning").innerHTML = "Super";

        }

        if(results[1].label == "Victory")
        {

            document.getElementById("update_meaning_2").innerHTML = "Victory"; 

        }
        if(results[1].label == "Good")
        {

            document.getElementById("update_meaning_2").innerHTML = "Good";

        }
        if(results[1].label == "Super")
        {

            document.getElementById("update_meaning_2").innerHTML = "Super";

        }

    }

}