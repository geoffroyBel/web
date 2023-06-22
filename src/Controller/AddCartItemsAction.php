<?php
namespace App\Controller;

use ApiPlatform\Core\Validator\Exception\ValidationException;
use App\Dto\CartDto;
use App\Entity\Cart;
use App\Entity\CartItem;
use App\Entity\Prestation;
use App\Repository\PrestationRepository;
use App\Serializer\DTOSerializer;
use App\Services\ServiceException;
use App\Services\ServiceExceptionData;
use App\Services\ValidationExceptionData;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[AsController]
Class AddCartItemsAction extends AbstractController {
    
    public function __construct(
        private LoggerInterface $logger, 
        private EntityManagerInterface $manager, 
        private DTOSerializer $serializer,
        private ValidatorInterface $validator
        )
    {
        
    }

    public function __invoke(Request $request)
    {
        /**@var CartDto $dto */
        $dto = $this->serializer->deserialize(
            $request->getContent(), CartDto::class, 'json'
        );
        $errors = $this->validator->validate($dto);

        if (count($errors) > 0) {
           $validationException = new ValidationExceptionData(422, 'ConstrainViolationList', $errors);
           throw new ServiceException($validationException);
        }
         /**@var Cart */
        $cart = $this->manager->getRepository(Cart::class)->findOneBy(["id"=> $dto->getCartId()]);
        $prestations = $this->manager->getRepository(Prestation::class)->findByIds($dto->getPrestationIds());
        $cartItemRepository = $this->manager->getRepository(CartItem::class);

        if(count($prestations) <= 0 && count($prestations) != count($dto->getPrestationIds())) {
            throw new ServiceException(new ServiceExceptionData(404, "prestation not found"));
        }

        foreach ( $prestations as $prestationSelected) {
            /**@var CartItem $cartItem */
            $cartItem = $cartItemRepository->findOneBy(["prestation"=> $prestationSelected->getId(), "cart" => $cart->getId()]);
            if(!$cartItem) {
                $cartItem = new CartItem();
                $cartItem->setCart($cart);
                $cartItem->setPrestation($prestationSelected);
                $cartItem->setQuantity(1);
                $cartItem->setPrice(20);
                $cart->addCartItem($cartItem);
            } else {
                $cartItem->setQuantity($cartItem->getQuantity() + 1);
            }  
           
        }
        
        $this->manager->flush();
       
        $dto->setQuantity(count($cart->getCartItems()));
        $responseContent = $this->serializer->serialize($dto, 'json');
        return new JsonResponse(data: $responseContent, status:Response::HTTP_CREATED, json: true);        
    }
}