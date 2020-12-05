<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', function (Request $request) {
    if ($request->passcode == '7818632617') {
        return ['login'=>true, 'role'=>'user', 'requester'=>$request->requester, 'success'=>true];
    }
    else if ($request->passcode == 'steve1201') {
        return ['login'=>true, 'role'=>'admin', 'requester'=>$request->requester, 'success'=>true];
    }
    else {
        return ['login'=>false, 'role'=>'', 'requester'=>'', 'success'=>false];
    }
});

// Retrieve Upcoming meetings
Route::get('/meeting', function() {
    $user = Zoom::user()->find("btricp@gmail.com");
    $meetings = $user->meetings;

    $dt = new DateTime();

    $newMeetings = array();
    
    foreach ($meetings as $meeting) {
        if(is_null($meeting->start_time)) {
            array_push($newMeetings, [
                'id' => $meeting->id,
                'topic' => $meeting->topic,
                'duration' => $meeting->duration,
                'join_url' => $meeting->join_url,
                'requester' => $meeting->agenda
                ]);
        }
        else {
            if ($meeting->start_time->getTimestamp() + ($meeting->duration * 60) >= $dt->getTimestamp()) {
                array_push($newMeetings, [
                'id' => $meeting->id,
                'topic' => $meeting->topic,
                'start_time' => $meeting->start_time,
                'duration' => $meeting->duration,
                'join_url' => $meeting->join_url,
                'requester' => $meeting->agenda
                ]);
            }
        }
    }
    
    return $newMeetings;
});

// Retrieve Past meetings
Route::get('/pastMeeting', function() {
    $user = Zoom::user()->find("btricp@gmail.com");
    $meetings = $user->meetings;

    $dt = new DateTime();

    $newMeetings = array();

    foreach ($meetings as $meeting) {
        if(is_null($meeting->start_time)) {
            array_push($newMeetings, [
                'id' => $meeting->id,
                'topic' => $meeting->topic,
                'duration' => $meeting->duration,
                'join_url' => $meeting->join_url,
                'requester' => $meeting->agenda
                ]);
        }
        else {
            if ($meeting->start_time->getTimestamp() + ($meeting->duration * 60) + 604800 >= $dt->getTimestamp()) {
                array_push($newMeetings, [
                'id' => $meeting->id,
                'topic' => $meeting->topic,
                'start_time' => $meeting->start_time,
                'duration' => $meeting->duration,
                'join_url' => $meeting->join_url,
                'requester' => $meeting->agenda
                ]);
            }
        }
    }

    return array_reverse($newMeetings);
});

// Create new zoom meetings
Route::post('create', function (Request $request) {
    $random = str_shuffle('abcdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ234567890!$%^&!$%^&');
    $password = substr($random, 0, 10);

    $user = Zoom::user()->find("btricp@gmail.com");
    $meeting = Zoom::meeting()->make([
        'topic' => $request->topic,
        'start_time' => $request->dateTime,
        'duration' => $request->duration*60,
        'type' => 2,
        'agenda' => $request->requester,
        'password' => $password
    ]);

    return $user->meetings()->save($meeting);
});

// Delete zoom meetings
Route::post('delete', function (Request $request) {
    $user = Zoom::user()->find("btricp@gmail.com");

    $meeting = $user->meetings()->find($request->id);

    return $meeting->delete();
});
