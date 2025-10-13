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
}

export interface GenerateAssetItemsData {
  quantity: number
  vendor_id?: number | null
  buy_date?: string | null
  price?: number | null
  warranty_months?: number | null
}