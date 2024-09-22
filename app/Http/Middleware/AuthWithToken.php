<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthWithToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Cek apakah api_token ada di session
        if (!session('api_token')) {
            return redirect('/login')->withErrors('You must be logged in.');
        }

        // Sisipkan token ke dalam header permintaan
        $request->headers->set('Authorization', 'Bearer ' . session('api_token'));

        return $next($request);
    }
}
