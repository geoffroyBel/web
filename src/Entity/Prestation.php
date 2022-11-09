<?php

namespace App\Entity;

use ApiPlatform\Api\UrlGeneratorInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use App\Repository\PrestationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiSubresource;

// use App\Filter\SearchPrestationFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PrestationRepository::class)]
#[ApiResource(
    mercure: 'object.getMercureOptions()',
   // mercure: ["private" => true],
    collectionOperations: [
        "post" ,// => ["security" => "is_granted('IS_AUTHENTICATED_FULLY')"],
        "get"
    ],
    itemOperations: [
        "get" => [
            "normalization_context" => ["groups" => ["get_prestation"]]
        ],
        "put" => ["security" => "is_granted('IS_AUTHENTICATED_FULLY')"],
    ]
)]
// #[ApiFilter(SearchPrestationFilter::class)]
class Prestation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    #[Groups(["get_prestation", "get_user"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["get_prestation"])]
    private ?string $name = null;

    // #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Horaire::class, cascade: ["persist", "remove"])]
    // #[ApiSubresource]
    // #[Groups(["get_prestation"])]
    // private Collection $horaires;

    // #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Reservation::class)]
    // private Collection $reservations;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $created = null;

    // #[ORM\ManyToOne(inversedBy: 'prestations')]
    // private ?User $owner = null;



    public function __construct()
    {
     
        // $this->horaires = new ArrayCollection();
        // $this->reservations = new ArrayCollection();

   
    }

    public function getMercureOptions(): array
    {
        $topics = [];
        $topics[] = "/api/prestations/". $this->getId();
        //$topics[] = '/api/users/'.$this->getOwner()?->getId().'/prestations/'. $this->getId(); 
        // the '@=' prefix is required when using expressions for arguments in topics
        // $topic1 = '@=iri(object)';
        // $topic2 = '@=iri(object.getOwner()) ~ "/?topic=" ~ escape(iri(object))';
        return [
            'private' => true,
           // 'topics' => $topics
        ];
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    // /**
    //  * @return Collection<int, Horaire>
    //  */
    // public function getHoraires(): Collection
    // {
    //     return $this->horaires;
    // }

    // public function addHoraire(Horaire $horaire): self
    // {
    //     if (!$this->horaires->contains($horaire)) {
    //         $this->horaires[] = $horaire;
    //         $horaire->setPrestation($this);
    //     }

    //     return $this;
    // }

    // public function removeHoraire(Horaire $horaire): self
    // {
    //     if ($this->horaires->removeElement($horaire)) {
    //         // set the owning side to null (unless already changed)
    //         if ($horaire->getPrestation() === $this) {
    //             $horaire->setPrestation(null);
    //         }
    //     }

    //     return $this;
    // }

    // /**
    //  * @return Collection<int, Reservation>
    //  */
    // public function getReservations(): Collection
    // {
    //     return $this->reservations;
    // }

    // public function addReservation(Reservation $reservation): self
    // {
    //     if (!$this->reservations->contains($reservation)) {
    //         $this->reservations[] = $reservation;
    //         $reservation->setPrestation($this);
    //     }

    //     return $this;
    // }

    // public function removeReservation(Reservation $reservation): self
    // {
    //     if ($this->reservations->removeElement($reservation)) {
    //         // set the owning side to null (unless already changed)
    //         if ($reservation->getPrestation() === $this) {
    //             $reservation->setPrestation(null);
    //         }
    //     }

    //     return $this;
    // }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    // public function getOwner(): ?User
    // {
    //     return $this->owner;
    // }

    // public function setOwner(?User $owner): self
    // {
    //     $this->owner = $owner;

    //     return $this;
    // }

    // public function toModel(): \App\Model\Prestation
    // {
    //     $model = new \App\Model\Prestation();
    //     $model->name = $this->name;
    //     // $model->authorName = $this->author->getFullName();
    //     // $model->publishedAt = $this->publishedAt;
    //     // $model->slug = $this->slug;
    //     // $model->summary = $this->summary;

    //     // foreach ($this->comments as $comment) {
    //     //     $postComment = new PostComment();
    //     //     $postComment->content = $comment->getContent();
    //     //     $postComment->authorName = $comment->getAuthor()->getFullName();

    //     //     $model->comments[] = $postComment;
    //     // }

    //     return $model;
    // }
}
