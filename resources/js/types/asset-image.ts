export interface AssetImage {
  id: number
  asset_id: number
  file_path_original: string
  file_path_thumbnail: string
  alt_text?: string | null
  order: number
  created_at?: string
  updated_at?: string
}