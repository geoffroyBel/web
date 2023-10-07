<?php


namespace App\Mailer;


use App\Entity\Command;
use App\Entity\Company;
use App\Entity\User;
use Endroid\QrCode\Factory\QrCodeFactoryInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Twig\Environment;

class Mailer
{
    /**
     * @var MailerInterface
     */
    private $mailer;
    /**
     * @var Environment
     */
    private $twig;


    public function __construct( MailerInterface $mailer, Environment $twig)
    {
        $this->mailer = $mailer;
        $this->twig = $twig;

    }

    public function sendConfirmationUser(User $user )
    {

       // $qrCode = $this->qrCodeFactory->create('QR Code', ['size' => 200]);
        $email = (new TemplatedEmail())
            ->from(new Address('slideguide76@gmail.com'))
            ->to(new Address($user->getEmail()))
            ->subject('Api Thanks for signing up!')

            // path of the Twig template to render
            ->htmlTemplate('Email/confirmation.html.twig')

            // pass variables (name => value) to the template
            ->context([
                'expiration_date' => new \DateTime('+7 days'),
                "user" => $user,
               // "img" => $img
            ])
        ;

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            var_dump($e->getMessage());
            // some error prevented the email sending; display an
            // error message or try to resend the message
        }
    }
}