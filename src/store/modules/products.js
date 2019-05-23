import firebase from 'firebase'

export default {
    namespaced: true,
    state: {
        products: null
    },
    mutations: {
        setProducts (state, payload) {
            state.products = payload
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
        updateProducts({dispatch}, payload) {
            firebase.firestore().collection('products').doc(payload.key).update({
                descrp: payload.descrp,
                pic:    payload.pic,
                price:  payload.price,
                qty:    payload.qty,
                size:   payload.size
            }).then(function() {
                dispatch('showNotify', "Product no. " + payload.id + " successfully updated." , { root: true })
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating product: ", error);
            })
        }
    },
    getters: {
        getProducts: state => {
            return state.products
        }
    }
}