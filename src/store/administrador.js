import { defineStore } from "pinia";
import { ref } from "vue";


export const useAdminStore = defineStore ("admin",()=>{


const token = ref("");
const refreshToken = ref("")
const userName = ref("")


    function set_Token_RefreshToken (Token,RefreshToken){
        if(token){
            token.value= Token
            refreshToken.value= RefreshToken
        }
        else{
            console.log("no-token no-refreshToken");
        }
    }

    function setUserName(Name ){
        userName.value = Name
    }

    return{
        token,
        refreshToken,
        set_Token_RefreshToken,
        setUserName,
        userName
    }

},{
    persist:true
})

