import Vue from  'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        selectedIndex : 0,
        modalStatus : false,
    },
    mutations : {
        activeModal () {
            this.state.modalStatus = true;
        },
        closeModal () {
            this.state.modalStatus = false;
        }
    }
})
