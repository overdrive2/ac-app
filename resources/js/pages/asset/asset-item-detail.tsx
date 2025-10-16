import { useState } from 'react';
import { toast } from 'sonner';
import { Head, useForm, router, usePage } from '@inertiajs/react';

import { AppWindowIcon, CodeIcon, MapPinned, PenSquareIcon } from "lucide-react"

import { Asset, AssetItem, BreadcrumbItem, Vendor } from '@/types';
import { AssetImage } from '@/types/asset-image';

import assets from '@/routes/assets';
import { dashboard } from '@/routes';

import AppLayout from '@/layouts/app-layout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Check, ChevronLeft, ChevronRight, FileStack, Plus, Printer } from 'lucide-react';
import GenerateAssetItemsDialog from '@/components/generate-asset-items-dialog';
import AssetItemDialog from '@/components/asset-item-dialog';
import { Label } from '@/components/ui/label';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"

interface PageProps {
	asset: Asset
	assetItem: AssetItem
	images: AssetImage[]
	vendors: Vendor[]
	[key: string]: any;
}

export default function AssetItemDetail() {
	const { asset, assetItem, images, vendors, brands } = usePage<PageProps>().props;

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
					Asset Detail – {asset?.asset_name || ""}
				</h2>
				{/* Asset Info */}
				<Card>
					<CardHeader>
						<CardTitle>Asset Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2 text-sm">
						<p><strong>Code:</strong> {assetItem.asset_item_code}</p>
						<p><strong>Name:</strong> {assetItem.asset_item_name}</p>
					</CardContent>
				</Card>
				<div>
					<div className="mb-4 flex items-center justify-between">
						<h3 className="text-lg font-medium">Asset Items Details</h3>
						<div className="flex gap-2">
							<Button
								variant="default"
								onClick={newItem}
							>
								<MapPinned />
								Assign
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
				</div>
				<div className="flex w-full max-w-xl flex-col gap-6">
					<Tabs defaultValue="assignment">
						<TabsList>
							<TabsTrigger value="assignment">Assignment</TabsTrigger>
							<TabsTrigger value="repair">Repairs</TabsTrigger>
							<TabsTrigger value="disposed">Disposed</TabsTrigger>
						</TabsList>
						<TabsContent value="assignment">
							<Card className="w-full">
								<CardHeader>
									<CardTitle>Assignment</CardTitle>
									<CardDescription>
										Make changes to your account here. Click save when you&apos;re
										done.
									</CardDescription>
								</CardHeader>
								<CardContent className="grid gap-6">
									<div className="grid gap-3">
										<Label htmlFor="tabs-demo-name">Name</Label>
										<Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
									</div>
									<div className="grid gap-3">
										<Label htmlFor="tabs-demo-username">Username</Label>
										<Input id="tabs-demo-username" defaultValue="@peduarte" />
									</div>
								</CardContent>
								<CardFooter>
									<Button>Save changes</Button>
								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value="repair">
							<Card>
								<CardHeader>
									<CardTitle>Password</CardTitle>
									<CardDescription>
										Change your password here. After saving, you&apos;ll be logged
										out.
									</CardDescription>
								</CardHeader>
								<CardContent className="grid gap-6">
									<div className="grid gap-3">
										<Label htmlFor="tabs-demo-current">Current password</Label>
										<Input id="tabs-demo-current" type="password" />
									</div>
									<div className="grid gap-3">
										<Label htmlFor="tabs-demo-new">New password</Label>
										<Input id="tabs-demo-new" type="password" />
									</div>
								</CardContent>
								<CardFooter>
									<Button>Save password</Button>
								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value="disposed">
							<Card>
								<CardHeader>
									<CardTitle>Password</CardTitle>
									<CardDescription>
										Change your password here. After saving, you&apos;ll be logged
										out.
									</CardDescription>
								</CardHeader>
								<CardContent className="grid gap-6">
									<div className="grid gap-3">
										<Label htmlFor="tabs-demo-current">Current password</Label>
										<Input id="tabs-demo-current" type="password" />
									</div>
									<div className="grid gap-3">
										<Label htmlFor="tabs-demo-new">New password</Label>
										<Input id="tabs-demo-new" type="password" />
									</div>
								</CardContent>
								<CardFooter>
									<Button>Save password</Button>
								</CardFooter>
							</Card>
						</TabsContent>
					</Tabs>
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