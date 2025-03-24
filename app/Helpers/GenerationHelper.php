<?php

namespace App\Helpers;

class GenerationHelper
{
    public static function getGenerations(): array
    {
        $baseYear = 2012; // Assuming 3rd gen started in 2012
        $currentYear = date('Y');
        $generations = [
            '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th'
        ];

        // Calculate the next generation number
        $lastGenNumber = 17;
        $lastGenYear = $baseYear + (($lastGenNumber - 3) * 5);

        for ($year = $lastGenYear + 5, $gen = $lastGenNumber + 1; $year <= $currentYear; $year += 5, $gen++) {
            $generations[] = self::ordinal($gen);
        }

        $generations[] = 'Pentium';
        $generations[] = 'N/A';

        return $generations;
    }

    private static function ordinal(int $number): string
    {
        $suffix = 'th';
        if (!in_array(($number % 100), [11, 12, 13])) {
            switch ($number % 10) {
                case 1: $suffix = 'st'; break;
                case 2: $suffix = 'nd'; break;
                case 3: $suffix = 'rd'; break;
            }
        }
        return "{$number}{$suffix}";
    }
};