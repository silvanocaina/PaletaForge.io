import './notification.css'
import { useRef } from 'react'
import type { ToastContentProps } from 'react-toastify/unstyled';

interface NotificationProps {
  title: string;
  message: string;
}

// Unimos as props customizadas com as props que o Toastify injeta automaticamente
type Props = NotificationProps & Partial<ToastContentProps>;

function Notification({ title, message, toastProps}: Props) {

  const notificationRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = notificationRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    notificationRef.current.style.setProperty("--x", `${x}px`);
    notificationRef.current.style.setProperty("--y", `${y}px`);
  }
  return (
    <div ref={notificationRef} className='notification-box' onMouseMove={handleMouseMove}>
      <p>{title}</p>
      <p>{message}</p>
   </div>) ;

}

export default Notification;
