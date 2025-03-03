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

        $totalUsersModels = [
            Computers::class,
            Tablets::class,
            ServerUps::class,
            Phones::class,
        ];
        
        $usersTotal = collect();
        
        foreach ($totalUsersModels as $model) {
            $usersTotal = $usersTotal->merge($model::all());
        }


        $totalSpareUnits = Computers::query()->where('comp_status', 'Spare')->count();
        $spareUnitsTotal = Computers::query()->where('comp_status', 'Spare')->get();
        
        $totalDesktops = Computers::query()->where('comp_type', 'Desktop')->whereIn('comp_status',['Deployed','Borrow'])->count();
        $desktopsTotal = Computers::query()->where('comp_type', 'Desktop')->whereIn('comp_status',['Deployed','Borrow'])->get();

        $totalLaptops = Computers::query()->where('comp_type', 'Laptop')->whereIn('comp_status',['Deployed','Borrow'])->count();
        $laptopsTotal = Computers::query()->where('comp_type', 'Laptop')->whereIn('comp_status',['Deployed','Borrow'])->get();

        $totalTablets = Tablets::query()->count();
        $tabletsTotal = Tablets::query()->get();

        $totalPhones = Phones::query()->count();
        $phonesTotal = Phones::query()->get();
        
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

        $byGenTotal = []; // Hold results by generation
        foreach (array_slice($generations, 1) as $gen) { // Skip 'N/A' for this loop
            $computers = Computers::query()
                ->where('comp_gen', $gen)
                ->whereIn('comp_status', $statuses)
                ->get();  // Fetch the matching records instead of counting
        
            $serverUPS = ServerUPS::query()
                ->where('S_UGen', $gen)
                ->whereIn('S_UStatus', $statuses)
                ->get();  // Fetch the matching records instead of counting
        
            $byGenTotal[$gen] = [
                'computers' => $computers,
                'serverUPS' => $serverUPS
            ];
        }

        // Special handling for 'N/A' - COUNT
        $totalNACeleron = Computers::query()
        ->where(function ($query) {
            $query->where('comp_gen', 'N/A')
                ->whereIn('comp_status', ['Deployed', 'Spare', 'Borrow'])
                ->orWhere('comp_cpu', 'like', '%celeron%');
        })->count()
        + Tablets::query()
        // ->whereIn('tablet_status', ['Deployed', 'Spare', 'Borrow', 'For Disposal', 'Already Disposed'])
        ->whereIn('tablet_status', ['Deployed', 'Spare', 'Borrow'])
        ->where('tablet_cpu', 'like', '%celeron%')->count();

        //GET For TOTALNACELERON

        $totalNACeleronComputers = Computers::query()
            ->where(function ($query) {
                $query->where('comp_gen', 'N/A')
                    ->whereIn('comp_status', ['Deployed', 'Spare', 'Borrow'])
                    ->orWhere('comp_cpu', 'like', '%celeron%');
            })->get();

        $totalNACeleronTablets = Tablets::query()
            // ->whereIn('tablet_status', ['Deployed', 'Spare', 'Borrow', 'For Disposal', 'Already Disposed'])
            ->whereIn('tablet_status', ['Deployed', 'Spare', 'Borrow'])
            ->where('tablet_cpu', 'like', '%celeron%')
            ->get();

        // Combine the collections
        $naCeleronTotal = $totalNACeleronComputers->merge($totalNACeleronTablets);
        //END

        $totalDesktopPentiumto7thGen = Computers::query()
            ->whereIn('comp_gen', ['Pentium', '3rd', '4th', '5th', '6th', '7th'])
            ->where('comp_type', 'Desktop')
            ->whereIn('comp_status', $statuses)
            ->count();

            $desktopPentiumto7thGenTotal = Computers::query()
            ->whereIn('comp_gen', ['Pentium', '3rd', '4th', '5th', '6th', '7th'])
            ->where('comp_type', 'Desktop')
            ->whereIn('comp_status', $statuses)
            ->get();
                   

        $totalLaptopPentiumto7thGen = Computers::query()
            ->whereIn('comp_gen', ['Pentium', '3rd', '4th', '5th', '6th', '7th'])
            ->where('comp_type', 'Laptop')
            ->whereIn('comp_status', $statuses)
            ->count();

            $laptopPentiumto7thGenTotal = Computers::query()
            ->whereIn('comp_gen', ['Pentium', '3rd', '4th', '5th', '6th', '7th'])
            ->where('comp_type', 'Laptop')
            ->whereIn('comp_status', $statuses)
            ->get();


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
            
            
            $disposalStatuses = ['For Disposal', 'Already Disposed'];

            $disposedOrDisposalTotal = collect();

            foreach ($models as $model => $statusField) {
                $disposedOrDisposalTotal = $disposedOrDisposalTotal->merge($model::query()->whereIn($statusField, $disposalStatuses)->get());
            }

        return inertia(
            'Dashboard', 
            array_merge(
                compact(
                    'totalOperationals', 'operationalsTotal', 'totalUsers', 'usersTotal', 'totalSpareUnits', 'spareUnitsTotal',
                    'totalDesktops', 'desktopsTotal', 'totalLaptops', 'laptopsTotal', 'totalTablets', 'tabletsTotal', 'totalPhones', 'phonesTotal',
                    'totalDesktopPentiumto7thGen', 'desktopPentiumto7thGenTotal', 'totalLaptopPentiumto7thGen', 'laptopPentiumto7thGenTotal',
                    'totalDisposedOrDisposal', 'disposedOrDisposalTotal'
                ),
                [
                    'totalNACeleron' => $totalNACeleron,
                    'naCeleronTotal' => $naCeleronTotal,
                    'totalPentium' => $byGenTotal['Pentium'],
                    'total3rdGen' => $byGenTotal['3rd'],
                    'total4thGen' => $byGenTotal['4th'],
                    'total5thGen' => $byGenTotal['5th'],
                    'total6thGen' => $byGenTotal['6th'],
                    'total7thGen' => $byGenTotal['7th'],
                    'total8thGen' => $byGenTotal['8th'],
                    'total9thGen' => $byGenTotal['9th'],
                    'total10thGen' => $byGenTotal['10th'],
                    'total11thGen' => $byGenTotal['11th'],
                    'total12thGen' => $byGenTotal['12th'],
                    'total13thGen' => $byGenTotal['13th'],

                ]
            )
        );
    }
}
