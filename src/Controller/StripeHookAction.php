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

#[AsController]
Class StripeHookAction extends AbstractController {
    
    public function __construct(private StripeService $stripe , private LoggerInterface $logger, private EntityManagerInterface $manager, private CompanyRepository $companyRepository)
    {
        
    }

    public function __invoke(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->headers->get('Stripe-Signature');
        $event = null;
        
        try {
            $event = $this->stripe->getStripeEvents($payload, $sig_header);
        } catch (\Exception $e) {
            return new JsonResponse([['error' => $e->getMessage(),'status'=>403]]);
        }

        switch ($event->type) {
            case 'account.updated':
                $account = $event->data->object;
                if($account->metadata->id) {
                    $company = $this->companyRepository->findOneBy(["id" => $account->metadata->id]);
                    $company->setStatus("completed");
                    $company->setAccountID($account->id);
                    $this->manager->persist($company);
                    $this->manager->flush();
                    // $this->logger->debug("account updated");
                    // $this->logger->debug($account);
                    // $this->logger->debug($company->getName());

                }
             break;
        }
      
        // 
        // 
        // $event = null;
        // $this->logger->debug($sig_header);
        return new JsonResponse("ok", Response::HTTP_ACCEPTED);
        // 



// try {
    
//   $event = \Stripe\Webhook::constructEvent(
//     $payload, $sig_header, $endpoint_secret
//   );
// } catch(\UnexpectedValueException $e) {
//   // Invalid payload
//   http_response_code(400);
//   exit();
// } catch(\Stripe\Exception\SignatureVerificationException $e) {
//   // Invalid signature
//   http_response_code(400);
//   exit();
// }

// // Handle the event
// switch ($event->type) {
//   case 'account.updated':
//     $account = $event->data->object;
//   // ... handle other event types
//   default:
//     echo 'Received unknown event type ' . $event->type;
// }


    }
}