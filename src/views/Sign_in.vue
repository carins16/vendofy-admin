<template>
    <v-container fluid>
        <v-container fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md6>
                    <v-alert v-model="alert" dismissible type="error">
                        {{ errorMsg }}
                    </v-alert>
                    <v-form v-on:submit.prevent="onSignIn">
                        <v-card-text>
                            <v-text-field prepend-icon="person" 
                                        label="Email" 
                                        type="email"
                                        v-model="email"
                                        :error-messages="emailErrors"
                                        required
                                        @input="$v.email.$touch()"
                                        @blur="$v.email.$touch()">
                            </v-text-field>
                            <v-text-field prepend-icon="lock"   
                                        label="Password" 
                                        type="password"
                                        v-model="password"
                                        :error-messages="passwordErrors"
                                        required
                                        @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()">
                            </v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn type="submit" color="primary" large :loading="loading">Sign In</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, email } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        validations: {
            email: { required, email },
            password: { required }
        },
        data: () => ({
            alert: false,
            errorMsg: '',
            loading: false,
            email: '',
            password: ''
        }),
        computed: {
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
            passwordErrors () {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required')
                return errors
            },
            getAuthUser() {
                return this.$store.getters.getAuthUser
            },
            getAuthError() {
                return this.$store.getters.getAuthError
            }
        },
        watch: {
            getAuthError(val) {
                this.loading = false
                if (val !== null && val !== undefined) {
                    if (val.code == "auth/user-not-found") {
                        this.alert = true
                        this.errorMsg = "No account found with that email address."
                    } else if (val.code == "auth/wrong-password") {
                        this.alert = true
                        this.errorMsg = "Incorrect password."
                    } else if (val.code == "auth/too-many-requests") {
                        this.alert = true
                        this.errorMsg = "Too many attempts. Try again later"
                    } else if (val.code == "auth/network-request-failed") {
                        this.alert = true
                        this.errorMsg = "A network error (such as timeout, interrupted connection or unreachable host) has occurred."
                    } 
                }
            },
            getAuthUser(val) {
                this.loading = false
                if (val !== null && val !== undefined) this.$router.replace('/')
            }
        },
        methods: {
            onSignIn() {
                this.$v.$touch()
                if (!this.$v.$invalid && this.loading != true) {
                    this.loading = true
                    this.$store.dispatch('userAuth', {email: this.email, password: this.password})
                } 
            }
        }
    }
</script>

