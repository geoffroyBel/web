<?php
namespace App\Modifier;

use App\Entity\Abonnement;


class Mensuel implements AbonnementModifierInterface {
    public function modify(Abonnement $abonnement , mixed $value = null): mixed{
        $date = new \DateTime('now');
        $date->modify('+1 month');
        return [$abonnement->getCredits(), $date];
    }
}