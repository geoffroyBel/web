<?php
namespace App\Controller;

use App\Services\AwsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AwsUrlAction extends AbstractController
{
    public function __construct(private AwsService $aws)
    {
        
    }
    public function __invoke(Request $request)
    {
        try {
            $uri = $this->aws->preSignUrl();
            return new JsonResponse($uri, Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse($uri, Response::HTTP_FORBIDDEN);
        }
        
        
    }
}