<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Http\Requests\TestRequest;
use App\Http\Resources\TestResource;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        return TestResource::collection(Test::paginate());
    }

    public function store(TestRequest $request)
    {
        $item = Test::create($request->validated());
        return new TestResource($item);
    }

    public function show(Test $item)
    {
        return new TestResource($item);
    }

    public function update(TestRequest $request, Test $item)
    {
        $item->update($request->validated());
        return new TestResource($item);
    }

    public function destroy(Test $item)
    {
        $item->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
