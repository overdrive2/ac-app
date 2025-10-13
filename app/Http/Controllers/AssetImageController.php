<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Intervention\Image\Laravel\Facades\Image;

class AssetImageController extends Controller
{
    public function store(Request $request, Asset $asset)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Max 2MB
            'alt_text' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');

            // Define paths
            $assetCode = $asset->asset_code;
            $originalPath = "assets/{$assetCode}/original";
            $thumbnailPath = "assets/{$assetCode}/thumbnails";
            // Ensure directories exist
            if (!Storage::exists($originalPath)) {
                Storage::makeDirectory($originalPath);
            }
            if (!Storage::exists($thumbnailPath)) {
                Storage::makeDirectory($thumbnailPath);
            }

            // Generate a unique file name
            $fileName = uniqid() . '.' . $imageFile->getClientOriginalExtension();

            // ✅ Save original
            $imageFile->storeAs($originalPath, $fileName);

            $filePathOriginal = "{$originalPath}/{$fileName}";
            $filePathThumbnail = "{$thumbnailPath}/{$fileName}";

            $manager = new ImageManager(Driver::class);
            $image = $manager->read($imageFile); // 800 x 600

            // scale down to fixed width
            $image->scaleDown(width: 200); // 200 x 150

            // scale down to fixed height
            //$image->scaleDown(height: 300); //  400 x 300
            $image->save(storage_path('app/private/') . $filePathThumbnail);
            /*Image::read($sourcePath)
                ->cover(400, 300)
                ->save($thumbPath);*/

            // ✅ Save to DB
            $asset->images()->create([
                'file_path_original' => $filePathOriginal,
                'file_path_thumbnail' => $filePathThumbnail,
                'alt_text' => $request->input('alt_text', $asset->asset_name . ' image'),
                'order' => $request->input('order', 0),
            ]);

            return redirect()->back()->with('success', 'Image uploaded successfully!');
        }

        return redirect()->back()->with('error', 'No image uploaded.');
    }

    public function updateAltText(Request $request, $imageId)
    {
        $request->validate([
            'alt_text' => 'nullable|string|max:255',
        ]);

        $assetImage = AssetImage::findOrFail($imageId);
        $assetImage->alt_text = $request->input('alt_text', $assetImage->alt_text);
        $assetImage->save();

        return redirect()->back()->with('success', 'Alt text updated successfully!');
    }

    public function destroy($imageId)
    {
        $assetImage = AssetImage::findOrFail($imageId);
       // dd($assetImage);
        $assetImage->delete(); // The boot method in AssetImage Model will handle file deletion

        return redirect()->back()->with('success', 'Image deleted successfully!');
    }
}
