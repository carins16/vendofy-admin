<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg3 xl3 pa-3 v-for="(product, index) in products" :key="index">
                <v-card>
                    <v-img aspect-ratio="1.0" :src="product.pic" class="grey lighten-2">
                        <template v-slot:placeholder>
                            <v-layout fill-height align-center justify-center ma-0 >
                                <v-progress-circular size="100" width="20" indeterminate color="grey"></v-progress-circular>
                            </v-layout>
                        </template>
                    </v-img>
                    <v-card-text class="pt-4" style="position: relative;">
                        <v-btn absolute color="blue" class="white--text" fab right top style="z-index: 1;">
                            <span class="title">
                                {{ product.id }}
                            </span>
                        </v-btn>
                        <p class="title font-weight-medium deep-orange--text mb-2">₱ {{ product.price }}</p>
                        <p class="title font-weight-bold blue--text mb-2 text-no-wrap text-truncate">{{ product.descrp }}</p>
                        <v-layout row>
                            <v-flex xs6>
                                <p class="subheading font-weight-medium blue-grey--text mb-2">Size ({{ product.size }})</p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="subheading font-weight-medium blue-grey--text mb-2 text-xs-right">Quantity: {{ product.qty }}</p>
                            </v-flex>
                        </v-layout>
                        <v-btn color="green" block round class="white--text" 
                            @click="onUpdateProducts(
                                product.id,
                                product.descrp,
                                product.size,
                                product.price,
                                product.qty
                            )">
                            <v-icon>edit</v-icon>&nbsp;Update
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <!-- Update dialog -->
        <v-dialog v-model="dialog" persistent :fullscreen="isMobile" :transition="customTransition" max-width="600px">
            <v-card>
                <v-form v-on:submit.prevent="onSaveChanges">
                    <!-- Fullscreen dialog -->
                    <template v-if="isMobile">
                        <v-toolbar dark color="green">
                        <v-btn icon dark @click="onClose">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Product No. {{ edit.id }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn type="submit" class="subheading" dark flat :loading="loading">SAVE</v-btn>
                        </v-toolbar-items>
                        </v-toolbar>
                    </template>
                    <!-- Small dialog header -->
                    <template v-else>
                        <v-card-title>
                        <span class="title">Product No. {{ edit.id }}</span>
                        </v-card-title>
                        <v-divider></v-divider>
                    </template>
                    <!-- Content -->
                    <template>
                        <v-container>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-card-text>
                                        <v-text-field label="Description" 
                                            type="text"
                                            v-model="edit.descrp" 
                                            counter="30"
                                            maxlength="30"
                                            :error-messages="descrpErrors"
                                            @input="$v.edit.descrp.$touch()"
                                            @blur="$v.edit.descrp.$touch()"
                                            required>
                                        </v-text-field>
                                        <v-select label="Size"
                                            v-model="edit.size"
                                            :items="sizes"
                                            :error-messages="sizeErrors"
                                            required
                                            @change="$v.edit.size.$touch()"
                                            @blur="$v.edit.size.$touch()"
                                        ></v-select>
                                        <v-text-field label="Price" 
                                            min="1"
                                            type="number"
                                            v-model = "edit.price" 
                                            prefix="₱" 
                                            :error-messages="priceErrors"
                                            @input="$v.edit.price.$touch()"
                                            @blur="$v.edit.price.$touch()"
                                            required>
                                        </v-text-field>
                                        <v-text-field label="Quantity" 
                                            min="0"
                                            type="number"
                                            v-model = "edit.qty" 
                                            :error-messages="qtyErrors"
                                            @input="$v.edit.qty.$touch()"
                                            @blur="$v.edit.qty.$touch()"
                                            required>
                                        </v-text-field>
                                    </v-card-text>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </template>

                    <!-- Small dialog footer -->
                    <template v-if="!isMobile">
                        <v-divider></v-divider>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="onClose">Close</v-btn>
                        <v-btn type="submit" color="blue darken-1" flat :loading="loading">Save</v-btn>
                        </v-card-actions>
                    </template>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, numeric, minValue } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        validations: {
            edit: {
                descrp: { required },
                price:  { required, numeric, minValue: minValue(1) },
                qty:    { required, numeric },
                size:   { required }
            }
        },
        data: () => ({
            products: null,
            dialog: false,
            isMobile: false,
            customTransition: '',
            loading: false,
            sizes: [
                'XXS',
                'XS',
                'S',
                'M',
                'L',
                'XL',
                'XXL'
            ],
            edit: {
                id: '',
                descrp: '',
                size: '',
                price: 0,
                qty: 0
            }
        }),
        methods: {
            setDialogTransition () {
                if (this.isMobile) {
                    this.customTransition = 'dialog-bottom-transition'
                } else {
                    this.customTransition = 'dialog-transition'
                }
            },
            onUpdateProducts(id, descrp, size, price, qty) {
                this.edit.id = id
                this.edit.descrp = descrp
                this.edit.size = size
                this.edit.price = price
                this.edit.qty = qty

                this.dialog = true
            },
            onClose() {
                this.dialog = false
            },
            onSaveChanges() {
                this.$v.$touch()
                if (!this.$v.$invalid && this.loading != true) {
                    // this.loading = true
                }
            }
        },
        computed: {
            getScreenSizeChange() {
                return this.$vuetify.breakpoint.smAndDown
            },
            getProducts() {
                return this.$store.getters['products/getProducts']
            },
            descrpErrors () {
                const errors = []
                if (!this.$v.edit.descrp.$dirty) return errors
                !this.$v.edit.descrp.required && errors.push('Description is required.')
                return errors
            },
            priceErrors () {
                const errors = []
                if (!this.$v.edit.price.$dirty) return errors
                !this.$v.edit.price.required && errors.push('Price is required.')
                !this.$v.edit.price.numeric && errors.push('Price must be a numeric value.')
                !this.$v.edit.price.minValue && errors.push('Price must be greater than 0.')
                return errors
            },
            qtyErrors () {
                const errors = []
                if (!this.$v.edit.qty.$dirty) return errors
                !this.$v.edit.qty.required && errors.push('Quantity is required.')
                !this.$v.edit.qty.numeric && errors.push('Quantity must be a numeric value.')
                return errors
            },
            sizeErrors () {
                const errors = []
                if (!this.$v.edit.size.$dirty) return errors
                !this.$v.edit.size.required && errors.push('Size is required.')
                return errors
            }
        },
        watch: {
            getScreenSizeChange(val) {
                this.isMobile = val
            },
            isMobile() {
                this.setDialogTransition()
            },
            getProducts(val) {
                if (val !== null && val !== undefined) this.products = val
            }
        },
        created() {
            this.isMobile = this.$vuetify.breakpoint.smAndDown
            this.setDialogTransition()
            this.products = this.$store.getters['products/getProducts']
        }
    }
</script>
