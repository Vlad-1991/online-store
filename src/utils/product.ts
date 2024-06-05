import {productInCartType, productWithId} from "@/utils/requestTypes";
import {Ref} from "vue";
import {useCartStore} from "@/stores/CartStore";


/* add to cart product - save it to Cart Store and Local Storage
if product already in cart qty will be plused to qty in Cart  */
export function addCart (product: Ref<productWithId>, message_overload: Ref<boolean>, cart_qty: Ref<number>, product_added: Ref<boolean>): void{

    const CartStore= useCartStore()
    // @ts-ignore
    let key = product[Object.keys(product)].id

    let cur_product = CartStore.getProductById(key)

    if(cur_product && (cur_product.qty >= 100)){

        message_overload.value = true
        cart_qty.value = 1
        setTimeout(() => {message_overload.value = false}, 3000)
    }else {
        let payload: productInCartType = {}
        payload[key] = {
            // @ts-ignore
            id: product[Object.keys(product)].id,
            qty: cart_qty.value,
            // @ts-ignore
            name: product[Object.keys(product)].name,
            // @ts-ignore
            price: product[Object.keys(product)].price
        }

        CartStore.addToCart(payload)
        cart_qty.value = 1
        product_added.value = true
        setTimeout(() => {
            product_added.value = false
        }, 3000)

    }
}