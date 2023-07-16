<?php
namespace App\Controller;


use App\Repository\CompanyRepository;

use App\Services\StripeService;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Services\AbonnementService;

#[AsController]
Class StripeHookAction extends AbstractController {
    
    public function __construct(
        private StripeService $stripe,
        private LoggerInterface $logger, 
        private EntityManagerInterface $manager, 
        private CompanyRepository $companyRepository,
        // private AbonnementFilter $filter,
        private AbonnementService $abonnementService
        )
    {
        
    }

    public function __invoke(Request $request)
    {

        //return new JsonResponse("Fake Hook", Response::HTTP_ACCEPTED);
        $payload = $request->getContent();
        
        $sig_header = $request->headers->get('Stripe-Signature');

        $event = null;
        // $event = json_decode($request->getContent());
        // UNCOMENT FOR PROD
        try {
            $event = $this->stripe->getStripeEvents($payload, $sig_header);
        } catch (\Exception $e) {
            $this->logger->info("error");
     
            return new JsonResponse([['error' => $e->getMessage(),'status'=>403]]);
        }
        $this->logger->info("Session ? : Dam");
        $this->logger->info($event);
        $this->logger->info($event->type);
  
        switch ($event->type) {
            case 'checkout.session.completed':
                $checkOutSessionID = $event->data->object->id;
                $this->logger->info($checkOutSessionID);
                //$checkOutSessionID = "cs_test_a1gmZf79fE5LzZQaMxw45u0XTCesnXS5vokXO5K3oKVHvUOF7pVty96MW2";
                $this->abonnementService->finishCheckout($checkOutSessionID);
                //$subscribeRepo = $this->manager->getRepository(Abonnement::class);
                //$abonnement = $subscribeRepo->findOneBy(["checkoutSessionId" => $checkOutSessionID]);
                // $abonnement->setPaymentStatus("success");
                // $this->filterAbonnement->apply($abonnement, $abonnement->getTarif());
                //$this->manager->flush();
                //$abonnement->modify();
                
                break;
            case 'invoice.payment_succeeded':
            case 'customer.subscription.created':
                $this->logger->info("en theorie c ici et l abonnement au dessus ?");
                $this->logger->info( $event->data->object);
             
                break;
            case 'account.updated':
                //NODE.js ex:
                /*
                

				const {
					payouts_enabled,
					charges_enabled,
					id: accountID,
				} = stripeEvent.data.object;
				if (payouts_enabled && charges_enabled) {
					const { id, _version } = await getCompanyByStripeID({
						accountID: accountID,
					});
					const result = await updateCompany({
						id,
						_version,
						status: "completed",
					});
				}
                    
                */
                $account = $event->data->object;
                
                $this->logger->info(false);
                $this->logger->info($account->id);
                $this->logger->info($event->data);
                // $this->logger->info($account["payouts_enabled"]);
                // $this->logger->info($account["charges_enabled"]);
                if($account->id) {
                    $company = $this->companyRepository->findOneBy(["accountID" => $account->id]);
                    
                    $company->setAccountID($account->id);

                    if($account->payouts_enabled && $account->charges_enabled) {
                        $company->setStatus("completed");
                    } else {
                        $company->setStatus("pending");
                    }
                   // $this->manager->persist($company);
                    $this->manager->flush();
                    // $this->logger->debug("account updated");
                    // $this->logger->debug($account);
                    // $this->logger->debug($company->getName());
                }
             break;
        }
      
        return new JsonResponse("ok", Response::HTTP_ACCEPTED);
    }
}