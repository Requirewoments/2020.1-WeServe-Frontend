import React, { createContext, useReducer } from 'react'
import Globals from './Globals'

const InitialState = {
    user: {
        name: '',
        createdAt: '',
        username: '',
        profilePhoto: 'https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg',
        password: '',
        birthday: '',
        email: '',
    },
    error: 'null'
}

const UserContext = createContext({})

const actions = {
    updateUser(state, action) {
        const n_user = action.payload
        console.log(n_user)
        const id = '5fbd6551b90a6c691b4ad90c'
        const url_request = Globals.server_ip + `/user/${id}`;
        fetch(url_request, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: n_user.name,
                username: n_user.username,
                password: n_user.password,
                email: n_user.email,
            })
        }).then((e) => console.warn(e)).catch((e) => console.warn(e));
        return {
            ...state,
            user: n_user
        }
    },
    deleteUser(state, action) {
        // id == state.user.id || state.user.email
        const id = '5fbed2869d25b87facf4e898'
        const url_request = Globals.server_ip + `/user/${id}`;
        fetch(url_request, {
            method: 'DELETE',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            })
        }).then((e) => console.warn(e)).catch((e) => console.warn(e));
    },
    createUser(state, action) {
        const n_user = action.payload
        const user = {
            ...state.user,
            name: n_user.name,
            email: n_user.email,
            username: n_user.username,
            password: n_user.password,
        }
        return {
            ...state,
            user: user
        }
    }
}


export const UserProvider = props => {
    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }


    const [state, dispatch] = useReducer(reducer, InitialState)

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext