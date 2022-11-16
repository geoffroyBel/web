<?php


namespace App\Security;


class ConfirmationCodeGenerator
{

    public function getRandomConfirmationCode(int $length = 6): int
    {
        $code = "";
        $maxNumber = 10;

        for ($i = 0; $i < $length; $i++) {
            $code .= random_int(0, $maxNumber - 1);
        }

        return (int) $code;
    }
}