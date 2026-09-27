import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ projects }) {
    const [newProject, setNewProject] = useState('');
    const [editingProject, setEditingProject] = useState(null);

    const submitProject = (e) => {
        e.preventDefault();
        const url = editingProject ? `/projects/${editingProject.id}` : '/projects';
        const method = editingProject ? 'put' : 'post';
        Inertia[method](url, { name: newProject }, {
            onSuccess: () => { setNewProject(''); setEditingProject(null); }
        });
    };

    const deleteProject = (project) => {
        if (window.confirm(`Excluir o projeto "${project.name}" e todas as suas tarefas?`)) {
            Inertia.delete(`/projects/${project.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard de Projetos</h1>

                <form onSubmit={submitProject} className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col sm:flex-row gap-3">
                    <input required value={newProject} onChange={(e) => setNewProject(e.target.value)} placeholder="Nome do projeto" className="border-gray-300 rounded flex-1" />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        {editingProject ? 'Salvar nome' : 'Criar projeto'}
                    </button>
                    {editingProject && <button type="button" onClick={() => { setEditingProject(null); setNewProject(''); }} className="border border-gray-300 px-4 py-2 rounded">Cancelar</button>}
                </form>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                            <div className="flex gap-3 mb-4 text-sm">
                                <button type="button" onClick={() => { setEditingProject(project); setNewProject(project.name); }} className="text-blue-600 hover:underline">Renomear</button>
                                <button type="button" onClick={() => deleteProject(project)} className="text-red-600 hover:underline">Excluir</button>
                            </div>
                            
                            <div className="mb-4">
                                <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                                    project.health_status === 'Em Alerta' 
                                        ? 'bg-red-100 text-red-700' 
                                        : 'bg-green-100 text-green-700'
                                }`}>
                                    {project.health_status}
                                </span>
                            </div>

                            <div className="text-gray-600 text-sm mb-4">
                                Total de tarefas: {project.tasks.length}
                            </div>

                            <Link 
                                href={`/projects/${project.id}`} 
                                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Ver Kanban
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}