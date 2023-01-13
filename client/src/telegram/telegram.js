import router from "../router";
import {useUserStore} from "../stores/user";
import {useProductsStore} from "../stores/products";
import {computed} from "vue";
import {useCartStore} from "../stores/cart";

export default function () {
    const tg = window.Telegram.WebApp;
    tg.isClosingConfirmationEnabled = true;
    let actualCallback = null
    tg.BackButton.onClick(function () {
        router.push('/')
    })

//    setButtons
    function setMainButton(initButtonFunc) {
        if (actualCallback) {
            tg.offEvent('mainButtonClicked', actualCallback)
            actualCallback = null
        }
        actualCallback = initButtonFunc
        tg.onEvent('mainButtonClicked', actualCallback);
    }

    function initHomeButtons() {
        tg.MainButton.setParams({"color": "#88B04B", 'text': 'VIEW ORDER'});
        setMainButton(function () {
            router.push('/cart')
        })
        if (tg.BackButton.isVisible)
            tg.BackButton.hide()
    }

    function initCartButtons() {
        tg.expand()
        tg.MainButton.setParams({"color": "#88B04B", 'text': 'PLACE ORDER'}); //так изменяются все параметры
        tg.onEvent('mainButtonClicked', placeOrder);
        tg.BackButton.show()
    }

    function initProductButtons() {
        tg.MainButton.hide();
        tg.BackButton.show()
    }

    async function placeOrder() {
        const productsStore = useProductsStore()
        const userStore = useUserStore()

        const products = computed(() => {
            return productsStore.getProducts;
        });
        const user = computed(() => {
            return userStore.getUser;
        });
        const {getCart, clearCart} = useCartStore();


        const cartProducts = computed(() => {
            return products.value.map(el => {
                if (Object.keys(getCart).some(item => item == el.id) && getCart[el.id] > 0) {
                    return {...el, count: getCart[el.id]}
                }
            }).filter(el => !!el)
        })

        sendOrder(user,cartProducts).then(() => {
            clearCart()
            tg.close()
        })

    }

    function sendOrder(user,cartProducts){
        return new Promise(function (resolve, reject) {
            if (tg.initDataUnsafe.user) {
                const requestBody = JSON.stringify({
                    user: user.value,
                    items: cartProducts.value,
                    queryId: tg.initDataUnsafe.query_id,
                });
                fetch('https://webappbot.website:8000/web-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: requestBody
                }).then(r => {
                    resolve(r)
                }).catch(r => {
                    alert(r)
                    reject(r)
                })
            } else {
                tg.sendData(JSON.stringify({'user': user.value, 'items': cartProducts.value})).then(r => resolve(r));
            }
        })
    }

    return {
        tg,
        initHomeButtons,
        initProductButtons,
        initCartButtons,
    }

}