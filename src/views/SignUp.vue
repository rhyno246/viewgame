<template>
    <div class="sign-up">
        <v-container>
            <h2 class="text-center">SIGN UP</h2>
            <form class="mt-7">
                <v-text-field
                    label="UserName"
                    outlined
                    v-model="name"
                    dense
                    :error-messages="nameErrors"
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                    label="Email"
                    outlined
                    v-model="email"
                    dense
                    :error-messages="emailErrors"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                    :error-messages="password1Errors"
                    v-model="password1"
                    required
                    outlined
                    dense
                    label="Password"
                    type="password"
                    :rules="pwdRules"
                ></v-text-field>


                <v-text-field v-model="password2"
                    :error-messages="password2Errors"
                    required
                    outlined
                    dense
                    label="Confirm Password"
                    type="password"
                    :rules="pwdConfirm"
                ></v-text-field>



                <v-checkbox class="mt-0"
                    v-model="checkbox"
                    color="green"
                    :error-messages="checkboxErrors"
                    label="Do you agree?"
                    required
                    @change="$v.checkbox.$touch()"
                    @blur="$v.checkbox.$touch()"
                ></v-checkbox>
                <v-btn
                    class="button mt-4"
                    @click="submit"
                    color="success"
                >
                    SIGN UP
                </v-btn>
            </form>
        </v-container>
    </div>
</template>


<script>
import { validationMixin } from 'vuelidate'
import { required, minLength , email } from 'vuelidate/lib/validators'
export default {
    mixins: [validationMixin],

    validations: {
        name: { 
            required, 
            minLength: minLength(3)
        },
        email: { required, email },
        password1 : { required },
        password2 : { required },
        checkbox: {
            checked (val) {
                return val
            },
        },
    },
    data(){
        return{
            name : '',
            email : '',
            password1 : '',
            password2 : '',
            checkbox: false,
            pwdRules: [v => !!v || "Password required"],
            pwdConfirm: [
                v => !!v || "Confirm password",
                v => v === this.password1 || "Passwords do not match"
            ]
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
        checkboxErrors () {
            const errors = []
            if (!this.$v.checkbox.$dirty) return errors
            !this.$v.checkbox.checked && errors.push('You must agree to continue!')
            return errors
        },
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        password1Errors(){
            const errors = []
            if (!this.$v.password1.$dirty) return errors
            !this.$v.password1.required && errors.push('Password is required')
            return errors
        },
        password2Errors(){
            const errors = []
            if (!this.$v.password2.$dirty) return errors
            !this.$v.password2.required && errors.push('Password is required')
            return errors
        }
    },
    methods : {
        submit(){
            this.$v.$touch();
            if(this.name === "" || this.email === "" || this.password1 === "" || this.password2 === ""){
                return
            }
            console.log(this.name , this.email , this.password1 , this.password2);
        }
    },
}
</script>

<style lang="scss">
    .sign-up{
        max-width: 50rem;
        margin: 0 auto;
        h2{
            font-size: 3rem;
            color: rgba($color: #fff, $alpha: .7);
        }
    }
    .button{
        font-size: 1.6rem !important;
        width: 100%;
    }
</style>