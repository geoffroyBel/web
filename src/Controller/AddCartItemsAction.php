<?php
namespace App\Controller;

use App\Dto\CartDto;
use App\Entity\Cart;
use App\Entity\Prestation;
use App\Serializer\DTOSerializer;

use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
Class AddCartItemsAction extends AbstractController {
    
    public function __construct(
        private LoggerInterface $logger, 
        private EntityManagerInterface $manager, 
        private SerializerInterface $serializer
        // private AbonnementFilter $filter,
        // private AbonnementService $abonnementService
        )
    {
        
    }

    public function __invoke(Request $request)
    {
        $cartDto = $this->serializer->deserialize(
            $request->getContent(), CartDto::class, 'json'
        );
        // $p = $this->manager->getRepository(Prestation::class)->findByIds([11, 12, 13]);
        // var_dump($data->getId());
        dd( $cartDto);
       // var_dump(count($p));
        return new JsonResponse("Fake Hook", Response::HTTP_ACCEPTED);
       // $payload = $request->getContent();
        
    
    }
}