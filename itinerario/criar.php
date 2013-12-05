<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="pt-br" xml:lang="pt-br">
    <head>
        <title>Transporte Coletivo em Campo Grande</title>
        
        <!-- Metas -->
		<meta name="Author" content="Marcos Rogério Germano - 8º Semestre de Ciência da Computação - FCG"/>
		<meta name="Custodian" content="Marcos Rogério Germano - 8º Semestre de Ciência da Computação - FCG" />
		<meta name="DC.Identifier" content=""/> 
		<meta name="copyleft" content="© 2013 Marcos Rogério Germano - 8º Semestre de Ciência da Computação - FCG" />
		<meta name="description" content="Exemplo prático para obtenção de diploma de Bacharelado" />
		<meta name="keywords" content="mapa, transporte coletivo, rota" />
		<meta http-equiv="Content-Language" content="pt-br"/>
		<meta http-equiv="cache-control"   content="no-cache" />
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <!-- CSS -->
        <link rel="stylesheet" type="text/css" href="css/estilo.css" />
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"  media="screen" />
    </head>

    <body>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Gera Rota do Transporte Coletivo em Campo Grande</h3>
            </div>
            <div class="panel-body">
                <div style="float:right; border:1px solid">
                    <div>Endereço: <input type="text" id="txtEndereco" size="50" /> </div>
                    <div>Latitude: <input type="text" id="txtLatitude" size="50"/> </div>
                    <div>Longitude: <input type="text" id="txtLongitude" size="50"/> </div>
                    <div>id Linha: <input type="text" id="txtLinha" size="30"/> </div>
                    <div>Sentido: <input type="text" id="txtSentido" size="30"/> </div>
                    <div>Nome Ponto: <input type="text" id="txtPonto" size="50"/> </div>
                    <br />
                    <input type="button" id="btnPegar" value="Pegar Localização" />
                    <input type="button" id="btnAdd" value="Adicionar Local" />
                    <input type="button" id="btnAddPonto" value="Ponto ônibus" />
                    <input type="button" id="btnSalvar" value="Salvar" />
                    <input type="button" id="btnLimpar" value="Limpar" />
                    <br /><br />
                    <textarea id="textoIns" style="width: 450px; height: 300px;" ></textarea>
                    
                </div>
                

                <!-- O mapa é exibido aqui -->
                <div id="mapa"></div>
            </div>
        </div>

       
        <!-- Gmaps API Javascript -->
        <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBsdcyR4RXAnrBh03qLCsZPYojIgAQ82ME&amp;sensor=false"></script>

        <!-- Scripts -->
        <script type="text/javascript" src="js/jquery-min.js"></script>
        <script type="text/javascript" src="js/padrao.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/criaMapa.js"></script>
    </body> 
</html>
