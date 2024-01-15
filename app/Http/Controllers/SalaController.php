<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Sala;

class SalaController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function salaWith(User $user){
        $user_auth = auth()->user();
        $user_b = $user;

        $sala = $user_auth->salas()->wherehas('users', function($query) use ($user_b){
            $query->where('sala_user.user_id', $user_b->id);
        })->first();

        if(!$sala){
            //Creamos nueva sala
            $sala = Sala::create([]);
            $sala->users()->sync([$user_auth->id, $user_b->id]);
        }

        return redirect()->route('sala.show', $sala);
    }

    public function show(Sala $sala){
        return view('sala', [
            'sala' => $sala
        ]);
    }

    public function getUsers(Sala $sala_id){
        $users = $sala_id->users()->get();
        return response()->json([
            'users' => $users
        ]);
    }

    public function getMessages(Sala $sala_id){
        $messages = $sala_id->messages()->with('user')->get();

        return response()->json([
            'messages' => $messages
        ]);
    }
}
