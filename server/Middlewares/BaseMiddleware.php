<?php
namespace App\Middlewares;

abstract class BaseMiddleware
{
    abstract static function activate();
}