<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Prestation;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
class CreatedDateEntitySubscriber implements EventSubscriberInterface
{
    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [KernelEvents::VIEW => ["setPublished", EventPriorities::PRE_WRITE]];
    }

    public function setPublished(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if((!$entity instanceof Prestation) || $method !== Request::METHOD_POST){
            return;
        }

        $entity->setCreated(new \DateTime());
    }
}