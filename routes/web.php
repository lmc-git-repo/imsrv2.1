<?php

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
    Route::resource('phones', PhonesController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('consumables', ConsumablesController::class)->middleware(CheckRole::class.':super admin,admin,member');
    Route::resource('purchase_requisitions', PurchaseRequisitionsController::class)->middleware(CheckRole::class.':super admin,admin');
    Route::resource('departments', DepartmentsController::class)->middleware(CheckRole::class.':super admin,admin,user,member');
    Route::resource('accountUsers', AccountUsersController::class)->middleware(CheckRole::class.':super admin,admin,user,member');
    // Route::resource('user', UserController::class);

    // Restrict 'user' resource to admins only
    Route::resource('user', UserController::class)->middleware(CheckRole::class.':admin,super admin');
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
