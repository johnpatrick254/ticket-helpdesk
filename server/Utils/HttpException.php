<?php

namespace App\Utils;

class HttpException
{

    public static function handleException(int $code, string $message)
    {
        http_response_code($code);
        return print(json_encode(["error" => $message]));
    }
}
