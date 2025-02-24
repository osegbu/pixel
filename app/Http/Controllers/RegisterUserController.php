<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\EmailVerification;
use App\Mail\VerificationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class RegisterUserController extends Controller
{
    public function index()
    {
        return inertia('Register');
    }

    public function store()
    {
        $attributes = request()->validate([
            'email' => ['required', 'email', 'unique:users', 'max:255'],
            'password' => ['required', 'confirmed', 'min:6'],
        ]);

        $user = User::create($attributes);

        // $token = Str::random(40);
        // EmailVerification::create([
        //     'user_id' => $user->id,
        //     'email' => $user->email,
        //     'token' => $token,
        // ]);

        // Mail::to($user->email)->queue(
        //     new VerificationMail($token)
        // );

        return redirect('/login');
    }
}
