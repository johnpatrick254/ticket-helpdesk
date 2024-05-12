<?php
use App\Middlewares\AuthMiddleware;
use App\Routes\TicketRoute;
require 'vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');
use App\Routes\AuthRoute;
use App\Routes\Router;
Router::handleResource('/auth',new AuthRoute);
Router::withMiddleware([AuthMiddleware::class],'/tickets',new TicketRoute);