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
                    return 'mdi-desktop-mac'
                case 'ios' : 
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