import { useState } from 'react';
import { CheckSquare, Plus, Trash2, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function TaskManager({ tasks = [], onToggleTask, onAddTask, onDeleteTask, onChangeTaskStatus }) {
  const [draftText, setDraftText] = useState('');
  const [selectedTag, setSelectedTag] = useState('General');
  const [activeFilter, setActiveFilter] = useState('all'); // all | todo | in_progress | done

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!draftText.trim()) return;
    onAddTask(draftText.trim(), selectedTag);
    setDraftText('');
  };

  const statusCycleMap = {
    todo: 'in_progress',
    in_progress: 'done',
    done: 'todo',
  };

  const statusLabels = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Completed',
  };

  const filteredTasks = tasks.filter((t) => {
    const taskStatus = t.status || (t.done ? 'done' : 'todo');
    if (activeFilter === 'all') return true;
    return taskStatus === activeFilter;
  });

  const todoCount = tasks.filter((t) => (t.status || (t.done ? 'done' : 'todo')) === 'todo').length;
  const inProgressCount = tasks.filter((t) => (t.status || (t.done ? 'done' : 'todo')) === 'in_progress').length;
  const doneCount = tasks.filter((t) => (t.status || (t.done ? 'done' : 'todo')) === 'done').length;

  return (
    <div className="task-manager-panel">
      <div className="panel-header">
        <div className="title-with-badge">
          <CheckSquare size={18} />
          <h4>My Tasks</h4>
        </div>
        <span className="task-counter-pill">{tasks.length} total</span>
      </div>

      {/* Task Input Form */}
      <form className="task-add-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="input-sm"
            placeholder="Add habit or task..."
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
          />
          <button type="submit" className="add-task-btn" title="Add Task">
            <Plus size={16} />
          </button>
        </div>
      </form>

      {/* Kanban Status Filter Pills */}
      <div className="status-filter-pills">
        <button
          type="button"
          className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button
          type="button"
          className={`filter-pill todo ${activeFilter === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveFilter('todo')}
        >
          To Do ({todoCount})
        </button>
        <button
          type="button"
          className={`filter-pill in_progress ${activeFilter === 'in_progress' ? 'active' : ''}`}
          onClick={() => setActiveFilter('in_progress')}
        >
          In Progress ({inProgressCount})
        </button>
        <button
          type="button"
          className={`filter-pill done ${activeFilter === 'done' ? 'active' : ''}`}
          onClick={() => setActiveFilter('done')}
        >
          Done ({doneCount})
        </button>
      </div>

      {/* Task Card List */}
      <div className="task-list-scroll">
        {filteredTasks.length === 0 ? (
          <div className="empty-tasks-state">
            <p className="muted">No tasks in this view.</p>
            <p className="subtext">Add a task above to keep your momentum flowing!</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const currentStatus = task.status || (task.done ? 'done' : 'todo');
            const nextStatus = statusCycleMap[currentStatus] || 'todo';

            return (
              <div key={task.id} className={`task-card status-${currentStatus}`}>
                <div className="task-card-main">
                  <button
                    type="button"
                    className={`status-cycle-btn ${currentStatus}`}
                    title={`Click to change status to ${statusLabels[nextStatus]}`}
                    onClick={() => onChangeTaskStatus ? onChangeTaskStatus(task.id, nextStatus) : onToggleTask(task.id)}
                  >
                    {currentStatus === 'done' && <CheckCircle size={14} />}
                    {currentStatus === 'in_progress' && <Clock size={14} />}
                    {currentStatus === 'todo' && <span className="empty-circle" />}
                    <span>{statusLabels[currentStatus]}</span>
                  </button>

                  <span className={`task-text ${currentStatus === 'done' ? 'completed-text' : ''}`}>
                    {task.text}
                  </span>
                </div>

                <div className="task-card-actions">
                  {onDeleteTask && (
                    <button
                      type="button"
                      className="delete-task-btn"
                      title="Delete task"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
