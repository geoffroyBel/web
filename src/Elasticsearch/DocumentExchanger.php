<?php


namespace App\Elasticsearch;

use App\Model\Prestation;
use App\Repository\PrestationRepository;
use Elastica\Document;
use JoliCode\Elastically\Messenger\DocumentExchangerInterface;

class DocumentExchanger implements DocumentExchangerInterface
{
    private $postRepository;

    public function __construct(PrestationRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function fetchDocument(string $className, string $id): ?Document
    {
        var_dump("yoooooooooooo");
        if ($className === Prestation::class) {
            $post = $this->postRepository->find($id);
            if ($post) {
                return new Document($id, $post->toModel());
            }
        }

        return null;
    }
}