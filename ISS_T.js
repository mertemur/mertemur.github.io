function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//creating main worldwind window
var wwd = new WorldWind.WorldWindow("ISS_main");

//surface
wwd.addLayer(new WorldWind.BMNGOneImageLayer());                             //low res - incaseof 
wwd.addLayer(new WorldWind.BMNGLandsatLayer());                              //high res 

wwd.addLayer(new WorldWind.CompassLayer());                                 
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));                   
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));                         

var position = new WorldWind.Position(10.0, -125.0, 800000.0);
// Add a COLLADA model
async function modelimiz() {  
   
var modelLayer = new WorldWind.RenderableLayer();
wwd.addLayer(modelLayer);

await sleep(15000);

//var config = {dirPath: 'https://mertemur.github.io/mertemur.github.io/'};
var config = {dirPath: WorldWind.configuration.baseUrl + 'examples/collada_models/duck/'};

console.log(WorldWind.configuration.baseUrl)
var colladaLoader = new WorldWind.ColladaLoader(position, config);
colladaLoader.load("duck.dae", async function (colladaModel) {
    colladaModel.scale = 9000;
    modelLayer.addRenderable(colladaModel);
    //var popopo = new WorldWind.Position(colladaModel.position.latitude+8.0,colladaModel.position.longitude-1,colladaModel.position.altitude);
    //position = popopo;
    await sleep(10000);
    modelLayer.removeRenderable(colladaModel);
});

    let url = "http://api.open-notify.org/iss-now.json"
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => getData(data))
    .catch((error) => console.error(error))

function getData(data){
    var popopo = new WorldWind.Position(data.iss_position.latitude,data.iss_position.longitude,800000);
    position = popopo;

}

    modelimiz()
}
modelimiz()
var starFieldLayer = new WorldWind.StarFieldLayer();
var atmosphereLayer = new WorldWind.AtmosphereLayer();
wwd.addLayer(starFieldLayer);
wwd.addLayer(atmosphereLayer);

// Set a date property for the StarField and Atmosphere layers to the current date and time.
// This enables the Atmosphere layer to show a night side (and dusk/dawn effects in Earth's terminator).
// The StarField layer positions its stars according to this date.
var now = new Date();
starFieldLayer.time = now;
atmosphereLayer.time = now;

// In this example, each full day/night cycle lasts 8 seconds in real time.
//var simulatedMillisPerDay = 60000*60; //60000*60*24

// Begin the simulation at the current time as provided by the browser.
//var startTimeMillis = Date.now();

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.longitude')) {
        function file_get_contents(filename) {
            fetch(filename).then((resp) => resp.text()).then(data => {
                
                // Initialize the document parser
                const parser = new DOMParser();
                let doc = parser.parseFromString(data, 'text/html');

                // Get the <body> element content
                let body = doc.querySelector('.longitude').innerHTML;
                console.log(body)

                // Replace my empty element with the retrieved content
                //document.querySelector('longitude').innerHTML = body;
            });
        }

        // Call the function and point it to my GitHub Pages page
        file_get_contents('https://api.wheretheiss.at/v1/satellites/25544');
    }
});

function runSimulation() {
    /*// Compute the number of simulated days (or fractions of a day) since the simulation began.
    var elapsedTimeMillis = Date.now() - startTimeMillis;
    var simulatedDays = elapsedTimeMillis / simulatedMillisPerDay;

    // Compute a real date in the future given the simulated number of days.
    var millisPerDay = 24 * 3600 * 1000; // 24 hours/day * 3600 seconds/hour * 1000 milliseconds/second
    var simulatedMillis = simulatedDays * millisPerDay;
    var simulatedDate = new Date(startTimeMillis + simulatedMillis);*/

    // Update the date in both the Starfield and the Atmosphere layers.
    var now = new Date();
    starFieldLayer.time = now;
    atmosphereLayer.time = now;
    
    wwd.redraw(); // Update the WorldWindow scene.

    requestAnimationFrame(runSimulation);
}

// Animate the starry sky as well as the globe's day/night cycle.
requestAnimationFrame(runSimulation);

// Create a layer manager for controlling layer visibility.
//var layerManager = new LayerManager(wwd);





document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.longitude')) {
        function file_get_contents(filename) {
            fetch(filename).then((resp) => resp.text()).then(data => {
                
                // Initialize the document parser
                const parser = new DOMParser();
                let doc = parser.parseFromString(data, 'text/html');

                // Get the <body> element content
                let body = doc.querySelector('.longitude').innerHTML;
                console.log(body)

                // Replace my empty element with the retrieved content
                //document.querySelector('longitude').innerHTML = body;
            });
        }

        // Call the function and point it to my GitHub Pages page
        file_get_contents('https://api.wheretheiss.at/v1/satellites/25544');
    }
});