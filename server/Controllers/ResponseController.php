<?php
namespace App\Controllers;

use App\DTO\Response\CreateResponseDTO;
use App\Models\ResponseModel;
use App\Utils\HttpException;

class ResponseController extends BaseController
{

    public static function handleCollectionRequest(array $url)
    {
        $data = (array) json_decode(file_get_contents('php://input'));
        $method = $_SERVER['REQUEST_METHOD'];
        if (count($url) < 3 && isset($url[3])) {
            if ($method === 'POST') {
                $id = $url[3];
                return self::createResponse($id, $data);
            }
            return HttpException::handleException(400, 'Request Method not supported');
        }

        return HttpException::handleException(404, 'Not Found');
    }

    public static function handleResourceRequest(array $url)
    {
    }

    public static function createResponse($ticketId, array $data)
    {
        $responseTicketDTO = new CreateResponseDTO($data);
        $validatedData = $responseTicketDTO->validate();

        $content = $validatedData['content'];
        $sender_id = $validatedData['sender_id'];
        $ticket_id = $ticketId;

        $response = new ResponseModel($content, $sender_id, $ticket_id);
        $response->save();
    }

}