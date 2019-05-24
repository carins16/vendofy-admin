<template>
    <div>
        <v-layout column>
            <v-flex xs12 ma-2>
                <v-list two-line>
                    <template v-for="(cust, index) in customers">
                        <v-list-tile :key="cust.key" avatar ripple @click="showTransactions(cust.key, cust.name)">
                            <v-list-tile-avatar>
                                <v-img height="36" :src="require('@/assets/default-user.png')">
                                    <template v-slot:placeholder>
                                        <v-layout fill-height align-center justify-center ma-0 >
                                            <v-progress-circular size="100" width="20" indeterminate color="grey"></v-progress-circular>
                                        </v-layout>
                                    </template>
                                </v-img>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title class="mt-1">
                                    <span class="subheading font-weight-medium text-no-wrap text-truncate">
                                        {{ cust.name }}
                                    </span>
                                </v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <span class="subheading font-weight-medium">
                                        Credits:
                                    </span>
                                    <span class="subheading font-weight-regular deep-orange--text">
                                        ₱ {{ Number(cust.credit).toLocaleString() }}
                                    </span>
                                </v-list-tile-sub-title>
                                <v-list-tile-sub-title>
                                    <span class="subheading font-weight-medium">
                                        Date Registered: 
                                    </span>
                                    <span class="subheading font-weight-regular grey--text">
                                        {{ cust.regDate | moment("MMM, DD YYYY") }}
                                    </span>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider v-if="index + 1 < customers.length" :key="index"></v-divider>
                    </template>
                </v-list>
            </v-flex>
        </v-layout>

        <!-- Update dialog -->
        <v-dialog v-model="dialog" persistent :fullscreen="isMobile" :transition="customTransition" max-width="600px">
            <v-card>
                <!-- Fullscreen dialog -->
                <template v-if="isMobile">
                    <v-toolbar dark color="green">
                        <v-btn icon dark @click="onClose">
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ selectedCustomer }}</v-toolbar-title>
                    </v-toolbar>
                </template>
                <!-- Small dialog header -->
                <template v-else>
                    <v-card-title>
                        <span class="title">{{ selectedCustomer }}</span>
                    </v-card-title>
                    <v-divider></v-divider>
                </template>
                <!-- Small dialog footer -->
                <template v-if="!isMobile">
                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="onClose">Close</v-btn>
                    </v-card-actions>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data: () => ({
            customers: null,
            dialog: false,
            isMobile: false,
            customTransition: '',
            selectedCustomer: '',
            customersTransactions: null
        }),
        methods: {
            setDialogTransition () {
                if (this.isMobile) {
                    this.customTransition = 'dialog-bottom-transition'
                } else {
                    this.customTransition = 'dialog-transition'
                }
            },
            showTransactions(key, name) {
                this.$store.dispatch('customers/fetchCustomerTransactions', key)
                this.selectedCustomer = name
                this.dialog = true
            },
            onClose() {
                this.selectedCustomer = ''
                this.customersTransactions = null
                this.dialog = false
            }
        },
        computed: {
            getScreenSizeChange() {
                return this.$vuetify.breakpoint.smAndDown
            },
            getCustomers() {
                return this.$store.getters['customers/getCustomers']
            }
        },
        watch: {
            getScreenSizeChange(val) {
                this.isMobile = val
            },
            isMobile() {
                this.setDialogTransition()
            },
            getCustomers(val) {
                if (val !== null && val !== undefined) {
                    this.customers = val
                }
            }
        },
        created() {
            this.isMobile = this.$vuetify.breakpoint.smAndDown
            this.setDialogTransition()
            this.customers = this.$store.getters['customers/getCustomers']
        }
    }
</script>

