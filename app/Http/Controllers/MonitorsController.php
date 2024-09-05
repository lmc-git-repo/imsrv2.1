<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\ComputersResource;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\MonitorsResource;
use App\Models\AccountUsers;
use App\Models\Computers;
use App\Models\Departments;
use App\Models\Monitors;
use App\Http\Requests\StoreMonitorsRequest;
use App\Http\Requests\UpdateMonitorsRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MonitorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Monitors::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        
        $monitors = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('compName', 'like', "%{$search}%")
                    ->orWhere('mntr_user', 'like', "%{$search}%")
                    ->orWhere('mntr_model', 'like', "%{$search}%");
            })
            ->when(request('mntr_department'), function (Builder $query, $mntrDept) {
                $query->where('mntr_department', $mntrDept);
            })
            ->paginate(10)->onEachSide(1);
        //end

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $mntrUsersList = AccountUsers::orderBy('name')->get();
        $monitorsAllData = Monitors::orderBy('monitor_id')->get();
        $compNameList = Computers::orderBy('comp_name')->get();

        // echo $monitorsAllData;

        return inertia("Monitors/Index", [
            'monitors' => MonitorsResource::collection($monitors),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'compNameList' => ComputersResource::collection($compNameList),
            'mntrUsersList' => AccountUsersResource::collection($mntrUsersList),
            'monitorsAllData' => MonitorsResource::collection($monitorsAllData),
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
        return inertia("Monitors/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMonitorsRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('Monitors/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new monitor
        Monitors::create($data);

        return to_route('monitors.index')->with('success', 'New monitor was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Monitors $monitors)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Monitors $monitors)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMonitorsRequest $request, Monitors $monitor)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($monitor->img_path){
                Storage::disk('public')->deleteDirectory(dirname($monitor->img_path));
            }
            $data['img_path'] = $img_path->store('Monitors/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        $data['updated_by'] = Auth::id();
        $monitor->update($data);
        // \Log::info('Updated monitor: ', $monitors->toArray());
        return to_route('monitors.index')->with('success', "Monitor \" $monitor->compName\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Monitors $monitor)
    {
        //
        $monitor->delete();
        if($monitor->img_path){
            Storage::disk('public')->deleteDirectory(dirname($monitor->img_path));
        }
        return to_route('monitors.index')->with('success', "Monitor - \" $monitor->compName\" successfully deleted!");
    }
}
