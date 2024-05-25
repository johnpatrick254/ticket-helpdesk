<?php
namespace App\Controllers;

use App\DTO\Tickets\CreateTicketDTO;
use App\DTO\Tickets\UpdateTicketDTO;
use App\Models\TicketModel;
use App\Utils\HttpException;

class TicketController extends BaseController
{

    public static function handleCollectionRequest(array $url)
    {
        $data = (array) json_decode(file_get_contents('php://input'));
      
        $method = $_SERVER['REQUEST_METHOD'];
        if (count($url) < 3) {
            if ($method === 'POST') {
                return self::createTickets($data);
            }
            if ($method === 'PUT' && isset($url[3])) {
                $id = $url[3];
                return self::updateTicket($id, $data);

            }
            if ($method === 'DELETE' && isset($url[3])) {
                $id = $url[3];
                return self::deleteTicket($id);

            }
            return HttpException::handleException(400, 'Request Method not supported');
        }

        return HttpException::handleException(404, 'Not Found');
    }

    public static function handleResourceRequest(array $url)
    {
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method === 'GET') {
            if (isset($url[3]) && is_numeric($url[3])) {
                $id = $url[3];
                return self::getTicket($id);
            }
            return self::getTickets();
        }


        return HttpException::handleException(404, 'Not Found');
    }
    public static function getTickets()
    {
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;

        return TicketModel::getTickets($page, $limit, $user_id);

    }
    public static function getTicket(string $id)
    {
        return TicketModel::getTicket($id);
    }
    public static function createTickets(array $data)
    {
        $createTicketDTO = new CreateTicketDTO($data);
        $validatedData = $createTicketDTO->validate();

        $title = $validatedData['title'];
        $body = $validatedData['body'];
        $user_id = $validatedData['user_id'];
        $priority = isset($validatedData['priority']) ? $validatedData['priority'] : null;

        $ticket = new TicketModel($title, $body, $priority, $user_id);
        $ticket->save();
    }

    public static function updateTicket(string $id, array $data)
    {
        $updateTicketDTO = new UpdateTicketDTO($data);
        $updates = $updateTicketDTO->validate();
        return TicketModel::updateTicket($id, $updates);
    }

    public static function deleteTicket(string $id)
    {
        return TicketModel::deleteTicket($id);
    }

}