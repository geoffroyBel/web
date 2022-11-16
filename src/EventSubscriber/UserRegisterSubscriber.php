<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\Mailer\Mailer;
use App\Security\ConfirmationCodeGenerator;
use App\Security\TokenGenerator;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UserRegisterSubscriber implements EventSubscriberInterface
{


    /**
     * @var UserPasswordHasherInterface
     */
    private $passwordHasher;

    private $tokenGenerator;
    /**
     * @var Mailer
     */
    private $mailer;
    /**
     *  @var ConfirmationCodeGenerator
     */
    private $confirmationCodeGenerator;


    public function __construct(
        UserPasswordHasherInterface $passwordHasher,
        Mailer $mailer,
        TokenGenerator $tokenGenerator,
        ConfirmationCodeGenerator $confirmationCodeGenerator
        )
    {

        $this->passwordHasher = $passwordHasher;
        $this->mailer = $mailer;
        $this->tokenGenerator = $tokenGenerator;
        $this->confirmationCodeGenerator = $confirmationCodeGenerator;

    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW=> ["userRegistered", EventPriorities::PRE_WRITE]
        ];
    }
    public function userRegistered(ViewEvent $event) {

        $entity = $event->getControllerResult();
        $methods = $event->getRequest()->getMethod();

        if (!$entity instanceof User || !in_array($methods, [Request::METHOD_POST]) ) {
            return;
        }
        $entity->setPassword($this->passwordHasher->hashPassword($entity, $entity->getPassword()));
        $entity->setConfirmationToken($this->tokenGenerator->getRandomSecureToken());
        $entity->setConfirmationCode($this->confirmationCodeGenerator->getRandomConfirmationCode());
        $this->mailer->sendConfirmationUser($entity);
    }
}