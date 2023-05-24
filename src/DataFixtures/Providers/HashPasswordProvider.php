<?php

namespace App\DataFixtures\Providers;

use App\Entity\User;
// use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
class HashPasswordProvider
{
    /**
     * @var UserPasswordHasherInterface
     */
    private $encoder;
    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function hashPassword(string $plainPassword): string
    {
        return $this->encoder->hashPassword(new User(), $plainPassword);
        //return $this->encoder->encodePassword(new User(), $plainPassword);
    }

    public function randomTarif(): string
    {
        $tarifs= ["annuel", "mensuel", "forfait"];
        $tarif = $tarifs[rand(0, count($tarifs)-1)];
        return $tarif;
        //return $this->encoder->encodePassword(new User(), $plainPassword);
    }

}