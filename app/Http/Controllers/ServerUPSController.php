<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\ServerUPSResource;
use App\Models\AccountUsers;
use App\Models\Departments;
use App\Models\ServerUPS;
use App\Http\Requests\StoreServerUPSRequest;
use App\Http\Requests\UpdateServerUPSRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServerUPSController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $query = ServerUPS::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if(request("S_UName")){
            $query->where("S_UName","like","%". request("S_UName") .'%');
        }

        if(request('S_UStatus')){
            $query->where('S_UStatus', request('S_UStatus'));
        }

        $serverUps = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)->onEachSide(1);

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $compUsersList = AccountUsers::orderBy('initial')->get();
        $serverUpsAllData = ServerUPS::orderBy('S_UID')->get();

        // echo $serverUpsAllData;

        return inertia("ServerUps/Index", [
            'serverUps' => ServerUPSResource::collection($serverUps),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'compUsersList' => AccountUsersResource::collection($compUsersList),
            'serverUpsAllData' => ServerUPSResource::collection($serverUpsAllData),
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
    public function store(StoreServerUPSRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('ServerUps/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new employee
        ServerUPS::create($data);

        return to_route('serverUps.index')->with('success', 'New Server / UPS was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServerUPS $serverUPS)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServerUPS $serverUPS)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServerUPSRequest $request, ServerUPS $serverUPS)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($serverUPS->img_path){
                Storage::disk('public')->deleteDirectory(dirname($serverUPS->img_path));
            }
            $data['img_path'] = $img_path->store('ServerUps/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        $data['updated_by'] = Auth::id();
        $serverUPS->update($data);
        // \Log::info('Updated computer: ', $serverUPS->toArray());
        return to_route('serverUps.index')->with('success', "Server / UPS \" $serverUPS->S_UName\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServerUPS $serverUPS)
    {
        //
        $serverUPS->delete();
        if($serverUPS->img_path){
            Storage::disk('public')->deleteDirectory(dirname($serverUPS->img_path));
        }
        return to_route('serverUps.index')->with('success', "Server / UPS - \" $serverUPS->S_UName\" successfully deleted!");
    }
}
