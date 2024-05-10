<?php
namespace App\Models;

use App\Config\Database;
use PDO;
use PDOException;

final class TicketModel extends BaseModel
{
   
    public function __construct(public string $title, public string $body, public string $priority, public int $user_id, )
    {
    }
     function save()
    {

        $db = Database::getDatabaseInstance();
        $connection = $db->getDatabaseConnection();
        $connection->beginTransaction();
        $sql = "INSERT INTO tickets(title,body,priority,user_id) VALUES(:title,:body,:priority,:user_id)";
        $stmt = $connection->prepare($sql);

        $stmt->bindValue(":title", $this->title, PDO::PARAM_STR);
        $stmt->bindValue(":body", $this->body, PDO::PARAM_STR);
        $stmt->bindValue(":priority", $this->priority, PDO::PARAM_STR);
        $stmt->bindValue(":user_id", $this->user_id, PDO::PARAM_INT);

        try {
            $stmt->execute();
            $this->id = $connection->lastInsertId();
            $connection->commit();
            var_dump( "\n ticket id: $this->id  saved successfully\n");
            $stmt->closeCursor();
        } catch (PDOException $e) {
            $connection->rollBack();
            $stmt->closeCursor();
            die (json_encode(['error' => "error saving ticket $this->title: " + $e->getMessage()]));
        }


    }
}

