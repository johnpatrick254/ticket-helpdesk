<?php

namespace App\Routes;

use App\Controllers\AuthController;
use App\Utils\HttpException;

class AuthRoute extends BaseRoute
{
    public static function handleRoute(array $url)
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET':
                return AuthController::handleResourceRequest($url);
            case 'POST':
                return AuthController::handleCollectionRequest($url);
            default:
        }

        return HttpException::handleException(405, "Method not supported");
    }
}
