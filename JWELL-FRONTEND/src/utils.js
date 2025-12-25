import {toast} from 'react-toastify'


export const handleSuccess = (msg) =>{
    console.log('Toast success triggered')
    toast.success(msg,{
        position : 'center',
        
    })
}


export const handleError = (msg) =>{
    toast.error(msg,{
        position : 'center',
    })
}