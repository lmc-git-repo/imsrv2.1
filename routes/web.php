<?php

use App\Http\Controllers\AccountManagementController;
use App\Http\Controllers\AccountUsersController;
use App\Http\Controllers\ComputersController;
use App\Http\Controllers\ConsumablesController;
use App\Http\Controllers\FirewallController;
use App\Http\Controllers\L2SwitchController;
use App\Http\Controllers\L3SwitchController;
use App\Http\Controllers\WAPController;
use App\Http\Controllers\CCTVController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\MonitorsController;
use App\Http\Controllers\MSAccountController;
use App\Http\Controllers\PhonesController;
use App\Http\Controllers\PrinterPasswordController;
use App\Http\Controllers\PrintersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicViewController;
use App\Http\Controllers\PurchaseRequisitionsController;
use App\Http\Controllers\ServerUPSController;
use App\Http\Controllers\TabletsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckRole;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
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
    Route::resource('firewall', FirewallController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('l2sw', L2SwitchController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('l3sw', L3SwitchController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('wap', WAPController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('cctv', CCTVController::class)->middleware(CheckRole::class.':super admin,admin,member');

    // Route::resource('user', UserController::class);

    // Restrict 'user' resource to admins only
    Route::resource('user', UserController::class)->middleware(CheckRole::class.':admin,super admin');
    Route::resource('accountManagement', AccountManagementController::class)->middleware(CheckRole::class.':super admin,admin');
    Route::resource('msAccount', MSAccountController::class)->middleware(CheckRole::class.':super admin,admin');
    Route::resource('printerPassword', PrinterPasswordController::class)->middleware(CheckRole::class.':super admin,admin');

    
    // Add routes for printing asset tags
    Route::get('/computers/{id}/print', [ComputersController::class, 'printAssetTag'])->name('computers.printAssetTag');
    // Route::post('/computers/bulk-fetch', [ComputersController::class, 'bulkFetch'])->name('computers.bulkFetch')->middleware(['auth','verified']);
    // Add the bulk-fetch route without CSRF protection
    Route::post('/computers/bulk-fetch', [ComputersController::class, 'bulkFetch'])
        ->name('computers.bulkFetch')
        ->withoutMiddleware([VerifyCsrfToken::class])
        ->middleware(['auth', 'verified']);

    Route::get('/serverups/{id}/print', [ServerUPSController::class, 'printAssetTag'])->name('serverups.printAssetTag');
    Route::post('/serverups/bulk-fetch', [ServerUPSController::class, 'bulkFetch'])
        ->name('serverups.bulkFetch')
        ->withoutMiddleware([VerifyCsrfToken::class])
        ->middleware(['auth', 'verified']);

    Route::get('/monitors/{id}/print', [MonitorsController::class, 'printAssetTag'])->name('monitors.printAssetTag');
    Route::post('/monitors/bulk-fetch', [MonitorsController::class, 'bulkFetch'])
        ->name('monitors.bulkFetch')
        ->withoutMiddleware([VerifyCsrfToken::class])
        ->middleware(['auth', 'verified']);

    Route::get('/printers/{id}/print', [PrintersController::class, 'printAssetTag'])->name('printers.printAssetTag');
    Route::post('/printers/bulk-fetch', [PrintersController::class, 'bulkFetch'])
        ->name('printers.bulkFetch')
        ->withoutMiddleware([VerifyCsrfToken::class])
        ->middleware(['auth', 'verified']);

    Route::get('/tablets/{id}/print', [TabletsController::class, 'printAssetTag'])->name('tablets.printAssetTag');
    Route::post('/tablets/bulk-fetch', [TabletsController::class, 'bulkFetch'])
        ->name('tablets.bulkFetch')
        ->withoutMiddleware([VerifyCsrfToken::class])
        ->middleware(['auth', 'verified']);

    Route::get('/phones/{id}/print', [PhonesController::class, 'printAssetTag'])->name('phones.printAssetTag');
    Route::post('/phones/bulk-fetch', [PhonesController::class, 'bulkFetch'])
        ->name('phones.bulkFetch')
        ->withoutMiddleware([VerifyCsrfToken::class])
        ->middleware(['auth', 'verified']);

    Route::post('/firewall/bulk-fetch', [FirewallController::class, 'bulkFetch'])
        ->name('firewall.bulkFetch')
        ->withoutMiddleware([VerifyCsrfToken::class])
        ->middleware(['auth', 'verified']);
});

// Route::get('/test-role', function () {
//     return 'Role Middleware Test';
// })->middleware(CheckRole::class.':user');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy')->middleware(CheckRole::class.':super admin');
    // Route::post('/profile/backup', [ProfileController::class, 'backup'])->name('profile.backup')->middleware(CheckRole::class.':super admin');
});

require __DIR__.'/auth.php';