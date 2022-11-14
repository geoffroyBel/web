<?php


namespace App\Serializer;


use ApiPlatform\Core\Exception\RuntimeException;
use ApiPlatform\Core\Serializer\SerializerContextBuilderInterface;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class UserContextBuilder implements SerializerContextBuilderInterface
{

    /**
     * @var SerializerContextBuilderInterface
     */
    private $decorate;
    /**
     * @var AuthorizationCheckerInterface
     */
    private $checker;

    public function __construct(SerializerContextBuilderInterface $decorate, AuthorizationCheckerInterface $checker)
    {
        $this->decorate = $decorate;
        $this->checker = $checker;
    }

    /**
     * @inheritDoc
     */
    public function createFromRequest(Request $request, bool $normalization, array $extractedAttributes = null): array
    {
        $context = $this->decorate->createFromRequest(
            $request, $normalization, $extractedAttributes
        );

        //class t be Serialize
        $resourceClass = $context["resource_class"] ?? null;

        if (
            $resourceClass === User::class &&
            isset($context["groups"]) &&
            $normalization === true &&
            $this->checker->isGranted(User::ROLE_ADMIN)
        )
        {
            $context["groups"][] = "get-admin";
        }
        return $context;
    }
}