import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

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
  type_name: string
  category: {
    name: string
  }
  kind: {
    name: string
  }
  vendor: {
    name: string
  }
}