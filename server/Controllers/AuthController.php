<?php
namespace App\Controllers;

use App\DTO\Auth\LoginDTO;
use App\DTO\Auth\RegisterDTO;
use App\Models\UserModel;
use App\Utils\HttpException;
use App\Utils\JWT;

class AuthController extends BaseController
{
    public static function handleCollectionRequest(array $url)
    {
        $data = (array) json_decode(file_get_contents('php://input'));
        if (isset($url[3]) && ($url[3] === 'login') && count($url) < 4) {
            return self::handleSignIn($data);
        }
        if (isset($url[3]) && ($url[3] === 'register') && count($url) < 4) {
            return self::handleSignUp($data);
        }
        return HttpException::handleException(404, 'Not Found');
    }

    public static function handleResourceRequest(array $url)
    {
        if (isset($url[3]) && ($url[3] === 'verify') && count($url) < 4) {
            return self::withMiddleware(['AuthMiddleware'], [self::class, 'handleVerifySignIn']);
        }
        return HttpException::handleException(404, 'Not Found');
    }
    public static function handleSignIn(array $data)
    {
        $loginDTO = new LoginDTO($data);
        $validatedData = $loginDTO->validate();
        $user = UserModel::findUser($validatedData['email']);
        if ($user && $user['password'] === $validatedData['password']) {
            unset($user['password']);
            echo json_encode(['token' => JWT::encode($user)]);
        } else {
            return HttpException::handleException(401, 'email or password is incorrect');
        }

    }
    public static function handleVerifySignIn()
    {
        echo json_encode(['status' => 'token verified']);
    }
    public static function handleSignUp(array $data)
    {
        $registerDTO = new RegisterDTO($data);
        $validatedData = $registerDTO->validate();
        $user = new UserModel($validatedData['first_name'], $validatedData['last_name'], $validatedData['email'], $validatedData['password'], $validatedData['role']);
        $user->save();
        http_response_code(201);
    }
}