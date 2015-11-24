function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 40.713, lng: -74.006},
    // zoomControl: true,
    // zoomControlOptions: {
    //   style: google.maps.ZoomControlStyle.LARGE,
    //   position: google.maps.ControlPosition.RIGHT_CENTER
    // },
    // scaleControle: false
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      console.log(results[0]['geometry']['location'].lat());
      console.log(results[0]['geometry']['location'].lng());


      var lat = (results[0]['geometry']['location'].lat()).toFixed(1);
      var lng = (results[0]['geometry']['location'].lng()).toFixed(1);

      console.log(lat);
      console.log(lng);

      //hook up FCC api and pass lat lng as values
      //use .getJSON due to x-browser req (ajax fails)
      var url =  'http://data.fcc.gov/api/speedtest/find?format=json&latitude=' + lat +'&longitude=' +lng;
      var ctrl = this;
      $.getJSON(url, function(data){
        console.log(data);
        ctrl.wirelessDown = (data.SpeedTestCounty.wirelessAvgDownload)*0.001;
        ctrl.wirelessUp = (data.SpeedTestCounty.wirelessAvgUpload)*0.001;
        ctrl.wirelessMaxDown =
        (data.SpeedTestCounty.wirelessMaxDownload)*0.001;
        ctrl.wirelessMaxUp =
        (data.SpeedTestCounty.wirelessMaxUpload)*0.001;
        ctrl.wirelessTests =
        (data.SpeedTestCounty.wirelessTests)*0.001;
        ctrl.AvgDown =
        (data.SpeedTestCounty.wirelineAvgDownload)*0.001;
        ctrl.AvgUp =
        (data.SpeedTestCounty.wirelineAvgUpload)*0.001;
        ctrl.maxDown =
        (data.SpeedTestCounty.wirelineMaxDownload)*0.001;
        ctrl.maxUp =
        (data.SpeedTestCounty.wirelineMaxUpload)*0.001;
        ctrl.tests =
        (data.SpeedTestCounty.wirelineTests)*0.001;

        console.log(ctrl.wirelessDown);
        //
        // var heatmapData = [
        //   ctrl.wirelessDown,
        //   ctrl.wirelessUp,
        //   ctrl.wirelessMaxDown,
        //   ctrl.wirelessMaxUp,
        //   ctrl.wirelessTests,
        //   ctrl.AvgDown,
        //   ctrl.AvgUp,
        //   ctrl.maxDown,
        //   ctrl.maxUp,
        //   ctrl.tests
        // ];
        // var heatmapData = [
        //   new google.maps.LatLng(37.782, -122.447),
        //   new google.maps.LatLng(37.782, -122.445),
        //   new google.maps.LatLng(37.782, -122.443),
        //   new google.maps.LatLng(37.782, -122.441),
        //   new google.maps.LatLng(37.782, -122.439),
        //   new google.maps.LatLng(37.782, -122.437),
        //   new google.maps.LatLng(37.782, -122.435),
        //   new google.maps.LatLng(37.785, -122.447),
        //   new google.maps.LatLng(37.785, -122.445),
        //   new google.maps.LatLng(37.785, -122.443),
        //   new google.maps.LatLng(37.785, -122.441),
        //   new google.maps.LatLng(37.785, -122.439),
        //   new google.maps.LatLng(37.785, -122.437),
        //   new google.maps.LatLng(37.785, -122.435)
        // ];
        // var heatmap = new google.maps.visualization.HeatmapLayer({
        //   data: heatMapData
        // });
        // heatmap.setMap(map);
      });
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
