
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;

var arrPontos = new Array();

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
        }
    });
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
        x = 0;
        $.each(pontos, function(index, ponto) {
            arrPontos[x] = ponto.latitude + ', ' + ponto.longitude;
            x++;

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
    var begin = new Array()
    begin[0] = $("#directionInicio").val();
    begin[1] = $("#directionDestino").val();

    if( begin[0] == "" || begin[1] == "" ){
        alert("Escolha o ponto de origem e destino !!!");
        return false;
    }

    calculaDistancias(begin)
}

/**
 * Função que calcula a distância entre pontos;
 * @param {string} begin
 * @returns {void}
 */
function calculaDistancias(begin) {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: begin,
        destinations: arrPontos,
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, callback);
}

/**
 * Processa o resultado da função calculaDistancias
 * @param {object} response
 * @param {string} status
 * @returns {void}
 */
function callback(response, status) {
    var valor = "";
    var pontoInicial = "";

    if (status != google.maps.DistanceMatrixStatus.OK) {
        alert('Erro: ' + status);
    } else {
        var origins = response.originAddresses;

        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            var menor = "";
            var pontoProximo;
            
            if(i==0){
                pontoInicial = $("#directionInicio").val();
            }else{
                pontoInicial = $("#directionDestino").val();
            }

            for (var j = 0; j < results.length; j++) {
                
                valor = results[j].distance.value;
                
                //Dados do ponto mais próximo
                if(menor == "" || valor < menor){
                    menor = valor;
                    pontoProximo = arrPontos[j];
                }
            }

//console.log("Menor: " + menor);
//console.log("Próximo: " + pontoProximo);
            
            calculaRota2(pontoInicial, pontoProximo, i);
        }
    }
}

function calculaRota2(origin, end, i){
    directionsDisplay[i] = new google.maps.DirectionsRenderer();

    var request = {
        origin: origin,
        destination: end,
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay[i].setDirections(response);
            directionsDisplay[i].setMap(map);
        }
    });
    
    
//    directionsService.route(request, function(response, status) {
//        if (status == google.maps.DirectionsStatus.OK)
//        {
//            var steps = response.trips[0].routes[0].steps;
//
//            for (var step = 0; step < steps.length; step++)
//            {
//                polylineOptions = {
//                    map: map,
//                    strokeColor: "#FF0000",
//                    strokeOpacity: 0.7,
//                    strokeWeight: 5,
//                    path: steps[step].lat_lngs,
//                }
//                new google.maps.Polyline(polylineOptions);
//            }
//        }
//    });
    
}


$(document).ready(function () {
    initialize();
    carregarPontos();
    carregarItinerarios();
});
