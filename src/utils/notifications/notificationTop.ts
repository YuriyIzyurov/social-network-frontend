import type { NotificationPlacement } from 'antd/es/notification';
import {notification} from 'antd';
import {NotificationType} from "typings";


export const openNotification = (type:NotificationType = "error", placement: NotificationPlacement, error: string | null, message:string) => {
    notification[type]({
        message: message,
        description: error,
        placement,
        duration: 0.5
    });
};