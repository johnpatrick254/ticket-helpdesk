<?php
namespace App\Middlewares;

use App\Utils\HttpException;
use App\Utils\JWT;

class AuthMiddleware extends BaseMiddleware
{
    static function activate()
    {
        $headers = getallheaders();
        if (isset($headers['Authorization']) || isset($headers['authorization'])) {
            $authHeader = explode(" ", $headers['Authorization'] ?? $headers['authorization']);
            if ($authHeader[0] !== 'Bearer' || !isset($authHeader[1])) {
            }
            $token=$authHeader[1];
            try {
                $decoded = JWT::decode($token);
            } catch (\LogicException $e) {
                // errors having to do with environmental setup or malformed JWT Keys
                die(HttpException::handleException(501, $e->getMessage()));
            } catch (\UnexpectedValueException $e) {
                // errors having to do with JWT signature and claims
                die(HttpException::handleException(401, $e->getMessage()));
            }
            $decoded = JWT::decode($token);
        } else {
            die(HttpException::handleException(401, 'please include access token in your request'));
        }
    }
}