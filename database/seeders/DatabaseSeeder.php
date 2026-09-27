<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Task;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $project1 = Project::create([
            'name' => 'Sistema de Gestão ERP'
        ]);

        Task::create([
            'project_id' => $project1->id,
            'title' => 'Modelagem de Dados',
            'description' => 'Criar migrations e models',
            'status' => 'Concluída',
            'deadline' => now()->subDays(10)
        ]);

        Task::create([
            'project_id' => $project1->id,
            'title' => 'API de Autenticação',
            'description' => 'Implementar login e registro',
            'status' => 'Pendente',
            'deadline' => now()->subDays(2)
        ]);

        Task::create([
            'project_id' => $project1->id,
            'title' => 'Dashboard React',
            'description' => 'Criar listagem via Inertia',
            'status' => 'Em Andamento',
            'deadline' => now()->subDays(1)
        ]);

        $project2 = Project::create([
            'name' => 'App Mobile Expo'
        ]);

        Task::create([
            'project_id' => $project2->id,
            'title' => 'Configurar EAS Build',
            'description' => 'Gerar credenciais e testar build AAB',
            'status' => 'Concluída',
            'deadline' => now()->addDays(5)
        ]);

        Task::create([
            'project_id' => $project2->id,
            'title' => 'Tela de Login',
            'description' => 'Interface em React Native',
            'status' => 'Pendente',
            'deadline' => now()->addDays(10)
        ]);
    }
}