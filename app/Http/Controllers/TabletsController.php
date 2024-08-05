<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\TabletsResource;
use App\Models\AccountUsers;
use App\Models\Computers;
use App\Models\Departments;
use App\Models\Tablets;
use App\Http\Requests\StoreTabletsRequest;
use App\Http\Requests\UpdateTabletsRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TabletsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Tablets::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if(request("tablet_name")){
            $query->where("tablet_name","like","%". request("tablet_name") .'%');
        }

        if(request('tablet_status')){
            $query->where('tablet_status', request('tablet_status'));
        }

        $tablets = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)->onEachSide(1);

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $tabletUsersList = AccountUsers::orderBy('initial')->get();
        $tabletUsersFnameList = AccountUsers::orderBy('name')->get();
        $tabletsAllData = Tablets::orderBy('tablet_id')->get();

        // echo $tabletsAllData;

        return inertia("Tablets/Index", [
            'tablets' => TabletsResource::collection($tablets),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'tabletUsersList' => AccountUsersResource::collection($tabletUsersList),
            'tabletUsersFnameList' => AccountUsersResource::collection($tabletUsersFnameList),
            'tabletsAllData' => TabletsResource::collection($tabletsAllData),
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
    public function store(StoreTabletsRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('Tablets/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new Tablet
        Tablets::create($data);

        return to_route('tablets.index')->with('success', 'New Tablet was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tablets $tablets)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tablets $tablets)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTabletsRequest $request, Tablets $tablet)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($tablet->img_path){
                Storage::disk('public')->deleteDirectory(dirname($tablet->img_path));
            }
            $data['img_path'] = $img_path->store('Tablets/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        // dd($data);
        $data['updated_by'] = Auth::id();
        $tablet->update($data);
        // \Log::info('Updated tablet: ', $tablets->toArray());
        return to_route('tablets.index')->with('success', "Tablet \" $tablet->tablet_name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tablets $tablet)
    {
        //
        $tablet->delete();
        if($tablet->img_path){
            Storage::disk('public')->deleteDirectory(dirname($tablet->img_path));
        }
        return to_route('tablets.index')->with('success', "Tablet - \" $tablet->tablet_name\" successfully deleted!");
    }
}
