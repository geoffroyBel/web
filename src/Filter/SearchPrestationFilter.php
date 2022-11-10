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
    private Client $client;


    public function __construct(Client $client, ManagerRegistry $managerRegistry, ?RequestStack $requestStack = null, LoggerInterface $logger = null, array $properties = null, NameConverterInterface $nameConverter = null, string $searchParameterName = 'simplesearch')
    {
        parent::__construct($managerRegistry, $requestStack, $logger, $properties, $nameConverter);

        $this->client = $client;
    }
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        // otherwise filter is applied to order and page as well
     

         $parameterName = $queryNameGenerator->generateParameterName($property); // Generate a unique parameter name to avoid collisions with other filters
         $searchQuery = new MultiMatch();
         $searchQuery->setFields([
            'name^3',
            'name.autocomplete'
         ]); 
         $searchQuery->setQuery($value);
         $searchQuery->setType(MultiMatch::TYPE_MOST_FIELDS);
         $foundPosts = $this->client->getIndex('prestation')->search($searchQuery);
      
         $results = [];
         $ids = [];
         foreach ($foundPosts->getResults() as $result) { 
             $ids[] = $result->getDocument()->getId();  
         }
         if (empty($ids)) {
            $queryBuilder->andWhere('1 = 0'); // enforce empty result
            return;
        }
        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere("$rootAlias.id IN (:fulltext_search_filter_ids)");
        $queryBuilder->setParameter('fulltext_search_filter_ids', $ids);
        
         // $queryBuilder
        //     ->andWhere(sprintf('REGEXP(o.%s, :%s) = 1', $property, $parameterName))
        //     ->setParameter($parameterName, $value);
    }

    // This function is only used to hook in documentation generators (supported by Swagger and Hydra)
    public function getDescription(string $resourceClass): array
    {
        if (!$this->properties) {
            return [];
        }

        return [
            'q' => [
                'property' => 'q',
                'type' => 'string',
                'required' => false,
            ],
            'order[relevance]' => [
                'property' => 'order[relevance]',
                'type' => 'string',
                'required' => false,
            ],
        ];
    }
}