<template>
<div>
    <template>
        <v-layout row wrap class="pt-4 pl-4 pr-4">
            <v-flex xs12 sm6 md4>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="year" persistent lazy full-width width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        :value="computedDateFormattedMomentjs"
                        label="Select a Year"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="year" type="year" scrollable color="green">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="onYearSelected">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
        </v-layout>
    </template>
    <!-- summary of sales -->
    <template>
        <v-layout column class="pr-4 pb-5">
            <v-flex xs12>
                <template v-if="yearlySales != null && yearlySales.length > 0">
                    <v-list two-line>
                        <template v-for="(sales, index) in yearlySales">
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
                                            ₱ {{ sales.price }}
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
                                            ₱ {{ sales.total }}
                                        </span>
                                    </v-list-tile-action-text>
                                    <v-spacer></v-spacer>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider :inset="true" v-if="index + 1 < yearlySales.length" :key="index"></v-divider>
                        </template>
                    </v-list>
                    <template>
                        <v-divider inset></v-divider>
                        <v-list-tile avatar>
                            <v-list-tile-avatar></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    <p class="title font-weight-meduim red--text">
                                        Total Yearly Sales:
                                    </p>
                                </v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <p class="title font-weight-meduim red--text mt-3">
                                    ₱ {{ Number(getTotalYearlySales).toLocaleString() }}
                                </p>
                            </v-list-tile-action>
                        </v-list-tile>
                    </template>
                </template>
                <!-- No purchase history -->
                <template v-else>
                    <div class="text-xs-center py-3 mb-5">
                        <v-icon size="100">info</v-icon>
                        <div class="subheading">No sales on this year.</div>
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
            year: new Date().toISOString().substr(0, 4),
            modal: false,
            yearlySales: null
        }),
        methods: {
            onYearSelected() {
                this.$refs.dialog.save(this.year)
                this.$store.dispatch('sales/fetchYearlySales', this.year)
            }
        },
        computed: {
            getYearlySales() {
                return this.$store.getters['sales/getYearlySales']
            },
            getTotalYearlySales() {
                return this.$store.getters['sales/getTotalYearlySales']
            },
            computedDateFormattedMomentjs () {
                return this.year ? moment(this.year).format('YYYY') : ''
            }
        },
        watch: {
            getYearlySales(val) {
                if (val !== null && val !== undefined) {
                    this.yearlySales = val
                }
            }
        },
        created() {
            // get sales of the current date
            this.$store.dispatch('sales/fetchYearlySales', this.year)
        }
    }
</script>
