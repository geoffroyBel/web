<?php

namespace App\Security;

use DateTimeImmutable;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Builder;

class MercureTokenGenerator {
    /**@var string */
    private $secret;
    public function __construct(string $secret)
    {
        $this->secret = $secret;
    }


    public function generate()
    {    
        $now = new DateTimeImmutable();
        $config = Configuration::forSymmetricSigner(new Sha256(), InMemory::plainText("!!!changememotherfucker!forsecureMe")); 
        
        $token = $config->builder()
            ->withClaim("mercure", ["subscribe" => ["*"], "publish" => ["*"]])
            ->getToken($config->signer(), $config->signingKey());
        return $token->toString();
    }
}
