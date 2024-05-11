<?php

namespace App\DTO\Auth;

use App\DTO\BaseDTO;
use App\Utils\HttpException;

class RegisterDTO extends BaseDTO
{
    private array $data;
    private array $fields = ['email', 'first_name', 'last_name', 'role', 'password', 'password_confirm'];
    public function __construct(array $data)
    {
        ;
        $this->data = $data;
    }
    public function validate()
    {
        $validatedData = [];
        $errors = [];
        foreach ($this->fields as $field) {
            if ($field === 'email' || $field === 'first_name' || $field === 'last_name') {
                if (!isset($this->data[$field])) {
                    $errors[$field] = "$field must be not be null";
                }
                if (!is_string($this->data[$field])) {
                    $errors[$field] = "$field must be of type string";
                }

                $validatedData[$field] = $this->data[$field];
            }
            if ($field === 'role') {
                if (!isset($this->data[$field])) {
                    $errors[$field] = "$field must be not be null";
                }
                if ($this->data[$field] !== 'user'&& $this->data[$field] !== 'support') {
                    $errors[$field] = "$field must be either user or support";
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
                    $errors[$field] = "$field must have at least  4 characters";
                }
                $validatedData[$field] = $this->data[$field];
            }
            if ($field === 'password_confirm') {
                if ($this->data[$field] !== $this->data['password']) {
                    $errors[$field] = "Passwords do not match";
                }
            }
        }
        if (count($errors) > 0) {
            return HttpException::handleException(400, $errors);
        }
        return $validatedData;
    }
}
