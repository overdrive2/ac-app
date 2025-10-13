<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            // 💻 Computer & IT
            ['brand_name' => 'Dell', 'brand_name_en' => 'Dell', 'origin_country' => 'USA'],
            ['brand_name' => 'HP', 'brand_name_en' => 'Hewlett-Packard', 'origin_country' => 'USA'],
            ['brand_name' => 'Lenovo', 'brand_name_en' => 'Lenovo', 'origin_country' => 'China'],
            ['brand_name' => 'ASUS', 'brand_name_en' => 'ASUSTeK Computer', 'origin_country' => 'Taiwan'],
            ['brand_name' => 'Acer', 'brand_name_en' => 'Acer', 'origin_country' => 'Taiwan'],
            ['brand_name' => 'Apple', 'brand_name_en' => 'Apple Inc.', 'origin_country' => 'USA'],
            ['brand_name' => 'MSI', 'brand_name_en' => 'Micro-Star International', 'origin_country' => 'Taiwan'],
            ['brand_name' => 'Gigabyte', 'brand_name_en' => 'Gigabyte Technology', 'origin_country' => 'Taiwan'],
            ['brand_name' => 'Intel', 'brand_name_en' => 'Intel Corporation', 'origin_country' => 'USA'],
            ['brand_name' => 'AMD', 'brand_name_en' => 'Advanced Micro Devices', 'origin_country' => 'USA'],
            ['brand_name' => 'Microsoft', 'brand_name_en' => 'Microsoft', 'origin_country' => 'USA'],
            ['brand_name' => 'Cisco', 'brand_name_en' => 'Cisco Systems', 'origin_country' => 'USA'],
            ['brand_name' => 'Netgear', 'brand_name_en' => 'Netgear', 'origin_country' => 'USA'],
            ['brand_name' => 'TP-Link', 'brand_name_en' => 'TP-Link', 'origin_country' => 'China'],
            ['brand_name' => 'Ubiquiti', 'brand_name_en' => 'Ubiquiti Networks', 'origin_country' => 'USA'],

            // 🖥️ Monitor & Display
            ['brand_name' => 'Samsung', 'brand_name_en' => 'Samsung Electronics', 'origin_country' => 'Korea'],
            ['brand_name' => 'LG', 'brand_name_en' => 'LG Electronics', 'origin_country' => 'Korea'],
            ['brand_name' => 'BenQ', 'brand_name_en' => 'BenQ Corporation', 'origin_country' => 'Taiwan'],
            ['brand_name' => 'ViewSonic', 'brand_name_en' => 'ViewSonic Corporation', 'origin_country' => 'USA'],
            ['brand_name' => 'Philips', 'brand_name_en' => 'Philips', 'origin_country' => 'Netherlands'],

            // 🖨️ Printer & Office Equipment
            ['brand_name' => 'Canon', 'brand_name_en' => 'Canon Inc.', 'origin_country' => 'Japan'],
            ['brand_name' => 'Epson', 'brand_name_en' => 'Seiko Epson', 'origin_country' => 'Japan'],
            ['brand_name' => 'Brother', 'brand_name_en' => 'Brother Industries', 'origin_country' => 'Japan'],
            ['brand_name' => 'Fuji Xerox', 'brand_name_en' => 'Fujifilm Business Innovation', 'origin_country' => 'Japan'],
            ['brand_name' => 'Ricoh', 'brand_name_en' => 'Ricoh Company', 'origin_country' => 'Japan'],
            ['brand_name' => 'Panasonic', 'brand_name_en' => 'Panasonic Corporation', 'origin_country' => 'Japan'],
            ['brand_name' => 'Sharp', 'brand_name_en' => 'Sharp Corporation', 'origin_country' => 'Japan'],

            // 🔌 Electronics & Appliances
            ['brand_name' => 'Toshiba', 'brand_name_en' => 'Toshiba Corporation', 'origin_country' => 'Japan'],
            ['brand_name' => 'Hitachi', 'brand_name_en' => 'Hitachi', 'origin_country' => 'Japan'],
            ['brand_name' => 'Sony', 'brand_name_en' => 'Sony Corporation', 'origin_country' => 'Japan'],
            ['brand_name' => 'Mitsubishi', 'brand_name_en' => 'Mitsubishi Electric', 'origin_country' => 'Japan'],
            ['brand_name' => 'Philco', 'brand_name_en' => 'Philco', 'origin_country' => 'USA'],
            ['brand_name' => 'Electrolux', 'brand_name_en' => 'Electrolux', 'origin_country' => 'Sweden'],
            ['brand_name' => 'Whirlpool', 'brand_name_en' => 'Whirlpool Corporation', 'origin_country' => 'USA'],
            ['brand_name' => 'Haier', 'brand_name_en' => 'Haier Group', 'origin_country' => 'China'],
            ['brand_name' => 'Daikin', 'brand_name_en' => 'Daikin Industries', 'origin_country' => 'Japan'],

            // 🧰 Tools & Industrial
            ['brand_name' => 'Bosch', 'brand_name_en' => 'Robert Bosch GmbH', 'origin_country' => 'Germany'],
            ['brand_name' => 'Makita', 'brand_name_en' => 'Makita Corporation', 'origin_country' => 'Japan'],
            ['brand_name' => 'Hitachi Koki', 'brand_name_en' => 'HiKOKI Power Tools', 'origin_country' => 'Japan'],
            ['brand_name' => 'Stanley', 'brand_name_en' => 'Stanley Black & Decker', 'origin_country' => 'USA'],
            ['brand_name' => '3M', 'brand_name_en' => '3M Company', 'origin_country' => 'USA'],
            ['brand_name' => 'Fluke', 'brand_name_en' => 'Fluke Corporation', 'origin_country' => 'USA'],
            ['brand_name' => 'Karcher', 'brand_name_en' => 'Alfred Kärcher SE & Co.', 'origin_country' => 'Germany'],
            ['brand_name' => 'Hilti', 'brand_name_en' => 'Hilti Corporation', 'origin_country' => 'Liechtenstein'],

            // 🏥 Medical & Health
            ['brand_name' => 'Philips Healthcare', 'brand_name_en' => 'Philips Healthcare', 'origin_country' => 'Netherlands'],
            ['brand_name' => 'GE Healthcare', 'brand_name_en' => 'General Electric Healthcare', 'origin_country' => 'USA'],
            ['brand_name' => 'Siemens Healthineers', 'brand_name_en' => 'Siemens Healthineers', 'origin_country' => 'Germany'],
            ['brand_name' => 'Mindray', 'brand_name_en' => 'Mindray Medical', 'origin_country' => 'China'],
            ['brand_name' => 'Dräger', 'brand_name_en' => 'Drägerwerk AG', 'origin_country' => 'Germany'],
            ['brand_name' => 'Omron', 'brand_name_en' => 'Omron Healthcare', 'origin_country' => 'Japan'],
            ['brand_name' => 'Nihon Kohden', 'brand_name_en' => 'Nihon Kohden Corporation', 'origin_country' => 'Japan'],
            ['brand_name' => 'Medtronic', 'brand_name_en' => 'Medtronic plc', 'origin_country' => 'Ireland'],
            ['brand_name' => 'Abbott', 'brand_name_en' => 'Abbott Laboratories', 'origin_country' => 'USA'],
            ['brand_name' => 'Roche', 'brand_name_en' => 'F. Hoffmann-La Roche AG', 'origin_country' => 'Switzerland'],
            ['brand_name' => 'B. Braun', 'brand_name_en' => 'B. Braun Melsungen AG', 'origin_country' => 'Germany'],
        ];

        Brand::insert($brands);
    }
}
