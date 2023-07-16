<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\AuthoredEntityInterface;
use App\Entity\Prestation;
use App\Entity\Tarif;
use App\Entity\User;
use App\Interface\CompanyInterface;
use App\Services\StripeService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CreateTarifSubscriber implements EventSubscriberInterface
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
        return [KernelEvents::VIEW => ["setTarif", EventPriorities::PRE_WRITE]];
    }

    public function setTarif(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if((!$entity instanceof Tarif) || $method !== Request::METHOD_POST){
            return;
        }
        /** @var User $user */
        $user = $this->tokenStorage->getToken()->getUser();

        $productId = $entity->getPrestation()->getProductID();
        $accountId = $user->getCompany()->getAccountID();

        $price = $this->stripe->createPrice($productId, $accountId, $entity->getType(), $entity->getPrice());
        $entity->setPriceId($price->id);
    }
}