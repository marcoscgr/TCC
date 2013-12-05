<?php
include "../classes/Conexao.php";
include "conecta.php";
include "../funcoes.php";


//$sql = "
//    Select distinct
//        T1.TipoLinha,
//        T1.id,
//        CONCAT(T1.Descricao,' - LINHA ', T1.id) as Linha,
//        CONCAT(T3.Tipo,' ',  T3.Logradouro,' - Campo Grande - MS') as Endereco,
//        T2.Sentido AS num_sentido,
//        CASE T2.Sentido
//            WHEN '1' THEN 'Bairro/Centro'
//            WHEN '2' THEN 'Bairro/Terminal' 
//            WHEN '3' THEN 'Centro/Bairro' 
//            WHEN '4' THEN 'Centro/Terminal' 
//            WHEN '5' THEN 'Terminal/Bairro'  
//            WHEN '6' THEN 'Terminal/Centro' 
//            WHEN '7' THEN 'Terminal/Terminal(Ida)' 
//            WHEN '8' THEN 'Terminal/Terminal(Volta)'
//        END as Sentido,
//        T3.Bairro
//    From Linhas T1, Itinerario T2, Cep T3 
//    Where T2.CodCep = T3.CodCep And T2.Id = T1.Id
//    AND T1.Id = '111'
//    Order by Linha,T1.id,Endereco, Sentido
//";

$sql = "
        SELECT DISTINCT
            T1.id AS linha,
            CONCAT(T1.Descricao,' - LINHA ', T1.id) AS nomeLinha,
            CONCAT(T3.Tipo,' ',  T3.Logradouro,', ',T3.Bairro, ' - Campo Grande - MS') AS endereco,
            T2.Sentido AS numSentido,
            CASE T2.Sentido
                WHEN '1' THEN 'Bairro/Centro'
                WHEN '2' THEN 'Bairro/Terminal' 
                WHEN '3' THEN 'Centro/Bairro' 
                WHEN '4' THEN 'Centro/Terminal' 
                WHEN '5' THEN 'Terminal/Bairro'  
                WHEN '6' THEN 'Terminal/Centro' 
                WHEN '7' THEN 'Terminal/Terminal(Ida)' 
                WHEN '8' THEN 'Terminal/Terminal(Volta)'
            END AS sentido
            
        FROM Linhas T1, Itinerario T2, Cep T3 
        WHERE T2.CodCep = T3.CodCep And T2.Id = T1.Id
        AND T1.id = '051'
        ORDER BY linha,T1.id, endereco, sentido
";

#Executa Query
$qr = $pdo->prepare($sql);
$qr->execute();

#Variáveis
$x = 0;
$json = "";

$JSON_DADOS = array();

while($reg = $qr->fetch(PDO::FETCH_ASSOC)){

    #Busca as coordenadas Lat e Long de determinado endereço.
    $coordenadasEndereco = retornaCoordenadasGeograficas($reg['endereco']);
    $tmp = explode(",", $coordenadasEndereco);
//    $tmp[0] = "";
//    $tmp[1] = "";

    #Array Multidimensional com os valores que serão transformador e agupados em um arquivo Json
    $JSON_DADOS[$x]['id'] = utf8_encode($x);
    $JSON_DADOS[$x]['linha'] = utf8_encode($reg['linha']);
    $JSON_DADOS[$x]['nomeLinha'] = utf8_encode($reg['nomeLinha']);
    $JSON_DADOS[$x]['endereco'] = utf8_encode($reg['endereco']);
    $JSON_DADOS[$x]['numSentido'] = utf8_encode($reg['numSentido']);
    $JSON_DADOS[$x]['sentido'] = utf8_encode($reg['sentido']);
    $JSON_DADOS[$x]['latitude'] = utf8_encode($tmp[0]);
    $JSON_DADOS[$x]['longitude'] = utf8_encode($tmp[1]);

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
