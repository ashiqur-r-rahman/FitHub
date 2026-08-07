import { useState } from 'react';

export default function TaskManager({ tasks, onToggleTask, onAddTask }) {
  const [draft, setDraft] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask(draft);
    setDraft('');
  };

  return (
    <section className="section-card full">
      <div className="section-heading">
        <h3>Today's focus</h3>
        <span className="badge">{tasks?.length || 0} tasks</span>
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a habit or task"
          className="input"
        />
        <button type="submit" className="secondary-btn">Add task</button>
      </form>
      <div className="list-stack">
        {tasks?.map((task) => (
          <div className="check-row" key={task.id}>
            <span>{task.text}</span>
            <button type="button" className={`secondary-btn ${task.done ? 'done' : ''}`} onClick={() => onToggleTask(task.id)}>
              {task.done ? 'Done' : 'Pending'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
