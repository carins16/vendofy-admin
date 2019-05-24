import firebase from 'firebase'

export default {
    namespaced: true,
    state: {
        products: null,
        notifyUpdates: null
    },
    mutations: {
        setProducts (state, payload) {
            state.products = payload
        },
        setNotifyUpdates (state, payload) {
            state.notifyUpdates = payload
        }
    },
    actions: {
        fetchProducts({commit}) {
            firebase.firestore().collection('products').orderBy('id', 'asc')
            .onSnapshot( querySnapshot => {

                var products = [];

                querySnapshot.forEach( doc => {
                    products.push({
                        key:    doc.id,
                        id:     doc.data().id,
                        descrp: doc.data().descrp,
                        size:   doc.data().size,
                        price:  doc.data().price,
                        qty:    doc.data().qty,
                        pic:    doc.data().pic
                    })
                });

                commit('setProducts', products)
            });
        },
        updateProducts({commit}, payload) {
            firebase.firestore().collection('products').doc(payload.key).update({
                descrp: payload.descrp,
                pic:    payload.pic,
                price:  payload.price,
                qty:    payload.qty,
                size:   payload.size
            }).then(function() {
                commit('setNotifyUpdates', { 
                    color: 'info', 
                    msg: 'Product no. ' + payload.id + ' successfully updated.'
                })
            })
            .catch(function(error) {
                console.error("Error updating product: ", error);
                commit('setNotifyUpdates', { 
                    color: 'error', 
                    msg: 'Error updating product no. ' + payload.id
                })
            })
        }
    },
    getters: {
        getProducts: state => {
            return state.products
        },
        getNotifyUpdates: state => {
            return state.notifyUpdates
        }
    }
}