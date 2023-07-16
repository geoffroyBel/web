<?php
namespace App\tests\unit;

use App\Entity\Abonnement;
use App\Entity\Prestation;
use App\Entity\Tarif;
use App\Modifier\Annuel;
use App\Modifier\Forfait;
use App\Modifier\Mensuel;
use App\Tests\ServiceTestCase;

class AbonnementModifiersTest extends ServiceTestCase
{
    /** @test month subscription */
    public function monthly_subscribe_return_correct_date()
    {
        $prestation = new Prestation();
        $prestation->setName("test");

        $tarif = new Tarif();
        $tarif->setType("Mensuel");
        $tarif->setCredits(0);

        $abonnement = new Abonnement();
        $abonnement->setPrestation($prestation);
        $abonnement->setTarif($tarif);

        $modifierExpireDate = new Mensuel();
        [$credits, $expireAt] = $modifierExpireDate->modify($abonnement, $tarif);
        
        $this->assertGreaterThanOrEqual(30, $expireAt->diff(new \DateTime("now"))->days);
        $this->assertSame(null, $credits);
    }

        /** @test year subscription */
        public function annualy_subscribe_return_correct_date()
        {
            $prestation = new Prestation();
            $prestation->setName("test");
    
            $tarif = new Tarif();
            $tarif->setType("Mensuel");
            $tarif->setCredits(0);
    
            $abonnement = new Abonnement();
            $abonnement->setPrestation($prestation);
            $abonnement->setTarif($tarif);
    
            $modifierExpireDate = new Annuel();
            [$credits, $expireAt] = $modifierExpireDate->modify($abonnement, $tarif);
            
            $this->assertGreaterThanOrEqual(360, $expireAt->diff(new \DateTime("now"))->days);
            $this->assertSame(null, $credits);
        }
        /** @test forfait subscription */
        public function forfait_subscribe_return_correct_date()
        {
            $prestation = new Prestation();
            $prestation->setName("test");
    
            $tarif = new Tarif();
            $tarif->setType("forfait");
            $tarif->setCredits(0);
    
            $abonnement = new Abonnement();
            $abonnement->setPrestation($prestation);
            $abonnement->setTarif($tarif);
    
            $modifierExpireDate = new Forfait();
            [$credits, $expireAt] = $modifierExpireDate->modify($abonnement, 5);
           
            $this->assertSame(5, $credits);
            $this->assertSame(null, $expireAt);
        }

                /** @test year subscription */
                public function monthly_subscribe_with_credits_return_correct_date()
                {
                    $prestation = new Prestation();
                    $prestation->setName("test");
            
                    $tarif = new Tarif();
                    $tarif->setType("Mensuel");
                    $tarif->setCredits(0);
            
                    $abonnement = new Abonnement();
                    $abonnement->setPrestation($prestation);
                    $abonnement->setTarif($tarif);
                    $abonnement->setCredits(5);
            
                    $modifierExpireDate = new Annuel();
                    [$credits, $expireAt] = $modifierExpireDate->modify($abonnement, $tarif);
                    
                    $this->assertGreaterThanOrEqual(360, $expireAt->diff(new \DateTime("now"))->days);
                    $this->assertSame(5, $credits);
                }
        
}