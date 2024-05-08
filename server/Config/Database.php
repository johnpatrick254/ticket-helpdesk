<?php

namespace App\Config;

use PDO;
use PDOException;

require_once dirname(__DIR__) . "/Config/config.php";

class Database
{
    private static $instance = null;
    private $conn;
    private $db_host = DB_HOST;
    private $db_name = DB_NAME;
    private $db_port = DB_PORT;
    private $db_username = DB_USERNAME;
    private $db_password = PASSWORD;

    public function __construct()
    {

        $dsn = "pgsql:host=$this->db_host;port=$this->db_port;dbname=$this->db_name;";
        $user = $this->db_username;
        $pwd = $this->db_password;
        $options = [
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_STRINGIFY_FETCHES => false,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ];
        try {
            $this->conn = new PDO($dsn, $user, $pwd, $options);
        } catch (PDOException $error) {
            echo $dsn;
            return print(json_encode(['db connection error' => $error->getMessage()]));
        }
    }

    public static function getDatabaseInstance()
    {
        if (self::$instance !== null) {
            return self::$instance;
        } else {
            self::$instance = new self();
            return self::$instance;
        }
    }

    public function getDatabaseConnection()
    {
        return $this->conn;
    }
}
