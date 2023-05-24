<?php
namespace App\Modifier;

use App\Entity\Abonnement;

use App\Modifier\AbonnementModifierInterface;


class Forfait implements AbonnementModifierInterface {
    public function modify(Abonnement $abonnement, mixed $credits = null): mixed
     {
   
        $initial_credits = $abonnement->getCredits() ?? 0;
      

        if($credits > 0) {
            $initial_credits += $credits;
        } 
        return [$initial_credits, $abonnement->getExpireAt()] ;
    }
}

