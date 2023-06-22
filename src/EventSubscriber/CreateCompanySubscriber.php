<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Abonnement;
use App\Entity\AuthoredEntityInterface;
use App\Entity\Company;
use App\Entity\Prestation;
use App\Entity\User;
use App\Entity\Tarif;
use App\Filter\AbonnementFilterInterface;
use App\Interface\CommandInterface;
use App\Interface\CompanyInterface;
use App\Services\ServiceException;
use App\Services\ServiceExceptionData;
use App\Services\StripeService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CreateCompanySubscriber implements EventSubscriberInterface
{


    /**
     * AuthoredEntitySubscriber constructor.
     */
    public function __construct(private StripeService $stripe)
    {
      
    }


    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [KernelEvents::VIEW => ["initStripeAccount", EventPriorities::PRE_WRITE]];
    }

    public function initStripeAccount(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if((!$entity instanceof Company) || $method !== Request::METHOD_POST){
            return;
        }


        try {
            $account_stripe = $this->stripe->createAccount($entity);
            $account_link = $this->stripe->createAccountLink($account_stripe);
            
            $entity->setAccountLink($account_link->url);
            $entity->setAccountID($account_stripe->id);
            $entity->setStatus("initialization");

        } catch(\Exception $error) {
            throw new ServiceException(
                new ServiceExceptionData(500, "Stripe Error", $error->getMessage())
            );
        }

        // $session = $this->stripe->createSession($prestation, $tarif, 1);



    }
}