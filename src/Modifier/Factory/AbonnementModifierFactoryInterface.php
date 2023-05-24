<?php
namespace App\Modifier\Factory;

use App\Modifier\AbonnementModifierInterface;

interface AbonnementModifierFactoryInterface
{
    const MODIFIER_NAMSPACE = "App\Modifier\\";
    public function create(string $modifierType);
}