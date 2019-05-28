import firebase from 'firebase'

export default {
    namespaced: true,
    state: {

    },
    mutations: {

    },
    actions: {
        fetchDailySales(context, date) {
            console.log(date)

            let start = new Date(date);
            let end = new Date(date);

            end.setDate(end.getDate() + 1);

            firebase.firestore().collection('transactions')
            .where('dateTrans', '>', start)
            .where('dateTrans', '<', end)
            .onSnapshot( querySnapshot => {

                querySnapshot.forEach( doc => {
                    console.log(doc.data().descrp)
                });

            })
        }
    },
    getters: {

    }
}