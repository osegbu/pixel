<?php

use App\Mail\VerificationMail;
use App\Models\EmailVerification;
use App\Models\Tasks;
use App\Models\User;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

Route::get('/', [TaskController::class, 'index'])->name('home');

Route::get('/task/{task}', [TaskController::class, 'show'])->middleware(['auth'])->can('view', 'task');

Route::get('/create', [TaskController::class, 'create'])->middleware(['auth']);

Route::get('/task/edit/{task}', [TaskController::class, 'edit'])->middleware(['auth'])->can('view', 'task');

Route::patch('/task/edit/{task}', [TaskController::class, 'update'])->middleware(['auth'])->can('view', 'task');

Route::patch('/task/complete/{task}', [TaskController::class, 'complete'])->middleware(['auth'])->can('view', 'task');

Route::delete('/task/delete/{task}', [TaskController::class, 'destroy'])->middleware(['auth'])->can('view', 'task');

Route::post('/task/create', [TaskController::class, 'store']);

Route::get('/register', [RegisterUserController::class, 'index']);

Route::post('/register', [RegisterUserController::class, 'store']);

Route::get('/login', [SessionController::class, 'index']);

Route::post('/login', [SessionController::class, 'store']);

Route::post('/logout', [SessionController::class, 'destroy']);

Route::get('/send-verification/{user}', function (User $user) {
    return Inertia::render('SendVerification', ['user' => $user]);
});
