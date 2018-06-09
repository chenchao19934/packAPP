import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        dateNow : '2018-04-09',
        pageNow : 1
    },
    getters: {
		dateNow: state => state.dateNow,
		pageNow: state => state.pageNow
	},
    actions : {

    },
    mutations : {
        setDate : (state,b)=> {
            state.dateNow = b;
        },
        setPage : (state,b) => {
            state.pageNow = b;
        }
    }
})

export default store;