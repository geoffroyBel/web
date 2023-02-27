<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\AwsUrlAction;
use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
#[ApiResource(collectionOperations: ["get","post", "post_aws_url" => [      
    'method' => 'POST',
    'path' => '/image/presignUrl',
    'controller' => AwsUrlAction::class,
    'defaults'=> ["_api_receive"=>false],
    'read' => false,
]], itemOperations: ["get"])]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $url = null;

    #[ORM\ManyToOne(inversedBy: 'images')]
    #[ORM\JoinColumn(onDelete:"CASCADE")]

    private ?User $user = null;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
