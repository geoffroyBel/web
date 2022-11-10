<?php

namespace App\Elasticsearch\Command;

use App\Repository\PrestationRepository;
use Elastica\Document;
use JoliCode\Elastically\Client;
use JoliCode\Elastically\Factory;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateIndexCommand extends Command
{
    protected static $defaultName = 'app:elasticsearch:create-index';
    private $client;
    private $postRepository;

    protected function configure()
    {
        $this
            ->setDescription('Build new index from scratch and populate.')
        ;
    }

    public function __construct(Client $client, PrestationRepository $postRepository)
    {
        
        $this->client = $client;
        $this->postRepository = $postRepository;
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
         $indexBuilder = $this->client->getIndexBuilder();
        $newIndex = $indexBuilder->createIndex('prestation');
        $indexer = $this->client->getIndexer();

        $allPosts = $this->postRepository->createQueryBuilder('prestation')->getQuery()->iterate();
        foreach ($allPosts as $post) {
            $post = $post[0];
            $indexer->scheduleIndex($newIndex, new Document($post->getId(), $post->toModel()));
        }

        $indexer->flush();

        $indexBuilder->markAsLive($newIndex, 'prestation');
        $indexBuilder->speedUpRefresh($newIndex);
        $indexBuilder->purgeOldIndices('prestation');

         return Command::SUCCESS;
    }
}