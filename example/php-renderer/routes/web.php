<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $resp = Http::get('http://172.17.0.1:3030/game/123');
    $assets = $resp->collect()->first()['assets'];
    return view('welcome', ['assets' => $assets]);
});

Route::get('/proxy', function(Request $request) { // http://localhost:80/proxy?proxy=www.google.com
    $proxy = $request->all()['proxy'];
    $resp = Http::get($proxy)->json();
    return $resp;
});
