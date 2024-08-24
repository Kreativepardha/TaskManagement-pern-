import React, { useEffect } from "react";
import useTaskStore from "../../store/useTaskStore";
import { Task } from "../../types/task";


export const TasksList: React.FC = () => {
    const { tasks, fetchTasks}= useTaskStore((state) => ({
        tasks: state.tasks,
        fetchTasks: state.fetchTasks,
    }))

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    if(tasks.length ===  0 ) {
        return <p>No Tasks Found.</p>
    }
    return (
        <div className=" h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold">ALL tasks </h1>
            <div className="grid grid-cols-3 my-2 p-12 gap-4 rounded-lg shadow-orange-100">
                {
                    tasks.map((task: Task) => (
                        <div key={task.id} className="p-6 my-2 shadow-md bg-slate-200 rounded  w-1/8 relative">
                                <div className="font-semibold text-black w-8 h-8 flex my-2 items-center justify-center bg-yellow-200 rounded-full absolute -top-0 text-center left-2"> 
                                    { task.user?.name ? task.user.name[0].toUpperCase() : "U"   }  
                                     </div>
                          <div className="mt-4">
                            <h2> {task.title}   </h2>
                            <h2> {task.description}   </h2>
                            <h2> {task.createdAt}   </h2>
                            </div> 
                        </div>
                    ))
                }
            </div>
        </div>
    )










}







