<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Prestation;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class AuthoredEntitySubscriber implements EventSubscriberInterface
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * AuthoredEntitySubscriber constructor.
     */
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }


    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [KernelEvents::VIEW => ["setUser", EventPriorities::PRE_WRITE]];
    }

    public function setUser(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if((!$entity instanceof Prestation) || $method !== Request::METHOD_POST){
            return;
        }
        $user = $this->tokenStorage->getToken()->getUser();
        $entity->setOwner($user);
    }
}