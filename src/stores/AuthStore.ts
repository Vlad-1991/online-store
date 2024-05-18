import {defineStore} from "pinia";

let stub = () => {
    return {userName: 'Joy Carson', userId: 'joycarson@gmail.com'}
}



export const useAuthStore = defineStore("AuthStore", {
    state: () => {
    //     return {
    //     userName: '',
    //     userId: ''
    // }
        return stub()
    },
    getters: {
        getUserName(): string | null | undefined {
            if(this.userName){
                return this.userName
            }
        },
        getUserId(): string | null | undefined {
            if(this.userId){
                return this.userId
            }
        },
        isAuthentificated(): boolean{
            return !!this.getUserName
        }
    },
    actions: {

    }
})