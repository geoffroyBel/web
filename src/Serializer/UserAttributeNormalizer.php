<?php

namespace App\Serializer;

use App\Entity\User;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserAttributeNormalizer implements NormalizerInterface
{
    const USER_ATTRIBUTE_NORMALIZER_ALREADY_CALLED = 'USER_ATTRIBUTE_NORMALIZER_ALREADY_CALLED';
    private $router;
    private $normalizer;

    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;
    private $security;

    public function __construct(UrlGeneratorInterface $router, Security $security, TokenStorageInterface $tokenStorage, ObjectNormalizer $normalizer)
    {
        $this->tokenStorage = $tokenStorage;
        $this->serializer = $normalizer;
        $this->security = $security;
        $this->router = $router;
    }

    public function normalize($object, string $format = null, array $context = [])
    {
        if ($this->isUserHimself($object)) {
            $context['groups'][] = 'get-owner';
        }

        // Now continue with serialization
        return $this->passOn($object, $format, $context);
    }

    private function passOn($object, $format, $context)
    {
        if (!$this->serializer instanceof NormalizerInterface) {
            throw new \LogicException(
                sprintf(
                    'Cannot normalize object "%s" becouse the injected serializer is not a normalizer.',
                    $object
                )
            );
        }

        $context[self::USER_ATTRIBUTE_NORMALIZER_ALREADY_CALLED] = true;

        $data = $this->serializer->normalize($object, $format, $context);
        // $data['href']['self'] = $this->router->generate('topic_show', [
        //     'id' => $object->getId(),
        // ], UrlGeneratorInterface::ABSOLUTE_URL);

        return $data;
    }
    public function supportsNormalization($data, string $format = null, array $context = [])
    {
        if (isset($context[self::USER_ATTRIBUTE_NORMALIZER_ALREADY_CALLED])) {
            return false;
        }
        return $data instanceof User;
    }

    private function isUserHimself($object)
    {
        /**@var User */
        $user = $this->security->getUser();
        return $this->tokenStorage->getToken() && $object->getUsername() === $user->getUsername();
    }
}