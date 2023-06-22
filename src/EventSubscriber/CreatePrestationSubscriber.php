<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\AuthoredEntityInterface;
use App\Entity\Prestation;
use App\Entity\User;
use App\Interface\CompanyInterface;
use App\Services\StripeService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CreatePrestationSubscriber implements EventSubscriberInterface
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * AuthoredEntitySubscriber constructor.
     */
    public function __construct(TokenStorageInterface $tokenStorage, private StripeService $stripe)
    {
        $this->tokenStorage = $tokenStorage;
    }


    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [KernelEvents::VIEW => ["setCompany", EventPriorities::PRE_WRITE]];
    }

    public function setCompany(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if((!$entity instanceof CompanyInterface) || $method !== Request::METHOD_POST){
            return;
        }
        /** @var User $user */
        $user = $this->tokenStorage->getToken()->getUser();
        $entity->setCompany($user->getCompany());
       
        /** @var Prestation $entity */
        $product = $this->stripe->createProduct($entity->getName(), $user->getCompany()->getAccountID());
        $entity->setProductID($product->id);
    }
}