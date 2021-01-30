/**
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import Vue from 'vue'
import Test from './test/'
import PieOne from './home/pieone/'
import PieTwo from './home/pietwo/'
import PieThree from './home/piethree/'
import Custeom from './custeom/'
import Dateprogress from './home/dateprogress/'
import Jlswiper from './home/jlswiper/'
import Jlbar from './jlbar/'
import JlbarTwo from './home/jlbartwo/'
import Indexpieangl from './home/indexpieangl/'
import Indexminppt from './home/indexminppt/'
import Jobtrends from './labour/jobtrends/'
import Builder from './labour/builder/'
import Approach from './labour/approach/'
import Subcontract from './labour/subcontract/'
import Species from './labour/species'
import Attendance from './labour/attendance/'
import construction from './elevator/construction/'
import hoisting from './elevator/hoisting/'
import lift from './elevator/lift/'
import statistics from './elevator/statistics/'
import effect from './towercrane/effect'
import happening from './towercrane/happening'
import leaderboard from './towercrane/leaderboard'
import Tower from './towercrane/tower'
import load from './unloading/load'
import loadpercentage from './unloading/loadpercentage'
import historicalload from './unloading/historicalload'
import unloadingplatform from './unloading/unloadingplatform'
import electricitystatistics from './unloading/electricitystatistics'
//洗车
import WashDevice from './washcar/washdevice'
import WashRecord from './washcar/washrecord'
import WashAlarmRecord from './washcar/washalarmrecord'
import WashVideo from './washcar/washvideo'
import WashCount from './washcar/washcount'
//用电
import ElectAlarm from './electric/electalarm'
import ElectArea from './electric/electarea'
import ElectTrend from './electric/electtrend'
import ElectEnv from './electric/electenv'
import ElectHistory from './electric/electhistory'
//扬尘
import EnvDevice from './environment/envdevice'
import EnvVideo from './environment/envvideo'
import EnvAQI from './environment/envaqi'
import EnvDayAir from './environment/envdayair'
import EnvDayData from './environment/envdaydata'
import EnvAirHistory from './environment/envairhistory'
import EnvWindHistory from './environment/envwindhistory'
import EnvNoiseHistory from './environment/envnoisehistory'
import EnvTempHistory from './environment/envtemphistory'
// 视频直播
import videodemo from './videodemo'

const list = [
  videodemo,
  lift,
  electricitystatistics,
  unloadingplatform,
  historicalload,
  loadpercentage,
  load,
  Tower,
  leaderboard,
  happening,
  effect,
  statistics,
  hoisting,
  construction,
  Attendance,
  Species,
  Subcontract,
  Approach,
  Builder,
  Jobtrends,
  Test,
  PieOne,
  PieTwo,
  PieThree,
  Custeom,
  Dateprogress,
  Jlswiper,
  Jlbar,
  JlbarTwo,
  Indexpieangl,
  Indexminppt,
  // 洗车
  WashDevice,
  WashRecord,
  WashAlarmRecord,
  WashVideo,
  WashCount,
 //用电
  ElectAlarm,
  ElectArea,
  ElectTrend,
  ElectEnv,
  ElectHistory,
  //扬尘
  EnvDevice,
  EnvVideo,
  EnvAQI,
  EnvDayAir,
  EnvDayData,
  EnvAirHistory,
  EnvWindHistory,
  EnvNoiseHistory,
  EnvTempHistory,
]
//循环注册组件
list.forEach(ele => {
  Vue.component(`avue-echart-${ele.name}`, ele)
})
