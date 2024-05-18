import {defineStore} from "pinia";

type state = { cart: {} | null }


export const useCartStore = defineStore("CartStore", {
    state: (): state => {
        return {
            cart: {}
        }
    },
    getters: {
        getCartProducts(): {} | null {
            return this.cart
        },
        getProductById: (state) => {
            // @ts-ignore
            return (id) => state.cart[id]
        },
        getCartCount(): number{
            let count = 0
            for (let product in this.cart) {
                // @ts-ignore
                count += this.cart[product].qty
            }
            return count
        },
        getSummary(): number{
            let sum = 0
            for(let product in this.cart){
                // @ts-ignore
                sum += this.cart[product].qty * this.cart[product].price
            }
            return sum
        }
    },
    actions: {
        addToCart(product: any): void {

            let key = product[Object.keys(product)[0]].id;

            // @ts-ignore
            if(this.cart[key]){
                // @ts-ignore
                this.cart[key].qty += product[Object.keys(product)[0]].qty
                // @ts-ignore
                if(this.cart[key].qty > 100){
                    // @ts-ignore
                    this.cart[key].qty = 100
                }
            }else{
                // @ts-ignore
                this.cart[key] = product[Object.keys(product)[0]];
                // @ts-ignore
            }

            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        updateCount(payload: {id: string, cnt: number}): void{
            let cnt = payload.cnt
            if(cnt <= 1) {
                cnt = 1
            }else if(cnt >= 100){
                cnt = 100
            }
            // @ts-ignore
            this.cart[payload.id].qty = cnt
            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        deleteProduct(id: string): void{
            // @ts-ignore
            delete this.cart[id]
            console.log(this.cart)
            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        getCart(): void{
            let cart
            if(localStorage.getItem("cart")){
                // @ts-ignore
                cart = JSON.parse(localStorage.getItem("cart"))
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