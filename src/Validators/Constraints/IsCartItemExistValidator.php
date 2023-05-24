<?php


namespace App\Validators\Constraints;

use App\Entity\CartItem;
use App\Entity\Command;
use App\Entity\User;
use App\Repository\CartItemRepository;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;


class IsCartItemExistValidator extends ConstraintValidator
{
    public $message = 'item already added to cart';
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;


    public function __construct(TokenStorageInterface $tokenStorage, private CartItemRepository $cartItemRepository)
    {
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @inheritDoc
     */
    public function validate($value, Constraint $constraint)
    {
        if (null === $value || '' === $value) {
            return;
        }
        if (!$constraint instanceof IsCartItemExist) {
            return;
        }
        if (!$value instanceof CartItem) {
            return;
        }
        // $token = $this->tokenStorage->getToken();
        // /** @var User $user */
        // $user = $token->getUser();
        // var_dump($value->getPrestation()->toArray());
$items = $this->cartItemRepository->findOneBy([
    "prestation"=> $value->getPrestation()->getId(),
    "cart" => $value->getCart()->getId()

    ]);

        if ($items) {
            $this->context->buildViolation($constraint->message)
                ->atPath('cart_items')
                ->addViolation();
        }
    }
}