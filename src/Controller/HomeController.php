<?php

namespace App\Controller;

use App\Security\UserConfirmationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route("/{reactRouting}", priority: -1, name: 'app_home', defaults:["reactRouting" => null], requirements: ["reactRouting"=>"((home|login|company|prestation).+)"])]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route("/confirm-user/{token}", name: "default_confirm_token")]
    public function confirmUser(string $token, UserConfirmationService $userConfirmationService)
    {
        $userConfirmationService->confirmUser($token);
        return $this->json(["confirmUser" => "ok"]);
        //$this->redirectToRoute("default_index");

    }
}
