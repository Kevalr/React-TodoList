import axios from "axios"

const baseURL = "https://jsonplaceholder.typicode.com/todos"

// whole response is come as a responseStreams
// export const getAllTodos = () => fetch(`${baseURL}`, {
//     method: "GET",
//     headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   }
// })

export const getAllTodos = () => axios.get(`${baseURL}`)

export const createTodo = (payload) => axios.post(`${baseURL}`, JSON.stringify(payload), {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },    
})

export const deleteTodo = (id) =>  axios.delete(`${baseURL}/${id}`)

export const updateTodo = (payload) => axios.patch(`${baseURL}/${payload}`,JSON.stringify(payload), {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },    
})