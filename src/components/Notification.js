import React from "react";

const Notification = ({ notificationMessage }) =>
  notificationMessage && <div className="notification">{notificationMessage}</div>;

export default Notification;
