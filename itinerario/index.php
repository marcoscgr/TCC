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
            <div class="panel-heading fixo">
                <h3 class="panel-title" style="float: left;">Mapa do Transporte Coletivo em Campo Grande</h3>
                <div id="menu">
                    Marcações:
                    <button type="button" class="btn btn-default" id="pontoInicio" title="Clique para marcar seu ponto de origem" onclick="pontoInicio();">Ponto Inicial</button>
                    <button type="button" class="btn btn-default" id="pontoDestino" title="Clique para marcar o ponto de destino" onclick="pontoDestino();">Ponto Final</button>
                    <button type="button" class="btn btn-info" title="Clique para calcular a rota" onclick="calcularRota();">Calcular Rota</button>
                </div>
            </div>

            <div class="panel-body margem">
                <!-- Armazena os valores inicio e destino da rota -->
                <input type="text" name="directionInicio" id="directionInicio" value="" size="100"/>
                <input type="text" name="directionDestino" id="directionDestino" value="" size="100"/>
                
                <!-- O mapa é exibido aqui -->
                <div id="mapa"></div>
<!--                <div id="directions_panel"></div>-->
            </div>
        </div>


        <!-- Gmaps API Javascript -->
        <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBsdcyR4RXAnrBh03qLCsZPYojIgAQ82ME&amp;sensor=false"></script>

        <!-- Scripts -->
        <script type="text/javascript" src="js/jquery-min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/mapa.js"></script>
    </body> 
</html>
