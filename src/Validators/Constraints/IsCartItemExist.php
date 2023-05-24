<?php
namespace App\Validators\Constraints;


use Symfony\Component\Validator\Constraint;

#[\Attribute]
class IsCartItemExist extends Constraint
{
    public $message = 'item already added to cart';

    public function validatedBy()
    {
        return get_class($this) . 'Validator';
    }

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
