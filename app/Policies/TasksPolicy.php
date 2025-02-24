<?php

namespace App\Policies;

use App\Models\Tasks;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TasksPolicy
{
    public function view(User $user, Tasks $task)
    {
        return $task->user->is($user);
    }
}
