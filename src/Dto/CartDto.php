<?php

namespace App\Dto;

use App\Entity\Cart;
use App\Entity\Prestation;
use App\Entity\Product;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validators\Constraints\IsPrestationExist;
use Symfony\Component\Serializer\Annotation\Groups;

class CartDto
{



    #[Assert\NotBlank]
    #[Assert\Type('array')]
    #[Assert\All([
        new Assert\Type('numeric'),
        new Assert\Positive(),
    ])]
    #[SerializedName('prestation-ids')]
    private ?array $prestationIds = null;

    #[Assert\NotBlank]
    #[Assert\Positive]
    private ?int $cartId = null;

    #[Assert\NotBlank]
    #[Assert\Positive]
 
    private ?int $quantity = 1;


    private ?Cart $cart = null;
    // #[Ignore]
    // private ?Prestation $prestation = 1;

    /**
     * @return int|null
     */
    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    /**
     * @param int|null $quantity
     */
    public function setQuantity(?int $quantity): void
    {
        $this->quantity = $quantity;
    }

    public function getPrestationIds(): ?array
    {
        return $this->prestationIds;
    }

    public function setPrestationIds(?array $prestationIds): self
    {
        $this->prestationIds = $prestationIds;

        return $this;
    }
    public function setCart(Cart $cart): self
    {
        $this->cart = $cart;
        return $this;
    }
    public function getCart(): ?Cart
    {
        return $this->cart;
    }

    public function setCartId(int $id): self
    {
        $this->cartId = $id;
        return $this;
    }
    public function getCartId(): ?int
    {
        return $this->cartId;
    }

}