var map = [];
var sliderControl = null;

var imageryEsri = L.tileLayer(
	"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
	{
		maxZoom: 20,
		// subdomains: ["mt0", "mt1", "mt2", "mt3"],
		attribution: "Map Data &copy; ESRI Satellite",
	}
);

var vectorDark = L.tileLayer(
	"http://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
	{
		maxZoom: 20,
		attribution:
			'Map tiles by <a href="https://cartodb.com/attributions">CartoDB</a>, under CC BY 3.0. Data by <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, under ODbL.',
	}
);

var vectorWaze = L.tileLayer(
	"http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
	{
		maxZoom: 20,
		attribution:
			'Map tiles by <a href="https://cartodb.com/attributions">CartoDB</a>, under CC BY 3.0. Data by <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, under ODbL.',
	}
);

map = L.map("map", {
	zoom: 5,
	minZoom: 3,
	center: [-2.117975, 118.857985],
	zoomControl: false,
	attributionControl: false,
});
map.addLayer(imageryEsri);

/* TITLE CONTROL HANDLERS */
var titleCtrl = L.control({
	position: "topleft"
});
titleCtrl.onAdd = function (map) {
	var title = L.DomUtil.create('div');
	title.innerHTML = '<div class="shadow-sm p-3 mb-5 bg-light rounded">' +
		'<h5 class="fw-bold text-center mb-0">' +
		'Timeline Kerajaan Kuno di Indonesia (Beta)' +
		'</h5></div>';
	return title;
};
map.addControl(titleCtrl);

//Fetch some data from a GeoJSON file
$.getJSON("data/kerajaan_master.geojson", function (json) {
	var testlayer = L.geoJson(json, {
		onEachFeature: function (feature, layer) {
			layer.bindTooltip(feature.properties.kerajaan, {
				permanent: true,
				// direction: 'center',
				className: 'labelKec',
				maxWidth: 150
			});
		}
	}),
		sliderControl = L.control.sliderControl({
			position: "topright",
			layer: testlayer
		});

	//For a Range-Slider use the range property:
	sliderControl = L.control.sliderControl({
		position: "topright",
		layer: testlayer,
		timeAttribute: "th_start",
		isEpoch: true
	});

	//Make sure to add the slider to the map ;-)
	map.addControl(sliderControl);
	//And initialize the slider
	sliderControl.startSlider();
});