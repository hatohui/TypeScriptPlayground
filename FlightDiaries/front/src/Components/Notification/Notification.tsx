import { useNotification } from "../../contexts/NotificationContext";

const Notification = (): JSX.Element => {
  const notification = useNotification();

  return (
    <div style={{ color: "red" }}>
      {typeof notification === "string" ? notification : notification.message}
    </div>
  );
};

export default Notification;
