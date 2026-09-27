import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Show({ project }) {
    const columns = ['Pendente', 'Em Andamento', 'Concluída'];

    const handleStatusChange = (taskId, newStatus) => {
        Inertia.put(`/tasks/${taskId}/status`, { status: newStatus }, {
            preserveScroll: true 
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Link href="/projects" className="text-blue-600 hover:underline mb-2 inline-block">
                            &larr; Voltar ao Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Projeto: {project.name}
                        </h1>
                    </div>
                    <span className={`px-4 py-2 font-bold rounded-full ${
                        project.health_status === 'Em Alerta' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                        Status: {project.health_status}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {columns.map(status => (
                        <div key={status} className="bg-gray-200 rounded-lg p-4 h-fit">
                            <h2 className="text-lg font-bold text-gray-700 mb-4 uppercase text-center border-b-2 border-gray-300 pb-2">
                                {status}
                            </h2>

                            <div className="space-y-4">
                                {project.tasks.filter(t => t.status === status).map(task => (
                                    <div key={task.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                        
                                        <div className="mt-3 pt-3 border-t text-sm flex justify-between items-center">
                                            <span className="text-gray-500">
                                                Prazo: {new Date(task.deadline).toLocaleDateString('pt-BR')}
                                            </span>
                                            
                                            <select 
                                                value={task.status}
                                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                                className="text-sm border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {columns.map(col => (
                                                    <option key={col} value={col}>{col}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}