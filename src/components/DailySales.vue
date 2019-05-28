<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="date"
                        label="Select a Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable :reactive="false">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="onDateSelected">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            modal: false
        }),
        methods: {
            onDateSelected() {
                this.$refs.dialog.save(this.date)
                this.$store.dispatch('sales/fetchDailySales', this.date)
            }
        },
        created() {
            console.log(this.date)
        }
    }
</script>
