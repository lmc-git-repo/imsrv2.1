<?php

namespace App\Http\Controllers;

use App\Http\Resources\MSAccountResource;
use App\Models\MSAccount;
use App\Http\Requests\StoreMSAccountRequest;
use App\Http\Requests\UpdateMSAccountRequest;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class MSAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = MSAccount::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $msAccount = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('email', 'like', "%{$search}%")
                    ->orWhere('password', 'like', "%{$search}%");
            })
            ->paginate(10)->onEachSide(1);
        //end

        // $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $msAccountAllData = MSAccount::orderBy('id')->get();

        return inertia("0365Account/Index", [
            'msAccount' => MSAccountResource::collection($msAccount),
            // 'departmentsList' => DepartmentsResource::collection($departmentsList),
            'msAccountAllData' => MSAccountResource::collection($msAccountAllData),
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
        return inertia("0365Account/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMSAccountRequest $request)
    {
        //
        $data = $request->validated();
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new data
        MSAccount::create($data);

        return to_route('msAccount.index')->with('success', 'New account was created');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $msAccount = MSAccount::where('id', $id)->firstOrFail();

        return inertia("0365Account/Show", [
            'msAccount' => new MSAccountResource($msAccount),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MSAccount $mSAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMSAccountRequest $request, MSAccount $msAccount)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle profile_path if it exists
        // $profile_path = $data['profile_path'] ?? null;
        // $profile_path = $request->file('profile_path');

        // if($profile_path){
        //     if($msAccount->profile_path){
        //         Storage::disk('public')->deleteDirectory(dirname($msAccount->profile_path));
        //     }
        //     $data['profile_path'] = $profile_path->store('accountUsers/'.Str::random(), 'public');
        // } else {
        //     unset($data['profile_path']);
        // }

        $data['updated_by'] = Auth::id();
        $msAccount->update($data);
        // \Log::info('Updated account user: ', $msAccount->toArray());
        return to_route('msAccount.index')->with('success', "Account \" $msAccount->email\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MSAccount $msAccount)
    {
        //
        $msAccount->delete();
        // if($msAccount->profile_path){
        //     Storage::disk('public')->deleteDirectory(dirname($msAccount->profile_path));
        // }
        return to_route('msAccount.index')->with('success', "Account - \" $msAccount->email\" successfully deleted!");
    }
}
