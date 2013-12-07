<?php
include "../classes/Conexao.php";
include "conecta.php";
include "../funcoes.php";


$sql = "
        SELECT 
            rota_id AS id,
            rota_endereco AS endereco,
            rota_latitude AS latitude,
            rota_longitude AS longitude,
            linhas.lin_numero AS linha,
            linhas.lin_nome AS nomeLinha,
            sen_id AS sentido

        FROM rotas
            INNER JOIN linhas ON linhas.lin_id = rotas.lin_id
        WHERE 1
        ORDER BY rota_id
";

#Executa Query
$qr = $pdo->prepare($sql);
$qr->execute();

#Variáveis
$x = 0;
$json = "";

$JSON_DADOS = array();

while($reg = $qr->fetch(PDO::FETCH_ASSOC)){

    #Array Multidimensional com os valores que serão transformador e agupados em um arquivo Json
    $JSON_DADOS[$x]['id'] = utf8_encode($reg['id']);
    $JSON_DADOS[$x]['linha'] = utf8_encode($reg['linha']);
    $JSON_DADOS[$x]['nomeLinha'] = utf8_encode($reg['nomeLinha']);
    $JSON_DADOS[$x]['endereco'] = utf8_encode($reg['endereco']);
    $JSON_DADOS[$x]['sentido'] = utf8_encode($reg['sentido']);
    $JSON_DADOS[$x]['latitude'] = utf8_encode($reg['latitude']);
    $JSON_DADOS[$x]['longitude'] = utf8_encode($reg['longitude']);

    $x++;
}

#Transforma o array em um Json
$json = json_encode($JSON_DADOS);

var_dump($json);

#Cria o arquivo ou abre para edição caso já exista.
$arquivo = fopen("../json/itinerarios.json", "w", TRUE);

#Escreve o conteúdo da variável no arquivo e salva.
$escreve = fwrite($arquivo, $json);

#Fecha o arquivo.
$fecha = fclose($arquivo);

?>
