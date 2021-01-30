const state = {
    SN: ''
}

const mutations = {
    SET_ENV_SN: (state, SN) => {
        state.SN = SN
    },
}

const actions = {
    setEnvSN({ commit }, SN) {
        commit('SET_ENV_SN', SN)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

