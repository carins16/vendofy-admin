<template>
    <v-container fluid>
        <v-switch
        v-model="switch1"
        label="Lock"
        prepend-icon="event"
        hint="hello"
        color="blue"
        ></v-switch>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            switch1: true
        })
    }
</script>

