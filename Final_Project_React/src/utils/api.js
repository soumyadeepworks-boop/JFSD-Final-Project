import axios from 'axios'
export const api=axios.create({baseURL:'http://localhost:8080'})
api.interceptors.request.use(config=>{const token=localStorage.getItem('shopnest-token');if(token) config.headers.Authorization=`Bearer ${token}`;return config})
api.interceptors.response.use(r=>r,e=>{if(e.response?.status===401){localStorage.removeItem('shopnest-token');localStorage.removeItem('shopnest-user')}return Promise.reject(e)})
export const messageFromError=e=>e?.response?.data?.message||e?.response?.data?.error||e?.response?.data||e?.message||'Something went wrong.'
