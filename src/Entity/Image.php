<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\AwsUrlAction;
use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
#[ApiResource(
    attributes:["pagination_items_per_page" => 5 ],
    collectionOperations: 
        [
            "get",
            "post",
            "post_aws_url" => [      
            'method' => 'POST',
            'path' => '/image/presignUrl',
            'controller' => AwsUrlAction::class,
            'defaults'=> ["_api_receive"=>false],
            'read' => false]
        ],
        itemOperations: 
        [
            "get"
        ]
)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["list_prestation"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["list_prestation"])]
    private ?string $url = null;

    #[ORM\ManyToOne(inversedBy: 'images')]
    #[ORM\JoinColumn(onDelete:"CASCADE")]
    private ?User $owner = null;

    #[ORM\ManyToOne(inversedBy: 'images')]
    private ?Prestation $prestation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $user): self
    {
        $this->owner = $user;

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
