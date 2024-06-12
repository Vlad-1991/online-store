import {breadcrumbsArrayType, productInCartType} from "@/utils/types/requestTypes";

export type CartState = { cart: productInCartType, message_overload: boolean, cart_qty: number, product_added: boolean }

export interface authType {
    userName: string,
    userId: string
}

export interface UiState {
    showBestsellers: boolean,
    cat: string,
    subcat: string,
    categories: string[],
    checkboxBestSeller: boolean,
    sidebar: string,
    errorMessage: string,
    breadcrumbsArray: breadcrumbsArrayType[]
}