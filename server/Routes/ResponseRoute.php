<?php
namespace App\Routes;

use App\Controllers\ResponseController;
use App\Utils\HttpException;

class ResponseRoute extends BaseRoute
{
    public static function handleRoute(array $url)
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'POST':
                return ResponseController::handleCollectionRequest($url);
        }

        return HttpException::handleException(405, "Method not supported");
    }
}