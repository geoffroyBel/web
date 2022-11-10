<?php

namespace App\Security;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\ExpiredTokenException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\InvalidPayloadException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\InvalidTokenException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\PreAuthenticationJWTUserToken;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Guard\JWTTokenAuthenticator;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authenticator\JWTAuthenticator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;



use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
class TokenAuthenticator extends JWTAuthenticator
{
    // Your own logic
    private $jwt;
    public function __construct( JWTTokenManagerInterface $jwtManager,
    EventDispatcherInterface $eventDispatcher,
    TokenExtractorInterface $tokenExtractor,
    UserProviderInterface $userProvider,
    TranslatorInterface $translator = null )
    {
        parent::__construct(
            $jwtManager, 
            $eventDispatcher, 
            $tokenExtractor, 
            $userProvider, $translator
        );
    }
    /**
     * @return Passport
     */
    public function doAuthenticate(Request $request) /*: Passport */
    {
        $token = ($this->getTokenExtractor())->extract($request);

        $jwt = $this->getJwtManager();
        try {
            if (!$payload = $jwt->parse($token)) {
                throw new InvalidTokenException('Invalid JWT Token');
            }
            
        } catch (JWTDecodeFailureException $e) {
            if (JWTDecodeFailureException::EXPIRED_TOKEN === $e->getReason()) {
                throw new ExpiredTokenException();
            }

            throw new InvalidTokenException('Invalid JWT Token', 0, $e);
        }
        
        $idClaim = $jwt->getUserIdClaim();
        if (!isset($payload[$idClaim])) {
            throw new InvalidPayloadException($idClaim);
        }

        $passport = new SelfValidatingPassport(
            new UserBadge((string)$payload[$idClaim],
            function ($userIdentifier) use($payload) {
                return $this->loadUser($payload, $userIdentifier);
            })
        );
        /**@var User */
        $user = $passport->getUser();
        if ($user->getPasswordChangedDate() &&
           $payload["iat"] < $user->getPasswordChangedDate()) {
            throw new ExpiredTokenException();
        } 
        $passport->setAttribute('payload', $payload);
        $passport->setAttribute('token', $token);   
        return $passport;
    }
}
// class TokenAuthenticator extends JWTTokenAuthenticator
// {
//     /**
//      * @param PreAuthenticationJWTUserToken $preAuthToken
//      * @param UserProviderInterface $userProvider
//      * @return null|\Symfony\Component\Security\Core\User\UserInterface|void
//      */
//     public function getUser($preAuthToken, UserProviderInterface $userProvider)
//     {
//         /** @var User $user */
//         $user = parent::getUser(
//             $preAuthToken,
//             $userProvider
//         );

//        if ($user->getPasswordChangedDate() &&
//            $preAuthToken->getPayload()["iat"] < $user->getPasswordChangedDate()) {
//             throw new ExpiredTokenException();
//        }

//         return $user;
//     }

// }