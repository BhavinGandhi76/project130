song = "";
song2 = "";
scoreright = 0;
scoreleft = 0;
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;

function setup(){

     canvas = createCanvas(500,500);
     canvas.position(710,200);
     video = createCapture(VIDEO);
     video.hide();

     poseNet = ml5.poseNet(video, modelloaded);
     poseNet.on("pose", gotPoses);
 }

 function modelloaded(){
     console.log("PoseNet is Initialised");
 }

 function gotPoses(results){
     console.log(results);
     
     scoreright = results[0].pose.keyPoints[10].score;
     scoreleft = results[0].pose.keyPoints[9].score;
     leftwristx = results[0].pose.leftWrist.x;
     leftwristy = results[0].pose.leftWrist.y;
     rightwristx = results[0].pose.rightWrist.x;
     rightwristy = results[0].pose.rightWrist.y;

     console.log("Left wrist X = " + leftwristx + ", Left wrist Y = " + leftwristy + " and Right wrist x = " + rightwristx + "Right wrist Y = " + rightwristy);
 }

 function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
  }
 
  function draw(){
      image(video, 0, 0, 600, 500);
      songstatus = song.isPlaying();
      songstatus2 = song2.isPlaying();
      fill("red");
      stroke("red");
      if(scoreleft> 0.2){
        circle(leftwristx ,leftwristy, 20);
        song2.stop();

      if(songstatus == false){
          song.play();
          document.getElementById("song").innerHTML = "Playing Harry Porter Theme song";
      }}

      if(scoreright > 0.2){
        circle(rightwristx, rightwristy, 20);
        song.stop();
      
      if(songstatus2 == false){
        song2.play();
        document.getElementById("song").innerHTML = "Playing Peter Pan song";
    }
  } 
  }
 
  function Play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
    song2.play();
    song2.rate(1);
    song2.setVolume(1);
  }