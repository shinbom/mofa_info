import Vue from  'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        selectedIndex : 0,
        modalStatus : false,
        modalContent : Object
    },
    mutations : {
        activeModal (state, payload) {
            state.modalStatus = true;
            state.selectedIndex = payload.selectedIndex; 
            state.modalContent = payload.contents;
        },
        closeModal () {
            this.state.modalStatus = false;
        }
    }
})
