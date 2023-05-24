<?php
namespace App\Modifier;

use App\Entity\Abonnement;
use App\Modifier\AbonnementModifierInterface;


class Annuel implements AbonnementModifierInterface {
    public function modify(Abonnement $abonnement, mixed $value = null ): mixed {
        $date = new \DateTime('now');
        $date->modify('+12 month');
        return [$abonnement->getCredits(), $date];
    }
}