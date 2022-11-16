<?php


namespace App\Security;


use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException as ExceptionUserNotFoundException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class UserConfirmationService
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var EntityManagerInterface
     */
    private $manager;

    public function __construct(UserRepository $userRepository, EntityManagerInterface $manager)
    {
        $this->userRepository = $userRepository;
        $this->manager = $manager;
    }

    public function confirmUser($token) {
        /**
         * @var User $user
         */
        $user = $this->userRepository->findOneBy(["confirmationToken" => $token]);

       if (!$user) {
           throw new ExceptionUserNotFoundException();
       }

       $user->setEnabled(true);
       $user->setConfirmationToken(null);
       $this->manager->flush();

    }

    public function confirmUserCode($userId, $code) {
        /**
         * @var User $user
         */
        $user = $this->userRepository->findOneBy(["id"=> $userId,"confirmationCode" => $code]);

       if (!$user) {
           throw new ExceptionUserNotFoundException();
       }

       $user->setEnabled(true);
       $user->setConfirmationCode(null);
       $this->manager->flush();

    }
}