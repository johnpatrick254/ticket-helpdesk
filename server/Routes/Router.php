<?php
namespace App\Routes;

class Router
{
    public static function handleResource(string $path, BaseRoute $class)
    {
        $url = array_filter(explode('/', $_SERVER['REQUEST_URI']));
        $targetPath = array_filter(explode('/', $path));
        if ($targetPath[1] === $url[2]) {
            return $class::handleRoute($url);
        }
    }
    public static function withMiddleware(array $middlewares, string $path, BaseRoute $class)
    {
        $url = array_filter(explode('/', $_SERVER['REQUEST_URI']));
        $targetPath = array_filter(explode('/', $path));
        if ($targetPath[1] === $url[2]) {
            foreach ($middlewares as $middleware) {
                $middleware::activate();
            }
            return self::handleResource($path, $class);
        }
    }

}
