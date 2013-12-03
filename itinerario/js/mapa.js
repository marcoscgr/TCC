
var geocoder;
var map;
var idInfoBoxAberto;
var infoBox = [];
 
function abrirInfoBox(id, marker) {
    if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
        infoBox[idInfoBoxAberto].close();
    }
 
    infoBox[id].open(map, marker);
    idInfoBoxAberto = id;
}

function initialize() {
    var latlng = new google.maps.LatLng(-20.4627751, -54.62249250000002);
 
    var options = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("mapa"), options);
    
    geocoder = new google.maps.Geocoder();
}


//function initialize() {
//    var latlng = new google.maps.LatLng(-20.4627751, -54.62249250000002);
//    var options = {
//        zoom: 14,
//        center: latlng,
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    };
// 
//    map = new google.maps.Map(document.getElementById("mapa"), options);
// 
//    geocoder = new google.maps.Geocoder();
// 
//    marker = new google.maps.Marker({
//        map: map,
//        draggable: true,
//    });
// 
//    marker.setPosition(latlng);
//}

//function carregarPontos() {
//     $.getJSON('json/pontos.json', function(pontos) {
//
//        $.each(pontos, function(index, ponto) {
//
//            var marker = new google.maps.Marker({
//                position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
//                title: "Meu ponto personalizado! :-D",
//                map: map
//            });
//
//            var myOptions = {
//                content: "<p>Conteúdo do InfoBox</p>",
//                pixelOffset: new google.maps.Size(-150, 0)
//            };
//
//            infoBox[ponto.Id] = new InfoBox(myOptions);
//            infoBox[ponto.Id].marker = marker;
//
//            infoBox[ponto.Id].listener = google.maps.event.addListener(marker, 'click', function (e) {
//                abrirInfoBox(ponto.Id, marker);
//            });
//        });
//    });
//}

function carregarItinerarios() {
     $.getJSON('json/itinerarios.json', function(pontos) {

        $.each(pontos, function(index, ponto) {
console.log(ponto);
            
            geocoder.geocode({ 'address': ponto.endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();



                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(latitude, longitude),
                            title: ponto.endereco,
                            map: map
                        });


                        //var location = new google.maps.LatLng(latitude, longitude);
                        //marker.setPosition(location);
                        //map.setCenter(location);
                        map.setZoom(12);

                        var myOptions = {
                            content: "\
                                        <p>Linha: "+ponto.nome_linha+"</p>\n\
                                        <p>Endereço: "+ponto.endereco+"</p>\n\
                                        <p>Latitude: "+latitude+"</p>\n\
                                        <p>Longitude: "+longitude+"</p>\n\ ",
                            pixelOffset: new google.maps.Size(-150, 0)
                        };

                        var infowindow = new google.maps.InfoWindow(), marker;
                        infoBox[ponto.id] = new InfoBox(myOptions);
                        infoBox[ponto.id].marker = marker;

                        infoBox[ponto.id].listener = google.maps.event.addListener(marker, 'click', function (e) {

                            $('#txtEndereco').html(ponto.endereco.formatted_address);
                            $('#txtLatitude').html(latitude);
                            $('#txtLongitude').html(longitude);

                            abrirInfoBox(ponto.id, marker);
                        });
                    }
                }
            });
            
            
            
            
//            var infowindow = new google.maps.InfoWindow(), marker;
//
//            google.maps.event.addListener(marker, 'click', (function(marker, i) {
//                return function() {
//                    infowindow.setContent("Conteúdo do marcador.");
//                    infowindow.open(map, marker);
//                }
//            })(marker))
            
            
//            var myOptions = {
//                content: "<p>Conteúdo do InfoBox</p>",
//                pixelOffset: new google.maps.Size(-150, 0)
//            };
//
//            infoBox[ponto.Id] = new InfoBox(myOptions);
//            infoBox[ponto.Id].marker = marker;
//
//            infoBox[ponto.Id].listener = google.maps.event.addListener(marker, 'click', function (e) {
//                abrirInfoBox(ponto.Id, marker);
//            });
        });
    });
}





$(document).ready(function () {
    initialize();
    //carregarPontos();
    carregarItinerarios();
});