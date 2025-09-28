<?php

namespace Database\Seeders;

use App\Models\AssetCategory;
use Illuminate\Database\Seeder;

class AssetCategorySeeder extends Seeder {
    
    public function run() {
        $categories = [
            ['code' => '01', 'name' => 'อาคารอาถาวร',       'name_en' => 'Permanent Buildings'],
            ['code' => '02', 'name' => 'อาคารชั่วคราว/โรงเรือน', 'name_en' => 'Temporary Buildings / Sheds'],
            ['code' => '03', 'name' => 'สิ่งก่อสร้าง',        'name_en' => 'Constructions'],
            ['code' => '04', 'name' => 'ครุภัณฑ์สำนักงาน',     'name_en' => 'Office Equipment'],
            ['code' => '05', 'name' => 'ครุภัณฑ์ยานพาหนะและขนส่ง', 'name_en' => 'Vehicles & Transportation Equipment'],
            ['code' => '06', 'name' => 'ครุภัณฑ์สิ่งก่อสร้าง',  'name_en' => 'Construction Equipment'],
            ['code' => '07', 'name' => 'ครุภัณฑ์ไฟฟ้า',        'name_en' => 'Electrical Equipment'],
            ['code' => '08', 'name' => 'ครุภัณฑ์โฆษณาและเผยแพร่', 'name_en' => 'Advertising & Publicity Equipment'],
            ['code' => '09', 'name' => 'ครุภัณฑ์การเกษตร',     'name_en' => 'Agricultural Equipment'],
            ['code' => '10', 'name' => 'ครุภัณฑ์โรงงาน',       'name_en' => 'Factory Equipment'],
            ['code' => '11', 'name' => 'ครุภัณฑ์สำรวจ',       'name_en' => 'Survey Equipment'],
            ['code' => '12', 'name' => 'ครุภัณฑ์คอมพิวเตอร์',  'name_en' => 'Computer Equipment'],
            ['code' => '13', 'name' => 'ครุภัณฑ์งานครัว',      'name_en' => 'Kitchen Equipment'],
            ['code' => '14', 'name' => 'ครุภัณฑ์การศึกษา',     'name_en' => 'Educational Equipment'],
            ['code' => '15', 'name' => 'ครุภัณฑ์อาวุธ',       'name_en' => 'Weapons & Military Equipment'],
            ['code' => '16', 'name' => 'อื่น ๆ',              'name_en' => 'Others'],
        ];

        foreach ($categories as $cat) {
            AssetCategory::create($cat);
        }
    }
}
