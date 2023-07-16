<?php


namespace App\Validators\Constraints;


use App\Entity\Abonnement;
use App\Entity\Reservation;
use App\Entity\User;
use App\Repository\CartItemRepository;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;


class HasAbonnementValidator extends ConstraintValidator
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
        if (!$constraint instanceof hasAbonnement) {
            return;
        }
        if (!$value instanceof Reservation) {
            return;
        }
         $token = $this->tokenStorage->getToken();
         /** @var User $user */
         $user = $token->getUser();
         /** @var Abonnement $abt */
         $abts = $user->getAbonnements()->filter(function($element)use ($value) {
            return $element->getPrestation()->getId() == $value->getPrestation()->getId() && $element->getPaymentStatus() === "success";
        });
        $hasCredits = $abts->filter(function($element) {
           return $element->getCredits() && $element->getCredits() > 0;
        });
        $hasDateRange = $abts->filter(function( Abonnement $element)use ($value) {
            return $element->getExpireAt() > $value->getEndTime();
         });

        
        switch($value->getAbonnement()->getTarif()->getType()) {
            case "forfait":
                $valid = count($hasCredits) ? true: false;
                break;
            case "mensuel":
            case "annuel":
                $valid = count($hasDateRange) ? true: false;
                break;
        }

        if($valid) {
            return;
        }

        $this->context->buildViolation($constraint->message)
        ->atPath('reservation')
        ->addViolation();
        // var_dump($value->getPrestation()->toArray());
// $items = $this->cartItemRepository->findOneBy([
//     "prestation"=> $value->getPrestation()->getId(),
//     "cart" => $value->getCart()->getId()
//     ]);
// $abts->filter(function($element)use ($value) {
//     return $element->getPrestation()->getId() == $value->getPrestation()->getId();
// });

// array_filter($abts, function($k) {
//     return $k->getPrestation()->getId() == $value->getPrestation()->getId();
// }, ARRAY_FILTER_USE_KEY);

        //dd($abts);
        // $this->context->buildViolation($constraint->message)
        // ->atPath('reservation')
        // ->addViolation();
        // if ($items) {
        //     $this->context->buildViolation($constraint->message)
        //         ->atPath('cart_items')
        //         ->addViolation();
        // }
    }
}