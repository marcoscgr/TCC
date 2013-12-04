
var map;
var marker;

function initialize() {
    var latlng = new google.maps.LatLng(-20.4627751, -54.62249250000002);//Campo Grande
 
    var options = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("mapa"), options);
}

function carregarItinerarios() {

     $.getJSON('json/itinerarios.json', function(pontos) {

        $.each(pontos, function(index, ponto) {

            var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(ponto.latitude, ponto.longitude),
                 title: ponto.endereco,
                 map: map
             });
        });
    });
}


$(document).ready(function () {
    initialize();
    carregarItinerarios();
});