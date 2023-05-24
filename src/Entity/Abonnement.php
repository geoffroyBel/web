<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Interface\CommandInterface;
use App\Repository\AbonnementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AbonnementRepository::class)]
#[ApiResource(
    collectionOperations: [
        "post" => [
            "security" => "is_granted('IS_AUTHENTICATED_FULLY')"
        ],
        "get" => [
            "normalization_context" => ["groups" => ["get_abonnement"]],
        ]
    ],
    itemOperations: [
        "get"=> [
            "normalization_context" => ["groups" => ["get_abonnement"]],
        ]
    ]
)]
class Abonnement
 implements CommandInterface{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 60)]
    #[Groups(["get_abonnement"])]
    private ?string $paymentStatus = null;

    #[ORM\Column(length: 150, nullable: true)]
    private ?string $checkoutSessionId = null;

    #[ORM\Column(nullable:true)]
    private ?int $credits = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $expireAt = null;

    #[ORM\ManyToOne(inversedBy: 'abonnements')]
    private ?User $user = null;

    
    #[ORM\ManyToOne(inversedBy: 'abonnements')]
    #[Groups(["post"])]
    private ?Prestation $prestation = null;

    #[ORM\ManyToOne(targetEntity:Tarif::class)]
    #[ORM\JoinColumn( nullable: true,onDelete: "CASCADE")]
    #[Groups(["post", "get_abonnement"])]
    private ?Tarif $tarif = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPaymentStatus(): ?string
    {
        return $this->paymentStatus;
    }

    public function setCredits(int $credits): self{
        $this->credits = $credits;
        return $this;
    }
    public function getCredits(): ?int
    {
        return $this->credits;
    }
    public function setPaymentStatus(string $paymentStatus): self
    {
        $this->paymentStatus = $paymentStatus;

        return $this;
    }

    public function getCheckoutSessionId(): ?string
    {
        return $this->checkoutSessionId;
    }

    public function setCheckoutSessionId(?string $checkoutSessionId): self
    {
        $this->checkoutSessionId = $checkoutSessionId;

        return $this;
    }

    public function getExpireAt(): ?\DateTimeInterface
    {
        return $this->expireAt;
    }

    public function setExpireAt(?\DateTimeInterface $expireAt): self
    {
        $this->expireAt = $expireAt;

        return $this;
    }

    public function setTarif (?Tarif $tarif): self
    {
        $this->tarif = $tarif;
        return $this;

    }

    public function getTarif(): ?Tarif
    {
        return $this->tarif;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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
}
