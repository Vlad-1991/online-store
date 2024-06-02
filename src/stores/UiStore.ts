import {defineStore} from "pinia";


export const useUiStore = defineStore("UiStore", {
    state: () => {
            return {
                showBestsellers: false,
                cat: '',
                subcat: '',
                categories: [],
                checkboxBestSeller: false,
                sidebar: '-500px',
                errorMessage: ''
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
        },
        getSideBarStatus(): string {
            return this.sidebar
        },
        getErrorMessage(): string {
            return this.errorMessage
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
        },
        toggleSidebar(): void{
            if(this.sidebar === "-500px"){
                this.sidebar = "0";
            }else{
                this.sidebar = "-500px"
            }
        },
        setErrorMessage(e: string): void {
            this.errorMessage = e
        }
    }
})