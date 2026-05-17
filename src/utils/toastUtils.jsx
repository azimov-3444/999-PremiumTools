import React from 'react';
import { toast } from 'react-toastify';

const ConfirmMessage = ({ message, onConfirm, onCancel, closeToast }) => (
    <div>
        <p className="mb-4 text-gray-800 font-medium">{message}</p>
        <div className="flex justify-end gap-3">
            <button
                onClick={() => {
                    onCancel();
                    closeToast();
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
                Yo'q (No)
            </button>
            <button
                onClick={() => {
                    onConfirm();
                    closeToast();
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
                Ha (Yes)
            </button>
        </div>
    </div>
);

export const confirmDialog = (message) => {
    return new Promise((resolve) => {
        toast.info(
            ({ closeToast }) => (
                <ConfirmMessage 
                    message={message} 
                    onConfirm={() => resolve(true)} 
                    onCancel={() => resolve(false)} 
                    closeToast={closeToast}
                />
            ), 
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
                theme: "light",
            }
        );
    });
};
