<?php
namespace App\Utils;

require_once dirname(__DIR__) . "/Config/config.php";
use Firebase\JWT\Key;

class JWT
{
    private static string $key = JWT_KEY;

    public static function encode(array $payload)
    {
        return \Firebase\JWT\JWT::encode(['exp' => time() + (60 * 60 * 24), ...$payload], self::$key, 'HS256');
    }
    public static function decode(string $jwt)
    {
        return \Firebase\JWT\JWT::decode($jwt, new Key(self::$key, 'HS256'));
    }
}