<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 sm6 lg6>
                <mini-statistic
                icon="insert_chart_outlined"
                :title="'₱ '+ Number(getTotalOverallSales).toLocaleString()"
                sub-title="Overall Sales"
                color="red">
                </mini-statistic>
            </v-flex>
            <v-flex xs12 sm6 lg6>
                <mini-statistic
                icon="group"
                :title="Number(getCustomersCount).toLocaleString()"
                sub-title="Registered Customers"
                color="blue">
                </mini-statistic>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <!-- Vending Machine -->
            <v-flex xs12 sm12 md4 lg4 pa-2>
                <v-widget iconName="tablet_android" iconColor="green" title="Vending Machine">
                    <div slot="widget-content" style="height:200px">
                        <div class="text-xs-center">
                            <template v-if="vendingMachine != null">
                                <template v-if="vendingMachine.connection">
                                    <v-icon color="green" size="80">cast_connected</v-icon>
                                    <div class="title mt-3">Status: Online</div>
                                    <div class="subheading font-weight-regular mt-2">
                                        (Connected to Google Firebase)
                                    </div>
                                </template>
                                <template v-else>
                                    <v-icon color="grey" size="80">cast_connected</v-icon>
                                    <div class="title mt-2">Status: Offline</div>
                                    <div class="subheading font-weight-regular mt-2">
                                        (Last Online: {{ vendingMachine.lastOnline | moment("from", "now", true) }} ago)
                                    </div>
                                </template>
                            </template>
                            <template v-else>
                                <div class="text-xs-center py-4">
                                    <v-progress-circular :size="100" width="10" color="green" indeterminate></v-progress-circular>
                                </div>
                            </template>
                        </div>
                    </div>
                </v-widget>            
            </v-flex>
            <v-flex xs12 sm6 md4 lg4 pa-2 >
                <v-widget iconName="error" iconColor="orange" title="Security Alarm">
                    <div slot="widget-content" style="height:200px">
                        <div class="text-xs-center">
                            <template v-if="getAlarm != null">
                                <template v-if="getAlarm.status">
                                    <v-icon color="orange" size="80">warning</v-icon>
                                    <div class="title mt-2 mb-1">Status: Alarm ON</div>
                                    <div class="subheading font-weight-regular mt-2">
                                        (Alarm was on {{ getAlarm.lastAlarm.seconds | moment("from", "now", true) }} ago)
                                    </div>
                                    <v-btn color="red" round dark @click="turnOFFAlarm">
                                        Turn OFF
                                    </v-btn>
                                </template>
                                <template v-else>
                                    <v-icon color="grey" size="80">warning</v-icon>
                                    <div class="title mt-2 mb-1">Status: Alarm OFF</div>
                                    <div class="subheading font-weight-regular mt-2">
                                        (Alarm was off {{ getAlarm.lastAlarm.seconds | moment("from", "now", true) }} ago)
                                    </div>
                                </template>
                            </template>
                            <template v-else>
                                <div class="text-xs-center py-4">
                                    <v-progress-circular :size="100" width="10" color="deep-orange" indeterminate></v-progress-circular>
                                </div>
                            </template>
                        </div>
                    </div>
                </v-widget>            
            </v-flex>
            <v-flex xs12 sm6 md4 lg4 pa-2>
                <v-widget iconName="settings" iconColor="grey" title="Settings">
                    <div slot="widget-content" style="height:200px">
                        <div class="text-xs-center">
                            <template v-if="getLock != null">
                                <template v-if="getLock">
                                    <v-icon color="blue" size="80">lock</v-icon>
                                    <div class="title mt-2 mb-1">Status: Locked</div>
                                    <v-btn color="blue" outline round dark @click="turnLock(false)">
                                        Unlock
                                    </v-btn>
                                </template>
                                <template v-else>
                                    <v-icon color="blue" size="80">lock_open</v-icon>
                                    <div class="title mt-2 mb-1">Status: Unlock</div>
                                    <v-btn color="blue" round dark @click="turnLock(true)">
                                        Lock
                                    </v-btn>
                                </template>
                            </template>
                            <template v-else>
                                <div class="text-xs-center py-4">
                                    <v-progress-circular :size="100" width="10" color="blue" indeterminate></v-progress-circular>
                                </div>
                            </template>
                        </div>
                    </div>
                </v-widget>            
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import MiniStatistic from '@/components/MiniStatistic'
    import VWidget from '@/components/VWidget'

    export default {
        components: {
            MiniStatistic, VWidget
        },
        data: () => ({
            vendingMachine: null
        }),
        methods: {
            turnOFFAlarm() {
                this.$store.dispatch('config/turnOFFAlarm', false)
            },
            turnLock(status) {
                this.$store.dispatch('config/turnLock', status)
            }
        },
        computed: {
            getTotalOverallSales() {
                return this.$store.getters['sales/getTotalOverallSales']
            },
            getCustomersCount() {
                var customers = this.$store.getters['customers/getCustomers']
                return (customers != null) ? customers.length : 0
            },
            getVendingMachine() {
                return this.$store.getters['config/getVendingMachine']
            },
            getAlarm() {
                return this.$store.getters['config/getAlarm']
            },
            getLock() {
                return this.$store.getters['config/getLock']
            }
        },
        watch: {
            getVendingMachine(val) {
                if (val !== null && val !== undefined) {
                    this.vendingMachine = val
                }
            }
        },
        created() {
            this.vendingMachine = this.$store.getters['config/getVendingMachine']
        }
    }
</script>

