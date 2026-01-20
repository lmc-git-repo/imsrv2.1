<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\ComputersResource;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\MonitorsResource;
use App\Models\AccountUsers;
use App\Models\Computers;
use App\Models\Departments;
use App\Models\Monitors;
use App\Http\Requests\StoreMonitorsRequest;
use App\Http\Requests\UpdateMonitorsRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class MonitorsController extends Controller
{
    public function index()
    {
        $query = Monitors::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $monitors = $query
            ->with(['createdBy', 'updatedBy'])
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('compName', 'like', "%{$search}%")
                    ->orWhere('mntr_user', 'like', "%{$search}%")
                    ->orWhere('mntr_asset', 'like', "%{$search}%")
                    ->orWhere('mntr_serial', 'like', "%{$search}%")
                    ->orWhere('mntr_model', 'like', "%{$search}%");
            })
            ->when(request('asset_class'), function (Builder $query, $assetClass) {
                $query->where('asset_class', $assetClass);
            })
            ->when(request('mntr_department'), function (Builder $query, $mntrDept) {
                $query->where('mntr_department', $mntrDept);
            })
            ->paginate(10)
            ->onEachSide(1);

        $departmentsList = Cache::remember('departments_list', 3600, function () {
            return Departments::orderBy('dept_list')->get();
        });

        $mntrUsersList = Cache::remember('monitors_users_list', 3600, function () {
            return AccountUsers::orderBy('name')->get();
        });

        /**
         * ✅ FIX: always fresh computer list for monitor dropdown
         */
        Cache::forget('monitors_comp_list');

        $compNameList = Cache::remember('monitors_comp_list', 3600, function () {
            return Computers::orderBy('comp_name')->get();
        });

        return inertia("Monitors/Index", [
            'monitors' => MonitorsResource::collection($monitors),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'compNameList' => ComputersResource::collection($compNameList),
            'mntrUsersList' => AccountUsersResource::collection($mntrUsersList),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function printAssetTag($assetId)
    {
        $asset = Monitors::findOrFail($assetId);

        try {
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(
                resource_path('js/Components/hooks/Asset Tag Format.xlsx')
            );
        } catch (\Exception $e) {
            return back()->with('error', 'Asset tag template not found.');
        }

        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('F7', $asset->mntr_asset ?? '');
        $sheet->setCellValue('C10', $asset->mntr_model ?? '');
        $sheet->setCellValue('C12', $asset->mntr_model ?? '');
        $sheet->setCellValue('C14', $asset->mntr_serial ?? '');

        $datePurchased = $asset->datePurchased
            ? Carbon::parse($asset->datePurchased)->format('m/d/Y')
            : '';

        $sheet->setCellValue('G8', $datePurchased);
        $sheet->setCellValue('G10', $asset->mntr_department ?? '');
        $sheet->setCellValue('G11', 'Issued To: ' . ($asset->mntr_user ?? ''));

        $fileName = 'asset_tag_' . uniqid() . '.xlsx';
        $tempFile = sys_get_temp_dir() . '/' . $fileName;

        $writer = new Xlsx($spreadsheet);
        $writer->save($tempFile);

        return response()->download($tempFile)->deleteFileAfterSend(true);
    }

    public function store(StoreMonitorsRequest $request)
    {
        $data = $request->validated();

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if (!empty($data['img_path'])) {
            $data['img_path'] = $data['img_path']->store('Monitors/' . Str::random(), 'public');
        }

        Monitors::create($data);

        return to_route('monitors.index')->with('success', 'New monitor was created');
    }

    public function update(UpdateMonitorsRequest $request, Monitors $monitor)
    {
        $data = $request->validated();

        if ($request->hasFile('img_path')) {
            if ($monitor->img_path) {
                Storage::disk('public')->deleteDirectory(dirname($monitor->img_path));
            }
            $data['img_path'] = $request->file('img_path')->store('Monitors/' . Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        $data['updated_by'] = Auth::id();
        $monitor->update($data);

        return to_route('monitors.index')
            ->with('success', "Monitor \"{$monitor->compName}\" was updated");
    }

    public function destroy(Monitors $monitor)
    {
        if ($monitor->img_path) {
            Storage::disk('public')->deleteDirectory(dirname($monitor->img_path));
        }

        $monitor->delete();

        return to_route('monitors.index')
            ->with('success', "Monitor - \"{$monitor->compName}\" successfully deleted!");
    }

    public function bulkFetch(Request $request)
    {
        $ids = $request->input('ids');
        $monitor = Monitors::whereIn('monitor_id', $ids)->get();

        return response()->json($monitor);
    }
}