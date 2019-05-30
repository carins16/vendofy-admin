import firebase from 'firebase'

export default {
    namespaced: true,
    state: {
        vendingMachine: null,
        alarm: null,
        lock: null
    },
    mutations: {
        setVendingMachine(state, payload) {
            state.vendingMachine = payload
        },
        setAlarm(state, payload) {
            state.alarm = payload
        },
        setLock(state, status) {
            state.lock = status
        }
    },
    actions: {
        vendingMachineConnection({commit}) {
            firebase.database().ref('vm').on('value', snapshot => {
                commit('setVendingMachine', snapshot.val())
            })
        },
        alarmAndLockStatus({commit}){
            this.unsubscribeAlarmLock = firebase.firestore().collection('config').doc('DYoThSRAElmX50fQI6jB')
            .onSnapshot( doc => {
                if (doc.data().lastAlarm !== null && doc.data().lastAlarm !== undefined) {
                    commit('setAlarm', {
                        status: doc.data().alarm,
                        lastAlarm: doc.data().lastAlarm
                    })
                }
                commit('setLock', doc.data().lock)
            })
        },
        turnOFFAlarm(context, status) {
            firebase.firestore().collection('config').doc('DYoThSRAElmX50fQI6jB').update({
                alarm: status,
                lastAlarm: firebase.firestore.FieldValue.serverTimestamp()
            }).then(function() {
                console.log("Alarm successfully turn off!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating alarm: ", error);
            })
        },
        turnLock(context, status) {
            firebase.firestore().collection('config').doc('DYoThSRAElmX50fQI6jB').update({
                lock: status
            }).then(function() {
                console.log("Lock successfully switch");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating alarm: ", error);
            })
        }
    },
    getters: {
        getVendingMachine: state => {
            return state.vendingMachine
        },
        getAlarm: state => {
            return state.alarm
        },
        getLock: state => {
            return state.lock
        }
    }
}