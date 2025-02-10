"use client"
import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";

export const ToastifyContext = createContext(null)

const ToastifyProvider = ({ children }) => {
    const successMsg = (msg) => {
        toast.success(msg)
    }
    const errorMsg = (msg) => {
        toast.error(msg)
    }
    return (
        <ToastifyContext.Provider value={{ successMsg, errorMsg }}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="light"
            />
        </ToastifyContext.Provider>
    )
}

export default ToastifyProvider