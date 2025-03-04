<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrinterPasswordResource;
use App\Models\PrinterPassword;
use App\Http\Requests\StorePrinterPasswordRequest;
use App\Http\Requests\UpdatePrinterPasswordRequest;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class PrinterPasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = PrinterPassword::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $printerPassword = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('dept', 'like', "%{$search}%")
                    ->orWhere('password', 'like', "%{$search}%");
            })
            ->paginate(10)->onEachSide(1);
        //end

        // $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $printerPasswordAllData = PrinterPassword::orderBy('id')->get();

        return inertia("PrinterPassword/Index", [
            'printerPassword' => PrinterPasswordResource::collection($printerPassword),
            // 'departmentsList' => DepartmentsResource::collection($departmentsList),
            'printerPasswordAllData' => PrinterPasswordResource::collection($printerPasswordAllData),
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
        return inertia("PrinterPassword/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePrinterPasswordRequest $request)
    {
        //
        $data = $request->validated();
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new data
        PrinterPassword::create($data);

        return to_route('printerPassword.index')->with('success', 'New Printer Account was created');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $printerPassword = PrinterPassword::where('id', $id)->firstOrFail();

        return inertia("0365Account/Show", [
            'printerPassword' => new PrinterPasswordResource($printerPassword),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PrinterPassword $printerPassword)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrinterPasswordRequest $request, PrinterPassword $printerPassword)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle profile_path if it exists
        // $profile_path = $data['profile_path'] ?? null;
        // $profile_path = $request->file('profile_path');

        // if($profile_path){
        //     if($printerPassword->profile_path){
        //         Storage::disk('public')->deleteDirectory(dirname($printerPassword->profile_path));
        //     }
        //     $data['profile_path'] = $profile_path->store('accountUsers/'.Str::random(), 'public');
        // } else {
        //     unset($data['profile_path']);
        // }

        $data['updated_by'] = Auth::id();
        $printerPassword->update($data);
        // \Log::info('Updated account user: ', $printerPassword->toArray());
        return to_route('printerPassword.index')->with('success', "Printer Acc \" $printerPassword->dept\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PrinterPassword $printerPassword)
    {
        //
        $printerPassword->delete();
        // if($printerPassword->profile_path){
        //     Storage::disk('public')->deleteDirectory(dirname($printerPassword->profile_path));
        // }
        return to_route('printerPassword.index')->with('success', "Printer Acc - \" $printerPassword->dept\" successfully deleted!");
    }
}
