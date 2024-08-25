<?php

namespace App\Http\Controllers;

use App\Models\AccountUsers;
use App\Models\Computers;
use App\Models\Phones;
use App\Models\ServerUPS;
use App\Models\Tablets;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function index(){
        
        $totalOperationals = Computers::query()->where('comp_status', 'Deployed')->count()
            + Tablets::query()->where('tablet_status', 'Deployed')->count()
            + ServerUPS::query()->where('S_UStatus', 'Deployed')->count()
            + Phones::query()->where('phone_status', 'Deployed')->count();

        $totalUsers = Computers::query()->whereIn('comp_type', ['Desktop','Laptop'])->count()
            + Tablets::query()->count()
            + ServerUPS::query()->count()
            + Phones::query()->count();
            
        $totalSpareUnits = Computers::query()->where('comp_status', 'Spare')->count();
        $totalDesktops = Computers::query()->where('comp_type', 'Desktop')->count();
        $totalLaptops = Computers::query()->where('comp_type', 'Laptop')->count();
        $totalTablets = Tablets::query()->count();
        $totalPhones = Phones::query()->count();

        return inertia('Dashboard', compact('totalOperationals','totalUsers','totalSpareUnits','totalDesktops','totalLaptops', 'totalTablets', 'totalPhones'));
    }
}
