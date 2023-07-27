import { message } from "antd";

export const warning = (messageToShow, type) => {
  switch (type) {
    case "success":
      return message.success({
        content: messageToShow,
      });
    case "error":
      return message.error(messageToShow);
    default:
      return;
  }
};
