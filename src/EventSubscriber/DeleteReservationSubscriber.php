<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Abonnement;
use App\Entity\AuthoredEntityInterface;
use App\Entity\Prestation;
use App\Entity\Reservation;
use App\Entity\Tarif;
use App\Entity\User;
use App\Interface\CompanyInterface;
use App\Services\StripeService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class DeleteReservationSubscriber implements EventSubscriberInterface
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
       
        return [KernelEvents::VIEW => ["setAbonnementForfait", EventPriorities::PRE_WRITE]];
    }

    public function setAbonnementForfait(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if((!$entity instanceof Reservation) && ($method !== Request::METHOD_DELETE || $method !== Request::METHOD_POST )  ){
            return;
        }
     
        /** @var Abonnement $abt */
        $abt = $entity->getAbonnement();
        $type = $abt->getTarif()->getType();
        if ($type == "forfait") {
            $credits = $abt->getCredits();
            $abt->setCredits( $method === Request::METHOD_DELETE ?  $credits + 1: $credits - 1);
        }

    }


}