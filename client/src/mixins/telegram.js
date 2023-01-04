import router from "../router";
import {useItemsStore} from "../stores/items";
import {useCartStore} from "../stores/cart";

export default function () {
    const tg = window.Telegram.WebApp;
    tg.isClosingConfirmationEnabled = true;

    // tg.expand() // метод позволяет растянуть окно на всю высоту.
    function setOrderPageButton() {
        tg.MainButton.setParams({"color": "#88B04B", 'text': 'Перейти в корзину'}); //так изменяются все параметры
        Telegram.WebApp.onEvent('mainButtonClicked', function () {
            unsetCompleteButton()
            router.push('/cart')
        });
        if (tg.BackButton.isVisible)
            tg.BackButton.hide()
    }

    function setCompleteButton() {
        hideButton()
        // Telegram.WebApp.offEvent('mainButtonClicked')
        tg.expand()
        tg.MainButton.setParams({"color": "#88B04B", 'text': 'Оформить'}); //так изменяются все параметры
        Telegram.WebApp.onEvent('mainButtonClicked', configCompleteButton);
        tg.BackButton.onClick(function () {
            Telegram.WebApp.offEvent('mainButtonClicked', configCompleteButton)
            router.push('/')
        })
        tg.BackButton.show()
    }

    function unsetCompleteButton() {
        Telegram.WebApp.offEvent('mainButtonClicked', configCompleteButton)
    }

    async function configCompleteButton() {
        const {items, user} = useItemsStore();
        const {cart, clearCart} = useCartStore()
        const cartItems = items.map(el => {
            if (Object.keys(cart).some(item => item === el.id) && cart[el.id] > 0) {
                return {name: el.name, count: cart[el.id]}
            }
        }).filter(el => !!el)

        new Promise(function (resolve, reject) {
            if (tg.initDataUnsafe.user) {
                alert('send')
                tg.sendData(JSON.stringify({'user': user, 'items': cartItems})).then(r => resolve(r));

            } else {
                alert('go')
                fetch(new URL("http://81.163.23.58:8000/web-data"), {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                        "content-type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                    },
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "omit"
                }).then(r => {
                    alert('yes')
                    resolve(r)
                }).catch(r => {
                    alert('error')
                    alert(r)
                    reject(r)
                })
            }
        }).then(() => {
            clearCart()
            tg.close()
        })
    }

    function onClose() {
        tg.close();
    }

    function showButton() {
        tg.MainButton.show()
    }

    function hideButton() {
        tg.MainButton.hide()
    }

    return {
        tg,
        setOrderPageButton,
        setCompleteButton,
        showButton,
        hideButton,
        onClose,
        unsetCompleteButton,
    }
}