import {defineStore} from "pinia";


export const useUiStore = defineStore("UiStore", {
    state: () => {
            return {
                showBestsellers: false,
                cat: '',
                subcat: '',
                categories: [],
                checkboxBestSeller: false
        }

    },
    getters: {
        getShowBestsellers(): boolean {
                return this.showBestsellers
        },
        getAllCategories(): [] | never[] {
            return this.categories
        },
        getCheckboxBestSeller(): boolean {
            return this.checkboxBestSeller
        },
        getCategory(): string {
            return this.cat
        },
        getSubcategory(): string {
            return this.subcat
        }
    },
    actions: {
        changeShowBestsellers(): void {
            this.showBestsellers = !this.showBestsellers
        },
        writeCategoryInfo(categoryInfo: {cat: string, subcat: string }): void{
            this.cat = categoryInfo.cat
            this.subcat = categoryInfo.subcat
        },
        pushCategories(categories: []): void{
            this.categories = categories
        }
    }
})