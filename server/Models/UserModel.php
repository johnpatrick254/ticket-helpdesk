<?php

namespace App\Models;

use App\Config\Database;
use App\Models\BaseModel;
use PDO;
use PDOException;

final class UserModel extends BaseModel{
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

            print( "\n user id: $this->id  saved successfully\n");
        } catch (PDOException $e) {
            $stmt->closeCursor();
        $connection->rollBack();

            die("error saving user :" . $e->getMessage());

        }
    }
}
