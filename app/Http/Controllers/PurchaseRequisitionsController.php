<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\PurchaseRequisitionsResource;
use App\Models\Departments;
use App\Models\PurchaseRequisitions;
use App\Http\Requests\StorePurchaseRequisitionsRequest;
use App\Http\Requests\UpdatePurchaseRequisitionsRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PurchaseRequisitionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = PurchaseRequisitions::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        // if(request("control_num")){
        //     $query->where("control_num","like","%". request("control_num") .'%');
        // }
        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('control_num', 'like', '%' . $search . '%')
                  ->orWhere('po_num', 'like', '%' . $search . '%');
            });
        }

        if(request('item_category')){
            $query->where('item_category', request('item_category'));
        }

        $purchase_req = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)->onEachSide(1);

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $purchase_reqAllData = PurchaseRequisitions::orderBy('pr_id')->get();

        // echo $purchase_reqAllData;

        return inertia("PurchaseRequisitions/Index", [
            'purchase_requisitions' => PurchaseRequisitionsResource::collection($purchase_req),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'purchase_reqAllData' => PurchaseRequisitionsResource::collection($purchase_reqAllData),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePurchaseRequisitionsRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('PurchaseRequisitions/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new PR
        PurchaseRequisitions::create($data);

        return to_route('purchase_requisitions.index')->with('success', 'New Purchase Requisitions was created');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(PurchaseRequisitions $purchaseRequisitions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PurchaseRequisitions $purchaseRequisitions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePurchaseRequisitionsRequest $request, PurchaseRequisitions $purchaseRequisition)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($purchaseRequisition->img_path){
                Storage::disk('public')->deleteDirectory(dirname($purchaseRequisition->img_path));
            }
            $data['img_path'] = $img_path->store('PurchaseRequisitions/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        // dd($data);
        $data['updated_by'] = Auth::id();
        $purchaseRequisition->update($data);
        // \Log::info('Updated PR: ', $purchaseRequisition->toArray());
        return to_route('purchase_requisitions.index')->with('success', "Purchase Requisition \" $purchaseRequisition->control_num\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PurchaseRequisitions $purchaseRequisition)
    {
        //
        $purchaseRequisition->delete();
        if($purchaseRequisition->img_path){
            Storage::disk('public')->deleteDirectory(dirname($purchaseRequisition->img_path));
        }
        return to_route('purchase_requisitions.index')->with('success', "Purchase Requisition - \" $purchaseRequisition->control_num\" successfully deleted!");
    }
}
