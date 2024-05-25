<?php
use App\Config\Database;
use App\Middlewares\AuthMiddleware;
use App\Routes\HealthRoute;
use App\Routes\ResponseRoute;
use App\Routes\Router;
use App\Routes\TicketRoute;
use App\Routes\AuthRoute;

require 'vendor/autoload.php';

header('Access-Control-Allow-Origin: *'); // Replace * with the origin you want to allow
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    header('Access-Control-Allow-Methods: POST,PUT,GET,DELETE,OPTIONS'); // Add any other methods your server supports
    header('Access-Control-Allow-Headers: Content-Type,Authorization'); // Add any other headers your server expects
    exit;
}

Database::getDatabaseInstance();
Router::handleResource('/health', new HealthRoute);
Router::handleResource('/auth', new AuthRoute);
Router::withMiddleware([AuthMiddleware::class], '/tickets', new TicketRoute);
Router::withMiddleware([AuthMiddleware::class], '/responses', new ResponseRoute);