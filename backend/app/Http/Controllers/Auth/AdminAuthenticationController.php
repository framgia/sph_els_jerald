<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AdminAuthenticationController extends Controller
{
    public function signinAdmin(Request $request)
    {
        $attributes = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $attributes['email'])
                    ->where('isAdmin', 1)
                    ->first();

        if (!$user || !Hash::check($attributes['password'], $user->password)) {
            return response([
                'message' => 'Your provided credentials could not be verified'
            ], 401);
        }

        $adminToken = $user->createToken('adminToken')->plainTextToken;

        $response = [
            'user' => $user,
            'adminToken' => $adminToken
        ];

        return response($response, 201);
    }

    public function signoutAdmin(Request $request)
    {
        if (!auth()->user()->isAdmin) {
            return response()->json(['Message' => 'Permission denied'], 403);
        }

        auth()->user()->tokens()->delete();

        return [
            'message' => 'Signed out'
        ];
    }
}