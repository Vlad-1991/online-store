import {defineStore} from "pinia";


export const useUiStore = defineStore("UiStore", {
    state: () => {
            return {
                showBestsellers: false,
                cat: '',
                subcat: ''
        }

    },
    getters: {
        getShowBestsellers(): boolean {
                return this.showBestsellers
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
        }
    }
})