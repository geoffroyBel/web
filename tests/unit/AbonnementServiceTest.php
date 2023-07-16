<?php
namespace APp\Tests\unit;

use App\Repository\AbonnementRepository;
use App\Tests\ServiceTestCase;
use App\Services\AbonnementService;

class AbonnementServiceTest extends ServiceTestCase
{
    /** @test */
    public function is_abonnement_srv_success_subscribing() {
        $checkOutSessionID = "cs_test_a1gmZf79fE5LzZQaMxw45u0XTCesnXS5vokXO5K3oKVHvUOF7pVty96MW2";
        $subscribe_srv = $this->container->get(AbonnementService::class);
        $subscribe_srv->finishCheckout($checkOutSessionID);
        $subscribe_repo = $this->container->get(AbonnementRepository::class);
        $abonnement = $subscribe_repo->findOneBy(["checkoutSessionId" => $checkOutSessionID]);
        $this->assertSame(null, $abonnement);
    }
}