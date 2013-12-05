<?php

/**
 * Classe de conexão com o Banco de Dados.
 * @author marcos
 */
class Conexao {
	#Variáveis de conexão.

	private static $db_server = '';
	private static $db_host = '';
	private static $db_user = '';
	private static $db_pass = '';
	private static $db_database = '';

	public $conection = "";
	public $pdo = "";

	function __construct() {

		#Setando valores para as variáveis de conexão
		self::$db_server = "mysqlt";
		self::$db_host = "localhost";
		self::$db_user = "root";
		self::$db_pass = "10203040";
		self::$db_database = "itinerario";


		#Variaveis de Conexao
		$this->conection = "mysql:host=" . self::$db_host . ";dbname=" . self::$db_database;

		#Cria conexão PDO
		$this->pdo = new PDO($this->conection, self::$db_user, self::$db_pass);

		#define para que o PDO lance exceções caso ocorra erros
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
}

?>
