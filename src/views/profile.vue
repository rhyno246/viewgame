<template>
    <div class="main-profile">
        <v-container>
            <div class="profile">
                <div class="profile__name">
                    <div class="img-name">
                        <div class="first-name">
                            <span>{{ subStringName }}</span>
                        </div>
                    </div>
                </div>
                <v-tabs v-model="tab" background-color="transparent" class="tabs">
                    <v-tab v-for="item in items" :key="item">
                        {{ item }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-card-text>
                            <div class="profile-group mt-5" >
                                <div class="choose-avatar" @click="chooseImage">
                                    <div class="avartar" :style="{ 'background-image': `url(${imageData})` }">
                                        <span v-if="!imageData">Choose Image</span>
                                    </div>
                                    <input type="file" ref="fileInput" class="d-none" @input="onSelectFile">
                                </div>
                                <div class="input-type email mt-4">
                                    <v-card class="pt-2 pb-2 pl-4 pr-4"><v-text-field :value="EmailUser" disabled></v-text-field></v-card>
                                </div>
                                <div class="input-type email mt-4">
                                    <v-card class="pt-2 pb-2 pl-4 pr-4">
                                        <v-text-field 
                                            v-model="name"
                                            :error-messages="nameErrors"
                                            :rules="nameRules"
                                            @input="$v.name.$touch()"
                                            @blur="$v.name.$touch()"
                                            required
                                        ></v-text-field>
                                    </v-card>
                                </div>
                                <v-btn 
                                    class="save-change"
                                    :loading="loading"
                                    :disabled="loading"
                                    @click="hanleSaveChange"
                                >
                                    Save Change
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card-text>
                            <div class="box mt-5">
                                Favourite List user
                            </div>
                        </v-card-text>
                    </v-tab-item>
                </v-tabs-items>

            </div>
        </v-container>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import firebase from "firebase/app"
import "firebase/auth"
export default {
    mixins: [validationMixin],

    validations: {
        name: { 
            required, 
            minLength: minLength(3),
            maxLength : maxLength(10)
        },
    },

    data(){
        return {
            name : "",
            tab: null,
            items: [
                'Profile', 'Favourite'
            ],
            nameRules: [
                v => !!v || 'Name is required',
                
            ],
            imageData: null,
            loader: null,
            loading: false,
        }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    computed : {
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.minLength && errors.push('Name must be at most 3 characters long')
            !this.$v.name.maxLength && errors.push('Name must be less than 10 characters')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },
        nameUser(){
            return  this.name = this.$store.getters['game/getNameUser']
        },
        EmailUser(){
            return this.$store.getters['game/getEmailUser']
        },
        subStringName(){
            const name = this.nameUser;
            return name.substring(0,1).toUpperCase();
        },
    },
    methods : {
        chooseImage(){
            this.$refs.fileInput.click()
        },
        onSelectFile () {
            const input = this.$refs.fileInput
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                this.imageData = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
        },
        hanleSaveChange(){
            this.$v.$touch()
            const imgdata = this.imageData
            const namedata = this.name
            this.loading = true;
            if(namedata === ""){
                this.loading = false
                return 
            }
            setTimeout(() => {
                console.log(imgdata , namedata);
                this.loading = false
            }, 500);
        }
    }
}
</script>


<style lang="scss">
    .profile-group{
        max-width: 50rem;
    }
    .save-change{
        margin-top: 2rem;
        font-size: 1.4rem !important;
        width: 100%;
    }
    .v-btn:not(.v-btn--round).v-size--default{
        position: relative !important;
        left: 0 !important;
    }
    .choose-avatar{
        .avartar{
            background: #ddd;
            border-radius: 5px;
            color: #333;
            width: 20rem;
            margin: 0 auto;
            height: 20rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: normal;
            background-size: cover;
            cursor: pointer;
            background-position: center center;
        }
    }
    .input-type {
        input{
            border: none;
            color: #fff;
            width: 100%;
            &:focus{
                outline: none;
            }
        }
    }

    .profile{
        max-width: 100rem;
        margin: 0 auto;
        &__name{
            font-size: 4rem;
            margin-top: 5rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            margin-bottom: 4rem;
            .img-name{
                position: relative;
                width: 15rem;
                height: 15rem;
                border-radius: 50%;
                .first-name{
                    background: #fff;
                    color: #333;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 15rem;
                    height: 15rem;
                    font-size: 6rem;
                    font-weight: normal;
                    background-size: cover;
                    background-position: center center;
                }
            }
        }
    }
    .v-tab {
        font-size: 1.4rem !important;
    }
    .v-card__text{
        font-size: 1.6rem !important;
        padding: 1.6rem 0 !important;
    }
    .v-tabs-items {
        background: transparent !important;
    }
    .color{
        color: red;
    }
     .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
        transform: rotate(0);
        }
        to {
        transform: rotate(360deg);
        }
    }
</style>