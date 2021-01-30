const state = {
    SN: ''
}

const mutations = {
    SET_WASH_SN: (state, SN) => {
        state.SN = SN
    },
}

const actions = {
    setWashSN({ commit }, SN) {
        commit('SET_WASH_SN', SN)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

