<?php
namespace App\Tests\unit;

use App\Entity\Abonnement;
use App\Entity\Prestation;
use App\Entity\Tarif;
use App\Filter\AbonnementFilter;
use App\Services\Filter;
use App\Services\StripeService;
use App\Tests\ServiceTestCase;

class AbonnementFilterTest extends ServiceTestCase
{
    /** @test */
    public function abonnement_filter_is_applied_correctly ()
    {
        $prestation = new Prestation();
        $prestation->setName("test");

        $tarif = new Tarif();
        $tarif->setType("forfait");
        $tarif->setCredits(5);

        $abonnement = new Abonnement();
        $abonnement->setPrestation($prestation);
        $abonnement->setTarif($tarif);
       
        // $abonnement->setExpireAt( date_create_immutable("2023-06-01 00:00:00") );
        $abonnement->setCredits(5);

        $FilterCredit = $this->container->get(AbonnementFilter::class);
        $FilterCredit->apply($abonnement, $tarif);
      
        $this->assertSame(10, $abonnement->getCredits());
        // return $abonnement;
    
    }
}