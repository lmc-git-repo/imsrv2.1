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
    public function index()
    {
        $statuses = ['Deployed', 'Spare', 'Borrow'];
        $generations = ['N/A', 'Pentium', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th'];
        
        $totalOperationals = Computers::query()->whereIn('comp_status', ['Deployed','Borrow','Spare'])->count()
            + Tablets::query()->whereIn('tablet_status', ['Deployed','Borrow','Spare'])->count()
            + ServerUPS::query()->whereIn('S_UStatus', ['Deployed','Borrow','Spare'])->count()
            + Phones::query()->whereIn('phone_status', ['Deployed','Borrow','Spare'])->count();
        
        // Fetch records for each model where status matches 'Deployed', 'Borrow', or 'Spare'
            // Merge all records into one collection
        $models = [
            Computers::class => 'comp_status',
            Tablets::class => 'tablet_status',
            ServerUPS::class => 'S_UStatus',
            Phones::class => 'phone_status',
        ];
        
        // $statuses = ['Deployed', 'Borrow', 'Spare'];
        
        $operationalsTotal = collect();
        
        foreach ($models as $model => $statusField) {
            $operationalsTotal = $operationalsTotal->merge($model::query()->whereIn($statusField, $statuses)->get());
        }
        //end
        
        
        $totalUsers = Computers::query()->whereIn('comp_type', ['Desktop','Laptop'])->count()
            + Tablets::query()->count()
            + ServerUPS::query()->count()
            + Phones::query()->count();

        $totalSpareUnits = Computers::query()->where('comp_status', 'Spare')->count();
        $totalDesktops = Computers::query()->where('comp_type', 'Desktop')->whereIn('comp_status',['Deployed','Borrow'])->count();
        $totalLaptops = Computers::query()->where('comp_type', 'Laptop')->whereIn('comp_status',['Deployed','Borrow'])->count();
        $totalTablets = Tablets::query()->count();
        $totalPhones = Phones::query()->count();
        
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
                ->whereIn('comp_status', ['Deployed', 'Spare', 'Borrow'])
                ->orWhere('comp_cpu', 'like', '%celeron%');
        })->count()
        + Tablets::query()
        ->whereIn('tablet_status', ['Deployed', 'Spare', 'Borrow', 'For Disposal', 'Already Disposed'])
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
                    'totalOperationals', 'operationalsTotal', 'totalUsers', 'totalSpareUnits', 'totalDesktops', 'totalLaptops', 'totalTablets', 'totalPhones',
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
