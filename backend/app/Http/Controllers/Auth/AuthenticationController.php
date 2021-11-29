<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    public function signin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $attributes = $validator->validated();

        $user = User::where('email', $attributes['email'])
                    ->where('isAdmin', 0)
                    ->first();

        if (!$user || !Hash::check($attributes['password'], $user->password)) {
            return response([
                'message' => 'Your provided credentials could not be verified'
            ], 401);
        }

        $token = $user->createToken('token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function signout(Request $request)
    {
        if (auth()->user()->isAdmin) {
            return response()->json(['Message' => 'Permission denied'], 403);
        }

        auth()->user()->tokens()->delete();

        return [
            'message' => 'Signed out'
        ];
    }
}