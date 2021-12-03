<?php

namespace App\Http\Controllers\User;

use App\Models\Quiz;
use App\Models\User;
use App\Models\Answer;
use App\Models\Choice;
use App\Models\Follow;
use App\Models\QuizLog;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => ['required', 'max:255'],
            'middleName' => ['required', 'max:255'],
            'lastName' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'min:7', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $attributes = $validator->validated();

        $attributes['password'] = bcrypt($request->password);
        $attributes['isAdmin'] = 0;
        $attributes['avatar'] = '';

        return $user = User::create($attributes);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showUserProfile(User $user)
    {
        return User::getProfileDetails($user->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showSelfProfile()
    {
        return User::getProfileDetails(auth()->user()->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showSelfDashboard()
    {
        return User::getDashboardDetails(auth()->user()->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showLearnedWords()
    {
        return User::getLearnedWords(auth()->user()->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showLearnedLessons()
    {
        return User::getLearnedLessons(auth()->user()->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showLearnedLessonResult($quiz)
    {
        return User::getLearnedLessonResult(auth()->user()->id, $quiz);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showUsersList()
    {
        return User::getUsersList();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function follow(User $user)
    {
        $auth_user_follow = Follow::where('user_id', auth()->user()->id)
                                    ->where('follow_id', $user->id)
                                    ->first();

        if (!$auth_user_follow) {
            $follow = Follow::create([
                'user_id' => auth()->user()->id,
                'follow_id' => $user->id,
            ]);

            $follow->activity()->create([
                'user_id' => $follow->user_id,
            ]);

            $follow->activity()->create([
                'user_id' => $follow->follow_id,
            ]);

            return response([
                'message' => 'Followed successfully'
            ], 201);
        } else {
            return response([
                'message' => 'You already followed this user'
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function unfollow(User $user)
    {
        $auth_user_follow = Follow::where('user_id', auth()->user()->id)
                                ->where('follow_id', $user->id)
                                ->first();

        if ($auth_user_follow) {
            $unfollow = Follow::where('user_id', auth()->user()->id)
                            ->where('follow_id', $user->id)
                            ->delete();

            $follow_activity = Activity::where('user_id', auth()->user()->id)
                                    ->where('activable_id', $auth_user_follow->id)
                                    ->delete();

            $followed_activity = Activity::where('user_id', $user->id)
                                    ->where('activable_id', $auth_user_follow->id)
                                    ->delete();

            return response([
                'message' => 'Unfollowed successfully'
            ], 201);
        } else {
            return response([
                'message' => 'You are not following this user'
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showSelfDetails()
    {
        return User::find(auth()->user()->id);
    }

    /**
     * Update the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateSelfDetails(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => ['required', 'max:255'],
            'middleName' => ['required', 'max:255'],
            'lastName' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore(auth()->user()->id)],
            'password' => ['nullable', 'min:7', 'max:255'],
            'avatar' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $attributes = $validator->validated();

        $data = [
            'firstName' => $attributes['firstName'],
            'middleName' => $attributes['middleName'],
            'lastName' => $attributes['lastName'],
            'email' => $attributes['email'],
        ];

        if ($attributes['password']) {
            $data['password'] = bcrypt($attributes['password']);
        }

        if (env('APP_ENV') === "local") {
            if ($request->file('avatar')) {
                $user = User::find(auth()->user()->id);

                if ($user->avatar) {
                    Storage::delete($user->avatar);
                }

                $path = $request->file('avatar')->store('avatars');

                $data['avatar'] = $path;
            }
        }

        $user = User::where('id', auth()->user()->id)->update($data);

        return $user;
    }
}