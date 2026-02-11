<?php

namespace App\Models;

use ApiResponse;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class UserApi extends Model
{
    // Disable Eloquent default table behavior
    protected $table = null;

    // Function to get user data from external API
    public static function getUserById($userId)
    {
        return Cache::remember("user_{$userId}", 60, function () use ($userId) {
            $response = ApiResponse::get('/api/get-user/'.$userId);
            return json_decode($response->getBody(), true);
        });
    }

    public static function getUserByName($userName)
    {
        return Cache::remember("user_{$userName}", 60, function () use ($userName) {
            $response = ApiResponse::get('/api/get-username/'.$userName);
            return json_decode($response->getBody(), true);
        });
    }
}
