<?php

namespace App\Routes;


class HealthRoute extends BaseRoute
{
    public static function handleRoute(array $url)
    {
        http_response_code(200);
        echo json_encode(['status' => 'ok']);
    }
}
