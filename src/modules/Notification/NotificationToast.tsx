import React from 'react';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NotificationType = "success" | "error" | "warn" | "info";

export function NotificationToast(message: string, type: NotificationType) {
    switch (type) {
        case "success":
            return toast.success(message, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        case "error":
            return toast.error(message, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        case "info":
            return toast.info(message, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        case "warn":
            return toast.warn(message, {
                position: toast.POSITION.BOTTOM_LEFT
            });
    }
}
