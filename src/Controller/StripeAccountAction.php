<?php

namespace App\Controller;

use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use App\Entity\Company;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;
use App\Security\UserConfirmationService;
use App\Services\StripeService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use PhpParser\Node\Stmt\TryCatch;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;


#[AsController]
class StripeAccountAction extends AbstractController
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
        protected StripeService $stripeService

    )
    {

        $this->validator = $validator;

    }
    public function __invoke(Company $data)
    {
        $errors = $this->validator->validate($data, null, ['put-stripe-account']);

        if (count($errors) > 0) {
            throw new ValidationException($errors);
        }
        try {
            $account_stripe = $this->stripeService->createAccount($data);
            $account_link = $this->stripeService->createAccountLink($account_stripe);
            
            $data->setAccountID($account_stripe->id);
            $data->setAccountLink($account_link->url);

            return $data;
        } catch(\Exception $error) {
            return new JsonResponse(["error"=> $error->getMessage() . "stripe stuff"], 500);
        }

        return $data;

    }


}