<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Validators\Constraints as SGAssert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource(
    paginationEnabled: false,
    //paginationItemsPerPage: 2,
    collectionOperations: [
        "post" => ["security" => "is_granted('IS_AUTHENTICATED_FULLY')",
        "normalization_context"=>['groups'=>'post-reservation'],
    ],
    
        "get"=> ["security" => "is_granted('IS_AUTHENTICATED_FULLY')",
        "normalization_context"=>['groups'=>'list-reservation'],
    ],
    ],
    itemOperations: [
        "get", 
        "delete" => [
            "security" => "is_granted('IS_AUTHENTICATED_FULLY') and object.getUser() == user",
            "normalization_context"=>['groups'=>'post-reservation'],
            ]
        // "put" => ["security" => "is_granted('ROLE_ADMIN') or ( is_granted('ROLE_COMPANY') and object.getCompany().getOwner() == user )"],
    ]
)]
//#[ApiFilter(SearchFilter::class, properties: ['paymentStatus' => 'exact'])]
#[ApiFilter(SearchFilter::class, properties: ['id'=> 'exact','prestation.id' => 'exact', 'user.id' => 'exact'])]
#[ SGAssert\HasAbonnement() ]
class Reservation
{
    #[Groups(["list-reservation", "post-reservation"])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(["list-reservation", "post-reservation"])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $startTime = null;

    #[Groups(["list-reservation", "post-reservation"])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $endTime = null;

    #[Groups(["get-admin", "get-owner"])]
    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?User $user = null;

    #[Groups(["list-reservation"])]
    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Prestation $prestation = null;

    #[Groups(["get-admin", "get-owner", "post-reservation"])]
    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Horaire $horaire = null;

    #[Groups(["list-reservation", "post-reservation"])]
    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Abonnement $abonnement = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->startTime;
    }

    public function setStartTime(?\DateTimeInterface $startTime): self
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->endTime;
    }

    public function setEndTime(?\DateTimeInterface $endTime): self
    {
        $this->endTime = $endTime;

        return $this;
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

    public function getHoraire(): ?Horaire
    {
        return $this->horaire;
    }

    public function setHoraire(?Horaire $horaire): self
    {
        $this->horaire = $horaire;

        return $this;
    }

    public function getAbonnement(): ?Abonnement
    {
        return $this->abonnement;
    }

    public function setAbonnement(?Abonnement $abonnement): self
    {
        $this->abonnement = $abonnement;

        return $this;
    }
}
