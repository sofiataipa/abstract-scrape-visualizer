//https://stackoverflow.com/questions/58657620/async-await-problems-with-node-canvas-loadimage-in-javascript


// canvas size
const SIZE = 0.70; // size of the canvas in relation to the screen (0 to 1)
let cnv;

let drawing = false;

let failedLoads = [];
const jsonFile = "https://sofiataipa.github.io/scraping-abstract-images/json/abstract.json";
let startImgPath = "https://sofiataipa.github.io/scraping-abstract-images/images/";
let imgsPaths = [];
let images = [];

function setup()
{
    updateCanvas();
    loadFileAndImages(jsonFile);
    imageMode(CENTER);
    tint(255, 200);
    blendMode(DIFFERENCE)
}

function draw()
{
    if(drawing && frameCount % 20 == 0) 
    {
      let randomIndex = int(random(0, images.length));
      images[randomIndex].resize(width*0.3, 0)
      image(images[randomIndex], mouseX, mouseY);
    }
}


function loadImageAtIndex(index)
{
    if(index < imgsPaths.length)
    {
      let path = imgsPaths[index]; 
      console.log(path);
      loadAndProcessImage(path).then(function() 
      {
        loadImageAtIndex(index+1);

      }).catch(function(err) 
      {
        console.log(`Something went wrong: ${err}`);
    
        let failed = imgsPaths.splice(index,1);
        console.log(`Something went wrong with: ${failed}`);
        failedLoads.push(failed);// keep track of what failed
        loadImageAtIndex(index); // we do not increase by 1 because we spliced the failed one out of our array

      });
    }
    else
    {
      console.log(images);//change this to whatever function you want to call on successful load of all texts
      drawing = true;
    }
  }

async function loadAndProcessImage(path) {
    let img = await loadImage(path);    
    images.push(img);
}

function loadFileAndImages(path)
{
    fetch(path).then(function(response) {
    return response.json();
    }).then(function(data) {
    
    for(let i = 0; i < data.content.imageNames.length; i++)
        imgsPaths.push(startImgPath + data.content.imageNames[i]);

    loadImageAtIndex(0);

    }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
    });
}

function updateCanvas() 
{
  cnv = createCanvas(windowWidth*SIZE, windowHeight*SIZE);
  cnv.parent("canvas-container");
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);

  p5Div = document.getElementById("canvas-container");
  console.log(p5Div);
  p5Div.setAttribute("style",`width:${width}px; height:${height}px`)
}

function windowResized() { updateCanvas(); }