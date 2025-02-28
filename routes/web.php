<?php

use App\Http\Controllers\AccountManagementController;
use App\Http\Controllers\AccountUsersController;
use App\Http\Controllers\ComputersController;
use App\Http\Controllers\ConsumablesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\MonitorsController;
use App\Http\Controllers\PhonesController;
use App\Http\Controllers\PrintersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicViewController;
use App\Http\Controllers\PurchaseRequisitionsController;
use App\Http\Controllers\ServerUPSController;
use App\Http\Controllers\TabletsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

// Public view route
route::get('/public-view', [PublicViewController::class, 'index'])->name('public.view');

Route::middleware(['auth', 'verified']) ->group(function(){
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('computers', ComputersController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('serverUps', ServerUPSController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('monitors', MonitorsController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('printers', PrintersController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('tablets', TabletsController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('phones', PhonesController::class)->middleware(CheckRole::class.':super admin,admin,member,hr');
    Route::resource('consumables', ConsumablesController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('purchase_requisitions', PurchaseRequisitionsController::class)->middleware(CheckRole::class.':super admin,admin');
    Route::resource('departments', DepartmentsController::class)->middleware(CheckRole::class.':super admin,admin,user,member,hr');
    Route::resource('accountUsers', AccountUsersController::class)->middleware(CheckRole::class.':super admin,admin,user,member,hr');
    // Route::resource('user', UserController::class);

    // Restrict 'user' resource to admins only
    Route::resource('user', UserController::class)->middleware(CheckRole::class.':admin,super admin');
    Route::resource('accountManagement', AccountManagementController::class)->middleware(CheckRole::class.':super admin,admin');
    
    // Add routes for printing asset tags
    Route::get('/computers/{id}/print', [ComputersController::class, 'printAssetTag'])->name('computers.printAssetTag');
    Route::get('/computers/bulk-print', [ComputersController::class, 'bulkPrintAssetTags'])->name('computers.bulkPrintAssetTags');

    Route::get('/serverups/{id}/print', [ServerUPSController::class, 'printAssetTag'])->name('serverups.printAssetTag');
    Route::get('/serverups/bulk-print', [ServerUPSController::class, 'bulkPrintAssetTags'])->name('serverups.bulkPrintAssetTags');

    Route::get('/monitors/{id}/print', [MonitorsController::class, 'printAssetTag'])->name('monitors.printAssetTag');
    Route::get('/monitors/bulk-print', [MonitorsController::class, 'bulkPrintAssetTags'])->name('monitors.bulkPrintAssetTags');

    Route::get('/printers/{id}/print', [PrintersController::class, 'printAssetTag'])->name('printers.printAssetTag');
    Route::get('/printers/bulk-print', [PrintersController::class, 'bulkPrintAssetTags'])->name('printers.bulkPrintAssetTags');

    Route::get('/tablets/{id}/print', [TabletsController::class, 'printAssetTag'])->name('tablets.printAssetTag');
    Route::get('/tablets/bulk-print', [TabletsController::class, 'bulkPrintAssetTags'])->name('tablets.bulkPrintAssetTags');

    Route::get('/phones/{id}/print', [PhonesController::class, 'printAssetTag'])->name('phones.printAssetTag');
    Route::get('/phones/bulk-print', [PhonesController::class, 'bulkPrintAssetTags'])->name('phones.bulkPrintAssetTags');
});

// Route::get('/test-role', function () {
//     return 'Role Middleware Test';
// })->middleware(CheckRole::class.':user');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy')->middleware(CheckRole::class.':super admin,admin');
});

require __DIR__.'/auth.php';
