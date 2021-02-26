<template>
    <div class="change-password">
        <div class="error error-text mt-4 pt-3 pb-3 pr-3 pl-3 mb-10" v-if="getErrorValidate">{{ getErrorValidate }}</div>

        <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
                :error-messages="newpasswordErrors"
                required
                label="New Password"
                v-model="newpassword"
                outlined
                dense
                type="password"
                @input="$v.newpassword.$touch()"
                @blur="$v.newpassword.$touch()"
                :rules="pwdRules"
                class="pw"
            ></v-text-field>
            <v-text-field
                :error-messages="comfirmpasswordErrors"
                label="Comfirm Password"
                required
                v-model="comfirmpassword"
                outlined
                dense
                type="password"
                @input="$v.comfirmpassword.$touch()"
                @blur="$v.comfirmpassword.$touch()"
                :rules="pwdConfirm"
                class="cfpw"
            ></v-text-field>
            <v-btn
                class="button mt-4 button-position"
                @click="handleChangePassWord"
                color="blue-grey"
                :loading="loading"
                :disabled="!valid"
            >
                SAVE CHANGE
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required , minLength } from 'vuelidate/lib/validators'
import firebase from "firebase/app";
import "firebase/auth";
export default {
    data(){
        return{
            newpassword : "",
            comfirmpassword : "",
            loader: null,
            loading: false,
            valid : true,
            //validError : "",
            pwdRules: [
                v => !!v || "Password required",
            ],
            pwdConfirm: [
                v => !!v || "Confirm password",
                v => v === this.newpassword || "Passwords do not match"
            ],
        }
    },
    mixins: [validationMixin],
    validations: {
        newpassword : { required, minLength: minLength(6) },
        comfirmpassword : { required },
    },

    computed : {
        newpasswordErrors(){
            const errors = []
            if (!this.$v.newpassword.$dirty) return errors
            !this.$v.newpassword.minLength && errors.push('Password must be at most 6 characters long')
            const ref = this.$refs.form
            this.$store.commit('game/changeTabPassWord' , ref)
            this.$store.commit('game/setValidatePass' , this.$v)
            !this.$v.newpassword.required && errors.push('New Password is required')
            return errors
        },
        comfirmpasswordErrors(){
            const errors = []
            if (!this.$v.comfirmpassword.$dirty) return errors
            !this.$v.comfirmpassword.required && errors.push('Comfirm Password is required')
            const ref = this.$refs.form
            this.$store.commit('game/changeTabPassWord' , ref)
            return errors
        },
        getErrorValidate(){
            return this.$store.getters['game/errorChangePass']
        },
    },
    methods : {
        handleChangePassWord(){
            this.$v.$touch()
            this.loading = true;
            const newpass = this.newpassword
            const confirm = this.comfirmpassword
            if(newpass === "" || confirm === ""){
                this.loading = false
                return
            }
            if(this.$refs.form.validate()){
                setTimeout(() => {
                    this.loading = false
                    var user = firebase.auth().currentUser;
                    if(user){
                        user.updatePassword(newpass).then(() =>{
                            this.$refs.form.reset()
                            this.$v.$reset()
                            this.$toast.success("!!! Update password success", {
                                position: "bottom-right",
                                timeout: 5000,
                                closeOnClick: true,
                                pauseOnFocusLoss: true,
                                pauseOnHover: true,
                                draggable: true,
                                draggablePercent: 0.8,
                                showCloseButtonOnHover: false,
                                hideProgressBar: false,
                                closeButton: "button",
                                icon: true,
                                rtl: true
                            });
                        }).catch((error) =>{
                            var errorCode = error.code
                            var errorMessage = error.message
                            if(errorCode == 'auth/requires-recent-login'){
                                this.loading = false
                                this.$store.state.game.errorChangePass = errorMessage
                                this.valid =false
                            }
                        })
                    }
                }, 500);
            }else{
                this.$refs.form.resetValidation()
            }
        },
    }
}
</script>

<style lang="scss">
    .error{
        line-height: 1.5;
    }
    .change-password{
        max-width: 50rem;
        margin: 0 auto;
    }
    .button{
        font-size: 1.6rem !important;
        width: 100%;
        &:disabled{
            background: #222;
        }
    }
    .v-btn:not(.v-btn--round).v-size--default{
        position: relative !important;
        left: 0 !important;
    }
</style>