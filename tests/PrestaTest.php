<?php

namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class PrestaTest extends ApiTestCase
{
    private HttpClientInterface $client;
    private EntityManagerInterface $em;
    private User $user_admin;
    private User $user_company;

    protected function setUp(): void
    {
        $this->client = $this->createClient();
        $this->em = $this->client->getContainer()->get('doctrine')->getManager();


/*
        [
            'username' => 'john_doe',
            'email' => 'john@blog.com',
            'name' => 'John Doe',
            'password' => 'Secret123#',
            'roles' => [User::ROLE_ADMIN],
            'enabled' => true
        ],
*/
   
    }
    private function getSigninToken($role): string {

        $json = [];
        switch($role) {
            case "ROLE_COMPANY":
                $json = [
                    'username' => 'company',
                    'password' => 'Secret123#'
                ];
            break;
            case "ROLE_ADMIN":
                $json = [
                    'username' => 'admin',
                    'password' => 'Secret123#'
                ];
            break;
            case "ROLE_USER":
                $json = [
                    'username' => 'user',
                    'password' => 'Secret123#'
                ];
            break;
        }
        $response = static::createClient()->request('POST', '/api/login_check', [
            'json' =>  $json 
            ]);
        return $response->toArray()['token'];
    }
        /**
     * Use other credentials if needed.
     */
    protected function getPrestation($token): array
    {
        if(!$token) {
            $token = $this->getSigninToken("ROLE_USER");
        }
        $body = [
                'name' => 'ffffffff',
                'created' => "1999-10-10 09:09:06"
        ];
        $response = static::createClient()
            ->request(
                'POST',
                 '/api/prestations',
                  [
                    'json' => $body,
                    'auth_bearer' => $token,
                  ]
            );

        $this->assertResponseIsSuccessful();

        return $response->toArray();
    }
    public function testSignin(): string {
       $response = static::createClient()->request('POST', '/api/login_check', [
            'json' => [
                'username' => 'company',
                'password' => 'Secret123#'
            ]
            ]);

        $this->assertResponseStatusCodeSame(200);
        $this->assertNotEmpty($response->toArray()['token']);
        return $response->toArray()['token'];
    }

    public function testGetCollection(): void
    {
    

     $response = static::createClient()->request('GET', '/api/prestations');
        $this->assertResponseIsSuccessful();
      //  $this->assertCount(10, $response->toArray()['hydra:member']);
    //    $this->assertJsonContains(['@id' => '/']);
    }

    public function testCreatePrestation(): void {
        $token = $this->getSigninToken("ROLE_COMPANY");
        static::createClient()->request('POST', '/api/prestations', [
            'auth_bearer' => $token,
            'json' => [
                'name' => 'ffffffff',
                'created' => "1999-10-10 09:09:06"
            ]
            ]);
        $this->assertResponseStatusCodeSame(201);
    }
    public function testCreatePrestationByNonAuthCompanyUser(): void {
        $token = $this->getSigninToken("ROLE_USER");
        $response = static::createClient()->request('POST', '/api/prestations', [
            'auth_bearer' => $token,
            'json' => [
                'name' => 'ffffffff',
                'created' => "1999-10-10 09:09:06"
            ]
            ]);
            $this->assertJsonContains(['hydra:description' => 'Access Denied.']);
    }
    public function testUpdatePrestation(): void {
        $token = $this->getSigninToken("ROLE_COMPANY");
        $prestation = $this->getPrestation($token);
        static::createClient()->request('PUT', '/api/prestations/'. $prestation["id"], [
            'auth_bearer' => $token,
            'json' => [
                'name' => 'geoff'
            ]
            ]);
        $this->assertResponseIsSuccessful();

    }
    public function testSubscribePrestation(): void {
        $token = $this->getSigninToken("ROLE_COMPANY");
        static::createClient()->request('POST', '/api/abonnements', [
            'auth_bearer' => $token,
            'json' => [
                "paymentStatus"=> "string",
                "prestation" => "/api/prestations/1",
                'tarif' => '/api/tarifs/1',
                "expireAt"=> "2023-05-08T19:43:34.910Z",
                "user"=> "/api/users/1",
            ]
            ]);

        $this->assertResponseStatusCodeSame(201);
    }

    public function testStripeHook(): void {

        static::createClient()->request('POST', '/api/stripe/hook', [
            'json' => [
                "data" => [
                    "object"=> [
                        "id" => "cs_test_a1gmZf79fE5LzZQaMxw45u0XTCesnXS5vokXO5K3oKVHvUOF7pVty96MW2"
                    ]
                    ],
                "type"=> "checkout.session.completed"
            ]
            ]);
            
        $this->assertResponseStatusCodeSame(202);
    }
}
