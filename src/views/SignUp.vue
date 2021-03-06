<template>
    <div class="sign-up">
        <v-container>
            <h2 class="text-center">SIGN UP</h2>

            <div class="error error-text mt-4 mb-10" v-if="error">{{ error }}</div>
            <v-form class="mt-7" v-model="valid" ref="form" lazy-validation>
                <v-text-field
                    label="UserName"
                    outlined
                    v-model="name"
                    required
                    dense
                    :error-messages="nameErrors"
                    :rules="nameRules"
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                    class="name"
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
                    class="email"
                ></v-text-field>
                <v-text-field
                    :error-messages="password1Errors"
                    v-model="password1"
                    required
                    outlined
                    dense
                    label="Password"
                    type="password"
                    class="pw"
                    @input="$v.password1.$touch()"
                    @blur="$v.password1.$touch()"
                    :rules="pwdRules"
                ></v-text-field>


                <v-text-field
                    v-model="password2"
                    :error-messages="password2Errors"
                    required
                    outlined
                    dense
                    label="Confirm Password"
                    type="password"
                    @input="$v.password2.$touch()"
                    @blur="$v.password2.$touch()"
                    :rules="pwdConfirm"
                    class="cfpw"
                ></v-text-field>



                <v-checkbox class="mt-0 checksignup"
                    v-model="checkbox"
                    color="blue-grey"
                    :error-messages="checkboxErrors"
                    label="Do you agree?"
                    required
                    @change="$v.checkbox.$touch()"
                    @blur="$v.checkbox.$touch()"
                ></v-checkbox>
                <v-btn
                    class="button mt-4 button-position"
                    @click="submit"
                    color="blue-grey"
                    :loading="loading"
                    :disabled="!valid"
                >
                    SIGN UP
                </v-btn>
                <div class="have-account mt-4">
                    <router-link to="/login">Already have an account? Login.</router-link>
                </div>
            </v-form>
        </v-container>
    </div>
</template>


<script>
import { validationMixin } from 'vuelidate'
import { required, minLength , email } from 'vuelidate/lib/validators'
import firebase from "firebase/app";
import "firebase/auth";
export default {
    mixins: [validationMixin],

    validations: {
        name: { 
            required, 
            minLength: minLength(3)
        },
        email: { required, email },
        password1 : { 
            required,
            minLength: minLength(6)
        },
        password2 : {
            required,
        },
        checkbox: {
            checked (val) {
                return val
            },
        },
    },
    watch: {
        loader () {
            const l = this.loader
            this[l] = !this[l]
            setTimeout(() => (this[l] = false), 3000)
            this.loader = null
        },
    },
    data(){
        return{
            error : '',
            name : '',
            email : '',
            password1 : '',
            password2 : '',
            checkbox: false,
            loader: null,
            loading: false,
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            pwdRules: [
                v => !!v || "Password required",
            ],
            pwdConfirm: [
                v => !!v || "Confirm password",
                v => v === this.password1 || "Passwords do not match",
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
            this.loading = false
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        password1Errors(){
            const errors = []
            if (!this.$v.password1.$dirty) return errors
            !this.$v.password1.minLength && errors.push('Password must be at most 6 characters long')
            !this.$v.password1.required && errors.push('Password is required')
            return errors
        },
        password2Errors(){
            const errors = []
            if (!this.$v.password2.$dirty) return errors
            !this.$v.password2.required && errors.push('Comfirm Password is required')
            return errors
        }
    },
    methods : {
        submit(){
            this.$v.$touch();
            var email = this.email;
            var password = this.password1;
            var name = this.name;
            this.loading = true;
            if(this.name === "" || this.email === "" || this.password1 === "" || this.password2 === "" || this.phone ==="" || this.checkbox === false){
                this.loading = false
                return
            } 
            if(this.$refs.form.validate()){
                setTimeout(() => {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(userCredential => {
                        var user = userCredential.user;
                        user.updateProfile({
                            displayName : name,
                        })
                        this.error = false;
                        this.loading = false;
                        this.$router.push('/game');
                        this.$store.commit('game/setIsLogin' , true);
                        this.$store.commit('game/setNullUser' , name);
                    })
                    .catch(error=> {
                        if(error){
                            this.loading = false
                            this.errorcode = error.code;
                            this.error =  error.message;
                            return
                        }
                        console.log(error);
                    });
                }, 500); 
            } 
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
        &:disabled{
            background: #222;
        }
    }
    .v-btn:not(.v-btn--round).v-size--default{
        position: relative !important;
        left: 0 !important;
    }
    .error-text{
        font-size: 1.5rem;
        padding: 1rem 1.5rem;
    }
    .have-account{
        a{
            font-size: 1.6rem;
            color: #fff;
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