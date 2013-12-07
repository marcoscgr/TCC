CREATE DATABASE  IF NOT EXISTS `itinerario` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `itinerario`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: itinerario
-- ------------------------------------------------------
-- Server version	5.5.29-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `linhas`
--

DROP TABLE IF EXISTS `linhas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linhas` (
  `lin_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lin_numero` int(11) NOT NULL,
  `lin_nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`lin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linhas`
--

LOCK TABLES `linhas` WRITE;
/*!40000 ALTER TABLE `linhas` DISABLE KEYS */;
INSERT INTO `linhas` VALUES (1,71,'BANDEIRANTES/JÚLIO DE CASTILHO'),(2,51,'TERMINAL BANDEIRANTES/SHOPPING'),(3,88,'GUAICURUS/SHOPPING');
/*!40000 ALTER TABLE `linhas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pontos`
--

DROP TABLE IF EXISTS `pontos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pontos` (
  `pon_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pon_nome` varchar(255) DEFAULT NULL,
  `pon_latitude` decimal(20,15) NOT NULL,
  `pon_longitude` decimal(20,15) NOT NULL,
  `pon_endereco` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pontos`
--

LOCK TABLES `pontos` WRITE;
/*!40000 ALTER TABLE `pontos` DISABLE KEYS */;
INSERT INTO `pontos` VALUES (1,'Terminal Bandeirantes',-20.493691449658336,-54.648649402313254,'Avenida Bandeirantes, 3890-3964 - Guanandi, Campo Grande - MS, 79006-000, República Federativa do Brasil'),(2,'Ponto 1',-20.492204069674997,-54.646846957855246,'Avenida Bandeirantes, 3661-3735 - Guanandi, Campo Grande - MS, 79006-001, República Federativa do Brasil'),(3,'Ponto 2',-20.488505656898063,-54.643885799102804,'Avenida Bandeirantes, 3139-3217 - Bandeirantes, Campo Grande - MS, 79006-000, República Federativa do Brasil'),(4,'Ponto 3',-20.479862279236148,-54.636890597991965,'Avenida Bandeirantes, 1869 - Bandeirantes, Campo Grande - MS, 79006-000, República Federativa do Brasil'),(5,'Ponto 4',-20.471962208108817,-54.630775161438010,'Avenida Bandeirantes, 817-1011 - Amambaí, Campo Grande - MS, 79005-671, República Federativa do Brasil'),(6,'Ponto 5',-20.465308143127512,-54.623329349212670,'Avenida Afonso Pena, 1422-1546 - Amambaí, Campo Grande - MS, 79005-001, República Federativa do Brasil'),(7,'Ponto 6',-20.463438520096354,-54.611313052825950,'Avenida Afonso Pena, 2852-3044 - Centro, Campo Grande - MS, 79002-074, República Federativa do Brasil'),(8,'Ponto 8',-20.459397644161246,-54.587881274871850,'Avenida Afonso Pena, 5236-5668 - Chácara Cachoeira, Campo Grande - MS, 79040-010, República Federativa do Brasil');
/*!40000 ALTER TABLE `pontos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rotas`
--

DROP TABLE IF EXISTS `rotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rotas` (
  `rota_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rota_endereco` varchar(255) DEFAULT NULL,
  `rota_latitude` decimal(20,15) DEFAULT NULL,
  `rota_longitude` decimal(20,15) DEFAULT NULL,
  `rota_ordem` int(11) DEFAULT NULL,
  `lin_id` int(10) unsigned NOT NULL,
  `sen_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`rota_id`),
  KEY `lin_id` (`lin_id`),
  KEY `sen_id` (`sen_id`),
  CONSTRAINT `sen_id` FOREIGN KEY (`sen_id`) REFERENCES `sentido` (`sen_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `lin_id` FOREIGN KEY (`lin_id`) REFERENCES `linhas` (`lin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rotas`
--

LOCK TABLES `rotas` WRITE;
/*!40000 ALTER TABLE `rotas` DISABLE KEYS */;
INSERT INTO `rotas` VALUES (1,'Avenida Bandeirantes, 3890-3964 - Guanandi, Campo Grande - MS, 79006-000, República Federativa do Brasil',-20.493852246629967,-54.648413367919940,NULL,2,1),(2,'Avenida Afonso Pena, 1216-1374 - Amambaí, Campo Grande - MS, 79005-001, República Federativa do Brasil',-20.465670003019962,-54.625968642883320,NULL,2,1),(3,'Avenida Afonso Pena, 5670-5712 - Chácara Cachoeira, Campo Grande - MS, 79040-010, República Federativa do Brasil',-20.459216706930736,-54.587537952117940,NULL,2,1),(4,'Avenida Afonso Pena, 5625-5673 - Santa Fé, Campo Grande - MS, 79031-010, República Federativa do Brasil',-20.458955352776990,-54.587967105560324,NULL,2,2),(5,'Avenida Afonso Pena, 211-295 - Amambaí, Campo Grande - MS, 79005-000, República Federativa do Brasil',-20.467760732364770,-54.633779235534690,NULL,2,2),(6,'Rua Guia Lopes, 2-126 - Amambaí, Campo Grande - MS, 79005-330, República Federativa do Brasil',-20.468424130917434,-54.634551711730980,NULL,2,2),(7,'Rua Brilhante, 1849-2047 - Bandeirantes, Campo Grande - MS, 79006-560, República Federativa do Brasil',-20.472907021742350,-54.634787746124290,NULL,2,2),(8,'Rua Brilhante, 4005-4129 - Bandeirantes, Campo Grande - MS, 79006-560, República Federativa do Brasil',-20.488847361818888,-54.647576518707300,NULL,2,2),(9,'Avenida Marechal Deodoro, 837-923 - Leblon, Campo Grande - MS, 79086-000, República Federativa do Brasil',-20.492827163046066,-54.649100013427756,NULL,2,2);
/*!40000 ALTER TABLE `rotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sentido`
--

DROP TABLE IF EXISTS `sentido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sentido` (
  `sen_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sen_nome` varchar(255) NOT NULL,
  PRIMARY KEY (`sen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentido`
--

LOCK TABLES `sentido` WRITE;
/*!40000 ALTER TABLE `sentido` DISABLE KEYS */;
INSERT INTO `sentido` VALUES (1,'Ida'),(2,'Volta');
/*!40000 ALTER TABLE `sentido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'itinerario'
--

--
-- Dumping routines for database 'itinerario'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-12-04 21:15:43
