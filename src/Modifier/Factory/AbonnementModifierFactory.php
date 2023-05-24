<?php
namespace App\Modifier\Factory;


use Symfony\Component\VarExporter\Exception\ClassNotFoundException;

class AbonnementModifierFactory implements AbonnementModifierFactoryInterface
{
   
    public function create(string $modifierType)
    {
        $modifierClassBasename = str_replace("_", '', ucwords($modifierType, '_'));
        $modifier = self::MODIFIER_NAMSPACE . $modifierClassBasename;
       
        if(!class_exists($modifier)) {
            throw new ClassNotFoundException($modifier);
        }
        return new $modifier();
    }
}