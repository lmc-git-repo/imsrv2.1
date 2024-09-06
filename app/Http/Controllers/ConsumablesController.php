<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\ConsumablesResource;
use App\Http\Resources\DepartmentsResource;
use App\Models\AccountUsers;
use App\Models\Consumables;
use App\Http\Requests\StoreConsumablesRequest;
use App\Http\Requests\UpdateConsumablesRequest;
use App\Models\Departments;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ConsumablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Consumables::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $consumables = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('po_num', 'like', "%{$search}%")
                    ->orWhere('si_code', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%")
                    ->orWhere('installedTo', 'like', "%{$search}%")
                    ->orWhere('brand', 'like', "%{$search}%");
            })
            ->paginate(10)->onEachSide(1);
        //end

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $consumablesUsersFnameList = AccountUsers::orderBy('name')->get();
        $consumablesAllData = Consumables::orderBy('consumables_id')->get();

        // echo $consumablesAllData;

        return inertia("Consumables/Index", [
            'consumables' => ConsumablesResource::collection($consumables),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'consumablesUsersFnameList' => AccountUsersResource::collection($consumablesUsersFnameList),
            'consumablesAllData' => ConsumablesResource::collection($consumablesAllData),
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
    public function store(StoreConsumablesRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('Consumables/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new Phone
        Consumables::create($data);

        return to_route('consumables.index')->with('success', 'New Consumable was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Consumables $consumables)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Consumables $consumables)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConsumablesRequest $request, Consumables $consumable)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($consumable->img_path){
                Storage::disk('public')->deleteDirectory(dirname($consumable->img_path));
            }
            $data['img_path'] = $img_path->store('Consumables/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        // dd($data);
        $data['updated_by'] = Auth::id();
        $consumable->update($data);
        // \Log::info('Updated consumables: ', $consumable->toArray());
        return to_route('consumables.index')->with('success', "Consumable \" $consumable->po_num\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Consumables $consumable)
    {
        //
        $consumable->delete();
        if($consumable->img_path){
            Storage::disk('public')->deleteDirectory(dirname($consumable->img_path));
        }
        return to_route('consumables.index')->with('success', "Consumable - \" $consumable->po_num\" successfully deleted!");
    }
}
