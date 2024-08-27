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
    
    // public function index(){
        
    //     $totalOperationals = Computers::query()->where('comp_status', 'Deployed')->count()
    //         + Tablets::query()->where('tablet_status', 'Deployed')->count()
    //         + ServerUPS::query()->where('S_UStatus', 'Deployed')->count()
    //         + Phones::query()->where('phone_status', 'Deployed')->count();

    //     $totalUsers = Computers::query()->whereIn('comp_type', ['Desktop','Laptop'])->count()
    //         + Tablets::query()->count()
    //         + ServerUPS::query()->count()
    //         + Phones::query()->count();
            
    //     $totalSpareUnits = Computers::query()->where('comp_status', 'Spare')->count();
    //     $totalDesktops = Computers::query()->where('comp_type', 'Desktop')->count();
    //     $totalLaptops = Computers::query()->where('comp_type', 'Laptop')->count();
    //     $totalTablets = Tablets::query()->count();
    //     $totalPhones = Phones::query()->count();
    //     $totalNACeleron = Computers::query()
    //         ->where('comp_gen', 'N/A')
    //         ->whereIn('comp_status', ['Deployed', 'Barrow', 'Spare'])
    //         ->count();
    //     $totalPentium = Computers::query()
    //         ->where('comp_gen', 'Pentium')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();
        
    //     $total3rdGen = Computers::query()
    //         ->where('comp_gen', '3rd')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();
        
    //     $total4thGen = Computers::query()
    //         ->where('comp_gen', '4th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();
        
    //     $total5thGen = Computers::query()
    //         ->where('comp_gen', '5th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();

    //     $total6thGen = Computers::query()
    //         ->where('comp_gen', '6th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();

    //     $total7thGen = Computers::query()
    //         ->where('comp_gen', '7th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();

    //     $total8thGen = Computers::query()
    //         ->where('comp_gen', '8th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();

    //     $total9thGen = Computers::query()
    //         ->where('comp_gen', '9th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();
            
    //     $total10thGen = Computers::query()
    //         ->where('comp_gen', '10th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();
            
    //     $total11thGen = Computers::query()
    //         ->where('comp_gen', '11th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();

    //     $total12thGen = Computers::query()
    //         ->where('comp_gen', '12th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();

    //     $total13thGen = Computers::query()
    //         ->where('comp_gen', '13th')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();

    //     $totalDesktopPentiumto7thGen = Computers::query()
    //         ->whereIn('comp_gen', ['Pentium', '3rd','4th','5th','6th','7th'])
    //         ->where('comp_type', 'Desktop')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();

    //     $totalLaptopPentiumto7thGen = Computers::query()
    //         ->whereIn('comp_gen', ['Pentium', '3rd','4th','5th','6th','7th'])
    //         ->where('comp_type', 'Laptop')
    //         ->whereIn('comp_status', ['Deployed','Spare','Barrow'])
    //         ->count();

    //     $totalDisposedOrDisposal = Computers::query()
    //         ->whereIn('comp_status', ['For Disposal','Already Disposed'])
    //         ->count();
            
    //     return inertia(
    //         'Dashboard', 
    //         compact(
    //             'totalOperationals','totalUsers','totalSpareUnits','totalDesktops','totalLaptops', 'totalTablets', 'totalPhones',
    //             'totalNACeleron','totalPentium','total3rdGen','total4thGen','total5thGen','total6thGen','total7thGen','total8thGen',
    //             'total9thGen','total10thGen','total11thGen','total12thGen','total13thGen','totalDesktopPentiumto7thGen',
    //             'totalLaptopPentiumto7thGen','totalDisposedOrDisposal'
    //         )
    //     );
    // }

    
    public function index()
    {
        $statuses = ['Deployed', 'Spare', 'Barrow'];
        $generations = ['N/A', 'Pentium', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th'];
        
        $totalOperationals = Computers::query()->whereIn('comp_status', ['Deployed','Barrow'])->count()
            + Tablets::query()->whereIn('tablet_status', ['Deployed','Barrow'])->count()
            + ServerUPS::query()->whereIn('S_UStatus', ['Deployed','Barrow'])->count()
            + Phones::query()->whereIn('phone_status', ['Deployed','Barrow'])->count();

        $totalUsers = Computers::query()->whereIn('comp_type', ['Desktop','Laptop'])->count()
            + Tablets::query()->count()
            + ServerUPS::query()->count()
            + Phones::query()->count();

        $totalSpareUnits = Computers::query()->where('comp_status', 'Spare')->count();
        $totalDesktops = Computers::query()->where('comp_type', 'Desktop')->whereIn('comp_status',['Deployed','Barrow'])->count();
        $totalLaptops = Computers::query()->where('comp_type', 'Laptop')->whereIn('comp_status',['Deployed','Barrow'])->count();
        $totalTablets = Tablets::query()->count();
        $totalPhones = Phones::query()->count();
        
        // $totalsByGen = [];
        // foreach ($generations as $gen) {
        //     $totalsByGen[$gen] = Computers::query()
        //         ->where('comp_gen', $gen)
        //         ->whereIn('comp_status', $statuses)
        //         ->count();
        // }

        $totalsByGen = [];
        foreach (array_slice($generations, 1) as $gen) { // Skip 'N/A' for this loop
            $totalsByGen[$gen] = Computers::query()
                ->where('comp_gen', $gen)
                ->whereIn('comp_status', $statuses)
                ->count()
            + ServerUPS::query()
                ->where('S_UGen', $gen)
                ->whereIn('S_UStatus', $statuses)
                ->count();
        }

        // Special handling for 'N/A'
        $totalNACeleron = Computers::query()
        ->where(function ($query) {
            $query->where('comp_gen', 'N/A')
                ->whereIn('comp_status', ['Deployed', 'Spare', 'Barrow'])
                ->orWhere('comp_cpu', 'like', '%celeron%');
        })->count()
        + Tablets::query()
        ->whereIn('tablet_status', ['Deployed', 'Spare', 'Barrow', 'For Disposal', 'Already Disposed'])
        ->where('tablet_cpu', 'like', '%celeron%')->count();

        $totalDesktopPentiumto7thGen = Computers::query()
            ->whereIn('comp_gen', ['Pentium', '3rd', '4th', '5th', '6th', '7th'])
            ->where('comp_type', 'Desktop')
            ->whereIn('comp_status', $statuses)
            ->count();

        $totalLaptopPentiumto7thGen = Computers::query()
            ->whereIn('comp_gen', ['Pentium', '3rd', '4th', '5th', '6th', '7th'])
            ->where('comp_type', 'Laptop')
            ->whereIn('comp_status', $statuses)
            ->count();

        $totalDisposedOrDisposal = Computers::query()
            ->whereIn('comp_status', ['For Disposal', 'Already Disposed'])
            ->count()
            + Tablets::query()
                ->whereIn('tablet_status', ['For Disposal', 'Already Disposed'])
                ->count()
            + Phones::query()
                ->whereIn('phone_status', ['For Disposal', 'Already Disposed'])
                ->count();
            + ServerUPS::query()
                ->whereIn('S_UStatus', ['For Disposal', 'Already Disposed'])
                ->count();
            
        return inertia(
            'Dashboard', 
            array_merge(
                compact(
                    'totalOperationals', 'totalUsers', 'totalSpareUnits', 'totalDesktops', 'totalLaptops', 'totalTablets', 'totalPhones',
                    'totalDesktopPentiumto7thGen', 'totalLaptopPentiumto7thGen', 'totalDisposedOrDisposal'
                ),
                [
                    'totalNACeleron' => $totalNACeleron,
                    'totalPentium' => $totalsByGen['Pentium'],
                    'total3rdGen' => $totalsByGen['3rd'],
                    'total4thGen' => $totalsByGen['4th'],
                    'total5thGen' => $totalsByGen['5th'],
                    'total6thGen' => $totalsByGen['6th'],
                    'total7thGen' => $totalsByGen['7th'],
                    'total8thGen' => $totalsByGen['8th'],
                    'total9thGen' => $totalsByGen['9th'],
                    'total10thGen' => $totalsByGen['10th'],
                    'total11thGen' => $totalsByGen['11th'],
                    'total12thGen' => $totalsByGen['12th'],
                    'total13thGen' => $totalsByGen['13th'],
                ]
            )
        );
    }
}
