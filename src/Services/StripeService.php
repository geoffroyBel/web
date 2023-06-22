<?php


namespace App\Services;


use App\Entity\Company;
use App\Entity\Prestation;
use App\Entity\Tarif;
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
use Stripe\Product;

use Ramsey\Uuid\Uuid;
use Stripe\Price;

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

    public function createSession(Prestation $prestation, Tarif $tarif, $quantity)
    {

        /*
        $accountId = $prestation->getCompany()->getAccountID();
        
        $session = Session::create([
        'line_items' => [[
            'price' => '$priceId',
            'quantity' => 1,
        ]],
        'payment_intent_data' => [
            'application_fee_amount' => 123,
        ],
        'mode' => 'payment',
        'success_url' => 'https://example.com/success',
        'cancel_url' => 'https://example.com/cancel',
        ], ['stripe_account' => '{{CONNECTED_STRIPE_ACCOUNT_ID}}']);
        */
        $baseSuccessUrl = $this->domain."/home/sports/detail/".$prestation->getId();

        try {
                $accountId = $prestation->getCompany()->getAccountID();
                $priceId = $tarif->getPrice();
                return Session::create([
                    'payment_method_types' => ['card'],
                    'line_items' => [[
                        'name' => $prestation->getName(),
                        'description' => 'Comfortable cotton t-shirt',
                        'amount' => $tarif->getPrice() * 100,
                        'currency' => 'eur',
                        'quantity' => $quantity,
                    ]],
                    'payment_intent_data' => [
                        'application_fee_amount' => 123,
                        // 'transfer_data' => ['destination' => $accountId],
                      ],
                      'success_url' => $baseSuccessUrl."?success=true",
                      'cancel_url' => $baseSuccessUrl."?success=false",
                ], ['stripe_account' => $accountId]);

        } catch (RateLimitException $e) {
            $this->error = "Too many requests made to the API too quickly";
        } catch (InvalidRequestException $e) {
          
            $this->error = "Invalid parameters were supplied to Stripe's API";

        } catch (AuthenticationException $e) {
            $this->error = "Authentication with Stripe's API failed check keys";
        } catch (ApiConnectionException $e) {
            $this->error = "Network communication with Stripe failed";
        } catch (ApiErrorException $e) {
            $this->error = "check stripe account";
        }catch (\Exception $e) {
            $this->error = "Something else happened, completely unrelated to Stripe";
        }
       // var_dump($this->error);
       throw new \Exception($this->error);
    }

    public function createProduct($name, $accountID):?Product
    {
        try {
            return Product::create(
                [
                    'active' => true,
                    'name' => $name,
                ], 
                [
                'stripe_account' => $accountID
                ]
            );
        } catch (RateLimitException $e) {
            $this->error = "Too many requests made to the API too quickly";
        } catch (InvalidRequestException $e) {
          
            $this->error = "Invalid parameters were supplied to Stripe's API";

        } catch (AuthenticationException $e) {
            $this->error = "Authentication with Stripe's API failed check keys";
        } catch (ApiConnectionException $e) {
            $this->error = "Network communication with Stripe failed";
        } catch (ApiErrorException $e) {
            $this->error = "check stripe account";
        }catch (\Exception $e) {
            $this->error = "Something else happened, completely unrelated to Stripe";
        }
       // var_dump($this->error);
       throw new ServiceException(new ServiceExceptionData(500, $this->error));
    }
    
    public function createPrice ($productId, $accountId, $data): ?Price
    {
        // $stripe->prices->create([
//     'product' => '{{PRODUCT_ID}}',
//     'unit_amount' => 2000,
//     'currency' => 'usd',
//     'recurring' => ['interval' => 'month'],
//     'lookup_key' => 'standard_monthly',
//     'transfer_lookup_key' => true,
//   ]);
        try { 
            return Price::create([ 
                    'product' => $productId,
                    'unit_amount' => 2000,
                    'currency' => 'eur',
            ],
            [
                'stripe_account' => $accountId
            ]);
        } catch (RateLimitException $e) {
            $this->error = "Too many requests made to the API too quickly";
        } catch (InvalidRequestException $e) {
        var_dump($e->getMessage());
            $this->error = "Invalid parameters were supplied to Stripe's API";

        } catch (AuthenticationException $e) {
            $this->error = "Authentication with Stripe's API failed check keys";
        } catch (ApiConnectionException $e) {
            $this->error = "Network communication with Stripe failed";
        } catch (ApiErrorException $e) {
            $this->error = "check stripe account";
        }catch (\Exception $e) {
            $this->error = "Something else happened, completely unrelated to Stripe";
        }
     
        throw new ServiceException(new ServiceExceptionData(500, $this->error));



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