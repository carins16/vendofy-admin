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
        fetchCustomerTransactions(context, custKey) {
            console.log(custKey)
            firebase.firestore().collection('transactions')
            .where('customerKey', '==', custKey)
            .orderBy('dateTrans', 'desc')
            .get()
            .then(querySnapshot => {

                if (querySnapshot.empty) {
                    console.log("empty")
                } else {
                    var customerTransactions = []

                    querySnapshot.forEach(doc => {
                        console.log(doc.data())
                        customerTransactions.push({

                        })
                    })
                }
                
            })
        }
    },
    getters: {
        getCustomers: state => {
            return state.customers
        }
    }
}