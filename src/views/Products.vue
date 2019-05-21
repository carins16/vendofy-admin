<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 md6 lg3 xl3 pa-3 v-for="(product, index) in products" :key="index">
            <v-card>
                <v-img aspect-ratio="1.0" :src="product.pic">
                    <template v-slot:placeholder>
                        <v-layout fill-height align-center justify-center ma-0 >
                            <v-progress-circular size="100" width="20" indeterminate color="grey"></v-progress-circular>
                        </v-layout>
                    </template>
                </v-img>
                <v-card-text>
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
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data: () => ({
            products: null
        }),
        computed: {
            getProducts() {
                return this.$store.getters['products/getProducts']
            }
        },
        watch: {
            getProducts(val) {
                if (val !== null && val !== undefined) this.products = val
            }
        },
        created() {
            this.products = this.$store.getters['products/getProducts']
        }
    }
</script>
