<?php
namespace App\Validators\Constraints;


use Symfony\Component\Validator\Constraint;


//  #[\Attribute]
class IsPrestationExist extends Constraint
{
    public $message = 'Prestation not existing in db';

    public function validatedBy()
    {
        return get_class($this) . 'Validator';
    }

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}