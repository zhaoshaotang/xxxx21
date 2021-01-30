//基础公共url
var baseUrl = '.'
//基础组件库
export default [
	{
		"label": '图表',
		"icon": 'icon-bar',
		"children": [
			{
				"label": '通用型',
				"option": {
					"name": "通用型",
					"title": "通用型",
					"icon": require('@/assets/text5.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"url": baseUrl + "/bar",
					"time": 5000,
					"echartFormatter": "(data)=>{\nconsole.log(data);\nreturn {\n            title: {\n\t\t\t\t textStyle: {\n\t\t\t\t\tfontWeight: 'normal',      \n\t\t\t\t\tcolor: '#fff'\n\t\t\t\t},\n                text: 'ECharts 入门示例'\n            },\n            tooltip: {},\n            legend: {\n                data:['销量'],\n\t\t\t\ttextStyle: {\n\t\t\t\t\tfontWeight: 'normal',      \n\t\t\t\t\tcolor: '#fff'\n\t\t\t\t},\n            },\n            xAxis: {\n                data: [\"衬衫\",\"羊毛衫\",\"雪纺衫\",\"裤子\",\"高跟鞋\",\"袜子\"]\n            },\n            yAxis: {},\n            series: [{\n                name: '销量',\n                type: 'bar',\n                data: [5, 20, 36, 10, 10, 20]\n            }]\n        };\n}",
					"data": {
						"categories": [
							"苹果",
							"三星",
							"小米",
							"oppo",
							"vivo"
						],
						"series": [{
							"name": "手机品牌",
							"data": [
								1000879,
								3400879,
								2300879,
								5400879,
								3400879
							]
						}]
					},
					"component": {
						"width": 600,
						"height": 300,
						"name": "common",
						"prop": "common",
					},
				}
			},
			//扬尘
			{
				label: '环境设备列表',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "环境设备列表",
					"title": "环境设备列表",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 256,
						"name": "EnvDevice",
						"prop": "EnvDevice",
					},
					"option": {}
				}
			},
			{
				label: '环境监控视频',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "环境监控视频",
					"title": "环境监控视频",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 266,
						"name": "EnvVideo",
						"prop": "EnvVideo",
					},
					"option": {}
				}
			},
			{
				label: '环境AQI',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "环境AQI",
					"title": "环境AQI",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 923,
						"height": 535,
						"name": "EnvAQI",
						"prop": "EnvAQI",
					},
					"option": {}
				}
			},
			{
				label: '24小时空气质量分析',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "24小时空气质量分析",
					"title": "24小时空气质量分析",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 256,
						"name": "EnvDayAir",
						"prop": "EnvDayAir",
					},
					"option": {}
				}
			},
			{
				label: '环境24小时数据分析',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "24小时数据分析",
					"title": "24小时数据分析",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 240,
						"name": "EnvDayData",
						"prop": "EnvDayData",
					},
					"option": {}
				}
			},
			{
				label: '历史空气质量趋势',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "历史空气质量趋势",
					"title": "历史空气质量趋势",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 285,
						"name": "EnvAirHistory",
						"prop": "EnvAirHistory",
					},
					"option": {}
				}
			},
			{
				label: '历史风速趋势',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "历史风速趋势",
					"title": "历史风速趋势",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 285,
						"name": "EnvWindHistory",
						"prop": "EnvWindHistory",
					},
					"option": {}
				}
			},
			{
				label: '历史噪音数据',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "历史噪音数据",
					"title": "历史噪音数据",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 285,
						"name": "EnvNoiseHistory",
						"prop": "EnvNoiseHistory",
					},
					"option": {}
				}
			},
			{
				label: '历史温、湿度趋势',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "历史温、湿度趋势",
					"title": "历史温、湿度趋势",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 285,
						"name": "EnvTempHistory",
						"prop": "EnvTempHistory",
					},
					"option": {}
				}
			},
			//用电
			{
				label: '用电报警统计',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "用电报警统计(近一个月)",
					"title": "用电报警统计(近一个月)",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 430,
						"name": "ElectAlarm",
						"prop": "ElectAlarm",
					},
					"option": {}
				}
			},
			{
				label: '用电量分区统计',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "用电量分区统计",
					"title": "用电量分区统计",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 430,
						"name": "ElectArea",
						"prop": "ElectArea",
					},
					"option": {}
				}
			},
			{
				label: '用电温度及颗粒',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "温度及颗粒物浓度监控",
					"title": "温度及颗粒物浓度监控",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 931,
						"height": 430,
						"name": "ElectEnv",
						"prop": "ElectEnv",
					},
					"option": {}
				}
			},
			{
				label: '用电趋势',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "24小时用电趋势",
					"title": "24小时用电趋势",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 930,
						"height": 362,
						"name": "ElectTrend",
						"prop": "ElectTrend",
					},
					"option": {}
				}
			},
			{
				label: '用电历史',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "历史用电分析",
					"title": "历史用电分析",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 930,
						"height": 362,
						"name": "ElectHistory",
						"prop": "ElectHistory",
					},
					"option": {}
				}
			},
			//洗车
			{
				label: '设备列表',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "设备列表",
					"title": "设备列表",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 430,
						"name": "WashDevice",
						"prop": "WashDevice",
					},
					"option": {}
				}
			},
			{
				label: '当天洗车记录统计',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "当天洗车记录统计",
					"title": "当天洗车记录统计",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 430,
						"name": "WashRecord",
						"prop": "WashRecord",
					},
					"option": {}
				}
			},
			{
				label: '当天洗车台报警记录',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "当天洗车台报警记录",
					"title": "当天洗车台报警记录",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 931,
						"height": 430,
						"name": "WashAlarmRecord",
						"prop": "WashAlarmRecord",
					},
					"option": {}
				}
			},
			{
				label: '洗车监控',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "洗车监控",
					"title": "洗车监控",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 362,
						"name": "WashVideo",
						"prop": "WashVideo",
					},
					"option": {}
				}
			},
			{
				label: '近期洗车统计',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "近期洗车统计",
					"title": "近期洗车统计",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 1408,
						"height": 362,
						"name": "WashCount",
						"prop": "WashCount",
					},
					"option": {}
				}
			},
			//卸料
			{
				label: '卸料载重统计',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "卸料载重统计",
					"title": "卸料载重统计",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 256,
						"name": "load",
						"prop": "load",
					},
					"option": {}
				}
			},
			{
				label: '卸料电量统计',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "卸料电量统计",
					"title": "卸料电量统计",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 285,
						"name": "electricitystatistics",
						"prop": "electricitystatistics",
					},
					"option": {}
				}
			},
			{
				label: '卸料平台',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "卸料平台",
					"title": "卸料平台",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"info": true,
					"infoSize": 50,
					"infoLineHeight": 50,
					"component": {
						"width": 1405,
						"height": 535,
						"name": "unloadingplatform",
						"prop": "unloadingplatform",
					},
					"option": {}
				}
			},
			{
				label: '卸料载重百分比',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "卸料载重百分比",
					"title": "卸料载重百分比",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 240,
						"name": "loadpercentage",
						"prop": "loadpercentage",
					},
					"option": {}
				}
			},
			{
				label: '卸料历史载重',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "卸料历史载重",
					"title": "卸料历史载重",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 1403,
						"height": 285,
						"name": "historicalload",
						"prop": "historicalload",
					},
					"option": {}
				}
			},
			//塔吊监测
			{
				label: '吊装排行榜',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "吊装排行榜",
					"title": "吊装排行榜",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 286,
						"name": "leaderboard",
						"prop": "leaderboard",
					},
					"option": {}
				}
			},
			{
				label: '塔吊2',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "塔吊2",
					"title": "塔吊2",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 1408,
						"height": 866,
						"name": "tower",
						"prop": "tower",
					},
					"option": {}
				}
			},
			{
				label: '塔吊功效',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "塔吊功效",
					"title": "塔吊功效",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 289,
						"name": "effect",
						"prop": "effect",
					},
					"option": {}
				}
			},
			{
				label: '今日塔机工作情况',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "今日塔机工作情况",
					"title": "今日塔机工作情况",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 289,
						"name": "happening",
						"prop": "happening",
					},
					"option": {}
				}
			},
			{
				label: '视频直播',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "视频直播",
					"title": "视频直播",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 1880,
						"height": 896,
						"name": "videodemo",
						"prop": "videodemo",
					},
					"option": {}
				}
			},
			// 劳务组件
			{
				label: '人员进出场实况',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "人员进出场实况",
					"title": "人员进出场实况",
					"icon": require('@/assets/approach.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 255.6,
						"name": "approach",
						"prop": "approach",
					},
					"option": {}
				}
			},
			{
				label: '按分包单位分析',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "按分包单位分析",
					"title": "按分包单位分析",
					"icon": require('@/assets/subcontract.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 285,
						"name": "subcontract",
						"prop": "subcontract",
					},
					"option": {}
				}
			},
			{
				label: '按工种分析',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "按工种分析",
					"title": "按工种分析",
					"icon": require('@/assets/species.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 239.5,
						"name": "species",
						"prop": "species",
					},
					"option": {}
				}
			},
			{
				label: '建筑工人分析Top10',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "建筑工人分析Top10",
					"title": "建筑工人分析Top10",
					"icon": require('@/assets/builder.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 456,
						"height": 285,
						"name": "builder",
						"prop": "builder",
					},
					"option": {}
				}
			},
			{
				label: '出勤分析',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "出勤分析",
					"title": "出勤分析",
					"icon": require('@/assets/attendance.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 932,
						"height": 285,
						"name": "attendance",
						"prop": "attendance",
					},
					"option": {}
				}
			},
			{
				label: '吊装排行榜',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "吊装排行榜",
					"title": "吊装排行榜",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 286,
						"name": "leaderboard",
						"prop": "leaderboard",
					},
					"option": {}
				}
			},
			{
				label: '塔吊1',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "塔吊1",
					"title": "塔吊1",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 1408,
						"height": 890,
						"name": "tower",
						"prop": "tower",
					},
					"option": {}
				}
			},
			{
				label: '塔吊功效',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "塔吊功效",
					"title": "塔吊功效",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 289,
						"name": "effect",
						"prop": "effect",
					},
					"option": {}
				}
			},
			{
				label: '今日塔机工作情况',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "今日塔机工作情况",
					"title": "今日塔机工作情况",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 289,
						"name": "happening",
						"prop": "happening",
					},
					"option": {}
				}
			},
			{
				"label": 'laowu',
				"option": {
					"domId": null,
					"typeOption": "cus",
					"name": "劳务管理",
					"title": "劳务管理",
					"icon": require('@/assets/jobtrends.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"data": {
						"categories": [
							"苹果",
							"三星",
							"小米",
							"oppo",
							"vivo"
						],
						"series": [{
							"name": "手机品牌",
							"data": [
								1000879,
								3400879,
								2300879,
								5400879,
								3400879
							]
						}]
					},
					"dataFormatter": "",
					"url": baseUrl + "/bar",
					"time": 5000,
					"component": {
						"width": 1405,
						"height": 535,
						"name": "jobtrends",
						"prop": "jobtrends",
					},
					"option": {
						"gridX": 90,
						"gridY": 0,
						"gridX2": 0,
						"gridY2": 0,
						"legend": true,
						"nameColor": "#eee",
						"lineColor": "#eee",
						"xNameFontSize": 16,
						"yNameFontSize": 16,
						"labelShow": true,
						"labelShowColor": '#fff',
						"labelShowFontSize": 14,
						"labelShowFontWeight": 300,
						"yAxisInverse": false,
						"xAxisInverse": false,
						"xAxisShow": true,
						"yAxisShow": true,
						"xAxisSplitLineShow": false,
						"yAxisSplitLineShow": false,
						"barWidth": 30,
						"barRadius": 8,
						"barColor": [{
							"color1": "#83bff6",
							"color2": "#188df0",
							"postion": 90,
							"$index": 0,
							"_show": true
						}, {
							"color1": "#23B7E5",
							"color2": "#564AA3",
							"postion": 50,
							"$index": 1,
							"_show": true
						}],
						"barMinHeight": 2
					}
				}
			},
			//   劳务塔吊结束
			{
				label: '升降机',
				option: {
				"domId":null,
				"typeOption":"cus",
				  "name": "升降机",
				  "title": "升降机",
				  "icon": require('@/assets/species.png'),
				  "dataType": 1,
				  "dataMethod": 'get',
				  "time": 5000,
				  "url": baseUrl + "/pie",
				  "dataFormatter": "",
				  "resize": true,
				  "component": {
					"width": 1408,
					"height": 866,
					"name": "lift",
					"prop": "lift",
				  },
				  "option": {}
				}
			  },
			{
				label: '施工电梯报警统计',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "今日施工电梯工作情况",
					"title": "今日施工电梯工作情况",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 289,
						"name": "construction",
						"prop": "construction",
					},
					"option": {}
				}
			},
			{
				label: '施工电梯报警统计',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "施工电梯报警统计",
					"title": "施工电梯报警统计",
					"icon": require('@/assets/species.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 309,
						"name": "statistics",
						"prop": "statistics",
					},
					"option": {}
				}
			},
			{
				label: '运行排行榜',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "运行排行榜",
					"title": "运行排行榜",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 457,
						"height": 286,
						"name": "hoisting",
						"prop": "hoisting",
					},
					"option": {}
				}
			},
			{
				label: '饼图',
				option: {
					"name": "饼图",
					"title": "饼图",
					"icon": require('@/assets/pie.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": false,
					"data": [{
						"name": "苹果",
						"value": 1000879,
						"url": "http://www.baidu.com"
					}, {
						"name": "三星",
						"value": 3400879,
						"url": "http://www.baidu.com"
					}, {
						"name": "小米",
						"value": 2300879,
						"url": "http://www.baidu.com"
					}, {
						"name": "oppo",
						"value": 5400879,
						"url": "http://www.baidu.com"
					}, {
						"name": "大疆",
						"value": 3000,
						"url": "http://www.baidu.com"
					}, {
						"name": "抖音",
						"value": 2000,
						"url": "http://www.baidu.com"
					}],
					"component": {
						"width": 600,
						"height": 300,
						"name": "pie",
						"prop": "pie",
					},
					"option": {
						"legend": true,
						"labelShow": true,
						"barColor": [{
							"color1": "#83bff6"
						},
						{
							"color1": "#23B7E5"
						},
						{
							"color1": "rgba(154, 168, 212, 1)"
						},
						{
							"color1": "#188df0"
						},
						{
							"color1": "#564AA3"
						}
						]
					}
				}
			},
			{
				label: '象形图',
				option: {
					"title": "象形图",
					"name": "象形图",
					"icon": require('@/assets/bar2.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"data": [{
						"name": "苹果",
						"value": 1000879,
					}, {
						"name": "三星",
						"value": 3400879,
					}, {
						"name": "小米",
						"value": 2300879,
					}, {
						"name": "oppo",
						"value": 5400879,
					}, {
						"name": "大疆",
						"value": 3000,
					}, {
						"name": "抖音",
						"value": 2000,
					}],
					"dataFormatter": "",
					"component": {
						"width": 600,
						"height": 300,
						"name": "pictorialbar",
						"prop": "pictorialbar",
					},
					"option": {
						symbolSize: 30,
						split: 30,
						symbol: '/img/source/source256.png',
						fontSize: '24',
						xAxisShow: false,
						yAxisShow: true,
						color: '#4dffff',
						nameColor: '#564AA3',
						xNameFontSize: '24',
						yNameFontSize: '24',
					}
				}
			},
			{
				label: '雷达图',
				option: {
					"title": "雷达图",
					"name": "雷达图",
					"icon": require('@/assets/radar.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/radar",
					"data": {
						indicator: [{
							name: '销售',
							max: 6500
						},
						{
							name: '管理',
							max: 16000
						},
						{
							name: '信息技术',
							max: 30000
						},
						{
							name: '客服',
							max: 38000
						},
						{
							name: '研发',
							max: 52000
						},
						{
							name: '市场',
							max: 25000
						}
						],
						series: [{
							data: [{
								value: [4300, 10000, 28000, 35000, 50000, 19000],
								name: '预算分配（Allocated Budget）'
							},
							{
								value: [5000, 14000, 28000, 31000, 42000, 21000],
								name: '实际开销（Actual Spending）'
							}
							]
						}]
					},
					"dataFormatter": "",
					"component": {
						"width": 970,
						"height": 400,
						"name": "radar",
						"prop": "radar",
					},
					"option": {
						width: '100%',
						height: 600,
						titleShow: true,
						title: '各部门开销',
						subtext: '最近一个月',
						titleColor: '#666',
						tipBackgroundColor: 'rgba(50,50,50,0.7)',
						tipColor: "#fff",
						shape: 'polygon',
						radius: "75%",
						splitNumber: 4,
						radarNameColor: '#fff',
						radarNameSize: 18,
						titleFontSize: 18,
						areaOpacity: 0.3,
						legend: true,
						// labelShow: true,
						"barColor": [{
							"color1": "#564AA3",
						},
						{
							"color1": "#188df0",
						}
						]
					},
				}
			},
			{
				label: '散点图',
				option: {
					"title": "散点图",
					"name": "散点图",
					"icon": require('@/assets/scatter.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/scatter",
					"data": [{
						"data": [
							[1, 8.04],
							[2, 6.95]
						]
					},
					{
						"data": [
							[1, 4.04],
							[2, 3.95]
						]
					}
					],
					"dataFormatter": "",
					"component": {
						"width": 600,
						"height": 300,
						"name": "scatter",
						"prop": "scatter",
					},
					"option": {
						lineSize: 25,
						barColor: [{
							postion: 0.2,
							color1: '#91c7ae'
						},
						{
							postion: 0.8,
							color1: '#63869e'
						},
						{
							postion: 1,
							color1: '#c23531'
						}
						]
					}
				}
			}, {
				label: '漏斗图',
				option: {
					"title": "漏斗图",
					"name": "漏斗图",
					"icon": require('@/assets/funnel.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/funnel",
					"data": [{
						value: 335,
						name: '直接访问'
					},
					{
						value: 310,
						name: '邮件营销'
					},
					{
						value: 234,
						name: '联盟广告'
					}
					],
					"dataFormatter": "",
					"component": {
						"width": 400,
						"height": 300,
						"name": "funnel",
						"prop": "funnel",
					},
					"option": {
						radius: true,
						"barColor": [{
							"color1": "#83bff6",
						},
						{
							"color1": "#23B7E5",
						},
						{
							"color1": "rgba(154, 168, 212, 1)",
						},
						{
							"color1": "#188df0",
						},
						{
							"color1": "#564AA3",
						}
						]
					}
				}
			}, {
				label: '地图',
				option: {
					"name": "地图",
					"title": "地图",
					"icon": require('@/assets/map.png'),
					"data": [],
					"dataFormatter": "",
					"component": {
						"width": 800,
						"height": 500,
						"name": "map",
						"prop": "map",
					},
					"option": {
						"borderWidth": 1,
						"scale": 87,
						"type": 0,
						"borderColor": "#0dffff",
						"areaColor": "#061d33",
						"banner": true,
						"bannerTime": 3000,
						"fontSize": 14,
						"zoom": 0.5,
						"empAreaColor": "rgba(35, 183, 229, 0.42)",
						"empColor": "#fff",
						"color": "rgba(13, 255, 255, 1)",
					}
				},
			}
		]
	},
	{
		"label": '首页',
		"icon": 'icon-bar',
		"children": [
			{
				label: '项目概况',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "饼图",
					"title": "项目概况",
					"icon": require('@/assets/pieone.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"setHeight": true,
					"backgroundHeight": 300,

					"info": true,
					"infoSize": 50,
					"infoLineHeight": 50,
					"infoPaddingTop": 50,
					"resize": true,
					"component": {
						"width": 490,
						"height": 253,
						"name": "pieone",
						"prop": "pieone",
					},
					"option": {}
				}
			},
			{
				label: '人员管理',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "饼图2",
					"title": "项目人员管理",
					"icon": require('@/assets/pietwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 490,
						"height": 253,
						"name": "pietwo",
						"prop": "pietwo",
					},
					"option": {}
				}
			},
			{
				label: '质量管理',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "饼图3",
					"title": "质量管理",
					"dataName": {
						"icon1": "指标1",
						"icon2": "指标2",
						"icon3": "指标3"
					},
					"icon": require('@/assets/piethree.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 490,
						"height": 253,
						"name": "piethree",
						"prop": "piethree",
					},
					"option": {}
				}
			},
			{
				label: '安全管理',
				option: {
					"domId": null,
					"typeOption": "cus",
					"name": "饼图3",
					"title": "安全管理",
					"dataName": {
						"icon1": "指标1",
						"icon2": "指标2",
						"icon3": "指标3"
					},
					"icon": require('@/assets/piethree.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/pie",
					"dataFormatter": "",
					"resize": true,
					"component": {
						"width": 490,
						"height": 253,
						"name": "indexpieangl",
						"prop": "indexpieangl",
					},
					"option": {}
				}
			},
			{
				"label": '智能设备',
				"option": {
					"domId": null,
					"sizeDom": {
						width: null,
						height: null
					},
					"typeOption": "cus",
					"titleShow": true,
					"name": "柱状图",
					"title": "智能设备",
					"icon": require('@/assets/jlbartwo.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"data": {
						"categories": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
						"series": [{
							name: '邮件营销',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '联盟广告',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '视频广告',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [150, 232, 201, 154, 190, 330, 410]
						},
						{
							name: '直接访问',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [320, 332, 301, 334, 390, 330, 320]
						},
						{
							name: '搜索引擎',
							type: 'line',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {},
							data: [820, 932, 901, 934, 1290, 1330, 1320]
						}
						]
					},
					"dataFormatter": "",
					"url": baseUrl + "/bar",
					"time": 5000,
					"component": {
						"width": 600,
						"height": 300,
						"name": "jlbartwo",
						"prop": "jlbartwo",
					},
					"option": {
						"gridX": 90,
						"gridY": 0,
						"gridX2": 0,
						"gridY2": 0,
						"legend": true,
						"nameColor": "#eee",
						"lineColor": "#eee",
						"xNameFontSize": 16,
						"yNameFontSize": 16,
						"labelShow": true,
						"labelShowColor": '#fff',
						"labelShowFontSize": 14,
						"labelShowFontWeight": 300,
						"yAxisInverse": false,
						"xAxisInverse": false,
						"xAxisShow": true,
						"yAxisShow": true,
						"xAxisSplitLineShow": false,
						"yAxisSplitLineShow": false,
						"barWidth": 30,
						"barRadius": 8,
						"barColor": [{
							"color1": "#83bff6",
							"color2": "#188df0",
							"postion": 90,
							"$index": 0,
							"_show": true
						}, {
							"color1": "#23B7E5",
							"color2": "#564AA3",
							"postion": 50,
							"$index": 1,
							"_show": true
						}],
						"barMinHeight": 2
					}
				}
			},
			{
				label: '工程进度',
				option: {
					"typeOption": "cus",
					"name": "工程进度",
					"title": "自定义",
					"icon": require('@/assets/dateprogress.png'),
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"fontSize": 100,
					"dataFormatter": "",
					"resize": true,
					"data": [{
						"keydata": [{
							"name": "计划开工日期",
							"data": "2018/07/20"
						},
						{
							"name": "计划竣工日期",
							"data": "2021/12/30"
						}
						],
						"node": [{
							"name": "工程开工",
							"data": "2018/07/20",
							"state": 1
						},
						{
							"name": "地下结构",
							"data": "2018/09/25",
							"state": 1
						},
						{
							"name": "主体全部封顶",
							"data": "2020/12/20",
							"state": 0
						},
						{
							"name": "主体结构验收",
							"data": "2021/11/10",
							"state": 2
						},
						{
							"name": "竣工验收 ",
							"data": "2021/12/30",
							"state": 2
						}
						]
					}],
					"url": "https://www.easy-mock.com/mock/5f915c36288c725a6620fc18/list/menulist",
					"component": {
						"width": 800,
						"height": 500,
						"name": "dateprogress",
						"prop": "dateprogress",
					},
					"option": {
						"fontSize": 10,
						"data": [{
							"name": "默认值:option.option.data",
						}]
					}
				}
			},
			{
				label: '主幻灯片',
				option: {
					"typeOption": "cus",
					"title": "嘉联轮播",
					"name": "嘉联轮播",
					"height": 100,
					"width": 100,
					"margintop": 0,
					"mainPpt": false,
					"icon": require('@/assets/jlswiper.png'),
					"top": 0,
					"left": 0,
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/swiper",
					"data": [{
						value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
						title: 'Request failed with status code 403',
						content: 'Error: Request failed with status code 403 在你部署完springboot,然后再打开的时候,出现这个错误。 出现的这个原因是 然后你可以看到自己创建的项目里面很多文件...'
					}, {
						value: 'http://n.sinaimg.cn/default/8_img/upload/3933d981/384/w2048h1536/20200728/212c-iwxpesx4973875.jpg',
						title: '403 Forbidden错误的原因和解决方法-马海祥博客',
						content: 'Vue.js 1.0 我们常使用 vue-resource (官方ajax库), Vue 2.0 发布后作者宣告不再对 vue-resource 进行更新, 推荐我们使用 axios (基于 Promise 的 HTT...'
					}, {
						value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
						title: '创建SpringBoot项目出现Request failed with status co...',
						content: '使用IDEA创建SpringBoot项目出现Request failed with status code 403,程序员大本营,技术文章内容聚合第一站。'
					}, {
						value: 'http://n.sinaimg.cn/news/1_img/upload/cf3881ab/103/w1000h1503/20200710/510d-iwasyei8902094.jpg',
						title: '创建SpringBoot项目出现Request failed with status co...',
						content: '使用IDEA创建SpringBoot项目出现Request failed with status code 403,程序员大本营,技术文章内容聚合第一站。'
					},],
					"imageBtn": true,
					"dynLine": true,
					"dataFormatter": "",
					"component": {
						"width": 670,
						"height": 370,
						"name": "jlswiper",
						"prop": "jlswiper"
					},
					"option": {
						type: '',
						interval: 5000,
						opacity: 100,
						indicator: 'none'
					},
				}
			},
			{
				label: '小幻灯片',
				option: {
					"typeOption": "cus",
					"title": "新闻动态",
					"name": "新闻动态",
					"height": 100,
					"width": 100,
					"margintop": 0,
					"mainPpt": false,
					"icon": require('@/assets/jlswiper.png'),
					"top": 0,
					"left": 0,
					"dataType": 1,
					"dataMethod": 'get',
					"time": 5000,
					"url": baseUrl + "/swiper",
					"data": [{
						value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
						title: 'Request failed with status code 403',
						content: 'Error: Request failed with status code 403 在你部署完springboot,然后再打开的时候,出现这个错误。 出现的这个原因是 然后你可以看到自己创建的项目里面很多文件...'
					}, {
						value: 'http://n.sinaimg.cn/default/8_img/upload/3933d981/384/w2048h1536/20200728/212c-iwxpesx4973875.jpg',
						title: '403 Forbidden错误的原因和解决方法-马海祥博客',
						content: 'Vue.js 1.0 我们常使用 vue-resource (官方ajax库), Vue 2.0 发布后作者宣告不再对 vue-resource 进行更新, 推荐我们使用 axios (基于 Promise 的 HTT...'
					}, {
						value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
						title: '创建SpringBoot项目出现Request failed with status co...',
						content: '使用IDEA创建SpringBoot项目出现Request failed with status code 403,程序员大本营,技术文章内容聚合第一站。'
					}, {
						value: 'http://n.sinaimg.cn/news/1_img/upload/cf3881ab/103/w1000h1503/20200710/510d-iwasyei8902094.jpg',
						title: '创建SpringBoot项目出现Request failed with status co...',
						content: '使用IDEA创建SpringBoot项目出现Request failed with status code 403,程序员大本营,技术文章内容聚合第一站。'
					},],
					"imageBtn": true,
					"dynLine": true,
					"dataFormatter": "",
					"component": {
						"width": 490,
						"height": 253,
						"name": "indexminppt",
						"prop": "indexminppt"
					},
					"option": {
						type: '',
						interval: 5000,
						opacity: 100,
						indicator: 'none'
					},
				}
			}
		]
	},
	{
		"label": '文字',
		"icon": 'icon-text',
		"children": [{
			"label": '文本框',
			"option": {
				"title": "文本框",
				"name": "文本框",
				"icon": require('@/assets/text.png'),
				"dataType": 0,
				"dataFormatter": "",
				"data": {
					value: '文本框'
				},
				"component": {
					"width": 100,
					"height": 40,
					"name": "text",
					"prop": "text"
				},
				"option": {
					"textAlign": "center",
					"fontSize": 26,
					"fontWeight": "normal",
					"color": "#fff"
				},
			},
		}, {
			"label": '跑马灯',
			"option": {
				"title": "跑马灯",
				"name": "跑马灯",
				"icon": require('@/assets/text2.png'),
				"top": 0,
				"left": 0,
				"dataType": 0,
				"data": {
					value: "跑马灯"
				},
				"dataFormatter": "",
				"component": {
					"width": 100,
					"height": 50,
					"name": "text",
					"prop": "text"
				},
				"option": {
					scroll: true,
					speed: 70,
					"textAlign": "center",
					"fontSize": 26,
					"fontWeight": "normal",
					"color": "#fff"
				},
			},
		}, {
			"label": '超链接',
			"option": {
				"title": "超链接",
				"name": "超链接",
				"icon": require('@/assets/text3.png'),
				"top": 0,
				"left": 0,
				"data": {
					"value": "超链接"
				},
				"dataFormatter": "",
				"component": {
					"width": 100,
					"height": 50,
					"name": "text",
					"prop": "text"
				},
				"option": {
					link: true,
					linkHref: 'http://avue.top',
					linkTarget: '_self',
					"textAlign": "center",
					"fontSize": 26,
					"fontWeight": "normal",
					"color": "#fff"
				},
			},
		}, {
			"label": '实时时间',
			"option": {
				"name": "实时时间",
				"title": "实时时间",
				"icon": require('@/assets/datetime.png'),
				"top": 78,
				"left": 1604,
				"component": {
					"width": 250,
					"height": 50,
					"name": "datetime",
					"prop": "datetime",
				},
				"option": {
					"format": 'yyyy-MM-dd hh:mm:ss',
					"color": "#fff",
					'textAlign': 'left',
					"fontSize": 24,
					"fontWeight": "normal"
				}
			},
		}]
	},
	{
		"label": '媒体',
		"icon": 'icon-img',
		"children": [{
			"label": '图片',
			"option": {
				"title": "图片",
				"name": "图片",
				"icon": require('@/assets/img.png'),
				"top": 0,
				"left": 0,
				"dataType": 0,
				"data": {
					value: ''
				},
				"dataFormatter": "",
				"component": {
					"width": 140,
					"height": 140,
					"name": "img",
					"prop": "img",
				},
				"option": {
					duration: '1000',
				}
			}
		},
		{
			"label": '图片框',
			"option": {
				"title": "图片框",
				"name": "图片框",
				"icon": require('@/assets/imgborder.png'),
				"top": 0,
				"left": 0,
				"component": {
					"width": 140,
					"height": 140,
					"name": "imgborder",
					"prop": "imgborder",
				},
				"option": {
					backgroundColor: 'rgba(180, 181, 198, 0.1)',
				}
			}
		}, {
			label: '轮播图',
			option: {
				"title": "轮播图",
				"name": "轮播图",
				"icon": require('@/assets/swiper.png'),
				"top": 0,
				"left": 0,
				"dataType": 1,
				"dataMethod": 'get',
				"time": 5000,
				"url": baseUrl + "/swiper",
				"data": [{
					value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
				}, {
					value: 'https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg',
				}],
				"dataFormatter": "",
				"component": {
					"width": 670,
					"height": 370,
					"name": "swiper",
					"prop": "swiper"
				},
				"option": {
					type: '',
					interval: 5000,
					opacity: 100,
					indicator: 'none'
				},
			}
		},
		{
			label: '嘉联轮播',
			option: {
				"typeOption": "cus",
				"title": "嘉联轮播",
				"name": "嘉联轮播",
				"height": 96,
				"width": 87,
				"margintop": 30,
				"mainPpt": false,
				"icon": require('@/assets/jlswiper.png'),
				"top": 0,
				"left": 0,
				"dataType": 1,
				"dataMethod": 'get',
				"time": 5000,
				"url": baseUrl + "/swiper",
				"data": [{
					value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
					title: 'Request failed with status code 403',
					content: 'Error: Request failed with status code 403 在你部署完springboot,然后再打开的时候,出现这个错误。 出现的这个原因是 然后你可以看到自己创建的项目里面很多文件...'
				}, {
					value: 'http://n.sinaimg.cn/default/8_img/upload/3933d981/384/w2048h1536/20200728/212c-iwxpesx4973875.jpg',
					title: '403 Forbidden错误的原因和解决方法-马海祥博客',
					content: 'Vue.js 1.0 我们常使用 vue-resource (官方ajax库), Vue 2.0 发布后作者宣告不再对 vue-resource 进行更新, 推荐我们使用 axios (基于 Promise 的 HTT...'
				}, {
					value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
					title: '创建SpringBoot项目出现Request failed with status co...',
					content: '使用IDEA创建SpringBoot项目出现Request failed with status code 403,程序员大本营,技术文章内容聚合第一站。'
				}, {
					value: 'http://n.sinaimg.cn/news/1_img/upload/cf3881ab/103/w1000h1503/20200710/510d-iwasyei8902094.jpg',
					title: '创建SpringBoot项目出现Request failed with status co...',
					content: '使用IDEA创建SpringBoot项目出现Request failed with status code 403,程序员大本营,技术文章内容聚合第一站。'
				},],
				"imageBtn": true,
				"dynLine": true,
				"dataFormatter": "",
				"component": {
					"width": 670,
					"height": 370,
					"name": "jlswiper",
					"prop": "jlswiper"
				},
				"option": {
					type: '',
					interval: 5000,
					opacity: 100,
					indicator: 'none'
				},
			}
		}, {
			label: 'iframe',
			option: {
				"title": "iframe",
				"name": "iframe",
				"icon": require('@/assets/iframe.png'),
				"top": 0,
				"left": 0,
				"component": {
					"width": 670,
					"height": 370,
					"option": {},
					"name": "iframe",
					"prop": "iframe"
				},
				"option": {},
				"dataType": 0,
				"data": {
					value: 'https://avuejs.com'
				},
				"dataFormatter": ""
			}
		}, {
			label: 'video',
			option: {
				"title": "video",
				"name": "video",
				"icon": require('@/assets/video.png'),
				"top": 0,
				"left": 0,
				"dataType": 0,
				"data": {
					value: 'http://www.w3school.com.cn/i/movie.ogg'
				},
				"option": {},
				"dataFormatter": "",
				"component": {
					"width": 670,
					"height": 370,
					"option": {},
					"name": "video",
					"prop": "video"
				},
			}
		}
		]
	}, {
		"label": '指标',
		"icon": 'icon-flop',
		"children": [{
			"label": '翻牌器',
			"option": {
				"title": "翻牌器",
				"name": "翻牌器",
				"icon": require('@/assets/flop.png'),
				"top": 0,
				"left": 0,
				"dataType": 0,
				"data": {
					value: '12345'
				},
				"dataFormatter": "",
				"component": {
					"width": 300,
					"height": 100,
					"name": "flop",
					"prop": "flop",
				},
				"option": {
					"type": "img",
					"suffixText": "",
					"suffixTextAlign": "",
					"suffixSplit": '',
					"suffixColor": "",
					"suffixFontSize": '',
					"borderColor": "#fff",
					"borderWidth": 3,
					"backgroundBorder": "/img/border/border1.png",
					"fontSize": 32,
					"fontWeight": "normal",
					"splitx": 0,
					"splity": 0,
					"backgroundColor": "",
					"color": "#fff"
				},
			}
		}, {
			"label": '颜色块',
			"option": {
				"title": "颜色块",
				"name": "颜色块",
				"icon": require('@/assets/flop2.png'),
				"top": 0,
				"left": 0,
				"dataType": 0,
				"data": [{
					"backgroundColor": '#67C23A',
					"prefixText": "某某某总人数",
					"value": '12345',
					"suffixText": '人',
				}, {
					"backgroundColor": '#409EFF',
					"prefixText": "某某某总人数",
					"value": '12345',
					"suffixText": '人',
				}, {
					"backgroundColor": '#E6A23C',
					"prefixText": "某某某总人数",
					"value": '12345',
					"suffixText": '人',
				}, {
					"backgroundColor": '#F56C6C',
					"prefixText": "某某某总人数",
					"value": '12345',
					"suffixText": '人',
				}, {
					"backgroundColor": '#7232dd',
					"prefixText": "某某某总人数",
					"value": '12345',
					"suffixText": '人',
				}, {
					"backgroundColor": 'blue',
					"prefixText": "某某某总人数",
					"value": '12345',
					"suffixText": '人',
				}],
				"dataFormatter": "",
				"component": {
					"width": 888,
					"height": 203,
					"name": "flop",
					"prop": "flop",
				},
				"option": {
					"span": 3,
					"decimals": 2,
					"whole": true,
					"padding": 12,
					"textAlign": 'left',
					"splity": 23,
					"splitx": 17,
					"fontSize": 28,
					"prefixSplity": 4,
					"prefixFontSize": 13,
					"backgroundColor": "#F56C6C",
					"suffixText": '人',
					"suffixInline": true,
					"suffixSplitx": 10,
					"suffixFontSize": 18,
				},
			}
		}, {
			"label": '环形图',
			"option": {
				"title": "环形图",
				"name": "环形图",
				"icon": require('@/assets/progress.png'),
				"top": 0,
				"left": 0,
				"dataType": 0,
				"data": {
					"label": "人数增涨",
					"value": 40,
					"data": 80
				},
				"dataFormatter": "",
				"component": {
					"width": 300,
					"height": 300,
					"name": "progress",
					"prop": "progress"
				},
				"option": {
					"type": "circle",
					"strokeWidth": 25,
					"color": "rgba(154, 168, 212, 1)",
					"fontSize": 40,
					"fontWeight": "normal",
					"suffixColor": "rgba(154, 168, 212, 1)",
					"suffixFontSize": 40,
					"suffixFontWeight": "normal",
					"borderColor": "#564AA3",
					"split": 20,
					"width": 400,
					"height": 80
				},
			}
		}, {
			"label": '进度条',
			"option": {
				"title": "进度条",
				"name": "进度条",
				"icon": require('@/assets/progress2.png'),
				"top": 0,
				"left": 0,
				"data": {
					"label": "人数增涨",
					"value": 40,
					"data": 80
				},
				"dataFormatter": "",
				"component": {
					"width": 400,
					"height": 80,
					"name": "progress",
					"prop": "progress"
				},
				"option": {
					"type": "line",
					"color": "#fff",
					"fontSize": 24,
					"suffixColor": "#fff",
					"strokeWidth": 18,
					"fontWeight": "normal",
					"borderColor": "#564AA3",
					"width": 400,
					"height": 80
				},
			}
		}, {
			label: '仪表盘',
			option: {
				"title": "仪表盘",
				"icon": require('@/assets/gauge.png'),
				"name": "仪表盘",
				"dataType": 1,
				"dataMethod": 'get',
				"time": 5000,
				"url": baseUrl + "/gauge",
				"data": {
					min: 1,
					max: 10,
					label: '名称',
					value: 4,
					unit: '%'
				},
				"dataFormatter": "",
				"component": {
					"width": 390,
					"height": 314,
					"name": "gauge",
					"prop": "gauge"
				},
				"option": {
					"lineSize": 15,
					"axisLabelShow": false,
					"axisLabelFontSize": 25,
					"nameFontSize": 20,
					"valueFontSize": 30,
					"nameColor": "",
					"lineColor": "#eee",
					"barColor": [{
						"color1": "rgba(154, 168, 212, 1)",
						"postion": "0.2",
					},
					{
						"color1": "#23B7E5",
						"postion": "0.8",
					},
					{
						"color1": "#564AA3",
						"postion": "1",
					}
					]
				},
			},
		}, {
			label: '字符云',
			option: {
				"title": "字符云",
				"name": "字符云",
				"icon": require('@/assets/wordcloud.png'),
				"top": 725,
				"left": 3780,
				"dataType": 1,
				"dataMethod": 'get',
				"data": [{
					name: '三星',
					value: '1234'
				}, {
					name: '小米',
					value: '1234'
				}, {
					name: '华为',
					value: '1234'
				}, {
					name: 'oppo',
					value: '1234'
				}, {
					name: '抖音',
					value: '1234'
				}, {
					name: '快手',
					value: '1234'
				}, {
					name: '淘宝',
					value: '1234'
				}, {
					name: '百度',
					value: '1234'
				}, {
					name: '京东',
					value: '1234'
				}, {
					name: '天猫',
					value: '1234'
				}, {
					name: '字符1',
					value: '1234'
				}, {
					name: '字符1',
					value: '1234'
				}],
				"dataFormatter": "",
				"url": baseUrl + "/wordCloud",
				"time": 5000,
				"component": {
					"name": "wordcloud",
					"prop": "wordcloud",
					"width": 600,
					"height": 300,
				},
				option: {
					minFontSize: 30,
					maxFontSize: 80,
					split: 30,
					rotate: true,
				}
			}
		}]
	}, {
		"label": '表格',
		"icon": 'icon-table',
		"children": [{
			"label": '表格',
			"option": {
				"title": "表格",
				"name": "表格",
				"icon": require('@/assets/table.png'),
				"top": 0,
				"left": 0,
				"dataType": 0,
				"data": [{
					"type1": '数据1',
					"type2": '数据2'
				}, {
					"type1": '数据1',
					"type2": '数据2'
				}],
				"dataFormatter": "",
				"component": {
					"width": 500,
					"height": 200,
					"name": "table",
					"prop": "table",
				},
				"option": {
					headerBackground: 'rgba(0, 0, 0, 0.01)',
					headerColor: 'rgba(154, 168, 212, 1)',
					headerTextAlign: 'center',
					bodyBackground: 'rgba(0, 0, 0, 0.01)',
					bodyColor: 'rgba(154, 168, 212, 1)',
					borderColor: 'rgba(51, 65, 107, 1)',
					bodyTextAlign: 'center',
					"column": [{
						"label": "类型1",
						"prop": "type1"
					},
					{
						"label": "类型2",
						"prop": "type2"
					},
					]
				}
			}
		}, {
			label: '选项卡',
			option: {
				"title": "选项卡",
				"name": "选项卡",
				"icon": require('@/assets/tabs.png'),
				"child": {
					"index": [],
					"paramName": ""
				},
				"dataFormatter": "",
				"dataType": 0,
				"data": [{
					"label": "选项卡1",
					"value": "1"
				},
				{
					"label": "选项卡2",
					"value": "2"
				}
				],
				"component": {
					"width": 356.9128919860628,
					"height": 46.209059233449096,
					"name": "tabs",
					"prop": "tabs"
				},
				"option": {
					"type": 'tabs',
					"color": "#eee",
					"empColor": "#4dffff",
					"fontSize": 20,
					"split": 8,
					"empBackgroundImage": "/img/banner/banner5.png",
					"backgroundImage": "/img/banner/banner4.png"
				},
			},
		}]
	}
]
