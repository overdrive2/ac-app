import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from "framer-motion"
import { Head, useForm, router, usePage } from '@inertiajs/react';


import { Asset, AssetItem, BreadcrumbItem, Vendor } from '@/types';
import { AssetImage } from '@/types/asset-image';

import assets from '@/routes/assets';
import { dashboard } from '@/routes';

import AppLayout from '@/layouts/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Check, ChevronLeft, ChevronRight, FileStack, Plus, Printer } from 'lucide-react';
import GenerateAssetItemsDialog from '@/components/generate-asset-items-dialog';
import { DataTable } from '@/components/datatable';
import { assetItemColumns } from '@/columns/assetItemColumns';
import AssetItemDialog from '@/components/asset-item-dialog';
import { set } from 'date-fns';

interface PageProps {
	asset: Asset
	assetItems: AssetItem[]
	images: AssetImage[]
	vendors: Vendor[]
	[key: string]: any;
}

export default function AssetDetail() {
	const { asset, assetItems, images, vendors, brands } = usePage<PageProps>().props;

	// Sort images by order
	const sortedImages = images.sort((a, b) => a.order - b.order);

	// State สำหรับ dialog generate items
	const [openModal, setOpenModal] = useState(false)
	const [mode, setMode] = useState<"new" | "edit" | "generate">("new")
	const [selectedItem, setSelectedItem] = useState<AssetItem | null>(null)

	// State สำหรับ preview dialog
	const [uploadOpen, setUploadOpen] = useState(false)
	const [generateOpen, setGenerateOpen] = useState(false)
	const [previewIndex, setPreviewIndex] = useState<number | null>(null)
	const [editImageIndex, setEditImageIndex] = useState(null)
	const [editAltText, setEditAltText] = useState(null)
	const previewImage = previewIndex !== null ? sortedImages[previewIndex] : null
	const isFirst = previewIndex === 0
	const isLast = previewIndex === sortedImages.length - 1

	const [selectedIds, setSelectedIds] = useState<number[]>([])

	const toggleSelect = (id: number, selected: boolean) => {
		setSelectedIds((prev) =>
			selected ? [...prev, id] : prev.filter((i) => i !== id)
		)
	}

	const toggleSelectAll = (selected: boolean) => {
		setSelectedIds(selected ? items.map((i) => i.id) : [])
	}

	const newItem = () => {
		setMode("new")
		setSelectedItem(null)
		setOpenModal(true)
		// เปิด dialog เพิ่ม หรือ set state
	}

	const newItems = () => {
		setMode("generate")
		setSelectedItem(null)
		setOpenModal(true)
		// เปิด dialog เพิ่ม หรือ set state
	}

	const openEdit = (item: AssetItem) => {
		setMode("edit")
		setSelectedItem(item)
		setOpenModal(true)
		// เปิด dialog แก้ไข หรือ set state
	}

	const deleteItem = (id: number) => {
		console.log("delete", id)
		// ลบ item ตาม id
	}


	const { data, setData, post, processing, errors, reset } = useForm({
		image: null,
		alt_text: '',
		order: 0,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Use router.post for file uploads with Inertia, it handles FormData automatically
		post(assets.images.store(asset.id).url, {
			forceFormData: true, // Important for file uploads
			onSuccess: () => {
				toast.success("อัปโหลดรูปสำเร็จ")
				reset("image", "alt_text", "order")
			},
			onError: () => {
				toast.error("อัปโหลดไม่สำเร็จ โปรดลองใหม่อีกครั้ง")
			},
		});
	};
	const handlePrev = () => {
		if (previewIndex > 0) setPreviewIndex(previewIndex - 1)
	}

	const handleNext = () => {
		if (previewIndex < sortedImages.length - 1) setPreviewIndex(previewIndex + 1)
	}

	const handleDeleteImage = (imageId) => {
		if (confirm('Are you sure you want to delete this image?')) {
			router.delete(assets.images.destroy(imageId).url);
		}
	};

	const breadcrumbs: BreadcrumbItem[] = [
		{ title: 'Dashboard', href: dashboard().url },
	]

	function handleDelete(id: number): void {
		throw new Error('Function not implemented.');
	}
	const handleBatchPrintPDF = () => {
		if (selectedIds.length === 0) {
			toast.error("กรุณาเลือกอย่างน้อย 1 รายการ");
			return;
		}
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={`Asset Detail - ${asset?.asset_code || ""}`} />

			<div className="flex h-full flex-1 flex-col gap-4 p-4">
				<h2 className="text-2xl font-bold tracking-tight">
					Asset Detail – {asset?.asset_code || ""}
				</h2>
				{/* Asset Info */}
				<Card>
					<CardHeader>
						<CardTitle>Asset Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2 text-sm">
						<p><strong>Code:</strong> {asset.asset_code}</p>
						<p><strong>Name:</strong> {asset.asset_name}</p>
					</CardContent>
				</Card>

				{/* Asset Images */}
				<Card>
					<CardHeader>
						<CardTitle>Asset Images</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="mb-4 flex items-center justify-between">
							<Button onClick={() => setUploadOpen(uploadOpen => !uploadOpen)}>
								{uploadOpen ? "Close" : "Upload"}
							</Button>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{sortedImages.length > 0 ? (
								sortedImages.map((image, index) => (
									<div
										key={image.id}
										className="group relative overflow-hidden rounded-lg border bg-muted"
										onClick={() => {
											setPreviewIndex(index)
											setEditImageIndex(null)
											setEditAltText(null)
										}}
									>
										<img
											src={image.thumbnail_image_url}
											alt={image.alt_text}
											className="aspect-video w-full object-contain transition-transform group-hover:scale-105"
										/>
										<Button
											size="icon"
											variant="destructive"
											className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
											onClick={(e) => {
												e.stopPropagation()
												handleDeleteImage(image.id)
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</Button>
										<div className="p-2 text-xs text-gray-600">
											<p>{image.alt_text}</p>
											<p className="text-gray-400">Order: {image.order}</p>
										</div>
									</div>
								))
							) : (
								<p className="text-gray-500 italic">
									No images uploaded for this asset.
								</p>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Upload Form */}
				<AnimatePresence>
					{uploadOpen && (
						<motion.div
							key="card"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
						>
							<Card>
								<CardHeader>
									<CardTitle>Upload New Image</CardTitle>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleSubmit} className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="image">Image File</Label>
											<Input
												id="image"
												type="file"
												onChange={(e) => setData("image", e.target.files[0])}
											/>
											{errors.image && (
												<p className="text-destructive text-sm">{errors.image}</p>
											)}
										</div>

										<div className="space-y-2">
											<Label htmlFor="alt_text">Alternative Text</Label>
											<Input
												id="alt_text"
												value={data.alt_text}
												onChange={(e) => setData("alt_text", e.target.value)}
											/>
											{errors.alt_text && (
												<p className="text-destructive text-sm">{errors.alt_text}</p>
											)}
										</div>

										<div className="space-y-2">
											<Label htmlFor="order">Display Order</Label>
											<Input
												id="order"
												type="number"
												value={data.order}
												onChange={(e) => setData("order", e.target.value)}
											/>
											{errors.order && (
												<p className="text-destructive text-sm">{errors.order}</p>
											)}
										</div>

										<Separator />

										<Button type="submit" disabled={processing} className="w-full">
											{processing ? "Uploading..." : "Upload Image"}
										</Button>
									</form>
								</CardContent>
							</Card>
						</motion.div>
					)}
				</AnimatePresence>

				<div>
					<div className="mb-4 flex items-center justify-between">
						<h3 className="text-lg font-medium">Asset Items</h3>
						<div className="flex gap-2">
							<Button
								variant="default"
								onClick={newItem}
							>
								<Plus />
								New
							</Button>
							<Button
								variant="default"
								onClick={newItems}
							>
								<FileStack />
								Generate Items
							</Button>
							<Button onClick={handleBatchPrintPDF} disabled={selectedIds.length === 0}>
								<Printer />
								พิมพ์ QR Code ({selectedIds.length})
							</Button>
						</div>
					</div>
					{assetItems && assetItems.length > 0 ? (
						<DataTable
							columns={assetItemColumns({
								openEdit,
								deleteItem: (id) => handleDelete(id),
								toggleSelect,
								toggleSelectAll,
								selectedIds,
							})}
							data={assetItems}
						/>) : (
						<p>ไม่มีข้อมูล</p>
					)}
				</div>
			</div>

			{/* 🪟 Dialog Preview Gallery */}
			<Dialog open={previewIndex !== null} onOpenChange={() => setPreviewIndex(null)}>
				<DialogContent className="max-w-5xl">
					<DialogHeader>
						<DialogTitle>{previewImage?.alt_text || "Preview"}</DialogTitle>
						<DialogDescription>
							{editImageIndex === previewImage?.id ? (
								<form
									onSubmit={(e) => {
										e.preventDefault()
										router.put(
											assets.images.updateAltText(previewImage.id).url,
											{ alt_text: editAltText },
											{
												onSuccess: () => {
													toast.success("แก้ไขคำอธิบายภาพเรียบร้อย")
													setEditImageIndex(null)
												},
												onError: () => {
													toast.error("แก้ไขคำอธิบายภาพไม่สำเร็จ โปรดลองใหม่อีกครั้ง")
												},
											},
										)
									}}
									className="flex items-center gap-2"
								>
									<Input
										autoFocus
										type="text"
										value={editAltText}
										onChange={(e) => setEditAltText(e.target.value)}
									/>
									<Button size="sm" aria-label="Submit" variant="outline">
										<Check />
									</Button>
								</form>
							) : (
								<button className="outline-none cursor-pointer"
									onClick={() => {
										setEditImageIndex(previewImage?.id)
										setEditAltText(previewImage?.alt_text)
									}}
								>
									{previewImage?.alt_text || "No description available."}
								</button>
							)
							}
						</DialogDescription>
					</DialogHeader>
					{previewImage && (
						<div className="relative flex items-center justify-center">
							<img
								src={previewImage.original_image_url}
								alt="Preview"
								className="w-full max-h-[75vh] object-contain rounded-lg"
							/>
							{/* ปุ่ม Prev */}
							{!isFirst && (
								<Button
									size="icon"
									variant="secondary"
									className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
									onClick={handlePrev}
								>
									<ChevronLeft className="h-6 w-6" />
								</Button>
							)}
							{/* ปุ่ม Next */}
							{!isLast && (
								<Button
									size="icon"
									variant="secondary"
									className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
									onClick={handleNext}
								>
									<ChevronRight className="h-6 w-6" />
								</Button>
							)}
						</div>
					)}
				</DialogContent>
			</Dialog>

			{/* Dialog เพิ่ม Item */}
			{/* State สำหรับเปิดปิด dialog */}
			{/* @ts-ignore */}
			<GenerateAssetItemsDialog
				open={generateOpen}
				onOpenChange={setGenerateOpen}
				assetId={asset.id}
				vendors={vendors}
			/>
			{/* Dialog แก้ไข Item */}
			<AssetItemDialog
				open={openModal}
				mode={mode}
				onOpenChange={setOpenModal}
				item={selectedItem}
				brands={brands}
				vendors={vendors}
				asset={asset}
			/>
		</AppLayout>
	);
}