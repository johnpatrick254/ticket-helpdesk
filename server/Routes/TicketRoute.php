<?php
namespace App\Routes;

use App\Controllers\TicketController;
use App\Utils\HttpException;

class TicketRoute extends BaseRoute
{
    public static function handleRoute(array $url)
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET':
                return TicketController::handleResourceRequest($url);
            case 'POST' || "PUT" || "DELETE":
                return TicketController::handleCollectionRequest($url);
            default:
        }

        return HttpException::handleException(405, "Method not supported");
    }
}