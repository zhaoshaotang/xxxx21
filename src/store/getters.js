const getters = {
    washSN: state => state.washCar.SN,
    envSN: state => state.environment.SN,
    unloadSN: state => state.unloading.SN,
}
export default getters
