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

// get API here and receive it from react js
Route::get('/test', function () {
    return ['Edison Wu'];
});

// Zoom Accessing Models
Route::get('/user', function() {
    $user = Zoom::user()->find("btricp@gmail.com");

    return $user->meetings;

});
