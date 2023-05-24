<?php
namespace App\Filter;

use App\Entity\Abonnement;
use App\Entity\Tarif;

interface AbonnementFilterInterface
{
    public function apply(Abonnement $subscription, Tarif $tarif): Abonnement;
}