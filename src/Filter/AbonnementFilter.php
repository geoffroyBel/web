<?php
namespace App\Filter;

use App\Entity\Abonnement;
use App\Entity\Tarif;
use App\Modifier\Factory\AbonnementModifierFactoryInterface;
use App\Entity\Company;
use App\Entity\Prestation;
class AbonnementFilter implements AbonnementFilterInterface {

    public function __construct(private AbonnementModifierFactoryInterface $modifierFactory)
    {
       
    }
    public function apply(Abonnement $subscription, Tarif $tarif): Abonnement
    {
        //si abonnement forfait pas de date expiration
        $modifierCredits = $this->modifierFactory->create($tarif->getType());
        
        [$credits, $expireAt] = $modifierCredits->modify($subscription, $tarif->getCredits());
        
        if(isset($credits))$subscription->setCredits($credits );
        if(isset($expireAt))$subscription->setExpireAt($expireAt);
        return $subscription;
    }
 }
 

// <?php

// namespace App\Filter;

// use App\Entity\Promotion;
// use App\DTO\PriceEnquiryInterface;
// use App\Filter\Modifier\Factory\PriceModifierFactoryInterface;

// class LowestPriceFilter implements PriceFilterInterface
// {
//     public function __construct(private PriceModifierFactoryInterface $priceModifierFactory)
//     {
//     }


//     public function apply(PriceEnquiryInterface $enquiry, Promotion ...$promotions)
//     : PriceEnquiryInterface
//     {
//         $price = $enquiry->getProduct()->getPrice();
//         $enquiry->setPrice($price);
//         $quantity = $enquiry->getQuantity();
//         $lowestPrice = $quantity * $price;

//         foreach ($promotions as $promotion) {

//             $priceModifier = $this->priceModifierFactory->create($promotion->getType());

//             $modifiedPrice = $priceModifier->modify($price, $quantity, $promotion, $enquiry);

//             if($modifiedPrice < $lowestPrice) {

//                 $enquiry->setDiscountedPrice($modifiedPrice);
//                 $enquiry->setPromotionId($promotion->getId());
//                 $enquiry->setPromotionName($promotion->getName());

//                 $lowestPrice = $modifiedPrice;
//             }
//         }

//         return $enquiry;
//     }
// }




