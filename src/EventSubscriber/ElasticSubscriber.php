<?php
// src/EventListener/DatabaseActivitySubscriber.php
namespace App\EventSubscriber;

use App\Entity\Prestation;
use Doctrine\Bundle\DoctrineBundle\EventSubscriber\EventSubscriberInterface;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use JoliCode\Elastically\Messenger\IndexationRequest;
use JoliCode\Elastically\Messenger\IndexationRequestHandler;
use Symfony\Component\Messenger\MessageBusInterface;

class ElasticSubscriber implements EventSubscriberInterface
{
    /**
     * @var MessageBusInterface
     */
    private $bus;
    public function __construct( MessageBusInterface $bus )
    {
        $this->bus = $bus;
    }
    // this method can only return the event names; you cannot define a
    // custom method name to execute when each event triggers
    public function getSubscribedEvents(): array
    {
        return [
            Events::postPersist,
            Events::postRemove,
            Events::postUpdate,
        ];
    }

    // callback methods must be called exactly like the events they listen to;
    // they receive an argument of type LifecycleEventArgs, which gives you access
    // to both the entity object of the event and the entity manager itself
    public function postPersist(LifecycleEventArgs $args): void
    {
        /** @var Prestation  */
        $entity = $args->getObject();

        if(! $entity instanceof Prestation) {
            return;
        }
        
        $this->bus->dispatch(new IndexationRequest(\App\Model\Prestation::class, $entity->getId() ) );
    }

    public function postRemove(LifecycleEventArgs $args): void
    {
        /** @var Prestation  */
        $entity = $args->getObject();

        if(! $entity instanceof Prestation) {
            return;
        }
        $this->bus->dispatch(new IndexationRequest(\App\Model\Prestation::class, $entity->getId(), IndexationRequestHandler::OP_DELETE ) );       
    }

    public function postUpdate(LifecycleEventArgs $args): void
    {
         /** @var Prestation  */
         $entity = $args->getObject();

         if(! $entity instanceof Prestation) {
             return;
         }
         $this->bus->dispatch(new IndexationRequest(\App\Model\Prestation::class, $entity->getId(), IndexationRequestHandler::OP_UPDATE ) );         
    }
}