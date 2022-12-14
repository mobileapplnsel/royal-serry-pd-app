import PushNotification from "react-native-push-notification";

class NotificationManager{
  configure = (onRegister,onNotification,onOpenNotification,senderID) => {
    PushNotification.configure({
      onRegister: function (token) {
        onRegister(token)
        console.log("[NotificationManager] onRegister token", token);
      },
      onNotification: function (notification) {
        console.log("[NotificationManager] onNotification:", notification);

        if(notification.userInteraction){
          onOpenNotification(notification)
        }else{
          onNotification(notification)
        }
        
      },
      senderID: "717896799169",
    })
  }

  androidNotification = (id,title,message,data={},options={}) => {
    return{
      id:id,
      autoCancel: true,
      bigText: message || '',
      subText: message || '',
      data:data,
    }
  }

  showNotification = (id,title,message,data={},options={}) => {
    PushNotification.localNotification({
      ...this.androidNotification(id,title,message,data,options),
      title: title || "",
      message:message || "",
      userInteraction: false,
    })
  }

  cancelAllNotifications = () => {
    PushNotification.cancelAllNotifications();
  }

  unregister = () => {
    PushNotification.unregister();
  }

}

export const notificationManager = new NotificationManager();