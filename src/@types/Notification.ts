export type WebNotification = {
  message: string;
  type: "success" | "error";
};

export type WebNotificationWithID = WebNotification & {
  id: number;
};
