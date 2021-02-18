<template>
    <div class="profile-group mt-5" >
        <div class="input-file">
            <v-btn raised class="red" @click="onPickFile">Upload Avatar</v-btn>
            <input type="file" class="d-none" ref="fileInput" accept="image/*" @change="onFilePicked">
        </div>
        <div class="choose-avatar">
            <div class="avartar" :style="{ backgroundImage: 'url(' + imageUrl + ')' }" v-if="isShowAvartar"></div>
        </div>
        <div class="input-type email mt-4">
            <v-card class="pt-2 pb-2 pl-4 pr-4"><v-text-field :value="EmailUser" disabled></v-text-field></v-card>
        </div>
        <div class="input-type email mt-4">
            <v-card class="pt-2 pb-2 pl-4 pr-4">
                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field 
                        ref="nameinput"
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
import "firebase/storage";
export default {
    data(){
        return{
            nameRules: [
                v => !!v || 'Name is required',
                v => v && v.length <= 10 || "Name must be less than 10 characters"
            ],
            name : "",
            loader: null,
            valid: true,
            loading: false,
            isShowAvartar : false,
            isProcess : false,
            imageUrl : "",
            image : null,
            imageGlobal : "",
  
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
        }
    },

    methods : {
        onPickFile(){
            this.$refs.fileInput.click()
        },
        onFilePicked(event){
            this.isShowAvartar = true
            const files = event.target.files
            if(files === null){
                return
            }
            let filename = files[0].name
            if(filename.lastIndexOf('.') <= 0){
                return alert('Please add a valid file !')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load' , () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },

        hanleSaveChange(){
            this.$v.$touch();
            const namedata = this.name
            const imageData = this.image
            this.loading = true;
            if (this.$refs.form.validate()){
                setTimeout(() => {
                    firebase.auth().onAuthStateChanged(user => {
                        this.loading = false
                        if(user){
                            user.updateProfile({
                                displayName : namedata,
                            })
                            this.$store.commit('game/setUserName', namedata)
                            this.$store.commit('game/setNullUser' , namedata)
                        }
                    })
                    var user = firebase.auth().currentUser
                    if(!this.image){
                        this.loading = false
                        return
                    }else if(user){
                        var uploadTask = firebase.storage().ref('users/' + user.uid + '/profile.jpg').put(imageData);
                        uploadTask.on('state_changed', 
                            (snapshot) => {
                                //this.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                this.isShowAvartar = false
                                switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED:
                                    break;
                                case firebase.storage.TaskState.RUNNING:
                                    break;
                                }
                            }, 
                            (error) => {
                                console.log(error);
                            }, () => {
                                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                    this.$store.commit('game/setPhoto' , downloadURL)
                                });
                            }
                        );
                    }
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
        font-size: 1.4rem;
        width: 100%;
    }
    .choose-avatar{
        position: relative;
        .avartar{
            background: #ddd;
            border-radius: 5px;
            color: #333;
            width: 100%;
            height: 25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: normal;
            background-size: cover;
            background-position: center center;
            margin-top: 1.5rem;
        }
        .progress{
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%,-50%);
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