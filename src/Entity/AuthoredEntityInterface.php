<?php


namespace App\Entity;




interface AuthoredEntityInterface
{
    public function setOwner(User $user): AuthoredEntityInterface;
}