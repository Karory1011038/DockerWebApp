import router from "../router";
import {useUserStore} from "../stores/user";
import {useProductsStore} from "../stores/products";
import {computed} from "vue";
import {useCartStore} from "../stores/cart";

const webappbotBackendUrl = import.meta.env.VITE_WEBAPPBOT_URL + ":" + import.meta.env.VITE_WEBAPPBOT_BACKEND_PORT;


export default function () {
    const tg = window.Telegram.WebApp;
    tg.isClosingConfirmationEnabled = true;
    let actualCallback = null
    tg.BackButton.onClick(function () {
        tg.offEvent('mainButtonClicked', actualCallback)
        router.push('/')
    })

//    setButtons
    function setMainButton(callback) {
        if (actualCallback) {
            tg.offEvent('mainButtonClicked', actualCallback)
            actualCallback = null
        }
        actualCallback = callback
        tg.onEvent('mainButtonClicked', callback);
    }

    const tgUserData = tg.initDataUnsafe.user

    function initCatalogButtons() {
        tg.MainButton.setParams({"color": "#75FE72", 'text': 'VIEW ORDER', 'text-color': "#2F2F2F"});
        setMainButton(function () {
            router.push('/cart')
        })
        if (tg.BackButton.isVisible)
            tg.BackButton.hide()
    }

    function initHomeButtons() {
        tg.MainButton.setParams({"color": "#75FE72", 'text': 'GO SHOPPING', 'text-color': "#2F2F2F"});
        setMainButton(function () {
            router.push('/catalog')
        })
        if (tg.BackButton.isVisible)
            tg.BackButton.hide()
    }

    function initCartButtons() {
        tg.expand()
        tg.MainButton.setParams({"color": "#75FE72", 'text': 'CONFIRM ORDER', 'text-color': "#2F2F2F"}); //так изменяются все параметры
        setMainButton(placeOrder)
        tg.BackButton.show()
    }

    function initProductButtons() {
        setMainButton(goHome)
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
        const cartStore = useCartStore();


        const cartProducts = computed(() => {
            return products.value.map(el => {
                if (Object.keys(cartStore.getCart).some(item => item == el.id) && cartStore.getCart[el.id] > 0) {
                    return {...el, count: cartStore.getCart[el.id]}
                }
            }).filter(el => !!el)
        })

        sendOrder(user, cartProducts, cartStore).then(() => {
            tg.close()
        })

    }

    function sendOrder(user, cartProducts, cartStore) {
        return new Promise(function (resolve, reject) {
            if (tg.initDataUnsafe.user) {
                const requestBody = JSON.stringify({
                    user: user.value,
                    items: cartProducts.value,
                    queryId: tg.initDataUnsafe.query_id,
                });
                fetch(webappbotBackendUrl + '/web-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: requestBody
                }).then(r => {
                    cartStore.clearCart()

                    resolve(r)
                }).catch(r => {
                    // alert(r)
                    reject(r)
                })
            } else {
                cartStore.clearCart()
                tg.sendData(JSON.stringify({'user': user.value, 'items': cartProducts.value})).then(r => resolve(r));
            }
        })
    }

    function goHome() {
        tg.offEvent('mainButtonClicked', actualCallback)
        router.push('/')
    }


    return {
        tg,
        tgUserData,
        goHome,
        initHomeButtons,
        initCatalogButtons,
        initProductButtons,
        initCartButtons,
    }

}