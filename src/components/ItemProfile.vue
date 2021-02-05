<template>
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
                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field 
                        :error-messages="nameErrors"
                        v-model="name"
                        :rules="nameRules"
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                        required
                    ></v-text-field>
                </v-form>
            </v-card>
        </div>
        <v-btn 
            class="save-change"
            :loading="loading"
            :disabled="!valid"
            @click="hanleSaveChange"
        >
            Save Change
        </v-btn>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import firebase from "firebase/app"
import "firebase/auth"
export default {
    data(){
        return{
            nameRules: [
                v => !!v || 'Name is required',
                v => v && v.length <= 10 || "Name must be less than 10 characters"
            ],
            name : "",
            imageData: null,
            loader: null,
            valid: true,
            loading: false,
        }
    },
    mixins: [validationMixin],
    validations: {
        name: { 
            required, 
            minLength: minLength(3),
        },
    },
    watch: {
        loader () {
            const l = this.loader
            this[l] = !this[l]
            setTimeout(() => (this[l] = false), 3000)
            this.loader = null
        },
        nameUser(){
            this.$nextTick()
            
        }
    },
    computed : {
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.minLength && errors.push('Name must be at most 3 characters long')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },
        nameUser(){
            return this.name = this.$store.getters['game/getNameUser'] 
        },
        EmailUser(){
            return this.$store.getters['game/getEmailUser']
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
            this.$v.$touch();
            const imgdata = this.imageData
            const namedata = this.name
            this.loading = true;
            if(namedata === ""){
                this.loading = false
                return 
            }
            if(this.$refs.form.validate()){
                setTimeout(() => {
                    console.log(imgdata , namedata);
                    this.loading = false
                }, 500);
            }
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
        &:disabled{
            background: #222;
        }
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