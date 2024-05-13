<?php
use App\Config\Database;
use App\Middlewares\AuthMiddleware;
use App\Routes\ResponseRoute;
use App\Routes\Router;
use App\Routes\TicketRoute;
use App\Routes\AuthRoute;

require 'vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

Database::getDatabaseInstance();

Router::handleResource('/auth', new AuthRoute);
Router::withMiddleware([AuthMiddleware::class], '/tickets', new TicketRoute);
Router::withMiddleware([AuthMiddleware::class], '/responses', new ResponseRoute);