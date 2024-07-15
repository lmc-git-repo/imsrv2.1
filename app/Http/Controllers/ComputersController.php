<?php

namespace App\Http\Controllers;

use App\Models\Computers;
use App\Http\Requests\StoreComputersRequest;
use App\Http\Requests\UpdateComputersRequest;

class ComputersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return inertia("Computers/Index", [

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
    public function store(StoreComputersRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Computers $computers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Computers $computers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComputersRequest $request, Computers $computers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Computers $computers)
    {
        //
    }
}
