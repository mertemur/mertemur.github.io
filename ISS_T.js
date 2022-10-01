
//creating main worldwind window
var wwd = new WorldWind.WorldWindow("ISS_main");

//surface
wwd.addLayer(new WorldWind.BMNGOneImageLayer());                             //low res - incaseof 
wwd.addLayer(new WorldWind.BMNGLandsatLayer());                              //high res 

wwd.addLayer(new WorldWind.CompassLayer());                                 
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));                   
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));                         


// Add a COLLADA model
var modelLayer = new WorldWind.RenderableLayer();
wwd.addLayer(modelLayer);

var position = new WorldWind.Position(10.0, -125.0, 800000.0);
var config = {dirPath: WorldWind.configuration.baseUrl + 'examples/collada_models/duck/'};

var colladaLoader = new WorldWind.ColladaLoader(position, config);
colladaLoader.load("ISSlow.dae", function (colladaModel) {
    colladaModel.scale = 9000;
    modelLayer.addRenderable(colladaModel);
});

/*// Add WMS imagery
var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
var layerName = "MOD_LSTD_CLIM_M";

var createLayer = function (xmlDom) {
    var wms = new WorldWind.WmsCapabilities(xmlDom);
    var wmsLayerCapabilities = wms.getNamedLayer(layerName);
    var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
    var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
    wwd.addLayer(wmsLayer);
};

var logError = function (jqXhr, text, exception) {
    console.log("There was a failure retrieving the capabilities document: " +
        text +
    " exception: " + exception);
};

$.get(serviceAddress).done(createLayer).fail(logError);*/