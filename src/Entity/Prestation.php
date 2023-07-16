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
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\SearchPrestationFilter;
use App\Interface\CompanyInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PrestationRepository::class)]
#[ApiResource(
    // mercure: 'object.getMercureOptions()',
   // mercure: ["private" => true],
   //attributes:["pagination_items_per_page" => 5 ],
    collectionOperations: [
        "post" => ["security" => "is_granted('ROLE_COMPANY')"],
        "get" => [
            "normalization_context" => ["groups" => ["list_prestation"]]
        ]
    ],
    itemOperations: [
        "get" => [
            "normalization_context" => ["groups" => ["get_prestation"]]
        ],
        
        "put" => ["security" => "is_granted('ROLE_ADMIN') or ( is_granted('ROLE_COMPANY') and object.getCompany().getOwner() == user )"],
    ]
    ),
   
    ApiFilter(
        SearchFilter::class,
        properties:["categories.id"=> "exact", "id"=> "exact"]
        // properties: [
        //     'name' => SearchFilter::STRATEGY_PARTIAL,
        //     ''
        // ]
    )
    ]
#[ApiFilter(SearchFilter::class, properties:["id"=> "exact", "categories.id"=> "exact"])]
 //#[ApiFilter(SearchPrestationFilter::class)]
class Prestation implements AuthoredEntityInterface, CompanyInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    #[Groups(["get_prestation", "get_user", "list_prestation", "post-reservation", "list-reservation"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["get_prestation", "list_prestation", "list-reservation"])]
    private ?string $name = null;

    // #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Horaire::class, cascade: ["persist", "remove"])]
    // #[ApiSubresource]
    // #[Groups(["get_prestation"])]
    // private Collection $horaires;

    #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Reservation::class)]
    private Collection $reservations;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(["get_prestation"])]
    private ?\DateTimeInterface $created = null;

    #[ORM\ManyToOne(inversedBy: 'prestations')]
    #[Groups(["get_prestation", "list_prestation"])]
    private ?Company $company = null;

    #[ORM\ManyToOne(inversedBy: 'prestations')]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Horaire::class)]
    #[Groups(["get_prestation", "list_prestation"])]
    private Collection $horaires;

    #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Tarif::class)]
    #[Groups(["get_prestation", "list_prestation"])]
    private Collection $tarifs;

    #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Abonnement::class)]
    private Collection $abonnements;

    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'prestations')]
    #[Groups(["get_prestation", "list_prestation"])]
    private Collection $categories;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["get_prestation", "list_prestation"])]
    private ?\DateTimeInterface $published = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["get_prestation", "list_prestation"])]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Image::class)]
    #[Groups(["get_prestation", "list_prestation","list-reservation"])]
    #[ApiSubresource]
    private Collection $images;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $productID = null;

    #[Groups(["get_prestation", "list_prestation"])]
    #[ORM\ManyToOne(inversedBy: 'prestations')]
    private ?Type $type = null;



    public function __construct()
    {
     
        // $this->horaires = new ArrayCollection();
        // $this->reservations = new ArrayCollection();
        $this->tarifs = new ArrayCollection();
        $this->abonnements = new ArrayCollection();
        $this->categories = new ArrayCollection();
        $this->images = new ArrayCollection();

   
    }

    public function getMercureOptions(): array
    {
        $topics = [];
        $topics[] = "/api/prestations/". $this->getId();
        $topics[] = '/api/users/'.$this->getOwner()?->getId().'/prestations/'. $this->getId(); 
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
            $this->reservations[] = $reservation;
            $reservation->setPrestation($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getPrestation() === $this) {
                $reservation->setPrestation(null);
            }
        }

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function toModel(): \App\Model\Prestation
    {
        $model = new \App\Model\Prestation();
        $model->name = $this->name;
        // $model->authorName = $this->author->getFullName();
        // $model->publishedAt = $this->publishedAt;
        // $model->slug = $this->slug;
        // $model->summary = $this->summary;

        // foreach ($this->comments as $comment) {
        //     $postComment = new PostComment();
        //     $postComment->content = $comment->getContent();
        //     $postComment->authorName = $comment->getAuthor()->getFullName();

        //     $model->comments[] = $postComment;
        // }

        return $model;
    }

    /**
     * @return Collection<int, Horaire>
     */
    public function getHoraires(): Collection
    {
        return $this->horaires;
    }

    public function addHoraire(Horaire $horaire): self
    {
        if (!$this->horaires->contains($horaire)) {
            $this->horaires->add($horaire);
            $horaire->setPrestation($this);
        }

        return $this;
    }

    public function removeHoraire(Horaire $horaire): self
    {
        if ($this->horaires->removeElement($horaire)) {
            // set the owning side to null (unless already changed)
            if ($horaire->getPrestation() === $this) {
                $horaire->setPrestation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Tarif>
     */
    public function getTarifs(): Collection
    {
        return $this->tarifs;
    }

    public function addTarif(Tarif $tarif): self
    {
        if (!$this->tarifs->contains($tarif)) {
            $this->tarifs->add($tarif);
            $tarif->setPrestation($this);
        }

        return $this;
    }

    public function removeTarif(Tarif $tarif): self
    {
        if ($this->tarifs->removeElement($tarif)) {
            // set the owning side to null (unless already changed)
            if ($tarif->getPrestation() === $this) {
                $tarif->setPrestation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Abonnement>
     */
    public function getAbonnements(): Collection
    {
        return $this->abonnements;
    }

    public function addAbonnement(Abonnement $abonnement): self
    {
        if (!$this->abonnements->contains($abonnement)) {
            $this->abonnements->add($abonnement);
            $abonnement->setPrestation($this);
        }

        return $this;
    }

    public function removeAbonnement(Abonnement $abonnement): self
    {
        if ($this->abonnements->removeElement($abonnement)) {
            // set the owning side to null (unless already changed)
            if ($abonnement->getPrestation() === $this) {
                $abonnement->setPrestation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        $this->categories->removeElement($category);

        return $this;
    }

    public function getPublished(): ?\DateTimeInterface
    {
        return $this->published;
    }

    public function setPublished(\DateTimeInterface $published): self
    {
        $this->published = $published;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images->add($image);
            $image->setPrestation($this);
        }

        return $this;
    }

    public function removeImage(Image $image): self
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getPrestation() === $this) {
                $image->setPrestation(null);
            }
        }

        return $this;
    }

    public function getProductID(): ?string
    {
        return $this->productID;
    }

    public function setProductID(?string $productID): self
    {
        $this->productID = $productID;

        return $this;
    }

    public function getType(): ?Type
    {
        return $this->type;
    }

    public function setType(?Type $type): self
    {
        $this->type = $type;

        return $this;
    }
}
