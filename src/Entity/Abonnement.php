<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Interface\CommandInterface;
use App\Repository\AbonnementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
#[ORM\Entity(repositoryClass: AbonnementRepository::class)]
#[ApiResource(
    paginationEnabled: false,
    collectionOperations: [
        "post" => [
            "security" => "is_granted('IS_AUTHENTICATED_FULLY')",
            "normalization_context" => ["groups" => ["post_abonnement"]],
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
#[ApiFilter(SearchFilter::class, properties: ['paymentStatus' => 'exact'])]
class Abonnement
 implements CommandInterface{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["get-owner", "post-reservation"])]
    private ?int $id = null;

    #[ORM\Column(length: 60)]
    #[Groups(["get_abonnement", "get-owner", "post-reservation"])]
    private ?string $paymentStatus = null;

    #[ORM\Column(length: 150, nullable: true)]
    private ?string $checkoutSessionId = null;

    #[ORM\Column(nullable:true)]
    #[Groups(["get-owner", "post-reservation", "list-reservation"])]
    private ?int $credits = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(["get-owner", "post-reservation", "list-reservation"])]
    private ?\DateTimeInterface $expireAt = null;

    #[ORM\ManyToOne(inversedBy: 'abonnements')]
    private ?User $user = null;

    
    #[ORM\ManyToOne(inversedBy: 'abonnements')]
    #[ORM\JoinColumn( nullable: true,onDelete:"SET NULL")]
    #[Groups(["post", "get-owner", "post-reservation"])]
    private ?Prestation $prestation = null;

    #[ORM\ManyToOne(targetEntity:Tarif::class)]
    #[ORM\JoinColumn( nullable: true,onDelete: "CASCADE")]
    #[Groups(["post", "get_abonnement" , "post-reservation", "list-reservation"])]
    private ?Tarif $tarif = null;

    #[Groups(['post_abonnement'])]
    private ?string $checkoutUrl = null;

    #[ORM\OneToMany(mappedBy: 'abonnement', targetEntity: Reservation::class)]
    private Collection $reservations;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
    }


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

    public function setCheckoutUrl(?string $url): self
    {
        $this->checkoutUrl = $url;
        return $this;
    }

    public function getCheckoutUrl(): ?string
    {
        return $this->checkoutUrl;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setAbonnement($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getAbonnement() === $this) {
                $reservation->setAbonnement(null);
            }
        }

        return $this;
    }
}
