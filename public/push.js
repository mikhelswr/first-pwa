var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BAzNslVvaKzy5t3IpS38MWl98_KKowbPCZIqmelZYlYbyoCOV-l6lTvXquArm_8fd3mSwyKrarv76V_03nm8fUE",
    "privateKey": "nDIPr0OrrN7kXac5yGywjtjfZDBcVs5_axjj276i5wA"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dl79FnY-ZPs:APA91bEjBRvuKg4vbSlny7s5fh5vWk2RbeHaDrnxw7derwU83mF77__C8kPF3G1ttDBptOOhmqa-b9WhIDOheYz4T03Q6iX4PEUayCsbYiy0BPyVhkke51WZc-JJWrXsjsQS7-5NaAhT",
    "keys": {
        "p256dh": "BCTQ358EnoWLBhFzQABL6jiMEwWC5FnO6OhEeezELNh60aCHoQPsOFYx/3hGuHYc+rx0/5CNNrk3+BCq5T55bzM=",
        "auth": "c89jjuc4cztX65gemewfOg=="
    }
};
var payload = 'Ikuti Match Liga Premiere League';

var options = {
    gcmAPIKey: '512046625181',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);