<?php


namespace App\Services;


use App\Entity\Company;
use App\Entity\User;
use PhpParser\Node\Expr\Cast\String_;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiConnectionException;
use Stripe\Exception\ApiErrorException;
use Stripe\Exception\AuthenticationException;
use Stripe\Exception\InvalidRequestException;
use Stripe\Exception\RateLimitException;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\EphemeralKey;
use Stripe\PaymentIntent;
use Stripe\Event;
use Stripe\Account;
use Stripe\AccountLink;

use Ramsey\Uuid\Uuid;

class StripeService extends Stripe
{

    /**
     * @var String
     */
    private $key;
    /**
     * @var String
     */
    private $domain;

    /**
     * @var String
     */
    private $endPointSecret;

    public $error;

    public function __construct(String $secret, String $domain, String $endPointSecret )
    {
        $this->domain = $domain;
        $this->endPointSecret = $endPointSecret;
        
        self::setApiKey($secret);


    }

    /**
     * @param mixed $payload
     * @param string $signature
     * @return Event
     * @throws \Exception
     */
    public function getStripeEvents($payload, $signature) 
    {
        try {
            return \Stripe\Webhook::constructEvent(
                $payload,
                $signature,
                $this->endPointSecret
            );
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
    /**
     * @param Account $account
     * @return AccountLink
     * @throws \Exception
     */
    public function createAccountLink($account): AccountLink
    {
        
        return AccountLink::create([
            'account' => $account->id,
            'refresh_url' => "$this->domain/company/create/3?success=false",
            'return_url' => "$this->domain/company/create/3?success=true",
            'type' => 'account_onboarding',
          ]);
    }
    /**
     * @param Company $token
     * @return Account
     * @throws \Exception
     */
    public function createAccount(Company $company): Account
    {
        try {
            return Account::create([
                'country' => 'FR',
                'type' => 'express',
                'capabilities' => [
                  'card_payments' => ['requested' => true],
                  'transfers' => ['requested' => true],
                ],
                'business_profile' => [
                    'mcc' => '5734',
                     'url' => 'http://www.slideguide.com'
                ],
                'business_type' => 'individual',
                'metadata'=> [ 'id'=>  $company->getId()],
            ]);
        } catch (RateLimitException $e) {
            $this->error = "Too many requests made to the API too quickly";
        } catch (InvalidRequestException $e) {
            //$this->error = $e->getMessage();
            $this->error = $e->getMessage();
        } catch (AuthenticationException $e) {
            $this->error = "Authentication with Stripe's API failed check keys";
        } catch (ApiConnectionException $e) {
            $this->error = "Network communication with Stripe failed";
        } catch (ApiErrorException $e) {
            $this->error = "check stripe account";
        }catch (\Exception $e) {
            $this->error = "Something else happened, completely unrelated to Stripe";
        }
        throw new \Exception($this->error);
    }








    /**
     * @return mixed
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * @param mixed $error
     */
    public function setError($error): void
    {
        $this->error = $error;
    }

}