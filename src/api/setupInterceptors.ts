import api from './client'

import {store} from '../app/store'

api.interceptors.request.use(
    (config) => {
        if(config.requiresAuth){
            const token =  store.getState().auth.accessToken;

            if(token){
                config.headers.Authorization = `Bearer ${token}` 
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)