<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class TaskController extends Controller
{
    public function index()
    {
        if(Auth::check()){
            $user = Auth::user();
            $tasks = $user->tasks()->latest()->paginate(20);

            $pendingCount = $user->tasks()->where('status', 'Pending')->count();
            $inProgressCount = $user->tasks()->where('status', 'In Progress')->count();
            $completedCount = $user->tasks()->where('status', 'Completed')->count();


            return inertia('Home', [
                'tasks' => $tasks,
                'pendingCount' => $pendingCount,
                'inProgressCount' => $inProgressCount,
                'completedCount' => $completedCount
            ]);
        } else {
            return inertia('Login');
        }
    }

    public function show(Tasks $task){
        return inertia('Task', ['task' => $task]);
    }

    public function create()
    {
        return inertia('CreateTask');
    }

    public function store()
    {
        $attributes = request()->validate([
                        'task' => ['required', 'string', 'max:255'],
                        'description' => ['required', 'string'],
                        'due_date' => ['required', 'date', 'after_or_equal:today'],
                        'status' => ['required', 'string'],
                    ]);

        Tasks::create([
            'user_id' => Auth::id(),
            'task' => $attributes['task'],
            'description' => $attributes['description'],
            'due_date' => $attributes['due_date'],
            'status' => $attributes['status'],
        ]);

        return redirect('/');

    }

    public function edit(Tasks $task){
        return inertia('EditTask', ['task' => $task]);
    }

    public function update(Tasks $task)
    {
        $attributes = request()->validate([
            'task' => ['required', 'string', 'max:255'],
            'due_date' => ['required', 'date', 'after_or_equal:today'],
            'status' => ['required', 'string'],
            'description' => ['required', 'string']
        ]);

        $task->update([
            'task' => request('task'),
            'due_date' => request('due_date'),
            'status' => request('status'),
            'description' => request('description')
        ]);

        return redirect('/task/' . $task->id);
    }

    public function complete(Tasks $task)
    {

        $task->update([
            'status' => "Completed"
        ]);

        return redirect('/task/' . $task->id);
    }



    public function destroy(Tasks $task)
    {
        $task->delete();
        return redirect('/');
    }
}
