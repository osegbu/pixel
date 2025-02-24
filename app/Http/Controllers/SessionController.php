<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class SessionController extends Controller
{
    public function index(){
        return inertia('Login');
    }

    public function store(){
        $attributes = request()->validate([
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'min:6'],
        ]);

        if(! Auth::attempt($attributes)){
            throw ValidationException::withMessages([
                'password' => __('auth.failed')
            ]);
        }

        Auth::attempt($attributes);
        request()->session()->regenerate();

        return redirect('/');
    }

    public function destroy(){
        Auth::logout();
        return redirect('/');
    }
}
