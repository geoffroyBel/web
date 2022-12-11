<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\StripeAccountAction;
use App\Controller\StripeHookAction;
use App\Repository\CompanyRepository;
use Doctrine\ORM\Mapping as ORM;
use ProxyManager\Autoloader\AutoloaderInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Blank;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource(
    collectionOperations:[
        "post" => [
        "security" => "is_granted('IS_AUTHENTICATED_FULLY')",
        "denormalization_context" => ["groups" => ["post"]],
        ],
        "post_stripe_hook" => [
            
            'method' => 'POST',
            'path' => '/stripe/hook',
            'controller' => StripeHookAction::class,
            'defaults'=> ["_api_receive"=>false],
            'read' => false,
        ]
    ],
    itemOperations: [
        'get',
        'put_stripe_account' => [
             'security' => "is_granted('IS_AUTHENTICATED_FULLY') and object.getOwner() == user",
             'method' => 'put',
             'path'=>'/company/{id}/create/stripe',
             'controller' => StripeAccountAction::class,
             'denormalization_context'=>['groups'=>'put-stripe-account'],
             'normalization_context'=>['groups'=>'get-stripe-account'],
             'validation_groups'=>['Default', 'put-stripe-account']
         ],

    ]
)]

class Company implements AuthoredEntityInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["post"])]
    private ?string $name = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(["get-stripe-account"])]
    // #[Blank(groups: ["put-stripe-account"])]
    private ?string $accountID = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["get-stripe-account"])]
    private ?string $accountLink = null;

    #[ORM\OneToOne(mappedBy: 'company', cascade: ['persist', 'remove'])]
    private ?User $owner = null;

    #[ORM\Column(length: 50, nullable: true, options: ["default" => "pending"])]
    private ?string $status = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getAccountID(): ?string
    {
        return $this->accountID;
    }

    public function getAccountLink(): ?string
    {
        return $this->accountLink;
    }
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function setAccountID(string $accountID): self
    {
        $this->accountID = $accountID;
        return $this;
    }

    public function setAccountLink(string $link): self
    {
        $this->accountLink = $link;
        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        // unset the owning side of the relation if necessary
        if ($owner === null && $this->owner !== null) {
            $this->owner->setCompany(null);
        }

        // set the owning side of the relation if necessary
        if ($owner !== null && $owner->getCompany() !== $this) {
            $owner->setCompany($this);
        }

        $this->owner = $owner;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }
}
