import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "../axios.jsx";
import { notification } from 'antd';

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
        onError: (error) => {
            console.log("Something went wrong while fetching", error)

            notification.error({
                message: error?.message
            })
        },

    })
}

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient()

    return useMutation(
        addTodoService,
        {
            onSuccess: (data) => {
                notification.success({
                    message: data?.data.msg
                })
                queryClient.invalidateQueries('get-todos')
            },
            onError: (error) => {
                notification.error({
                    message: error?.message
                })
            }
        }

    )
}

export const useUpdateStatusMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(
        updateOneTodoService,
        {
            onSuccess: (data) => {
                notification.success({
                    message: data?.data.msg
                })
                queryClient.invalidateQueries('get-todos')
            },
            onError: (error) => {
                notification.error({
                    message: error?.message
                })
            }
        }
    )
}

export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(
        deleteOneTodoService,
        {
            onSuccess: (data) => {
                notification.success({
                    message: data?.data.msg
                })
                queryClient.invalidateQueries('get-todos')
            },
            onError: (error) => {
                notification.error({
                    message: error?.message
                })
            }
        }
    )
}

