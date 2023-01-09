import axios from '../axios.jsx'
import React from 'react'
import { useState, useEffect } from 'react'
import "./List.css"


const List = () => {
    const [todos, setTodos] = useState([]);
    const [isError, setIsError] = useState("");

    const getTodos = async () => {
        try {
            const res = await axios.get("/todo");
            setTodos(res.data)
            console.log(res.data);
        } catch (error) {
            setIsError(error.message)
        }
    };
    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await axios.put(`/todo/${id}`, { "is_completed": !status });
            console.log(res.data);
        } catch (error) {
            setIsError(error.message)
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/todo/${id}`);
            console.log(res.data);
        } catch (error) {
            setIsError(error.message)
        }
    };
    useEffect(() => {
        getTodos();
    }, [])

    return (
        <>
            {isError !== "" && <h2>{isError}</h2>}

            <div className="my__todos">
                <h2>My TODOS</h2>
                <table>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.data && todos.data.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.task}</td>
                                        <td>{item.is_completed ? 'Done' : 'Pending'}</td>
                                        <td>
                                            <div className="completed__status" >
                                                <button style={{ marginRight: "10px", padding: "10px", font: "20px", backgroundColor: "#005a18", cursor: "pointer", color: "#ffffff" }} onClick={(e) => handleStatusUpdate(item.id, item.is_completed)}> Mark as {item.is_completed ? 'Pending' : 'Done'} </button>
                                                <button style={{ marginRight: "10px", padding: "10px", font: "20px", backgroundColor: "#cf0000", cursor: "pointer", color: "#ffffff" }} onClick={(e) => handleDelete(item.id)}> Delete </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default List