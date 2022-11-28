// 业务指导数据
var pageData = {
    // 主题数据仓库
    dataWarehouse: [{
        name: '家具数据仓库',
        tableCount: 93,
        viewCount: 18,
        indexCount: 25
    }, {
        name: '停车数据仓库',
        tableCount: 214,
        viewCount: 206,
        indexCount: 28
    }, {
        name: '能源数据仓库',
        tableCount: 139,
        viewCount: 302,
        indexCount: 314
    }, {
        name: 'BIM数据仓库',
        tableCount: 136,
        viewCount: 38,
        indexCount: 45
    }, {
        name: '公众服务数据仓库',
        tableCount: 81,
        viewCount: 22,
        indexCount: 214
    }],

    // 数据质量管理
    qualityManageData: [{
        name: '智慧城市家具系统',
        sendData: 254193,
        receiveData: 102584
    }, {
        name: '智慧停车系统',
        sendData: 215513,
        receiveData: 123301
    }, {
        name: '环境系统',
        sendData: 240856,
        receiveData: 126001
    }, {
        name: '能源系统',
        sendData: 128011,
        receiveData: 111301
    }, {
        name: '交委系统',
        sendData: 320524,
        receiveData: 111340
    }, {
        name: '市政系统',
        sendData: 316058,
        receiveData: 131080
    }],

    // 数据服务管理
    dataServiceManage: [{
        name: '智慧停车服务接口',
        apiTotal: 68,
        requestNum: 2659,
        failureNum: 9,
    }, {
        name: '智慧家具服务接口',
        apiTotal: 50,
        requestNum: 2500,
        failureNum: 10,
    }, {
        name: '智慧公众服务接口',
        apiTotal: 60,
        requestNum: 3000,
        failureNum: 20,
    }, {
        name: '智慧能源服务接口',
        apiTotal: 90,
        requestNum: 3400,
        failureNum: 9,
    }, {
        name: '智慧环境服务接口',
        apiTotal: 82,
        requestNum: 659,
        failureNum: 9,
    }, {
        name: '移动互联服务接口',
        apiTotal: 38,
        requestNum: 720,
        failureNum: 8,
    }, {
        name: '智慧BIM服务接口',
        apiTotal: 23,
        requestNum: 4200,
        failureNum: 91,
    }],

    // 元数据管理
    metadataManage: {
        treeData: [
            // 左侧树
            {
                id: '',
                name: 'lx_hbase_node',
                children: [],
                selected: false,
            },
            {
                id: '',
                name: '龙兴数据中心',
                children: [
                    // children
                    {
                        id: '',
                        name: 'datacenter',
                    },
                    {
                        id: '',
                        name: 'datacenter_section',
                    },
                    {
                        id: '',
                        name: 'dc_wh_bim',
                    },
                    {
                        id: '',
                        name: 'dc_wh_energy',
                    },
                    {
                        id: '',
                        name: 'dc_wh_public',
                    },
                    {
                        id: '',
                        name: 'dc_wh_smartcity',
                    },
                    {
                        id: '',
                        name: 'finebi',
                    },
                    {
                        id: '',
                        name: 'kettle',
                    },
                    {
                        id: '',
                        name: 'kettle_work1',
                    },
                    {
                        id: '',
                        name: 'mysql',
                    },
                    {
                        id: '',
                        name: 'performance_schema',
                    },
                    {
                        id: '',
                        name: 'phoenix_gui',
                    },
                    {
                        id: '',
                        name: 'poli_metadata',
                    }
                ],
                selected: true,
            },
            {
                id: '',
                name: '龙兴BIM数据库',
                children: [],
                selected: false,
            },
            {
                id: '',
                name: '龙兴能源数据库',
                children: [],
                selected: false,
            },
            {
                id: '',
                name: '龙兴业务数据库109',
                children: [],
                selected: false,
            },
        ],
        tables: [
            // 表列表
            {
                "id": "",
                "name": "CATALOG: "
            },
            {
                "id": "",
                "name": "FUNCTION: "
            },
            {
                "id": "",
                "name": "LOG: "
            },
            {
                "id": "",
                "name": "SEQUENCE: "
            },
            {
                "id": "",
                "name": "STATS: "
            },
            {
                "id": "",
                "name": "GATHER_TEST: "
            },
            {
                "id": "",
                "name": "JWT_LOG_ACCESS: "
            },
            {
                "id": "",
                "name": "JWT_LOG_LOGIN: "
            },
            {
                "id": "",
                "name": "PERSON: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_APPLICATION_AND_API_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_APPLICATION_API_COUNT_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_CPU_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_DEVICE_STATUS_COUNT: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_DISK_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_ELECTRICITY_METER_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_ENVIRONMENTDATA_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_FLOW_METER_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_ILLUMINANCE_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_INDOOR_ENVIRONMENTDATA_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_LCD_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_LED_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_LEVEL_INSTRUMENT_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_MONITOR_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_NETWORK_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_NETWORK_TOPOLOGY_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_NETWORK_TOPOLOGY_STATUS_PKUNITETEST: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_NOISE_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_POWERCONTROL_LOOP_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_POWER_CONTROL_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_ROADLAMP_LOOP_CONTROL_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_ROADLAMP_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_RUBBISH_BIN_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_SERVER_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_SLAGTRUCK_SUSPICIOUS_VEHICLE_INFO: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_SMART_STOOL_SEAT_LEAVED_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_SMART_STOOL_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_VOICE_INFO_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_GATHER_WIFI_STATUS: "
            },
            {
                "id": "",
                "name": "PEX_LOG_SLAGTRUCK_SUSPICIOUS_VEHICLE_INFO_MSG: "
            },
            {
                "id": "",
                "name": "PEX_SECT_SL_PROJECT_LIGHT_RATE_YMD: "
            },
            {
                "id": "",
                "name": "PEX_SECT_SL_PROJECT_SITUATION_RESULT_ILLUMINATION: "
            },
            {
                "id": "",
                "name": "PEX_SECT_SL_PROJECT_SITUATION_RESULT_LIGHT_RATE: "
            },
            {
                "id": "",
                "name": "PEX_SECT_SL_ROAD_LIGHT_RATE_YMD: "
            },
            {
                "id": "",
                "name": "PEX_SECT_SL_ROAD_SITUATION_RESULT_ILLUMINATION: "
            },
            {
                "id": "",
                "name": "PEX_SECT_SL_ROAD_SITUATION_RESULT_LIGHT_RATE: "
            },
            {
                "id": "",
                "name": "PEX_SUSPICIOUS_VEHICLE_INFO: "
            }
        ]
    }
}