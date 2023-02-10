// canvas size
const SIZE = 0.9; // size of the canvas in relation to the screen (0 to 1)

function setup()
{
    updateCanvas();
    getScrappedImages();
}

function draw()
{

}

function getScrappedImages()
{
   
}

function updateCanvas() 
{
  let cnv = createCanvas(windowWidth*SIZE, windowWidth*SIZE*0.56);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() 
{ 
    resizeImgs();
    location.reload();
    updateCanvas(); 
}


function loadFile(path)
{
    fetch(path).then(function(response) {
    return response.json();
    }).then(function(data) {
    
    console.log(data);

    }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
    });
}
