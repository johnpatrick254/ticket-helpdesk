<?php

namespace App\DTO\Response;

use App\DTO\BaseDTO;
use App\Utils\HttpException;

class CreateResponseDTO extends BaseDTO
{
    private array $data;
    private array $fields = ['content', 'sender_id'];
    public function __construct(array $data)
    {
        $this->data = $data;
    }
    public function validate()
    {
        $validatedData = [];
        $errors = [];
        foreach ($this->fields as $field) {
            if ($field === 'content') {
                if (!isset($this->data[$field])) {
                    $errors[$field] = "$field must be not be null";
                }
                if (!is_string($this->data[$field])) {
                    $errors[$field] = "$field must be of type string";
                }
                $validatedData[$field] = $this->data[$field];
            }

            if ($field === 'sender_id') {
                if (!isset($this->data[$field])) {
                    $errors[$field] = "$field must be not be null";
                }
                if (!is_int($this->data[$field])) {
                    $errors[$field] = "$field must be of type integer";
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
