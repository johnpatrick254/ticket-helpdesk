<?php

namespace App\Models;

use App\Config\Database;
use App\Models\BaseModel;
use App\Utils\HttpException;
use PDO;
use PDOException;

final class UserModel extends BaseModel
{
    public function __construct(public string $first_name, public string $last_name, public string $email, public string $password, public string $role)
    {
    }
    function save()
    {
        $db = Database::getDatabaseInstance();
        $connection = $db->getDatabaseConnection();
        $connection->beginTransaction();

        $query = "INSERT INTO users(first_name,last_name,email,role,password) VALUES(:first_name,:last_name,:email,:role,:password)";
        $stmt = $connection->prepare($query);
        try {
            $stmt->bindValue(":first_name", $this->first_name, PDO::PARAM_STR);
            $stmt->bindValue(":last_name", $this->last_name, PDO::PARAM_STR);
            $stmt->bindValue(":email", $this->email, PDO::PARAM_STR);
            $stmt->bindValue(":role", $this->role, PDO::PARAM_STR);
            $stmt->bindValue(":password", $this->password, PDO::PARAM_STR);

            $stmt->execute();
            $this->id = $connection->lastInsertId();
            $stmt->closeCursor();
            $connection->commit();

            echo json_encode(["status" => "user id: $this->id  saved successfully"]);
        } catch (PDOException $e) {
            $stmt->closeCursor();
            $connection->rollBack();
            $code = $e->getCode();
            die(HttpException::handleException($code == "23505" ? 409 : 400, "error saving user :" . $e->getMessage()));

        }
    }

    public static function findUser($email)
    {
        $db = Database::getDatabaseInstance();
        $connection = $db->getDatabaseConnection();
        $sql = 'SELECT id,first_name,last_name,email,password FROM users WHERE email = :email;';
        $stmt = $connection->prepare($sql);
        try {
            $stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user;
        } catch (PDOException $e) {
            $stmt->closeCursor();
            die(HttpException::handleException(500, " error fetching user $email:" + $e->getMessage()));
        }

    }
}
