
var geocoder;
var map;
var marker;

function initialize() {
    var latlng = new google.maps.LatLng(-20.493852246629967, -54.64841336791994);//Campo Grande
 
    var options = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("mapa"), options);
    
    geocoder = new google.maps.Geocoder();
    
     marker = new google.maps.Marker({
        map: map,
        draggable: true
    });
 
    marker.setPosition(latlng);
}

function pegaLatLang(){
    
    geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) { 
                $('#txtEndereco').val(results[0].formatted_address);
                $('#txtLatitude').val(marker.getPosition().lat());
                $('#txtLongitude').val(marker.getPosition().lng());
            }
        }
    });
}

function _makeRequest(url, parameters)
{
alert(url+'  '+parameters);
	$.ajax({
		url: url, 
		dataType: 'html',
		data: parameters,
		type: 'POST',
		beforeSend: function(){

//			$('#load').slideDown();
			if(document.getElementById('btnSalvar')!=null)
				document.getElementById('btnSalvar').disabled=true;
//			
		},
		complete: function() {
			
//			$('#load').slideUp();
			if(document.getElementById('btnSalvar')!=null)
				document.getElementById('btnSalvar').disabled=false;
			
		},
		success: function(data, textStatus) {
			 
			if(document.getElementById('btnSalvar')!=null)
				document.getElementById('btnSalvar').disabled=false;
alert(data);
			eval(data);
			
		},
		error: function(xhr,er) {
			
			var msg = "Erro: - página não existe ou houve perda de conexão com a internet "+ xhr.status + " " + xhr.statusText;
			
			alert(msg);
			
			if(document.getElementById('btnSalvar')!=null)
				document.getElementById('btnSalvar').disabled=false;
			
			return false;
			
		}		
	});
	 
}

$(document).ready(function () {
    //Carrega o GMaps
    initialize();

    //Busca a localização baseado no ponto marcado no mapa;
    $("#btnPegar").click(function(){
        pegaLatLang();
    });
    
    //Limpa a caixa de texto com os valores até então armazenados
    $("#btnLimpar").click(function(){
        $("#textoIns").text("");
    });


    var texto = "";
    var linha = "";
    var sentido = "";
    var ponto = "";
    
    $("#btnAdd").click(function(){
        linha = $("#txtLinha").val();
        sentido = $("#txtSentido").val();
        texto = $("#textoIns").val();

        texto += "INSERT INTO itinerario.rotas (rota_endereco,rota_latitude,rota_longitude,rota_ordem,lin_id, sen_id )VALUES ( \"" + $('#txtEndereco').val() + "\",\"" + $('#txtLatitude').val() + "\",\"" + $('#txtLongitude').val() + "\", NULL," + linha + "," + sentido + " );";
        
        //Insere o texto com o insert no textarea
        $("#textoIns").text(texto);
    });
    
    $("#btnAddPonto").click(function(){
        linha = $("#txtLinha").val();
        sentido = $("#txtSentido").val();
        ponto = $("#txtPonto").val();
        texto = $("#textoIns").val();

        texto += "INSERT INTO itinerario.pontos (pon_endereco,pon_latitude,pon_longitude,pon_nome )VALUES ( \"" + $('#txtEndereco').val() + "\",\"" + $('#txtLatitude').val() + "\",\"" + $('#txtLongitude').val() + "\",\"" + ponto + "\" );";
        
        //Insere o texto com o insert no textarea
        $("#textoIns").text(texto);
    });
});