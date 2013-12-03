<?php
include "../classes/Conexao.php";
include "conecta.php";

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
        Select distinct
            T1.TipoLinha,
            T1.id,
            CONCAT(T1.Descricao,' - LINHA ', T1.id) as Linha,
            CONCAT(T3.Tipo,' ',  T3.Logradouro,' - ',T3.Bairro, ' - Campo Grande - MS') as Endereco,
            T3.Bairro
        From Linhas T1, Itinerario T2, Cep T3 
        Where T2.CodCep = T3.CodCep And T2.Id = T1.Id
        AND T1.Id = '111'
        Order by Linha,T1.id,Endereco, Sentido
";

#Executa Query
$qr = $pdo->prepare($sql);
$qr->execute();

//$total = $qr->RowCount();
$x = 0;
$json = "";
//$rua = "";
//$json = "[";

$JSON_DADOS = array();

while($reg = $qr->fetch(PDO::FETCH_ASSOC)){
    
    //if($rua != $reg["Endereco"]){
        
        $JSON_DADOS[$x]['id'] = utf8_encode($x);
        $JSON_DADOS[$x]['linha'] = utf8_encode($reg['id']);
        $JSON_DADOS[$x]['nome_linha'] = utf8_encode($reg['Linha']);
        $JSON_DADOS[$x]['endereco'] = utf8_encode($reg['Endereco']);
        //$JSON_DADOS[$x]['sentido'] = utf8_encode($reg['Sentido']);
        
//        $json .= " {
//                \"id\": \"". utf8_encode(["id"]) ."\",
//                \"Linha\": \"". utf8_encode($reg["Linha"]) ."\",
//                \"Endereco\": \"". utf8_encode($reg["Endereco"]) ."\",
//                \"Sentido\": \"". utf8_encode($reg["Sentido"]) ."\"
//            }";
//        
//        if($x+1 < $total)
//            $json .= ",";
//    }else{
//        //$JSON_DADOS = array();
//    }

//    $rua = $reg["Endereco"];
    $x++;
}

//print_r($JSON_DADOS);

$json = json_encode($JSON_DADOS);

var_dump($json);

//$json .= "]";

#Cria o arquivo ou abre para edição caso já exista.
$arquivo = fopen("../json/itinerarios.json", "w", TRUE);

#Escreve o conteúdo da variável no arquivo e salva.
$escreve = fwrite($arquivo, $json);

#Fecha o arquivo.
$fecha = fclose($arquivo);

?>
