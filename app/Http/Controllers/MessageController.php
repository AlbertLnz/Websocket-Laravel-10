<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function sent(Request $request){
        $message = auth()->user()->messages()->create([
            'content' => $request->message,
            'sala_id' => $request->sala_id
        ])->load('user');

        return $message;
    }
}
