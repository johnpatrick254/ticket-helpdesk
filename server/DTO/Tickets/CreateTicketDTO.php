<?php

namespace App\DTO\Tickets;

use App\DTO\BaseDTO;
use App\Utils\HttpException;

class CreateTicketDTO extends BaseDTO
{
    private array $data;
    private array $fields = ['title', 'body', 'user_id', 'priority'];
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
            if ($field === 'title' || $field === 'body' ) {
                if (!isset($this->data[$field])) {
                    $errors[$field] = "$field must be not be null";
                }
                if (!is_string($this->data[$field])) {
                    $errors[$field] = "$field must be of type string";
                }
                $validatedData[$field] = $this->data[$field];
            }
            if ( $field === 'user_id') {
                if (!isset($this->data[$field])) {
                    $errors[$field] = "$field must be not be null";
                }
                if (!is_int($this->data[$field])) {
                    $errors[$field] = "$field must be of type number";
                }
                $validatedData[$field] = $this->data[$field];
            }

            if ($field === 'priority') {
                if ($this->data[$field] !== 'low' && $this->data[$field] !== 'high' && $this->data[$field] !== 'completed') {
                    $errors[$field] = "$field must be either low,high or completed";
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
