<?php

namespace App\Controller;

use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;
use App\Security\UserConfirmationService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;


#[AsController]
class ConfirmationCodeAction extends AbstractController
{
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var UserPasswordHasherInterface
     */
    private $userPasswordEncoder;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var JWTTokenManagerInterface
     */
    private $tokenManager;

    /**
     * ResetPasswordAction constructor.
     * @param ValidatorInterface $validator
     * @param UserPasswordHasherInterface $userPasswordEncoder
     * @param EntityManagerInterface $entityManager
     * @param JWTTokenManagerInterface $tokenManager
     */
    public function __construct(
        ValidatorInterface $validator,
        private UserConfirmationService $userConfirmationService

    )
    {

        $this->validator = $validator;

    }
    public function __invoke(User $data)
    {
        $errors = $this->validator->validate($data, null, ['put-confirmation-code']);

        if (count($errors) > 0) {
            throw new ValidationException($errors);
        }
        $this->userConfirmationService->confirmUserCode($data->getId(), $data->getRetypedConfirmationCode());
        return $data;
        //return new JsonResponse($data->isEnabled());
        // $errors = $this->validator->validate($data, null, ['put-reset-password']);
 
        // if (count($errors) > 0) {
        //     throw new ValidationException($errors);
        // }
        //return new JsonResponse($data->getUsername());
       
        // $violations = $this->validator->validate($data, null, ['put-reset-password']);

        // if (count($violations) > 0) {
        //     $errors = array();
        //     foreach ($violations as $error) {

        //         $errors[$error->getPropertyPath()] = $error->getMessage();
        //     }
        //     $data = [
        //         'type' => 'validation_error',
        //         'title' => 'There was a validation error',
        //         'errors' => $errors
        //     ];
        //     return new JsonResponse($data, 400);

        // } 
        //else {
        //     $data->setPassword(
        //         $this->userPasswordEncoder->hashPassword(
        //             $data, $data->getNewPassword()
        //         )
        //     );
        //     // After password change, old tokens are still valid
        //     //$data->setPasswordChangedDate(time());

        //     $this->entityManager->flush();

        //     $token = $this->tokenManager->create($data);

        //     return new JsonResponse(['token' => $token]);
        // }

    }


}