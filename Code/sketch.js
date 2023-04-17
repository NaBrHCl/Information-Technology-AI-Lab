
let items = ["", "", "", ""];
let selectedItem = "";
let score = 0;

// variable for video capture
let video;

//variable for the item the model detected
let label = "";

// variable for start time of each object hunt 
let startTime = "";

// variables to load the classifier and modelURL
let classifier;
let modelURL = ''; 


// preload() is called directly before setup()
// setup() will wait until any load calls within have finished. 

function preload() {
  // Loading the ML model!
  classifier = ml5.imageClassifier(modelURL + 'model.json');

}

// the setup() function is called once when the program starts. 
// it is used to define initial environment properties such as screen size and background color.
// there can only be one setup() function for each program and it shouldn't be called again after its initial execution.
function setup() {

  // creating the canvas
  createCanvas(640, 520);

  // creating a video capture
  video = createCapture(VIDEO);
  video.size(640, 500);
  video.hide();
  
  //randomly selects an object 
  pickAnItem();

  // classifies your video capture
  classifyVideo();
  
}

//classifyVideo() function classifies your video capture
function classifyVideo() {
classifier.classify(video, gotResults);
}



// called directly after setup()
// continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called.
// draw() is called automatically and should never be called explicitly.
function draw() {

  //adding background color
  background(220);

  // displaying the video capture 
  
  image(video, 0, 0);

  
  textSize(24);
  fill(255);
  text("Find: "+ selectedItem, 10, 50);
  
  
  textSize(24);
  fill(255);
  text("Your Score: "+ score , 150, 50);
  
  textSize(24);
  fill(255);
  text("Item Detected: "+ label, 350, 50);
  
  
}


function gotResults(error, results) {
  if (error) {
    console.error(error);
  return;
  }
  
  // Storing the result in label variable
  label = results[0].label;
  
  // if the classification and the randomly selectedItems are the same score is increased, a new item is piacked, and then video capture is classified
  if(label == selectedItem && results[0].confidence>0.9){
    score = score + 1;
    pickAnItem();
    classifyVideo();
    
  }
  else{
      // check the time elapsed
      let timenow = new Date();
      console.log(startTime);
      console.log(timenow);
      let countdown = (timenow - startTime)/1000;
      console.log(countdown);
    
      //if < 10 seconds, display countdown on the screen otherwise pick an new item.
     
      if(countdown <=10)
        {
          textSize(60);
          fill(500);
          text(10-Math.floor(countdown), 450, 450);
          classifyVideo();
        }
      else
        {
          pickAnItem();
          classifyVideo();
        }
    
  }
  
   
}
  
  

// randomly selects an object from the items list and resets the time
function pickAnItem(){
  selectedItem=items[getRandomInt(items.length)];
  startTime= new Date();

  
}

// generates a number from 0 to size of items array -1
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}