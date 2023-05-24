<?php

namespace App\Dto;

use App\Entity\Prestation;
use App\Entity\Product;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

class CartDto
{


    #[Assert\Type('array')]
    #[Assert\All([
        new Assert\Type('numeric'),
        new Assert\Positive(),
    ])]
    #[SerializedName('prestation-ids')]
    private ?array $tagIds = null;

    
    #[Assert\NotBlank]
    #[Assert\Positive]
    private ?int $quantity = 1;

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

    public function getTagIds(): ?array
    {
        return $this->tagIds;
    }

    public function setTagIds(?array $tagIds): self
    {
        $this->tagIds = $tagIds;

        return $this;
    }

}