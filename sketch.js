let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let actor_img;
let specs,smoke;

function setup() {
    let div = createCanvas(640, 480);
    div.style('margin-left', '200px');
    div.style('margin-right', '200px');
    capture = createCapture(VIDEO)
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose',receivedPoses);

    specs = loadImage('assets/glasses.png');

}

function modelLoaded(){
    console.log("modelLoaded");
}

function receivedPoses(poses){
    console.log(poses);

    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function draw() {
    background(0);
    image(capture, 0, 0);
    let greenColor = color('#0f0');
    fill(greenColor);

    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,20);
        }
        stroke(255,255,255);
        strokeWeight(5);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }   
    }
}