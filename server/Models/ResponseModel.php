<?php
namespace App\Models;

use App\Config\Database;
use App\Utils\HttpException;
use PDO;
use PDOException;

final class ResponseModel extends BaseModel
{
    public function __construct(public string $content, public int $sender_id, public int $ticket_id)
    {
    }
    function save()
    {
        $db = Database::getDatabaseInstance();
        $connection = $db->getDatabaseConnection();
        $connection->beginTransaction();

        $query = "INSERT INTO responses(content,sender_id,ticket_id) VALUES(:content,:sender_id,:ticket_id)";
        $stmt = $connection->prepare($query);
        try {
            $stmt->bindValue(":content", $this->content, PDO::PARAM_STR);
            $stmt->bindValue(":sender_id", $this->sender_id, PDO::PARAM_INT);
            $stmt->bindValue(":ticket_id", $this->ticket_id, PDO::PARAM_INT);

            $stmt->execute();
            $connection->commit();

            $stmt->closeCursor();
            $this->id = $connection->lastInsertId();

            http_response_code(201);
            echo json_encode(["status" => "response id: $this->id  saved successfully"]);

        } catch (PDOException $e) {
            $stmt->closeCursor();
            $connection->rollBack();
            die(HttpException::handleException(500, "error saving response :" . $e->getMessage()));
        }
    }
}