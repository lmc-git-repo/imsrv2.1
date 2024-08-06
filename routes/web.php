<?php

use App\Http\Controllers\AccountUsersController;
use App\Http\Controllers\ComputersController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\MonitorsController;
use App\Http\Controllers\PhonesController;
use App\Http\Controllers\PrintersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServerUPSController;
use App\Http\Controllers\TabletsController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified']) ->group(function(){
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
        ->name('dashboard');

    Route::resource('computers', ComputersController::class);
    Route::resource('serverUps', ServerUPSController::class);
    Route::resource('monitors', MonitorsController::class);
    Route::resource('printers', PrintersController::class);
    Route::resource('tablets', TabletsController::class);
    Route::resource('phones', PhonesController::class);
    Route::resource('departments', DepartmentsController::class);
    Route::resource('accountUsers', AccountUsersController::class);
    Route::resource('user', UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/accountUsers/{account_id}', [AccountUsersController::class, 'show'])->name('accountUsers.show');
Route::put('/accountUsers/{account_id}', [AccountUsersController::class, 'update'])->name('accountUsers.update');

require __DIR__.'/auth.php';
