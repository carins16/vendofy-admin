import firebase from 'firebase'

export default {
    namespaced: true,
    state: {
        dailySales: null,
        totalDailySales: 0
    },
    mutations: {
        setDailySales (state, payload) {
            state.dailySales = payload
        },
        setTotalDailySales (state, payload) {
            state.totalDailySales = payload
        }
    },
    actions: {
        fetchDailySales({commit}, date) {
            if (typeof this.unsubscribeSales !== "undefined") { 
                // detach previous listener
                this.unsubscribeSales()
            }
            // initialize selected date
            var start = new Date(date)
            var end = new Date(date)
            // set day hours from begining to end
            start.setHours(0,0,0,0)
            end.setHours(23,59,59,59)

            // attach new listener for specific date
            this.unsubscribeSales = firebase.firestore().collection('transactions')
            .where('dateTrans', '>=', start)
            .where('dateTrans', '<=', end)
            .onSnapshot( querySnapshot => {
                var dailySales = []
                var totalDailySales = 0

                querySnapshot.forEach( doc => {
                    // check if all datails of product match
                    var indexFound = dailySales.findIndex(sales => {
                        return (sales.descrp == doc.data().descrp) && 
                                (sales.size == doc.data().size) &&
                                (sales.price == doc.data().price)
                    })

                    // add product to array if not yet exist
                    if (indexFound < 0) {
                        dailySales.push({
                            pic:        doc.data().pic,
                            descrp:     doc.data().descrp,
                            size:       doc.data().size,
                            price:      doc.data().price,
                            qty:        1,
                            total:      doc.data().price
                        })
                    } else {
                        // update current product
                        dailySales[indexFound].qty++
                        dailySales[indexFound].total = dailySales[indexFound].price * dailySales[indexFound].qty
                    }
                    totalDailySales += doc.data().price
                })
                commit("setDailySales", dailySales)
                commit("setTotalDailySales", totalDailySales)
            })
        }
    },
    getters: {
        getDailySales: state => {
            return state.dailySales
        },
        getTotalDailySales: state => {
            return state.totalDailySales
        }
    }
}