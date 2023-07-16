<?php
namespace App\Validators\Constraints;


use Symfony\Component\Validator\Constraint;

#[\Attribute]
class HasAbonnement extends Constraint
{
    public $message = 'Vous devez avoir un abonnement valide';

    public function validatedBy()
    {
        return get_class($this) . 'Validator';
    }

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
