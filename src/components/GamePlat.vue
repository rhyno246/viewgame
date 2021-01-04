<template>
    <span>
        <v-icon>
            {{hasIcon}}
        </v-icon>
    </span>
</template>

<script>
export default {
    props : ['id' , 'name' , 'slug'],
    computed : {
        hasIcon(){

            switch (this.slug) {
                case 'pc':
                    return 'mdi-microsoft-windows'
                case 'playstation' : 
                    return 'mdi-sony-playstation'
                case 'mac' : 
                    return 'mdi-apple'
                case 'xbox' : 
                    return 'mdi-microsoft-xbox'
                case 'linux' : 
                    return 'mdi-linux'
                case 'android' : 
                    return 'mdi-android'
                case 'nintendo' : 
                    return 'mdi-nintendo-switch'
                case 'web' : 
                    return 'mdi-web'
                default: 
                    return ''   
                break;
            }
            // if(this.slug == "pc"){
            //     return "mdi-microsoft-windows"
            // }else if(this.slug == "playstation4" || this.slug == "playstation3"){
            //     return "mdi-sony-playstation"
            // }else if(this.slug == "linux"){
            //     return "mdi-linux"
            // }else if(this.slug == "macos" || this.slug == "ios" || this.slug == "mac"){
            //     return "mdi-apple"
            // }else if(this.slug == "android"){
            //     return "mdi-android"
            // }else if(this.slug == "nintendo-switch"){
            //     return 'mdi-nintendo-switch'
            // }else if(this.slug == "xbox-one" || this.slug == "xbox360"){
            //     return 'mdi-microsoft-xbox'
            // }else if(this.slug == "web"){
            //     return 'mdi-web'
            // }else {
            //     return ""
            // }
        }
    },
}
</script>

<style scoped>
.icon span i {
    font-size: 1.8rem !important;
    margin-right: .5rem;
}
</style>