import React, { useState } from 'react'
import "./Create.css";
import axios from '../axios.jsx';

const Create = () => {
    const [taskName, setTaskName] = useState(null)

    const handleCreateTodo = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/todo", { "task": taskName, "is_completed": false });
            console.log(res.data);
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <div className="form_container">
                <form className="form" onSubmit={handleCreateTodo}>
                    <h2>Create Todo</h2>
                    <input type="text" id="task" onChange={(e) => setTaskName(e.target.value)} />
                    <input type="submit" id="submit" value="Create Task" />
                </form>
            </div>
        </>
    )
}

export default Create