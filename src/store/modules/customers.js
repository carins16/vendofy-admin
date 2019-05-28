import firebase from 'firebase'

export default {
    namespaced: true,
    state: {
        customers: null,
        customerTransactions: null
    },
    mutations: {
        setCustomers (state, payload) {
            state.customers = payload
        },
        setCustomerTransactions (state, payload) {
            state.customerTransactions = payload
        }
    },
    actions: {
        fetchCustomers({commit}) {
            firebase.firestore().collection('customers').orderBy('fid', 'asc')
            .onSnapshot( querySnapshot => {

                var customers = []

                querySnapshot.forEach( doc => {
                    customers.push({
                        key:        doc.id,
                        fid:        doc.data().fid,
                        name:       doc.data().name,
                        credit:     doc.data().credit,
                        regDate:    doc.data().regDate.seconds
                    })
                });

                commit('setCustomers', customers)
            });
        },
        fetchCustomerTransactions({commit}, custKey) {

            this.unsubscribeCustomerTransactions = firebase.firestore()
            .collection('transactions')
            .where('customerKey', '==', custKey)
            .orderBy('dateTrans', 'desc')
            .onSnapshot( querySnapshot => {

                if (querySnapshot.empty) {
                    commit('setCustomerTransactions', null)
                } else {
                    var customerTransactions = []

                    querySnapshot.forEach(doc => {
                        customerTransactions.push({
                            key:            doc.id,
                            customerKey:    doc.data().customerKey,
                            dateTrans:      doc.data().dateTrans.seconds,
                            prodKey:        doc.data().prodKey,
                            descrp:         doc.data().descrp,
                            size:           doc.data().size,
                            pic:            doc.data().pic,
                            price:          doc.data().price
                        })
                    })

                    commit('setCustomerTransactions', customerTransactions)
                }
                
            })
        },
        onCloseCustomerTransactions({commit}) {
            commit('setCustomerTransactions', null)
            // detach customer transaction listener
            this.unsubscribeCustomerTransactions()
        }
    },
    getters: {
        getCustomers: state => {
            return state.customers
        },
        getCustomerTransactions: state => {
            return state.customerTransactions
        }
    }
}