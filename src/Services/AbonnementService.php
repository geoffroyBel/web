<?php
namespace App\Services;

use App\Entity\Abonnement;
use App\Filter\AbonnementFilter;
use App\Repository\AbonnementRepository;
use App\Repository\TarifRepository;
use Doctrine\ORM\EntityManagerInterface;

class AbonnementService
{
    public function __construct(private EntityManagerInterface $manager, private AbonnementFilter $abonnementFilter )
    {
        
    }
    public function finishCheckout(string $chechoutSessionId) {
        //retrieve abonnment
        $checkOutSessionID = "cs_test_a1gmZf79fE5LzZQaMxw45u0XTCesnXS5vokXO5K3oKVHvUOF7pVty96MW2";
       /** @var Abonnement $abonnement */
        $abonnement = $this->manager->getRepository(Abonnement::class)->findOneBy(["checkoutSessionId" => $checkOutSessionID]);
        if(!$abonnement) {
            throw new ServiceException(new ServiceExceptionData(404, "No abonnement was initialized"));
        }
        $tarif = $abonnement->getTarif();

        $this->abonnementFilter->apply($abonnement, $tarif);
        $abonnement->setPaymentStatus("success");
        $abonnement->setCheckoutSessionId(null);
        $this->manager->flush();
    }
}