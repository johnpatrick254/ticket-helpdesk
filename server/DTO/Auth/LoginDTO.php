<?php

namespace App\DTO\Auth;

use App\DTO\BaseDTO;
use App\Utils\HttpException;

class LoginDTO extends BaseDTO
{
    private array $data;
    private array $fields = ['email', 'password'];
    public function __construct(array $data)
    {;
        $this->data = $data;
    }
    public function validate()
    {
        $validatedData = [];
        $errors = [];
        foreach ($this->fields as $field) {
            if ($field === 'email') {
                if (!isset($this->data[$field])) {
                    $errors[$field] = "$field must be not be null";
                }
                if (!is_string($this->data[$field])) {
                    $errors[$field] = "$field must be of type string";
                }
                
                $validatedData[$field] = $this->data[$field];
            }
            if ($field === 'password') {
                if (!isset($this->data[$field])) {
                    $errors[$field] = "$field must be not be null";
                }
                if (!is_string($this->data[$field])) {
                    $errors[$field] = "$field must be of type string";
                }
                if (strlen($this->data[$field]) < 4) {
                 $errors[$field] = "$field must be longer than 4 characters";
                }
                $validatedData[$field] = $this->data[$field];
            }
        }
        if (count($errors) > 0) {
            return HttpException::handleException(400, $errors);
        }
        return $validatedData;
    }
}
