import router from "../router";
import {useItemsStore} from "../stores/items";
import {useCartStore} from "../stores/cart";
import {Buffer} from 'buffer';


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
        tg.onEvent('mainButtonClicked', configCompleteButton);
        tg.BackButton.onClick(function () {
            tg.offEvent('mainButtonClicked', configCompleteButton)
            router.push('/')
        })
        tg.BackButton.show()
    }

    function unsetCompleteButton() {
        tg.offEvent('mainButtonClicked', configCompleteButton)
    }

    const requestBodyLength = Buffer.byteLength(JSON.stringify({
        user: user,
        items: cartItems,
    }), 'utf8');


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
                alert('go')
                fetch("https://webappbot.website:8000/web-data", {
                    method: "POST",
                    mode: "no-cors",
                    credentials: "omit",
                    body: JSON.stringify({
                        user: user,
                        items: cartItems,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": requestBodyLength,
                    },
                }).then(r => {
                    alert('yes')
                    resolve(r)
                }).catch(r => {
                    alert('error')
                    alert(r)
                    reject(r)
                })
            } else {
                tg.sendData(JSON.stringify({'user': user, 'items': cartItems})).then(r => resolve(r));
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