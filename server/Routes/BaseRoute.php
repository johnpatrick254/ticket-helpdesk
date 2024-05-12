<?php

namespace App\Routes;

abstract class BaseRoute
{
   abstract public static function handleRoute(array $url);
   
}
