<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TarifRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TarifRepository::class)]
#[ApiResource(
    collectionOperations: [
        "post" => ["security" => "is_granted('ROLE_COMPANY')"],
        "get"
    ],
    itemOperations: [
        "get" => [
            "normalization_context" => ["groups" => ["get_tarif"]],
        ] ,
    ]
)]
class Tarif
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["list_prestation"])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["get_tarif", "list_prestation"])]
    private ?string $type = null;

    #[ORM\Column(nullable: true)]
    #[Groups(["get_tarif", "list_prestation"])]
    private ?float $price = null;

    #[ORM\Column(nullable: true)]
    #[Groups(["get_tarif", "list_prestation"])]
    private ?int $credits = null;

    #[ORM\ManyToOne(inversedBy: 'tarifs')]
    private ?Prestation $prestation = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $priceId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCredits(): ?int
    {
        return $this->credits;
    }

    public function setCredits(?int $credits): self
    {
        $this->credits = $credits;

        return $this;
    }

    public function getPrestation(): ?Prestation
    {
        return $this->prestation;
    }

    public function setPrestation(?Prestation $prestation): self
    {
        $this->prestation = $prestation;

        return $this;
    }

    public function getPriceId(): ?string
    {
        return $this->priceId;
    }

    public function setPriceId(string $priceId): self
    {
        $this->priceId = $priceId;

        return $this;
    }
}
