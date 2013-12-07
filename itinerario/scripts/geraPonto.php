<?php
include "../classes/Conexao.php";
include "conecta.php";
include "../funcoes.php";


$sql = "
        SELECT 
            pon_id AS id,
            pon_nome AS nome,
            pon_endereco AS endereco,
            pon_latitude AS latitude,
            pon_longitude AS longitude

        FROM pontos
        WHERE 1
        ORDER BY pon_id
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
    $JSON_DADOS[$x]['nome'] = utf8_encode($reg['nome']);
    $JSON_DADOS[$x]['endereco'] = utf8_encode($reg['endereco']);
    $JSON_DADOS[$x]['latitude'] = utf8_encode($reg['latitude']);
    $JSON_DADOS[$x]['longitude'] = utf8_encode($reg['longitude']);

    $x++;
}

#Transforma o array em um Json
$json = json_encode($JSON_DADOS);

var_dump($json);

#Cria o arquivo ou abre para edição caso já exista.
$arquivo = fopen("../json/pontos.json", "w", TRUE);

#Escreve o conteúdo da variável no arquivo e salva.
$escreve = fwrite($arquivo, $json);

#Fecha o arquivo.
$fecha = fclose($arquivo);

?>
