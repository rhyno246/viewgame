<template>
    <div class="change-password">
        <v-form v-model="valid" ref="form" lazy-validation>
            <!-- <v-text-field
                :error-messages="oldpasswordErrors"
                required
                label="Old Password"
                type="password"
                v-model="oldpassword"
                outlined
                dense
                @input="$v.oldpassword.$touch()"
                @blur="$v.oldpassword.$touch()"
            ></v-text-field> -->
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
import { required } from 'vuelidate/lib/validators'
import firebase from "firebase/app";
import "firebase/auth";
export default {
    data(){
        return{
            //oldpassword : "",
            newpassword : "",
            comfirmpassword : "",
            loader: null,
            loading: false,
            valid : true,
            pwdRules: [
                v => !!v || "Password required",
            ],
            pwdConfirm: [
                v => !!v || "Confirm password",
                v => v === this.newpassword || "Passwords do not match"
            ]
        }
    },
    mixins: [validationMixin],
    validations: {
        //oldpassword : { required },
        newpassword : { required },
        comfirmpassword : { required },
    },
    computed : {
        // oldpasswordErrors(){
        //     const errors = []
        //     if (!this.$v.oldpassword.$dirty) return errors
        //     !this.$v.oldpassword.required && errors.push('Old Password is required')
        //     return errors
        // },
        newpasswordErrors(){
            const errors = []
            if (!this.$v.newpassword.$dirty) return errors
            !this.$v.newpassword.required && errors.push('New Password is required')
            return errors
        },
        comfirmpasswordErrors(){
            const errors = []
            if (!this.$v.comfirmpassword.$dirty) return errors
            !this.$v.comfirmpassword.required && errors.push('Comfirm Password is required')
            return errors
        }
    },
    methods : {
        handleChangePassWord(){
            this.$v.$touch()
            this.loading = true;
            //const oldpass = this.oldpassword
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
                            this.newpassword = ""
                            this.comfirmpassword = ""
                            this.$router.replace("/")
                        }).catch((error) =>{
                            console.log(error);
                        })
                    }
                }, 500);
            }
        }
    }
}
</script>

<style lang="scss">
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