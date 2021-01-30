const state = {
    SN: ''
}

const mutations = {
    SET_UNLOAD_SN: (state, SN) => {
        state.SN = SN
    },
}

const actions = {
    setUnloadSN({ commit }, SN) {
        commit('SET_UNLOAD_SN', SN)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

