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
    public function save()
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
            
            http_response_code(201);
            echo json_encode(["status" => "ticket id: $this->id  saved successfully"]);

        } catch (PDOException $e) {
            $connection->rollBack();
            $stmt->closeCursor();
            $code = $e->getCode();
            die(HttpException::handleException($code == "23505" ? 409 : 400, "error saving ticket :" . $e->getMessage()));
        }
    }
    public static function getTickets(int $page, int $limit, string $user_id = null)
    {
        $db = Database::getDatabaseInstance();
        $connection = $db->getDatabaseConnection();
        $offset = ($page - 1) * $limit;
        $sql = "
        SELECT * FROM tickets
        ORDER BY last_updated DESC
        LIMIT $limit
        OFFSET $offset
        ;";

        if (isset($user_id) && $user_id != 'null') {
            $sql = "
            SELECT * FROM tickets 
            WHERE user_id=:id 
            ORDER BY last_updated DESC
            LIMIT $limit
            OFFSET $offset
        ;";
        }

        $stmt = $connection->prepare($sql);
        try {
            if (isset($user_id) && $user_id != 'null') {
                $stmt->bindValue(":id", intval($user_id), PDO::PARAM_STR);
            }
            $stmt->execute();
            $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);

            //totals 
            $sql = "
            SELECT * FROM tickets
            ;";

            if (isset($user_id) && $user_id != 'null') {
                $sql = "
                SELECT * FROM tickets 
                WHERE user_id=:id ;
                ";
                $stmt->bindValue(":id", $user_id, PDO::PARAM_STR);
            }

            $stmt = $connection->prepare($sql);
            if (isset($user_id) && $user_id != 'null') {
                $stmt->bindValue(":id", $user_id, PDO::PARAM_STR);
            }
            $stmt->execute();
            $totals = $stmt->rowCount();
            $lastPage = ceil($totals / $limit);

            $stmt->closeCursor();
            echo json_encode(["tickets" => $tickets, "current_page" => $page, "last_page" => $lastPage]);

        } catch (PDOException $e) {
            return HttpException::handleException(500, "error fetching tickets:" . $e->getMessage());
        }

    }
    public static function getTicket(string $id)
    {
        $db = Database::getDatabaseInstance();
        $connection = $db->getDatabaseConnection();

        $sql = "
            SELECT t.*,u.id as user_id,u.email as user_email
            FROM tickets as t
            INNER JOIN users as u ON t.user_id = u.id
            WHERE t.id=:id 
        ;";

        $ticketResponseSQL = "
            SELECT r.*,u.email as user_email
            FROM responses as r 
            INNER JOIN users as u ON u.id = r.sender_id 
            WHERE r.ticket_id=:id 
            ORDER BY r.date_created ASC
        ;";

        $stmt = $connection->prepare($sql);
        $ticketStmt = $connection->prepare($ticketResponseSQL);

        try {
            $stmt->bindValue(":id", $id, PDO::PARAM_STR);
            $ticketStmt->bindValue(":id", $id, PDO::PARAM_STR);
            $stmt->execute();
            $ticketStmt->execute();
            $ticket = $stmt->fetch(PDO::FETCH_ASSOC);
            $ticketResponses = $ticketStmt->fetchAll(PDO::FETCH_ASSOC);
            if (!$ticket || count($ticket) < 1) {
                return HttpException::handleException(404, "ticket not found");
            }
            ;
            $stmt->closeCursor();
            $ticketStmt->closeCursor();
            echo json_encode(['ticket' =>$ticket, 'responses' => $ticketResponses]);

        } catch (PDOException $e) {
            $stmt->closeCursor();
            $ticketStmt->closeCursor();
            return HttpException::handleException(500, "error fetching tickets:" . $e->getMessage());
        }

    }
    public static function updateTicket(string $id, array $updates)
    {

        $db = Database::getDatabaseInstance();
        $connection = $db->getDatabaseConnection();
        $connection->beginTransaction();
        $sql = "UPDATE tickets SET";
        foreach ($updates as $key => $value) {
            $sql .= " $key = :$key,";
        }

        $sql = substr($sql, 0, -1);
        $sql .= ' WHERE id = :id;';

        $stmt = $connection->prepare($sql);
        foreach ($updates as $key => $value) {
            $stmt->bindValue(":$key", $value, PDO::PARAM_STR);
        }
        $stmt->bindValue(":id", $id, PDO::PARAM_STR);

        try {
            $stmt->execute();
            $connection->commit();
            $stmt->closeCursor();
            echo json_encode(["status" => "ticket id: $id  updated successfully"]);

        } catch (PDOException $e) {
            $connection->rollBack();
            $stmt->closeCursor();
            $code = $e->getCode();
            die(HttpException::handleException($code == "23505" ? 409 : 400, "error updating ticket :" . $e->getMessage()));
        }
    }
    public static function deleteTicket(string $id)
    {
        $db = Database::getDatabaseInstance();
        $connection = $db->getDatabaseConnection();

        $sql = "
            DELETE FROM tickets 
            WHERE id=:id 
        ;";

        $stmt = $connection->prepare($sql);
        try {
            $stmt->bindValue(":id", $id, PDO::PARAM_STR);
            $stmt->execute();
            $stmt->closeCursor();
            echo json_encode(["SUCCESS" => "ticket with $id deleted successfully"]);

        } catch (PDOException $e) {
            return HttpException::handleException(500, "error deleting ticket:" . $e->getMessage());
        }

    }
}

