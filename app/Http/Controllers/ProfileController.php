<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Download a backup of the database as an SQL file.
     */
    public function backup(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $dbHost = config('database.connections.mysql.host');
        $dbUser = config('database.connections.mysql.username');
        $dbPass = config('database.connections.mysql.password');
        $dbName = config('database.connections.mysql.database');
        $dbPort = config('database.connections.mysql.port', 3306);
        $backupPath = storage_path('app/backups');
        // $backupPath = '/volume1/web/backups';
        if (!is_dir($backupPath)) {
            mkdir($backupPath, 0755, true);
        }
        // Remove all previous .sql backups in the folder
        foreach (glob($backupPath . DIRECTORY_SEPARATOR . 'backup_*.sql') as $oldFile) {
            @unlink($oldFile);
        }
        $fileName = 'backup_' . date('Y_m_d_His') . '.sql';
        $fullPath = $backupPath . DIRECTORY_SEPARATOR . $fileName;

        if (!is_dir($backupPath)) {
            mkdir($backupPath, 0755, true);
        }

        $dbPassEscaped = str_replace('"', '\"', $dbPass);

        // Use the full path to mysqldump.exe
        $mysqldumpPath = 'C:\\xampp\\mysql\\bin\\mysqldump.exe'; // <-- update this path as needed

        $command = "\"{$mysqldumpPath}\" --user=\"{$dbUser}\" --password=\"{$dbPassEscaped}\" --host=\"{$dbHost}\" --port={$dbPort} {$dbName} > \"{$fullPath}\" 2>&1";
        $output = [];
        $result = null;
        exec($command, $output, $result);

        if ($result === 0 && file_exists($fullPath)) {
            return back()->with('status', 'Database backup successful!');
        } else {
            return back()->with('status', 'Database backup failed! Error: ' . implode("\n", $output));
        }
    }
}
