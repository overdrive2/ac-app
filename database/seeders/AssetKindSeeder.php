<?php

namespace Database\Seeders;

use App\Models\AssetKind;
use Illuminate\Database\Seeder;

class AssetKindSeeder extends Seeder {
    public function run() {
        AssetKind::truncate();

        AssetKind::create([
            'asset_category_id' => 1,
            'type_name' => 'อาคารสำนักงาน',
            'asset_code' => '9999-001',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 1,
            'type_name' => 'บ้านพักข้าราชการ ระดับ 9',
            'asset_code' => '9999-002',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 1,
            'type_name' => 'บ้านพักข้าราชการ ระดับ 1-2',
            'asset_code' => '9999-003',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 1,
            'type_name' => 'บ้านพักข้าราชการ ระดับ 3-4',
            'asset_code' => '9999-004',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 1,
            'type_name' => 'บ้านพักข้าราชการ ระดับ 5-6',
            'asset_code' => '9999-005',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 1,
            'type_name' => 'บ้านพักข้าราชการ ระดับ 7-8',
            'asset_code' => '9999-006',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 1,
            'type_name' => 'เรือนรับรอง',
            'asset_code' => '9999-011',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 1,
            'type_name' => 'หอประชุม/เอนกประสงค์',
            'asset_code' => '9999-017',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 1,
            'type_name' => 'หอพัก',
            'asset_code' => '9999-012',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 2,
            'type_name' => 'เรือนเพาะชำ',
            'asset_code' => '9999-007',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 2,
            'type_name' => 'โรงอาหาร',
            'asset_code' => '9999-014',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 2,
            'type_name' => 'โรงประกอบอาหาร/ครัว',
            'asset_code' => '9999-015',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 2,
            'type_name' => 'โรงจอดรถ',
            'asset_code' => '9999-009',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 2,
            'type_name' => 'หอส่งน้ำประปา',
            'asset_code' => '9999-021',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 2,
            'type_name' => 'ศาลาพักร้อน',
            'asset_code' => '9999-022',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 2,
            'type_name' => 'ป้อมยาม',
            'asset_code' => '9999-016',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 2,
            'type_name' => 'โรงเก็บพัสดุ',
            'asset_code' => '9999-018',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 3,
            'type_name' => 'รั้วคอนกรีต',
            'asset_code' => '9999-008',
            'useful_life' => 3,
            'depreciation_rate' => 33.33,
        ]);
        AssetKind::create([
            'asset_category_id' => 3,
            'type_name' => 'ถนนคอนกรีตภายในสำนักงาน/ถนนลาดยาง',
            'asset_code' => '9999-019',
            'useful_life' => 3,
            'depreciation_rate' => 33.33,
        ]);
        AssetKind::create([
            'asset_category_id' => 3,
            'type_name' => 'เสาธงพร้อมแท่น',
            'asset_code' => '5680-001',
            'useful_life' => 3,
            'depreciation_rate' => 33.33,
        ]);
        AssetKind::create([
            'asset_category_id' => 3,
            'type_name' => 'แท่นประดิษฐฐานพระพุทธรูป',
            'asset_code' => '5680-002',
            'useful_life' => 3,
            'depreciation_rate' => 33.33,
        ]);
        AssetKind::create([
            'asset_category_id' => 3,
            'type_name' => 'ลานกีฬาเอนกประสงค์',
            'asset_code' => '5680-003',
            'useful_life' => 3,
            'depreciation_rate' => 33.33,
        ]);
        AssetKind::create([
            'asset_category_id' => 3,
            'type_name' => 'ถังเก็บน้ำฝน (ทุกแบบ)',
            'asset_code' => '5680-004',
            'useful_life' => 3,
            'depreciation_rate' => 33.33,
        ]);
        AssetKind::create([
            'asset_category_id' => 3,
            'type_name' => 'ป้ายคอนกรีต',
            'asset_code' => '5660-001',
            'useful_life' => 3,
            'depreciation_rate' => 33.33,
        ]);
        AssetKind::create([
            'asset_category_id' => 3,
            'type_name' => 'รั้วลวดหนาม/ตระแกรงลวด',
            'asset_code' => '5660-002',
            'useful_life' => 3,
            'depreciation_rate' => 33.33,
        ]);
        AssetKind::create([
            'asset_category_id' => 3,
            'type_name' => 'รั้วไม้',
            'asset_code' => '5660-003',
            'useful_life' => 3,
            'depreciation_rate' => 33.33,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องพิมพ์เขียว',
            'asset_code' => '3610-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องพิมพ์ออฟเซท',
            'asset_code' => '3610-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องเย็บเล่ม',
            'asset_code' => '3610-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้อบฟิล์ม',
            'asset_code' => '3610-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องพ่นแป้งเพลทกระดาษ',
            'asset_code' => '3610-005',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องปรับอากาศ',
            'asset_code' => '4120-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'พัดลมตั้งพื้น',
            'asset_code' => '4140-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'พัดลมเพดาน',
            'asset_code' => '4140-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'พัดลมดูดอากาศ',
            'asset_code' => '4140-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องเป่าลม',
            'asset_code' => '4140-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องดับเพลิงเคมี',
            'asset_code' => '4120-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องฟอกอากาศ',
            'asset_code' => '4120-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'วิทยุสื่อสาร',
            'asset_code' => '5805-006',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องโทรศัพท์',
            'asset_code' => '5805-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องโทรสาร',
            'asset_code' => '5805-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องโทรศัพท์เคลื่อนที่',
            'asset_code' => '5805-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ชุมสายโทรศัพท์',
            'asset_code' => '5805-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => '(ตู้โทรศัพท์หรือตู้สาขาโทรศัพท์)',
            'asset_code' => '',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'วิทยุติดตามตัว',
            'asset_code' => '5805-005',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ชุดรับแขก',
            'asset_code' => '7105-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เตียงนอน',
            'asset_code' => '7105-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะทำงาน  ระดับ 1-2',
            'asset_code' => '7110-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะทำงาน  ระดับ 3-6',
            'asset_code' => '7110-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะทำงาน  ระดับ 7-9',
            'asset_code' => '7110-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะทำงาน  ระดับ 10',
            'asset_code' => '7110-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะวางพิมพ์ดีด',
            'asset_code' => '7110-005',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะประชุม',
            'asset_code' => '7110-006',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะเขียนแบบ',
            'asset_code' => '7110-007',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะเลย์เอ้าท์พร้อมไฟ',
            'asset_code' => '7110-008',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะวางคอมพิวเตอร์',
            'asset_code' => '7110-009',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เก้าอี้ทำงาน ระดับ 1-2',
            'asset_code' => '7110-010',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เก้าอี้ทำงาน ระดับ 3-6',
            'asset_code' => '7110-011',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เก้าอี้ทำงาน ระดับ 7-9',
            'asset_code' => '7110-012',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เก้าอี้ทำงาน ระดับ 10',
            'asset_code' => '7110-013',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เก้าอี้เขียนแบบ',
            'asset_code' => '7110-014',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เก้าอี้ฟังคำบรรยาย',
            'asset_code' => '7110-015',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เก้าอี้สำหรับเจ้าหน้าที่คอมพิวเตอร์',
            'asset_code' => '7110-016',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เก้าอี้ผู้มาติดต่อ',
            'asset_code' => '7110-017',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้ไม้เก็บเอกสาร 2 ตอน',
            'asset_code' => '7110-018',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้เหล็กชนิด 2 บาน',
            'asset_code' => '7110-019',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้เหล็กขนาด 3 ลิ้นชัก',
            'asset_code' => '7110-020',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้เหล็กขนาด 4 ลิ้นชัก',
            'asset_code' => '7110-021',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้เหล็กขนาด 6 ลิ้นชัก',
            'asset_code' => '7110-022',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้เหล็กลานเลื่อนทึบ กระจก',
            'asset_code' => '7110-023',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้ดรรชนี 12 ลิ้นชัก',
            'asset_code' => '7110-024',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้เก็บแบบฟอร์ 15 ลิ้นชัก',
            'asset_code' => '7110-025',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้นิรภัย',
            'asset_code' => '7110-026',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เก้าอี้เจ้าหน้าที่พิมพ์ดีด',
            'asset_code' => '7110-027',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะวางเครื่องพิมพ์คอมพิวเตอร์',
            'asset_code' => '7110-028',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะประชาสัมพันธ์',
            'asset_code' => '7110-029',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะเอนกประสงค์',
            'asset_code' => '7110-030',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้ล็อกเกอร์ 6 ช่อง',
            'asset_code' => '7125-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้ล็อกเกอร์ 18 ช่อง',
            'asset_code' => '7125-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ชั้นวางเอกสาร 2 ชั้น 4 ช่อง',
            'asset_code' => '7125-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ชั้นวางเอกสาร 4 ชั้น 8 ช่อง',
            'asset_code' => '7125-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ชั้นเหล็กวางเอกสาร 2 ชั้น',
            'asset_code' => '7125-005',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ชั้นเก็บของ',
            'asset_code' => '7125-006',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้แสดง/ตู้โชว์',
            'asset_code' => '7195-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ที่วางหนังสือพิมพ์',
            'asset_code' => '7195-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ชั้นวางโทรทัศน์',
            'asset_code' => '7195-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เค้าเตอร์',
            'asset_code' => '7195-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'แท่นอ่านหนังสือ',
            'asset_code' => '7195-005',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องคำนวณเลข',
            'asset_code' => '7420-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องพิมพ์ดีดไฟฟ้า',
            'asset_code' => '7430-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องพิมพ์ดีดธรรมดา',
            'asset_code' => '7430-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องถ่ายเอกสาร',
            'asset_code' => '7430-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องอัดสำเนา',
            'asset_code' => '7430-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องโรเนียว',
            'asset_code' => '7430-005',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องปรุกระดาษไข',
            'asset_code' => '7430-006',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องพิมพ์สำเนาระบบดิจิตอล',
            'asset_code' => '7430-007',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องปรุตัวอักษร',
            'asset_code' => '7490-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องเรียงกระดาษ',
            'asset_code' => '7490-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องทำลายเอกสาร',
            'asset_code' => '7490-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องแยกกระดาษต่อเนื่อง',
            'asset_code' => '7490-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องตัดกระดาษ',
            'asset_code' => '7520-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องเจาะกระดาษและเข้าเล่ม',
            'asset_code' => '7520-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องเย็บกระดาษ',
            'asset_code' => '7520-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องไมโครฟิล์ม',
            'asset_code' => '7670-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'โต๊ะบิลเลียด',
            'asset_code' => '7910-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องดูดฝุ่น',
            'asset_code' => '7910-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'เครื่องขัดพื้น',
            'asset_code' => '7910-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ตู้ปิดประกาศ',
            'asset_code' => '7110-030',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'ลิฟท์โดยสาร',
            'asset_code' => '3960-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 4,
            'type_name' => 'รถเข็นยกของ',
            'asset_code' => '3920-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 5,
            'type_name' => 'รถยนต์เก๋ง (ประจำตำแหน่ง)',
            'asset_code' => '2310-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 5,
            'type_name' => 'รถยนต์เก๋ง',
            'asset_code' => '2310-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 5,
            'type_name' => 'รถยนต์โดยสาร 45 ที่นั่ง',
            'asset_code' => '2310-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 5,
            'type_name' => 'รถตู้',
            'asset_code' => '2310-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 5,
            'type_name' => 'รถกระบะ/4 ประตู/แวน',
            'asset_code' => '2320-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 5,
            'type_name' => 'รถจิ๊ป',
            'asset_code' => '2320-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 5,
            'type_name' => 'รถจักรยานยนต์',
            'asset_code' => '2340-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 5,
            'type_name' => 'รถจักรยาน',
            'asset_code' => '2340-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 6,
            'type_name' => 'รถขุดตีนตะขาบ',
            'asset_code' => '3805-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 6,
            'type_name' => 'รถแทรกเตอร์ตีนตะขาบ',
            'asset_code' => '3805-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 6,
            'type_name' => 'รถเกลี่ยดิน',
            'asset_code' => '3805-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 6,
            'type_name' => 'รถตักหน้าขุดหลัง',
            'asset_code' => '3805-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 6,
            'type_name' => 'รถบรรทุกน้ำ',
            'asset_code' => '3805-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 6,
            'type_name' => 'รถบดล้อเหล็ก / ยาง',
            'asset_code' => '3835-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 6,
            'type_name' => 'รถบดล้อเหล็กเรียบ',
            'asset_code' => '3835-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'เครื่องกำเนิดไฟ',
            'asset_code' => '6115-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'หม้อแปลงไฟฟ้า',
            'asset_code' => '6120-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'เครื่องขยายเสียง',
            'asset_code' => '7450-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'เครื่องบันทึกเสียง',
            'asset_code' => '7450-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'เครื่องรับ ส่งวิทยุ VHF / FM',
            'asset_code' => '7730-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'เครื่องรับโทรทัศน์',
            'asset_code' => '7730-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'เครื่องอัดสำเนาเทป',
            'asset_code' => '7450-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'เครื่องถอดเทป',
            'asset_code' => '7730-005',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'วิทยุ เทป',
            'asset_code' => '7730-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'เครื่องเล่น ซีดี/ดีวีดี',
            'asset_code' => '7730-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 7,
            'type_name' => 'เครื่องเสียงชุดประชุม',
            'asset_code' => '7450-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องเล่นและบันทึกวีดีโอ',
            'asset_code' => '5820-005',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'ไมโครโฟน',
            'asset_code' => '5965-001',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'ลำโพง',
            'asset_code' => '5965-002',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องถ่ายรูป ขนาด 1:1:8',
            'asset_code' => '6720-001',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องถ่ายรูป ขนาด 1:1:4',
            'asset_code' => '6720-002',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องถ่ายรูปอัตโนมัติ/กล้องดิจิตอล',
            'asset_code' => '6720-003',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องถ่ายไมโครฟิล์ม',
            'asset_code' => '6720-004',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องถ่าย วีดีโอ ระบบ S-VHS',
            'asset_code' => '6720-005',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องถ่าย วีดีโอ ระบบ VHS',
            'asset_code' => '6720-006',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องถ่าย วีดีโอ ระบบ VHS-O',
            'asset_code' => '6720-007',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องถ่าย วีดีโอ ระบบ 8 ม.ม.',
            'asset_code' => '6720-008',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องฉายสไลด์',
            'asset_code' => '6730-001',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องฉายสเตอร์ริโอ',
            'asset_code' => '6730-002',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องฉายทึบแสง',
            'asset_code' => '6730-003',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องฉายข้ามศีรษะ',
            'asset_code' => '6730-004',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'อุปกรณ์สำหรับเครื่องฉายสไลด์',
            'asset_code' => '6730-005',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องมัลติมิเดียโปรเจ็คเตอร์ (LCD)',
            'asset_code' => '6730-006',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องสมานอัตโนมัติ',
            'asset_code' => '6730-007',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องถ่ายทอดสัญญาณภาพสี',
            'asset_code' => '6730-008',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'จอรับภาพ',
            'asset_code' => '6730-009',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องฉายภาพเสมือน',
            'asset_code' => '6730-010',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'ไฟแวบ',
            'asset_code' => '6760-003',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'โคมไฟถ่ายภาพและวีดีโอ 1,000 วัตต์',
            'asset_code' => '6760-004',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'โคมไฟถ่ายภาพและวีดีโอ 2,000 วัตต์',
            'asset_code' => '6760-005',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องควบคุมการตัดต่อวีดีทัศน์',
            'asset_code' => '7730-001',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องเล่นเทประบบซิงโครไนซ์แบบธรรมดา',
            'asset_code' => '7730-002',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องเล่นเทประบบซิงโครไนซ์แบบDISSOLVES',
            'asset_code' => '7730-003',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องตรวจสัญญาณภาพ T.V.Monitor',
            'asset_code' => '7730-004',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'วีดีทัศน์ระบบเบต้าแคม',
            'asset_code' => '7730-005',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องถ่าย วีดีโอ',
            'asset_code' => '7730-006',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'เครื่องเล่น วีดีโอ',
            'asset_code' => '7730-007',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องถ่ายวีดีทัศน์',
            'asset_code' => '7730-008',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 8,
            'type_name' => 'กล้องโทรทัศน์วงจรปิด',
            'asset_code' => '7730-009',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 9,
            'type_name' => 'เครื่องพ่นยา',
            'asset_code' => '3750-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 9,
            'type_name' => 'เครื่องสูบน้ำ',
            'asset_code' => '3750-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 9,
            'type_name' => 'รถฟาร์มแทรกเตอร์',
            'asset_code' => '3740-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 9,
            'type_name' => 'รถไถนา',
            'asset_code' => '3740-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 10,
            'type_name' => 'เครื่องเจียหรือตัด',
            'asset_code' => '3220-001',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 10,
            'type_name' => 'ไขควงไฟฟ้า',
            'asset_code' => '3220-002',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 10,
            'type_name' => 'กบไฟฟ้า',
            'asset_code' => '3220-003',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 10,
            'type_name' => 'สว่านไฟฟ้า',
            'asset_code' => '3413-003',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 10,
            'type_name' => 'เครื่องเชื่อมโลหะ',
            'asset_code' => '3433-001',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 10,
            'type_name' => 'เครื่องตัดเหล็ก',
            'asset_code' => '3449-001',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 11,
            'type_name' => 'กล้องส่องทางไกล',
            'asset_code' => '6675-005',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 11,
            'type_name' => 'กล้องวัดมุม',
            'asset_code' => '6675-004',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 11,
            'type_name' => 'กล้องวัดระดับ',
            'asset_code' => '6675-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 11,
            'type_name' => 'เทปวัดระยะ',
            'asset_code' => '6675-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 11,
            'type_name' => 'ไม้สต๊าฟ',
            'asset_code' => '6675-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'จอภาพ(Monitor)',
            'asset_code' => '7440-301',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'เครื่องพิมพ์',
            'asset_code' => '',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'LINE RPINTER',
            'asset_code' => '7440-302',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'DOT PIN',
            'asset_code' => '7440-303',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'INK JET',
            'asset_code' => '7440-304',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'LASER JET',
            'asset_code' => '7440-305',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'สแกนเนอร์',
            'asset_code' => '7440-202',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'เครื่องสำรองกระแสไฟฟ้า (UPS)',
            'asset_code' => '7440-610',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'ระบบ LAN',
            'asset_code' => '7440-100',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'โปรแกรมคอมพิวเตอร์หรือซอฟแวร์ที่มีราคาหน่วยหนึ่งเกิน 20,000  บาท',
            'asset_code' => '7440-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'คอมพิวเตอร์ชนิดพกพา (NOTEBOOK)',
            'asset_code' => '7440-103',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'SERVER',
            'asset_code' => '7440-101',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'เครื่องแยกกระดาษ',
            'asset_code' => '7440-401',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 12,
            'type_name' => 'CPU',
            'asset_code' => '7440-102',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'ตู้เย็น/ตู้แช่',
            'asset_code' => '4110-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'เครื่องทำน้ำเย็น',
            'asset_code' => '4110-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'เครื่องกรองน้ำ',
            'asset_code' => '4110-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'เครื่องตัดหญ้า',
            'asset_code' => '3750-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'เครื่องต้มน้ำร้อนแบบต่าง ๆ',
            'asset_code' => '4520-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'เตาอบ / ตู้อบ',
            'asset_code' => '4520-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'เตาแก๊ส',
            'asset_code' => '4520-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'บันได',
            'asset_code' => '4240-012',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'พรมปูพื้น',
            'asset_code' => '7220-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'ผ้าม่านพร้อมอุปกรณ์',
            'asset_code' => '7230-001',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'เตียง',
            'asset_code' => '7230-002',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'ฉากกั้นชนิดต่าง ๆ',
            'asset_code' => '7230-003',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 13,
            'type_name' => 'มูลี่บังแสง',
            'asset_code' => '7230-009',
            'useful_life' => 10,
            'depreciation_rate' => 10.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 14,
            'type_name' => 'กรรไกรไฟฟ้า',
            'asset_code' => '3530-003',
            'useful_life' => 20,
            'depreciation_rate' => 5.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 14,
            'type_name' => 'จักรเย็บผ้าแบบธรรมดา',
            'asset_code' => '3530-001',
            'useful_life' => 20,
            'depreciation_rate' => 5.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 14,
            'type_name' => 'จักรเย็บผ้าแบบอุตสาหกรรม',
            'asset_code' => '3530-002',
            'useful_life' => 20,
            'depreciation_rate' => 5.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 14,
            'type_name' => 'เครื่องทำกระดุม',
            'asset_code' => '3625-002',
            'useful_life' => 20,
            'depreciation_rate' => 5.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 14,
            'type_name' => 'เครื่องถักไหมพรม',
            'asset_code' => '3625-001',
            'useful_life' => 20,
            'depreciation_rate' => 5.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 15,
            'type_name' => 'ปืนพกสั้น',
            'asset_code' => '1005-001',
            'useful_life' => 1,
            'depreciation_rate' => 100.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 15,
            'type_name' => 'ปืนลูกซอง',
            'asset_code' => '1005-002',
            'useful_life' => 1,
            'depreciation_rate' => 100.0,
        ]);
        AssetKind::create([
            'asset_category_id' => 16,
            'type_name' => 'ระบบแสงสว่าง ',
            'asset_code' => '1001-001',
            'useful_life' => 5,
            'depreciation_rate' => 20.0,
        ]);
    }
}