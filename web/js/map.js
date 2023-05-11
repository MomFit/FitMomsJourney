var map;
var markers = [];
var control;
var routingControl;

function initMap() {
  var bendigo = [-36.7570, 144.2787];
  map = L.map('map').setView(bendigo, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  control = L.Control.geocoder().addTo(map);

  fetchLocations();
}

function fetchLocations() {
  $.ajax({
    url: 'https://oqnrg558id.execute-api.ap-southeast-2.amazonaws.com/momfitstage2/fetchLocations',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      var gyms = response.womensgyms;
      var pools = response.swimmingpools;
      var toilets = response.publictoilets;

      addLocationsToMap(gyms, "gym", "red");
      addLocationsToMap(pools, "pool", "blue");
      addLocationsToMap(toilets, "toilet", "green");
    },
    error: function (error) {
      console.error("Error fetching locations:", error);
    }
  });
}


function addLocationsToMap(locations, type, color) {
  locations.forEach(function (location) {
    var marker = L.circleMarker([location.Latitude, location.Longitude], { // Updated property names
      color: color,
      radius: 5
    }).addTo(map);

    marker.on('click', function () {
      var selectedLocations = markers.map(function (marker) {
        return { lat: marker.getLatLng().lat, lng: marker.getLatLng().lng };
      });

      calculateAndDisplayRoute(selectedLocations);
    });

    markers.push(marker);
  });
}

function searchLocation() {
  var searchText = $("#search").val();
  control.geocode(searchText, function (results) {
    if (results.length > 0) {
      var result = results[0];
      map.setView(result.center, 14);
    }
  });
}

function calculateAndDisplayRoute(selectedLocations) {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  var waypoints = selectedLocations.map(function (location) {
    return L.latLng(location.lat, location.lng);
  });

  routingControl = L.Routing.control({
    waypoints: waypoints,
    routeWhileDragging: false,
    showAlternatives: false,
    createMarker: function () {
      return null; // Do not create default markers
    },
    router: L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1'
    }),
    lineOptions: {
      styles: [{ color: 'black', opacity: 0.15, weight: 9 }, { color: 'white', opacity: 0.8, weight: 6 }, { color: 'blue', opacity: 1, weight: 2 }]
    }
  }).addTo(map);
}

$("#search").on("keypress", function (e) {
  if (e.keyCode === 13) {
    searchLocation();
  }
});

initMap();