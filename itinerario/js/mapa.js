
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var campoGrande = new google.maps.LatLng(-20.4627751, -54.62249250000002);//Campo Grande

    var options = {
        zoom: 12,
        center: campoGrande,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById("mapa"), options);
    directionsDisplay.setMap(map);

    //directionsDisplay.setPanel(document.getElementById("directionsPanel"));
}

function calculaRota(waypoints) {
    var start = "";
    var end = "";
    var x = 0;
    var waypts = [];


    $.each(waypoints, function(index, obj) {
        x++;
        waypts = [];

        for (var i = 0; i < obj.way.length; i++) {

            if(i == 0)//Primeiro
                start = obj.way[i];
            else if( (i+1) == obj.way.length)//Último
                end = obj.way[i];
            else{
                waypts.push({
                    location : obj.way[i],
                    stopover : true
                });
            }
        }
//console.log(waypts);
    });


    var request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {

        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);

//            var route = response.routes[0];
//            var summaryPanel = document.getElementById('directions_panel');
//            summaryPanel.innerHTML = '';
//
//            // For each route, display summary information.
//            for (var i = 0; i < route.legs.length; i++) {
//                var routeSegment = i + 1;
//                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
//                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
//            }
        }
    });


//console.log(waypts);

//    var checkboxArray = document.getElementById('waypoints');
//
//    for (var i = 0; i < checkboxArray.length; i++) {
//        if (checkboxArray.options[i].selected == true) {
//            waypts.push({
//                location:checkboxArray[i].value,
//                stopover:true
//            });
//        }
//    }
//
//    var request = {
//        origin: start,
//        destination: end,
//        waypoints: waypts,
//        optimizeWaypoints: false,
//        travelMode: google.maps.TravelMode.DRIVING
//    };
//
//    directionsService.route(request, function(response, status) {
//        if (status == google.maps.DirectionsStatus.OK) {
//            directionsDisplay.setDirections(response);
//            var route = response.routes[0];
//            var summaryPanel = document.getElementById('directions_panel');
//            summaryPanel.innerHTML = '';
//
//            // For each route, display summary information.
//            for (var i = 0; i < route.legs.length; i++) {
//                var routeSegment = i + 1;
//                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
//                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
//            }
//        }
//    });
}


function carregarItinerarios() {

    var waypoints = new Array();
    var cont = 0;
    var valor = new Object();
    var arr = new Array();
    var cont2 = 0;

    $.getJSON('json/itinerarios.json', function(pontos) {

        //Para cada objeto json
        $.each(pontos, function(index, ponto) {

//            //Adiciona marcadores no mapa;
//            var marker = new google.maps.Marker({
//                position: new google.maps.LatLng(ponto.latitude, ponto.longitude),
//                title: ponto.endereco,
//                map: map
//            });

            //Se houver mudança na linha, reseta as variáveis para evitar sobreposição de valores;
            if( valor.linha !== ponto.linha && valor.linha != undefined){
                waypoints = new Array();
                valor = new Object();
                cont = 0;
                cont2++;
            }

            //Array com as latitudes e longitudes
            waypoints[cont] = ponto.latitude + ',' + ponto.longitude;

            //Preenchendo o valor do objeto
            valor.linha = ponto.linha;
            valor.way = waypoints;

            //Array que conterá o objeto valor
            arr[cont2] = valor;

            cont++;
        });

        calculaRota(arr);
    });
}

function carregarPontos(){
    $.getJSON('json/pontos.json', function(pontos) {

        $.each(pontos, function(index, ponto) {

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(ponto.latitude, ponto.longitude),
                //title: ponto.nome + "\n" + ponto.endereco,
                map: map,
                icon: "imagens/onibus.png"
            });

            var infowindow = new google.maps.InfoWindow({
                content: "<strong>" + ponto.nome + "</strong><br />" + ponto.endereco,
                maxWidth: 300
            });

            google.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.open(map,marker);
            });

            google.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });
        });
    });
}

function pontoInicio(){
    google.maps.event.addListenerOnce(map, 'click', function(event) {
        $("#pontoInicio").attr("disabled", "disabled");
        $("#directionInicio").val(event.latLng);
        placeMarkerInicio(event.latLng);
    });
}

function pontoDestino(){
    google.maps.event.addListenerOnce(map, 'click', function(event) {
        $("#pontoDestino").attr("disabled", "disabled");
        $("#directionDestino").val(event.latLng);
        placeMarkerFim(event.latLng);
    });
}

function placeMarkerInicio(location) {
    var marker = new google.maps.Marker({
        position: location,
        title: "Ponto de Partida",
        map: map,
        draggable: true
    });
    var infowindow = new google.maps.InfoWindow({
        content: "Ponto Inicial<br />(Arraste o marcador)",
        maxWidth: 300
    });

    infowindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', function(event) {
        infowindow.open(map, marker);
    });
    
    google.maps.event.addListener(marker, 'mouseup', function(event) {
        geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
console.log(status);
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) { 
                    $("#directionInicio").val(marker.getPosition());
                    //infowindow.content = 'Ponto Inicial<br /><b>Endereço: </b>' + results[0].formatted_address
                    //infowindow.open(map, marker);
                }
            }
        });
    });
}

function placeMarkerFim(location) {

    var marker = new google.maps.Marker({
        position: location,
        title: "Ponto de Destino",
        map: map,
        draggable: true
    });
    var infowindow = new google.maps.InfoWindow({
        content: "Ponto de Destino<br />(Arraste o marcador)",
        maxWidth: 300
    });

    infowindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', function(event) {
        infowindow.open(map, marker);
    });
    
    google.maps.event.addListener(marker, 'mouseup', function(event) {
        geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
console.log(status);
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) { 
                    $("#directionDestino").val( marker.getPosition() );
                    //infowindow.content = 'Ponto de Destino<br /><b>Endereço: </b>' + results[0].formatted_address
                    //infowindow.open(map, marker);
                }
            }
        });
    });
}

function calcularRota(){
    if( $("#directionInicio").val() == "" || $("#directionDestino").val() == "" ){
        alert("Escolha o ponto de origem e destino !!!");
        return false;
    }
    
    alert('Calculando....');
}


function calculaDistancia() {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
}

$(document).ready(function () {
    initialize();
    //carregarPontos();
    carregarItinerarios();
});
