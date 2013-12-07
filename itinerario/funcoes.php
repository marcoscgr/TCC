<?php

/**
 * Remove acentos de uma string
 * @param String $var
 */
function removeAcentos($var) {

    $var = preg_replace("{[��@]}", "", $var);
	
	$var = preg_replace("{[�����]}", "A", $var);
    $var = preg_replace("{[����]}", "E", $var);
    $var = preg_replace("{[����]}", "I", $var);
    $var = preg_replace("{[�����]}", "O", $var);
    $var = preg_replace("{[����]}", "U", $var);
    $var = preg_replace("{[�]}", "C", $var);
	
    $var = preg_replace("{[�����]}", "a", $var);
    $var = preg_replace("{[����]}", "e", $var);
    $var = preg_replace("{[����]}", "i", $var);
    $var = preg_replace("{[�����]}", "o", $var);
    $var = preg_replace("{[����]}", "u", $var);
    $var = preg_replace("{[�]}", "c", $var);

    return $var;
}


/**
 * Busca a latitude e longitude dos endere�os passados.
 * @param type $endereco
 * @return int|string
 */
function retornaCoordenadasGeograficas($endereco) {

    $urlEnderecoCoordenadas = "http://maps.google.com/maps/api/geocode/json?address=" . urlencode(removeAcentos($endereco)) . "&sensor=false";
    //echo $urlEnderecoCoordenadas."<br>";

    $ch = curl_init(); // Faz leitura remota do arquivo XML da locaweb
    curl_setopt($ch, CURLOPT_URL, $urlEnderecoCoordenadas);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);
    $JSONtransacao = curl_exec($ch);
    curl_close($ch);

    if ($JSONtransacao == "") {
        return 0;
    } else {


        $objJson = json_decode($JSONtransacao, true);
        $latitude = str_replace(",", ".", $objJson['results'][0]['geometry']['location']['lat']);
        $longitude = str_replace(",", ".", $objJson['results'][0]['geometry']['location']['lng']);


        if ($objJson['status'] <> 'OK') {//verifica se encontrou as coordenadas do endere�o, pode ser usado para mostrar uma msg de erro
            return "0,0";
        } else {
            return $latitude . "," . $longitude;
        }
    }
}