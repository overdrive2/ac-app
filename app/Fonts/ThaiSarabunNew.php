<?php

declare(strict_types=1);

namespace App\Fonts;

use Endroid\QrCode\Label\Font\FontInterface;

final readonly class ThaiSarabunNew implements FontInterface
{
    public function __construct(
        private int $size = 16,
    ) {
    }

    public function getPath(): string
    {
        return public_path('fonts/THSarabunNew.ttf');
        //return __DIR__.'/../../../assets/open_sans.ttf';
    }

    public function getSize(): int
    {
        return $this->size;
    }
}
