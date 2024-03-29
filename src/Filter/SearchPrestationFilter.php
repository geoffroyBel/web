<?php
// api/src/Filter/RegexpFilter.php

namespace App\Filter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractContextAwareFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;
use JoliCode\Elastically\Client;
use JoliCode\Elastically\Messenger\IndexationRequest;
use Elastica\Query\MultiMatch;


use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Serializer\NameConverter\NameConverterInterface;
use ApiPlatform\Core\Exception\InvalidArgumentException;

final class SearchPrestationFilter extends AbstractContextAwareFilter
{



    public function __construct( ManagerRegistry $managerRegistry, ?RequestStack $requestStack = null, LoggerInterface $logger = null, array $properties = null, NameConverterInterface $nameConverter = null, string $searchParameterName = 'simplesearch')
    {
        parent::__construct($managerRegistry, $requestStack, $logger, $properties, $nameConverter);

       
    }
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        // otherwise filter is applied to order and page as well
  
        if (
            'categories' !== $property && ( 
            !$this->isPropertyEnabled($property, $resourceClass) ||
            !$this->isPropertyMapped($property, $resourceClass) )
        ) {
            return;
        }

         $parameterName = $queryNameGenerator->generateParameterName($property); // Generate a unique parameter name to avoid collisions with other filters

        if($property == "categories") {
            $queryBuilder
            ->leftJoin('o.categories', 'c')
            ->addSelect('c')
            ->andWhere(sprintf('c.%s LIKE :%s', 'title', $parameterName, $property))
            ->setParameter($parameterName, $value.'%');;
        } else {
            $queryBuilder
            ->andWhere(sprintf('o.%s = :%s', $property, $parameterName, $property))
            ->setParameter($parameterName, $value);;
        }

    }

    // This function is only used to hook in documentation generators (supported by Swagger and Hydra)
    public function getDescription(string $resourceClass): array
    {
        if (!$this->properties) {
            return [];
        }

        return [
            'name' => [
                'property' => 'name',
                'type' => 'string',
                'required' => false,
            ],
            'categories' => [
                'property' => 'categories',
                'type' => 'string',
                'required' => false,
            ],
        ];
    }
}