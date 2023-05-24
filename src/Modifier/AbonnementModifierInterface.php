<?php
namespace App\Modifier;

use App\Entity\Abonnement;
use App\Entity\Tarif;
interface AbonnementModifierInterface
{
    public function modify(Abonnement $abonnement , mixed $credits = null): mixed;
}