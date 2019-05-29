import firebase from 'firebase'

export default {
    namespaced: true,
    state: {
        dailySales: null,
        totalDailySales: 0,
        monthlySales: null,
        totalMonthlySales: 0,
        yearlySales: null,
        totalYearlySales: 0
    },
    mutations: {
        setDailySales (state, payload) {
            state.dailySales = payload
        },
        setTotalDailySales (state, payload) {
            state.totalDailySales = payload
        },
        setMonthlySales (state, payload) {
            state.monthlySales = payload
        },
        setTotalMonthlySales (state, payload) {
            state.totalMonthlySales = payload
        },
        setYearlySales (state, payload) {
            state.yearlySales = payload
        },
        setTotalYearlySales (state, payload) {
            state.totalYearlySales = payload
        }
    },
    actions: {
        fetchDailySales({commit}, date) {
            if (typeof this.unsubscribeDailySales !== "undefined") { 
                // detach previous listener
                this.unsubscribeDailySales()
            }
            // initialize selected date
            var start = new Date(date)
            var end = new Date(date)
            // set day hours from begining to end
            start.setHours(0,0,0,0)
            end.setHours(23,59,59,59)

            // attach new listener for specific date
            this.unsubscribeDailySales = firebase.firestore().collection('transactions')
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
        },
        fetchMonthlySales({commit}, month) {
            if (typeof this.unsubscribeMonthlySales !== "undefined") { 
                // detach previous listener
                this.unsubscribeMonthlySales()
            }

            // initialize selected month
            var date = new Date(month)

            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
            // set day hours from begining to end
            firstDay.setHours(0,0,0,0)
            lastDay.setHours(23,59,59,59)

            // attach new listener for specific month
            this.unsubscribeMonthlySales = firebase.firestore().collection('transactions')
            .where('dateTrans', '>=', firstDay)
            .where('dateTrans', '<=', lastDay)
            .onSnapshot( querySnapshot => {
                var monthlySales = []
                var totalMonthlySales = 0

                querySnapshot.forEach( doc => {
                    // check if all datails of product match
                    var indexFound = monthlySales.findIndex(sales => {
                        return (sales.descrp == doc.data().descrp) && 
                                (sales.size == doc.data().size) &&
                                (sales.price == doc.data().price)
                    })

                    // add product to array if not yet exist
                    if (indexFound < 0) {
                        monthlySales.push({
                            pic:        doc.data().pic,
                            descrp:     doc.data().descrp,
                            size:       doc.data().size,
                            price:      doc.data().price,
                            qty:        1,
                            total:      doc.data().price
                        })
                    } else {
                        // update current product
                        monthlySales[indexFound].qty++
                        monthlySales[indexFound].total = monthlySales[indexFound].price * monthlySales[indexFound].qty
                    }
                    totalMonthlySales += doc.data().price
                })
                commit("setMonthlySales", monthlySales)
                commit("setTotalMonthlySales", totalMonthlySales)
            })
        },
        fetchYearlySales ({commit}, year) {
            if (typeof this.unsubscribeYearlySales !== "undefined") { 
                // detach previous listener
                this.unsubscribeYearlySales()
            }

            // initialize selected year
            var firstMonth = new Date(year)
            var lastMonth = new Date(year, 12, 0)
            firstMonth.setHours(0,0,0,0)
            lastMonth.setHours(23,59,59,59)

            // attach new listener for specific year
            this.unsubscribeYearlySales = firebase.firestore().collection('transactions')
            .where('dateTrans', '>=', firstMonth)
            .where('dateTrans', '<=', lastMonth)
            .onSnapshot( querySnapshot => {
                var yearlySales = []
                var totalYearlySales = 0

                querySnapshot.forEach( doc => {
                    // check if all datails of product match
                    var indexFound = yearlySales.findIndex(sales => {
                        return (sales.descrp == doc.data().descrp) && 
                                (sales.size == doc.data().size) &&
                                (sales.price == doc.data().price)
                    })

                    // add product to array if not yet exist
                    if (indexFound < 0) {
                        yearlySales.push({
                            pic:        doc.data().pic,
                            descrp:     doc.data().descrp,
                            size:       doc.data().size,
                            price:      doc.data().price,
                            qty:        1,
                            total:      doc.data().price
                        })
                    } else {
                        // update current product
                        yearlySales[indexFound].qty++
                        yearlySales[indexFound].total = yearlySales[indexFound].price * yearlySales[indexFound].qty
                    }
                    totalYearlySales += doc.data().price
                })
                commit("setYearlySales", yearlySales)
                commit("setTotalYearlySales", totalYearlySales)
            })
        }
    },
    getters: {
        getDailySales: state => {
            return state.dailySales
        },
        getTotalDailySales: state => {
            return state.totalDailySales
        },
        getMonthlySales: state => {
            return state.monthlySales
        },
        getTotalMonthlySales: state => {
            return state.totalMonthlySales
        },
        getYearlySales: state => {
            return state.yearlySales
        },
        getTotalYearlySales: state => {
            return state.totalYearlySales
        }
    }
}