import httpClient from './httpClient'

/**
 * 
 * @param {*} parm 
 */
const queryDeviceDropDownBox = (projectId,companyId) => {
    return httpClient.get(`wisdomScreen/elevator/wsElevator/queryDeviceDropDownBox?projectId=${projectId}&companyId=${companyId}`);
}
const queryElevatorEquipment = (managerId) => {
    return httpClient.get(`wisdomScreen/elevator/wsElevator/queryElevatorEquipment?managerId=${managerId}`);
}
const driverInformation = (equipmentNo) => {
    return httpClient.get(`wisdomScreen/elevator/wsElevator/driverInformation?equipmentNo=${equipmentNo}`);
}

const todayViolationsStatistics = (equipmentNo) => {
    return httpClient.get(`wisdomScreen/elevator/wsElevator/todayViolationsStatistics?equipmentNo=${equipmentNo}`);
}

const realTimeInformation = (equipmentNo) => {
    return httpClient.get(`wisdomScreen/elevator/wsElevator/realTimeInformation?equipmentNo=${equipmentNo}`);
}
// 设备分析
const equipmentStatusAnalysis = (equipmentNo,frequency) => {
    return httpClient.get(`wisdomScreen/elevator/wsElevator/equipmentStatusAnalysis?equipmentNo=${equipmentNo}&frequency=${frequency}`);
}
// 工作循环
const hoistingCycle = (equipmentNo,queryType) => {
    return httpClient.get(`wisdomScreen/elevator/wsElevator/hoistingCycle?equipmentNo=${equipmentNo}&queryType=${queryType}`);
}
export default {
    queryDeviceDropDownBox,
    queryElevatorEquipment,
    driverInformation,
    todayViolationsStatistics,
    realTimeInformation,
    equipmentStatusAnalysis,
    hoistingCycle
}
