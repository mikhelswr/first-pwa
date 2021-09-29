    if (!('serviceWorker' in navigator)) {
        console.log(`Service worker : tidak didukung browser ini`);
    } else {
        window.addEventListener('load', () => {
            registerServiceWorker();
            requestPermission();
        })
    }

    const registerServiceWorker = () => {
        return navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log(`Registrasi service worker berhasil`);
                return registration;
            })
            .catch(err => {
                console.log(`Registrasi Service worker gagal : ${err}`)
            });
    }

    const requestPermission = () => {
        if ('Notification' in window) {
            Notification.requestPermission().then(result => {
                if (result === "denied") {
                    console.log("Fitur notifikasi tidak diijinkan.");
                    return;
                } else if (result === "default") {
                    console.error("Pengguna menutup kotak dialog permintaan ijin.");
                    return;
                }

                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function (registration) {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(
                                "BAzNslVvaKzy5t3IpS38MWl98_KKowbPCZIqmelZYlYbyoCOV-l6lTvXquArm_8fd3mSwyKrarv76V_03nm8fUE"
                            )
                        }).then(function (subscribe) {
                            console.log(
                                'Berhasil melakukan subscribe dengan endpoint: ',
                                subscribe.endpoint);
                            console.log(
                                'Berhasil melakukan subscribe dengan p256dh key: ',
                                btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey(
                                        'p256dh'))
                                )));
                            console.log(
                                'Berhasil melakukan subscribe dengan auth key: ',
                                btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey(
                                        'auth')))));
                        }).catch(function (e) {
                            console.error('Tidak dapat melakukan subscribe ', e
                                .message);
                        });
                    });
                }
            })
        }
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }