<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['name'];
    
    protected $appends = ['health_status'];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function getHealthStatusAttribute()
    {
        $totalTasks = $this->tasks()->count();
        
        if ($totalTasks == 0) {
            return 'Normal';
        }

        $overdueTasks = $this->tasks()
            ->where('status', '!=', 'Concluída')
            ->where('deadline', '<', now()->format('Y-m-d'))
            ->count();

        if (($overdueTasks / $totalTasks) > 0.20) {
            return 'Em Alerta';
        }

        return 'Normal';
    }
}