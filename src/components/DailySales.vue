<template>
<div>
    <template>
        <v-layout row wrap class="pt-4 pl-4 pr-4">
            <v-flex xs12 sm6 md4>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        :value="computedDateFormattedMomentjs"
                        label="Select a Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable color="green">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="onDateSelected">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
        </v-layout>
    </template>
    
    <!-- summary of sales -->
    <template>
        <v-layout column class="pr-4 pb-5">
            <v-flex xs12>
                <template v-if="dailySales != null && dailySales.length > 0">
                    <v-list two-line>
                        <template v-for="(sales, index) in dailySales">
                            <v-list-tile :key="sales.descrp + sales.size + sales.price" avatar ripple>
                                <v-list-tile-avatar>
                                    <v-img :src="sales.pic">
                                        <template v-slot:placeholder>
                                            <v-layout fill-height align-center justify-center ma-0 >
                                                <v-progress-circular size="100" width="20" indeterminate color="grey"></v-progress-circular>
                                            </v-layout>
                                        </template>
                                    </v-img>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <v-layout row>
                                            <v-flex xs10>
                                                <p class="subheading font-weight-regular text-no-wrap text-truncate">
                                                    ({{ sales.size }}) {{ sales.descrp }}
                                                </p>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <span class="subheading font-weight-regular deep-orange--text">
                                            ₱ {{ Number(sales.price).toLocaleString() }}
                                        </span>
                                        <span class="grey--text subheading">
                                            (x{{ sales.qty }})
                                        </span>
                                    </v-list-tile-sub-title>
                                    <v-list-tile-sub-title>
                                        
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>
                                        <span class="pink--text subheading font-weight-regular">
                                            ₱ {{ Number(sales.total).toLocaleString() }}
                                        </span>
                                    </v-list-tile-action-text>
                                    <v-spacer></v-spacer>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider :inset="true" v-if="index + 1 < dailySales.length" :key="index"></v-divider>
                        </template>
                    </v-list>
                    <template>
                        <v-divider inset></v-divider>
                        <v-list-tile avatar>
                            <v-list-tile-avatar></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    <p class="title font-weight-meduim red--text">
                                        Total Daily Sales:
                                    </p>
                                </v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <p class="title font-weight-meduim red--text mt-3">
                                    ₱ {{ Number(getTotalDailySales).toLocaleString() }}
                                </p>
                            </v-list-tile-action>
                        </v-list-tile>
                    </template>
                </template>
                <!-- No purchase history -->
                <template v-else>
                    <div class="text-xs-center py-3 mb-5">
                        <v-icon size="100">info</v-icon>
                        <div class="subheading">No sales on this date.</div>
                    </div>
                </template>
            </v-flex>
        </v-layout>
    </template>
</div>
</template>

<script>
    import moment from 'moment'

    export default {
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            modal: false,
            dailySales: null
        }),
        methods: {
            onDateSelected() {
                this.$refs.dialog.save(this.date)
                this.$store.dispatch('sales/fetchDailySales', this.date)
            }
        },
        computed: {
            getDailySales() {
                return this.$store.getters['sales/getDailySales']
            },
            getTotalDailySales() {
                return this.$store.getters['sales/getTotalDailySales']
            },
            computedDateFormattedMomentjs () {
                return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
            }
        },
        watch: {
            getDailySales(val) {
                if (val !== null && val !== undefined) {
                    this.dailySales = val
                }
            }
        },
        created() {
            // get sales of the current date
            this.$store.dispatch('sales/fetchDailySales', this.date)
        }
    }
</script>
