<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Membuat admin default
        User::create([
            'username' => 'superadminuser',
            'name' => 'SUPER ADMIN',
            'role' => 'superadmin',
            'password' => Hash::make('Password123'),
        ]);

        User::create([
            'username' => 'adminuser',
            'name' => 'ADMIN',
            'role' => 'admin',
            'password' => Hash::make('Password123'),
        ]);

        User::create([
            'username' => 'visitoruser',
            'name' => 'VISITOR',
            'role' => 'visitor',
            'password' => Hash::make('Password123'),
        ]);

        User::create([
            'username' => 'dishubuser',
            'name' => 'DISHUB',
            'role' => 'dishub',
            'password' => Hash::make('Password123'),
        ]);
    }
}