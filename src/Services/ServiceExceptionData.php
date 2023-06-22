<?php

namespace App\Services;

use function PHPUnit\Framework\isEmpty;

class ServiceExceptionData
{

    public function __construct(protected int $statusCode, protected string $type, protected string $msg = "")
    {
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function toArray(): array
    {
        return [
            'type' => $this->type,
            'message' => isEmpty($this->msg)?$this->type:$this->msg 
        ];
    }
}