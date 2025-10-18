import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import { AssetImage } from './asset-image';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Brand {
  id: number
  brand_name: string
  brand_name_en?: string | null
  origin_country?: string | null
}

export interface AssetCategory {
  id: number
  code: string
  name: string
  name_en?: string
  created_at?: string
  updated_at?: string
}

export interface AssetKind {
  id: number
  asset_category_id: number,
  asset_code: string
  type_name: string
  useful_life?: number
  depreciation_rate?: number
  created_at?: string
  updated_at?: string
}

export interface Vendor {
  id: number
  name: string
  address?: string
  phone?: string
  owner_name?: string
  tax_id?: string
  created_at?: string
  updated_at?: string
}

export interface Asset {
  id: number
  asset_code: string
  asset_name: string
  type_name: string
  images?: AssetImage[]
  category: {
    name: string
  }
  kind: AssetKind
}

export interface AssetItem {
  id: number
  asset_id: number
  asset: Asset | null
  asset_item_code: string
  asset_item_name?: string
  brand_id?: number | null   
  vendor_id?: number | null 
  buy_date: string
  price: number
  warranty_months: number | null
  serial_number: string | null
  status: 'active' | 'repair' | 'disposed'
  vendor: Vendor | null
  remark?: string
  created_at?: string
  updated_at?: string
  // relations
  assignments?: AssetAssignment[]
  current_assignment?: AssetAssignment | null
  repairs?: AssetRepair[]
  latest_repair?: AssetRepair | null
}

export interface GenerateAssetItemsData {
  quantity: number
  vendor_id?: number | null
  buy_date?: string | null
  price?: number | null
  warranty_months?: number | null
}

/* ──────────────────────────────
   🏢 Department & Staff
────────────────────────────── */
export interface Department {
  id: number
  name: string
  short_name?: string | null
  parent_id?: number | null
  parent?: Department | null
  created_at?: string
  updated_at?: string
}

export interface Staff {
  id: number
  staff_code: string
  full_name: string
  position_id?: number | null
  position?: Position | null
  department_id?: number | null
  department?: Department | null
  active?: boolean
  created_at?: string
  updated_at?: string
}

/* ──────────────────────────────
   🧾 Asset Assignment (จ่ายให้เจ้าหน้าที่)
────────────────────────────── */
export interface AssetAssignment {
  id: number
  asset_item_id: number
  staff_id?: number | null
  department_id?: number | null
  assigned_date: string
  returned_date?: string | null
  status: 'active' | 'returned' | 'transferred'
  note?: string | null
  staff?: Staff | null
  department?: Department | null
  created_at?: string
  updated_at?: string
}

/* ──────────────────────────────
   🔧 Asset Repair (ส่งซ่อมภายนอก)
────────────────────────────── */
export interface AssetRepair {
  id: number
  asset_item_id: number
  vendor_id?: number | null
  sent_date: string
  repair_days?: number | null
  symptom?: string | null
  sender_name: string
  contact_person?: string | null
  contact_phone?: string | null
  returned_date?: string | null
  status: 'sent' | 'repairing' | 'completed' | 'cancelled'
  note?: string | null
  vendor?: Vendor | null
  asset_item?: AssetItem | null
  created_at?: string
  updated_at?: string
}

export interface Position {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}