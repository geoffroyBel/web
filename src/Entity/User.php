<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Controller\ResetPasswordAction;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    
    collectionOperations: [
        "get",
        "post" => [
            "denormalization_context" => ["groups" => ["post"]]
        ]
    ],
    itemOperations: [
        "get" => [ 
            "normalization_context" => ["groups" => ["get_user"]],
            "security" => "is_granted('IS_AUTHENTICATED_FULLY')"
        ],
        "put" => [
            "denormalization_context" => ["groups" => ["put"]],
            "security" => "is_granted('IS_AUTHENTICATED_FULLY') and object == user"
        ],
        // 'put_reset_password' => [
        //     'security' => "is_granted('IS_AUTHENTICATED_FULLY') and object == user",
        //     'method' => 'put',
        //     'path'=>'/users/{id}/reset-password',
        //     'controller' => ResetPasswordAction::class,
        //     'denormalization_context'=>['groups'=>'put-reset-password'],
        //     'validation_groups'=>['Default', 'put-reset-password']
        // ],
    ],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    const ROLE_COMPANY = 'ROLE_COMPANY';
    const ROLE_USER = 'ROLE_USER';
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_SUPERADMIN = 'ROLE_SUPERADMIN';

    const DEFAULT_ROLES = [self::ROLE_USER];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    #[Groups(["get_user"])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(["get-admin", "get-owner", "put", "post"])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(["get-owner"])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(["post"])]
    private ?string $password = null;
    /**
     * @var string The hashed password
     */
    #[Groups(["post"])]
    #[Assert\NotBlank(groups: ['post'])]
    #[Assert\Expression(
        expression:"this.getPassword() === this.getRetypedPassword()",
        message:"Passwords does not match",
        groups: ["post"]
        )]
    private ?string $retypedPassword = null;

    #[Groups(["put-reset-password"])]
    #[Assert\NotBlank(groups: ["put-reset-password"])]
    #[Assert\Regex(
        pattern: "/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/",
        message: "Password must be seven characters long and contain at least one digit, one upper case letter and one lower case letter",
        groups: ["put-reset-password"])]
    private ?string $newPassword = null;

    #[Groups(["put-reset-password"])]
    #[Assert\NotBlank(groups: ["put-reset-password"])]
    #[Assert\Expression(
        expression:"this.getNewPassword() === this.getNewRetypedPassword()",
        message:"Passwords does not match",
        groups: ["put-reset-password"]
        )]
    private ?string $newRetypedPassword = null;

    #[Groups(["put-reset-password"])]
    #[Assert\NotBlank(groups: ["put-reset-password"])]
    #[UserPassword(groups: ["put-reset-password"])]
    private ?string $oldPassword = null;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Prestation::class)]
    #[Groups(["get-owner"])]
    private Collection $prestations;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["get-owner", "post"])]
    private ?string $username = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["get-owner", "put", "post"])]
    private ?string $name = null;

    #[ORM\Column(nullable: true, options: ["default"=> "0"])]
    #[Groups(["get-owner"])]
    private ?bool $enabled = null;

    #[ORM\Column(nullable: true)]
    private ?int $passwordChangedDate = null;

    #[ORM\Column(length: 40, nullable: true)]
    private ?string $confirmationToken = null;

    public function __construct()
    {
        $this->prestations = new ArrayCollection();
        $this->roles = self::DEFAULT_ROLES;
        $this->enabled = false;
        $this->confirmationToken = null;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getRetypedPassword()
    {
        return $this->retypedPassword;
    }

    public function setRetypedPassword($retypedPassword): void
    {
        $this->retypedPassword = $retypedPassword;
    }

    public function getNewPassword(): ?string
    {
        return $this->newPassword;
    }

    public function setNewPassword($newPassword): void
    {
        $this->newPassword = $newPassword;
    }

    public function getNewRetypedPassword(): ?string
    {
        return $this->newRetypedPassword;
    }

    public function setNewRetypedPassword($newRetypedPassword): void
    {
        $this->newRetypedPassword = $newRetypedPassword;
    }

    public function getOldPassword(): ?string
    {
        return $this->oldPassword;
    }

    public function setOldPassword($oldPassword): void
    {
        $this->oldPassword = $oldPassword;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Prestation>
     */
    public function getPrestations(): Collection
    {
        return $this->prestations;
    }

    public function addPrestation(Prestation $prestation): self
    {
        if (!$this->prestations->contains($prestation)) {
            $this->prestations[] = $prestation;
            $prestation->setOwner($this);
        }

        return $this;
    }

    public function removePrestation(Prestation $prestation): self
    {
        if ($this->prestations->removeElement($prestation)) {
            // set the owning side to null (unless already changed)
            if ($prestation->getOwner() === $this) {
                $prestation->setOwner(null);
            }
        }

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(?string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function isEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(?bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function getPasswordChangedDate(): ?int
    {
        return $this->passwordChangedDate;
    }

    public function setPasswordChangedDate(?int $passwordChangedDate): self
    {
        $this->passwordChangedDate = $passwordChangedDate;

        return $this;
    }

    public function getConfirmationToken(): ?string
    {
        return $this->confirmationToken;
    }

    public function setConfirmationToken(?string $confirmationToken): self
    {
        $this->confirmationToken = $confirmationToken;

        return $this;
    }
}
