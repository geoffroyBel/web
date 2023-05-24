<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Abonnement;
use App\Entity\AuthoredEntityInterface;
use App\Entity\Prestation;
use App\Entity\User;
use App\Entity\Tarif;
use App\Filter\AbonnementFilterInterface;
use App\Interface\CommandInterface;
use App\Interface\CompanyInterface;
use App\Services\StripeService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CreateAbonnementSubscriber implements EventSubscriberInterface
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
        return [KernelEvents::VIEW => ["setCheckoutSession", EventPriorities::PRE_WRITE]];
    }

    public function setCheckoutSession(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if((!$entity instanceof Abonnement) || $method !== Request::METHOD_POST){
            return;
        }
        /** @var User $user */
        $user = $this->tokenStorage->getToken()->getUser();
        /** @var Tarif $tarif */
        $tarif = $entity->getTarif();
        /** @var Prestation $prestation */
        $prestation = $tarif->getPrestation();

        $session = $this->stripe->createSession($prestation, $tarif, 1);

        $entity->setCheckoutSessionId($session->id);
        $entity->setUser($user);
        $entity->setPaymentStatus("pending");


    }
}