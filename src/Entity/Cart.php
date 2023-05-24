<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\CartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\AddCartItemsAction;

#[ORM\Entity(repositoryClass: CartRepository::class)]
#[ApiResource(
    // collectionOperations:[
    //     'add_cart_items' => [
    //         // 'security' => "is_granted('IS_AUTHENTICATED_FULLY') and object.getOwner() == user",
    //         'method' => 'post',
    //         'path'=>'/carts/addItems',
    //         'controller' => AddCartItemsAction::class,
    //         // 'denormalization_context'=>['groups'=>'put-stripe-account'],
    //         // 'normalization_context'=>['groups'=>'get-stripe-account'],
    //         // 'validation_groups'=>['Default', 'put-stripe-account']
    //     ],
    // ],
itemOperations: [
    'get',
    'add_cart_items' => [
         'method' => 'put',
         'path'=>'/cart/{id}/add',
         'controller' => AddCartItemsAction::class,
        //  'denormalization_context'=>['groups'=>'put-stripe-account'],
        //  'normalization_context'=>['groups'=>'get-stripe-account'],
        //  'validation_groups'=>['Default', 'put-stripe-account']
     ],

]
)]
class Cart
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'cart', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    private ?User $owner = null;


    #[ORM\OneToMany(mappedBy: 'cart', targetEntity: CartItem::class, orphanRemoval: true)]
    #[ApiSubresource]
    private Collection $cartItems;

    public function __construct()
    {
        $this->cartItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection<int, CartItem>
     */
    public function getCartItems(): Collection
    {
        return $this->cartItems;
    }

    public function addCartItem(CartItem $cartItem): self
    {
        if (!$this->cartItems->contains($cartItem)) {
            $this->cartItems->add($cartItem);
            $cartItem->setCart($this);
        }

        return $this;
    }

    public function removeCartItem(CartItem $cartItem): self
    {
        if ($this->cartItems->removeElement($cartItem)) {
            // set the owning side to null (unless already changed)
            if ($cartItem->getCart() === $this) {
                $cartItem->setCart(null);
            }
        }

        return $this;
    }
}
