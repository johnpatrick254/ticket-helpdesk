<?php

namespace App\Controllers;

use App\Utils\HttpException;

abstract class BaseController
{
    abstract static function handleResourceRequest(array $url);
    abstract static function handleCollectionRequest(array $url);
    public static function withMiddleware(array $middlewares, callable $next, $data = null)
    {
        foreach ($middlewares as $middleware) {
            $middlewareClass = "\\App\\Middlewares\\$middleware";
            if (class_exists($middlewareClass)) {
                $middlewareClass::activate();
            } else {
                return HttpException::handleException(501, "middleware $middleware does not exist");
            }
        }
        return $next($data);
    }
}