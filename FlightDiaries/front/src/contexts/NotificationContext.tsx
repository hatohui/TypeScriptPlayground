import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import { Notification } from "../types/NotificationType";

type NotificationAction = { type: "SET"; payload: string } | { type: "RESET" };

type NotificationContextType = [
  Notification | string,
  Dispatch<NotificationAction>
];

const notificationReducer = (
  state: Notification | string,
  action: NotificationAction
): Notification | string => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "RESET":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): Notification | string => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context[0];
};

export const useNotificationDispatch = (): Dispatch<NotificationAction> => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }
  return context[1];
};

export default NotificationContext;
