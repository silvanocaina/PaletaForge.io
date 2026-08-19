import { toast, ToastContainer } from "react-toastify/unstyled"
import Notification from "../components/notification";

export const new_notification = (title: string, message: string) => {
  return toast(<Notification title={title} message={message} />, {
    className: 'notification-container',
  });
}

export function MyToastContainer() {
  return (
    <ToastContainer position="bottom-right" autoClose={5000} closeButton={false} hideProgressBar={true} />
  );
}
