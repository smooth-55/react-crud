import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "../axios.jsx";


const addTodoService = (newTodo) => {
    return axios.post(`/todo`, newTodo)
}

const fetchTodoService = () => {
    return axios.get(`/todo`)
}

const updateOneTodoService = ({ id, is_completed }) => {
    return axios.put(`/todo/${id}`, { is_completed })
}

const deleteOneTodoService = (id) => {
    return axios.delete(`/todo/${id}`)
}

export const useFetchTodoQuery = () => {
    return useQuery("get-todos", fetchTodoService, {
        onSuccess: () => {
            console.log("Successfully fetched")
        },
        onError: (error) => {
            console.log("Something went wrong while fetching", error)
        },

    })
}

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient()

    return useMutation(
        addTodoService,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('get-todos')
            },
            onError: () => {
                console.log("Something went wrong");
            }
        }

    )
}

export const useUpdateStatusMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(
        updateOneTodoService,
        {
            onSuccess: () => {
                console.log("Status updated");
                queryClient.invalidateQueries('get-todos')
            },
            onError: () => {
                console.log("Error occured while updating");
            }
        }
    )
}

export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(
        deleteOneTodoService,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('get-todos')
            },
            onError: () => {
                console.log("Something went wrong");
            }
        }
    )
}

