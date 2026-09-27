import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Show({ project }) {
    const columns = ['Pendente', 'Em Andamento', 'Concluída'];
    const emptyTask = { title: '', description: '', deadline: '', status: 'Pendente' };
    const [taskForm, setTaskForm] = useState(emptyTask);
    const [editingTask, setEditingTask] = useState(null);

    const submitTask = (e) => {
        e.preventDefault();
        const url = editingTask ? `/tasks/${editingTask.id}` : `/projects/${project.id}/tasks`;
        const method = editingTask ? 'put' : 'post';

        Inertia[method](url, taskForm, {
            preserveScroll: true,
            onSuccess: () => {
                setTaskForm(emptyTask);
                setEditingTask(null);
            }
        });
    };

    const startEditing = (task) => {
        setEditingTask(task);
        setTaskForm({
            title: task.title,
            description: task.description || '',
            deadline: task.deadline,
            status: task.status
        });
    };

    const deleteTask = (task) => {
        if (window.confirm(`Excluir a tarefa "${task.title}"?`)) {
            Inertia.delete(`/tasks/${task.id}`, { preserveScroll: true });
            if (editingTask && editingTask.id === task.id) {
                setEditingTask(null);
                setTaskForm(emptyTask);
            }
        }
    };

    const handleStatusChange = (taskId, newStatus) => {
        Inertia.put(`/tasks/${taskId}/status`, { status: newStatus }, {
            preserveScroll: true 
        });
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, newStatus) => {
        const taskId = e.dataTransfer.getData('taskId');
        if (taskId) {
            handleStatusChange(taskId, newStatus);
        }
    };
    
    const formatarData = (dataString) => {
        if (!dataString) return '';
        const dataApenas = dataString.split('T')[0]; 
        const [ano, mes, dia] = dataApenas.split('-');
        return `${dia}/${mes}/${ano}`;
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

                <form onSubmit={submitTask} className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {editingTask ? 'Editar tarefa' : 'Nova tarefa'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input required value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} placeholder="Nome da tarefa" className="border-gray-300 rounded" />
                        <input value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} placeholder="Descrição" className="border-gray-300 rounded" />
                        <input required type="date" value={taskForm.deadline} onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })} className="border-gray-300 rounded" />
                        <select value={taskForm.status} onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })} className="border-gray-300 rounded">
                            {columns.map(col => <option key={col} value={col}>{col}</option>)}
                        </select>
                    </div>
                    <div className="mt-4 flex gap-3">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            {editingTask ? 'Salvar alterações' : 'Criar tarefa'}
                        </button>
                        {editingTask && <button type="button" onClick={() => { setEditingTask(null); setTaskForm(emptyTask); }} className="border border-gray-300 px-4 py-2 rounded">Cancelar</button>}
                    </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {columns.map(status => (
                        <div 
                            key={status} 
                            className="bg-gray-200 rounded-lg p-4 h-fit min-h-[200px]"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, status)}
                        >
                            <h2 className="text-lg font-bold text-gray-700 mb-4 uppercase text-center border-b-2 border-gray-300 pb-2">
                                {status}
                            </h2>

                            <div className="space-y-4">
                                {project.tasks.filter(t => t.status === status).map(task => (
                                    <div 
                                        key={task.id} 
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, task.id)}
                                        className="bg-white p-4 rounded shadow border-l-4 border-blue-500 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between gap-2">
                                            <h3 className="font-semibold text-gray-800">{task.title}</h3>
                                            <div className="flex gap-2 text-sm">
                                                <button type="button" onClick={() => startEditing(task)} className="text-blue-600 hover:underline">Editar</button>
                                                <button type="button" onClick={() => deleteTask(task)} className="text-red-600 hover:underline">Excluir</button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                        
                                        <div className="mt-3 pt-3 border-t text-sm flex justify-between items-center">
                                            <span className="text-gray-500">
                                                Prazo: {formatarData(task.deadline)}
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