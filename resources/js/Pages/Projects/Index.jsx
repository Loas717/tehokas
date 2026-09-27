import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Index({ projects }) {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard de Projetos</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                            
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