<?php

namespace App\Routes;

abstract class BaseRoute
{
    public static function handleRoute(array $url)
    {
    }
    abstract static function handleResourceRequest(array $url);
    abstract static function handleCollectionRequest(array $url);
}
