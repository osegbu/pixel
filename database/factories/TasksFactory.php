<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tasks>
 */
class TasksFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'task' => $this->faker->catchPhrase(),
            'description' => $this->faker->paragraph(),
            'due_date' => $this->faker->date(),
            'status' =>  $this->faker->randomElement(['Pending', 'Completed', 'In Progress']),
        ];
    }
}
