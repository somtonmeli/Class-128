var song = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRIghtWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded()
{
    console.log("Model is Loaded")
}

function gotPoses(results)
{
    if(results.legnth > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left wrist X = " + leftWristX + "Left wrist Y = " + leftWristY);
        console.log("Right wrist X = " + rightWristX + "Right wrist Y = " +rightWristY);
    }

}

function draw()
{
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("FF0000");
    circle(rightWristX, rightWristY,20);

    if(rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x"; 
        song.rate(0.5);
    }

    if(rightWristY> 100 && rightWristY<200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    if(rightWristY> 200 && rightWristY<300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    if(rightWristY > 300 && rightWristY < 400)
    {
        document.getElementById("Speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    
    if(rightWristY > 400 && rightWristY < 500)
    {
        document.getElementById("Speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY,20);
        InNumberLeftWrist = Number(leftWristY);
        remove_decimal = floor(InNumberLeftWrist);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function Play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}