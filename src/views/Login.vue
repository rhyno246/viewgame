<template>
    <div class="Login">
        <v-container>
            <h2 class="text-center">LOGIN</h2>
            <div class="error error-text mt-4 mb-10" v-if="error">{{ error }}</div>

            <v-form class="mt-7" v-model="valid" ref="form" lazy-validation>
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
                    v-model="password"
                    required
                    outlined
                    dense
                    label="Password"
                    type="password"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :rules="pwdRules"
                ></v-text-field>
                <v-btn
                    class="button mt-4"
                    @click="submit"
                    color="blue-grey"
                    :loading="loading"
                    :disabled="!valid"
                >
                    LOGIN
                </v-btn>

                <div class="dont-have-account mt-4">
                    <router-link to="/sign-up" class="dont-have">Don't have an account? Sign up.</router-link>
                </div>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required , email , minLength } from 'vuelidate/lib/validators'
import firebase from "firebase/app"
import "firebase/auth"
export default {
    mixins: [validationMixin],

    validations: {
        email: { required, email },
        password : { required , minLength: minLength(6) },
        checkbox: {
            checked (val) {
                return val
            },
        },
    },
    data(){
        return {
            email : "",
            password : "",
            error : "",
            loader: null,
            loading: false,
            valid: true,
            pwdRules: [
                v => !!v || "Password required",
            ],
        }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
    computed : {
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
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.minLength && errors.push('Password must be at most 6 characters long')
            !this.$v.password.required && errors.push('Password is required')
            return errors
        },
    },
    methods : {
        submit(){
            this.$v.$touch();   
            this.loading = true
            if(this.email === "" || this.password === ""){
                this.loading = false
                return 
            }
            if(this.$refs.form.validate()){
                setTimeout(() => {
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(userCredential => {
                        var user = userCredential.user
                        if(user){
                            this.loading = false
                            this.$router.push('/game')
                            this.$store.commit('game/setIsLogin' , true)
                        }
                    })
                    .catch(error => {
                        var errorCode = error.code
                        var errorMessage = error.message
                        if (errorCode === 'auth/wrong-password') {
                            this.loading = false
                            this.error = "wrong password"
                        } else {
                            this.loading = false
                            this.error = errorMessage
                        }
                    });
                }, 500);
            }
        }
    }
}
</script>
<style lang="scss">
.Login{
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
    .error-text{
        font-size: 1.5rem;
        padding: 1rem 1.5rem;
    }
    .dont-have-account{
        a{
            font-size: 1.6rem;
            color: #fff;
        }
    }
    .v-btn:not(.v-btn--round).v-size--default{
        position: relative !important;
        left: 0 !important;
        top: 0 !important;
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
