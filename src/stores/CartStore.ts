import {defineStore} from "pinia";
import {productInCartType} from "@/utils/requestTypes";

type state = { cart: productInCartType }


export const useCartStore = defineStore("CartStore", {
    state: (): state => {
        return {
            cart: {}
        }
    },
    getters: {
        getCartProducts(): productInCartType | null {
            return this.cart
        },
        getProductById: (state) => {
            return (id: string) => state.cart[id]
        },
        getCartCount(): number{
            let count: number = 0
            for (let product in this.cart) {
                count += this.cart[product].qty
            }
            return count
        },
        getSummary(): number{
            let sum: number = 0
            for(let product in this.cart){

                sum += this.cart[product].qty * parseFloat(this.cart[product].price)
            }
            return sum
        }
    },
    actions: {
        addToCart(product: productInCartType): void {


            let key: string = product[Object.keys(product)[0]].id;


            if(this.cart[key]){
                this.cart[key].qty += product[Object.keys(product)[0]].qty
                if(this.cart[key].qty > 100){
                    this.cart[key].qty = 100
                }
            }else{
                this.cart[key] = product[Object.keys(product)[0]];
            }

            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        updateCount(payload: {id: string, cnt: number}): void{
            let cnt: number = payload.cnt
            if(cnt <= 1) {
                cnt = 1
            }else if(cnt >= 100){
                cnt = 100
            }
            this.cart[payload.id].qty = cnt
            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        deleteProduct(id: string): void{
            delete this.cart[id]
            console.log(this.cart)
            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        getCart(): void{
            let cart
            const cartItem: string | null = localStorage.getItem("cart");
            if (cartItem) {
                cart = JSON.parse(cartItem);
            }

            if(cart){
                this.cart = cart
            }else{
                this.cart = {}
            }
        },
        clearCart(): void{
            this.cart = {}
        }
    }

})