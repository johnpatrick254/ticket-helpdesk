<?php

namespace App\Controllers;

abstract class BaseController {
    abstract static function handleResourceRequest(array $url);
    abstract static function handleCollectionRequest(array $url);
}