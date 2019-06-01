<template>
<div>
    <template>
        <v-layout row wrap class="pt-4 pl-4 pr-4">
            <v-flex xs6>
                <v-select label="Select a Year" v-model="year" :items="years" prepend-icon="event"
                        @change="onYearSelected">
                </v-select>
            </v-flex>
            <v-flex xs6>
                <v-btn color="blue" style="float:right" dark @click="printDialog" >
                    <v-icon>print</v-icon>&nbsp;Print
                </v-btn>
            </v-flex>
        </v-layout>
    </template>
    <!-- summary of sales -->
    <template>
        <div id="printYearly">
            <center v-show="isPrint">
                <h1>Yearly Sales Report</h1>
                <h1>({{ year }})</h1>
            </center>
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
        </div>
    </template>
</div>
</template>

<script>
    export default {
        data: () => ({
            year: 2019,
            modal: false,
            yearlySales: null,
            years: [
                2014,2015,2016,2017,2018,2019,
                2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,
                2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,
                2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050
            ],
            isPrint: false
        }),
        methods: {
            onYearSelected() {
                this.$store.dispatch('sales/fetchYearlySales', this.year)
            },
            printDialog() {
                this.isPrint = true
                setTimeout(() => {
                    this.$htmlToPaper('printYearly');
                    this.isPrint = false
                }, 500);
            }
        },
        computed: {
            getYearlySales() {
                return this.$store.getters['sales/getYearlySales']
            },
            getTotalYearlySales() {
                return this.$store.getters['sales/getTotalYearlySales']
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
