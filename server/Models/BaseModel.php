<?php
namespace App\Models;

abstract class BaseModel
{
    public int $id;
    abstract function save();
}