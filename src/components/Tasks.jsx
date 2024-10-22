import NewTask from "./NewTask";

export default function Tasks({onAdd, onDelete, tasks, selectedProject}) {
    const tasksForCurrentProject = tasks.filter( task => task.projectId === selectedProject )
    return(
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask onAdd={onAdd} />
            {tasksForCurrentProject.lenght === 0 && 
            (<p className="text-stone-800 my-4">
                This project does not have any tasks yet
            </p>)}
            {tasksForCurrentProject.length > 0 && 
            (<ul className="p-4 mt-8 rounded-md bg-stone-100">
                {
                    tasksForCurrentProject.map( task => <li 
                        key={task.id} 
                        className="flex justify-between my-4">
                            <span>{task.taskName}</span>
                            <button 
                            onClick={() => onDelete(task.id)}
                            className="text-stone-700 hover:text-red-500">
                                Clear
                            </button>
                    </li>)
                }
            </ul>)
            }
        </section>
    )
}