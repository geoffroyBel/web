<?php
namespace App\EventListener;

use App\Entity\User;
use App\Security\MercureTokenGenerator;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use JoliCode\Elastically\Messenger\IndexationRequest;
use JoliCode\Elastically\Messenger\IndexationRequestHandler;


class AuthenticationSuccessListener
{
    private $mercureTokenGenerator;
    public function __construct(MercureTokenGenerator $mercureTokenGenerator)
    {
        $this->mercureTokenGenerator = $mercureTokenGenerator;
    }

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof User) {
            return;
        }

        $data['id'] = $user->getId();
        //$this->mercureTokenGenerator->generate();
        $data['mercure_token'] = $this->mercureTokenGenerator->generate();

        $event->setData($data);
    }
}