<?php
namespace App\Models;

use App\Config\Database;
use App\Utils\HttpException;
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
            $stmt->closeCursor();
            echo json_encode(["status" => "ticket id: $this->id  saved successfully"]);

        } catch (PDOException $e) {
            $connection->rollBack();
            $stmt->closeCursor();
            $code = $e->getCode();
            die(HttpException::handleException($code == "23505" ? 409 : 400, "error saving ticket :" . $e->getMessage()));
        }
    }
}

