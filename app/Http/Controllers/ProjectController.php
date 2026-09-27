<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        // Carrega os projetos junto com as tarefas
        $projects = Project::with('tasks')->get();

        // O Inertia::render recebe o nome do componente (ex: Vue/React) e as propriedades
        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function show(Project $project)
    {
        $project->load('tasks');

        return Inertia::render('Projects/Show', [
            'project' => $project
        ]);
    }
}