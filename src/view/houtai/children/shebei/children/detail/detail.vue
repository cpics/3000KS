<template>
    <div class="g-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name:'shebei' }">设备管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name:'sbList',params:{id:this.$route.query.listId} }">设备列表</el-breadcrumb-item>
            <el-breadcrumb-item class="active">{{machine.title}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item class="active">TM1234</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="g-main-second">
            <el-tabs class="line-tabs"
                     @tab-click="handleClick"
                     v-model="activeSecondName">
                <el-tab-pane label="基本信息"
                             name="base">
                    <div class="m-second-main base-information">
                        <div class="base-form">
                            <div class="base-title">设备信息
                            </div>
                            <el-form ref="form"
                                     label-width="185px"
                                     size="mini">
                                <el-form-item label="设备注册代码">{{machine.equ_reg_code}}</el-form-item>
                                <el-form-item label="名称">{{machine.title}}</el-form-item>
                                <el-form-item label="型号">{{machine.equ_type}}</el-form-item>
                                <el-form-item label="安装地址">{{machine.install_address}}</el-form-item>
                                <el-form-item label="设备合同号">{{machine.contract}}</el-form-item>
                                <el-form-item label="厂商">{{machine.business}}</el-form-item>
                                <el-form-item label="年检日期">{{machine.check_date}}</el-form-item>
                                <el-form-item label="出厂日期">{{machine.release_date}}</el-form-item>
                                <el-form-item label="安装单位">{{machine.install_unit}}</el-form-item>
                                <el-form-item label="安装日期">{{machine.install_date}}</el-form-item>
                                <el-form-item label="最高楼层">{{machine.height_floor}}</el-form-item>
                                <el-form-item label="最低楼层">{{machine.lower_floor}}</el-form-item>
                                <el-form-item label="门数">{{machine.doors}}</el-form-item>
                                <el-form-item label="电梯速度">{{machine.speed}}</el-form-item>
                                <el-form-item label="类型">{{machine.type==1?'电梯':'扶梯'}}</el-form-item>
                                <el-form-item label="设备应急救援位置">{{machine.eerl}}</el-form-item>
                                <el-form-item label="提升高度">{{machine.lifting_height}}</el-form-item>
                                <el-form-item label="倾斜角度">{{machine.tilt_angle}}</el-form-item>

                            </el-form>
                            <div class="base-title"
                                 v-if="terminal_list.length>0">终端信息</div>
                            <el-form ref="form"
                                     label-width="185px"
                                     size="mini"
                                     v-if="terminal_list.length>0"
                                     v-for="(item,i) in terminal_list"
                                     :key="i">
                                <el-form-item label="采集终端id">{{item.eid}}</el-form-item>
                                <el-form-item label="终端名称">{{item.terminal_name}}</el-form-item>
                                <el-form-item label="设备型号">{{item.unti_type}}</el-form-item>
                                <el-form-item label="设备状态">{{item.status?'在线 ':'离线'}}</el-form-item>
                                <el-form-item label="版本">{{item.version}}</el-form-item>
                                <el-form-item label="厂商">{{item.company}}</el-form-item>
                            </el-form>
                        </div>
                        <div class="base-pic">
                            <img src="../../../../../../assets/images/base.png"
                                 alt="">
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="设备状态"
                             name="state">
                    <div v-if="machine.type == 1"
                         class="m-second-main base-information">
                        <div class="base-table">
                            <div class="base-title">实时状态
                                <el-link type="primary"
                                         @click="showPop">[查看图表]
                                    <i class="el-icon-view el-icon--right"></i>
                                </el-link>
                            </div>
                            <div class="time-status w-530">
                                <table border="0"
                                       cellspacing="0"
                                       cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td>当前状态</td>
                                            <td>{{appStatus.now_status}}</td>
                                        </tr>
                                        <tr>
                                            <td>运行方向</td>
                                            <td>{{appStatus.direction}}</td>
                                        </tr>
                                        <tr>
                                            <td>平层状态</td>
                                            <td>{{appStatus.floor_status}}</td>
                                        </tr>
                                        <tr>
                                            <td>电梯速度</td>
                                            <td>{{appStatus.speed}}</td>
                                        </tr>
                                        <tr>
                                            <td>门状态</td>
                                            <td>{{appStatus.door_status}}</td>
                                        </tr>
                                        <tr>
                                            <td>轿内有人</td>
                                            <td>{{appStatus.has_people}}</td>
                                        </tr>
                                        <tr>
                                            <td>电源状态</td>
                                            <td>{{appStatus.power_status}}</td>
                                        </tr>
                                        <tr>
                                            <td>检修状态</td>
                                            <td>{{appStatus.check_status}}</td>
                                        </tr>
                                        <tr>
                                            <td>应急电源</td>
                                            <td>{{appStatus.yinjidianyuan}}</td>
                                        </tr>
                                        <tr>
                                            <td>安全电路</td>
                                            <td>{{appStatus.anquanhuilu}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="base-title">实时统计</div>
                            <div class="count-table w-740">
                                <table border="0"
                                       cellspacing="0"
                                       cellpadding="0">
                                    <thead>
                                        <tr>
                                            <td>运行时间</td>
                                            <td>运行次数</td>
                                            <td>开关门次数</td>
                                            <td>平层触发次数</td>
                                            <td>钢丝绳折弯次数</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{traceability.run_time}}小时</td>
                                            <td>{{traceability.run_count}}次</td>
                                            <td>{{traceability.door_times}}次</td>
                                            <td>{{traceability.level_off_times}}次</td>
                                            <td>{{traceability.bending_count_times}}次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="trig-table">
                                <div class="count-table w-740">
                                    <table border="0"
                                           cellspacing="0"
                                           cellpadding="0">
                                        <thead>
                                            <tr>
                                                <td>报警触发次数</td>
                                                <td>运行触发次数</td>
                                                <td>抱闸触发次数</td>
                                                <td>抱闸反馈次数</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{sbData.baojingchufa}}小时</td>
                                                <td>{{sbData.yunxing}}次</td>
                                                <td>{{sbData.baozha}}次</td>
                                                <td>{{sbData.baozhafankui}}次</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="base-pic">
                            <img src="../../../../../../assets/images/elevator.png"
                                 alt="">
                        </div>
                    </div>
                    <div v-if="machine.type == 2"
                         class="m-second-main base-information">
                        <div class="base-table">
                            <div class="base-title">实时状态
                                <el-link type="primary"
                                         @click="showPop">[查看图表]
                                    <i class="el-icon-view el-icon--right"></i>
                                </el-link>
                            </div>
                            <div class="time-status w-530">
                                <table border="0"
                                       cellspacing="0"
                                       cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td>当前状态</td>
                                            <td>{{appStatus.now_status}}</td>
                                        </tr>
                                        <tr>
                                            <td>运行方向</td>
                                            <td>{{appStatus.direction}}</td>
                                        </tr>
                                        <tr>
                                            <td>安全回路</td>
                                            <td>{{appStatus.anquanhuilu}}</td>
                                        </tr>
                                        <tr>
                                            <td>电源状态</td>
                                            <td>{{appStatus.power_status}}</td>
                                        </tr>
                                        <tr>
                                            <td>抱闸反馈</td>
                                            <td>{{appStatus.baozhafankui}}</td>
                                        </tr>
                                        <tr>
                                            <td>上部盖板</td>
                                            <td>{{appStatus.shangbugaiban}}</td>
                                        </tr>
                                        <tr>
                                            <td>下部盖板</td>
                                            <td>{{appStatus.xiabugaiban}}</td>
                                        </tr>
                                        <tr>
                                            <td>上部右扶手带</td>
                                            <td>{{appStatus.shangbuyoufushoudai}}</td>
                                        </tr>
                                        <tr>
                                            <td>下部右扶手带</td>
                                            <td>{{appStatus.xiabuyoufushoudai}}</td>
                                        </tr>
                                        <tr>
                                            <td>上部左梳齿板</td>
                                            <td>{{appStatus.shangbuzuoshuchiban}}</td>
                                        </tr>
                                        <tr>
                                            <td>下部左梳齿板</td>
                                            <td>{{appStatus.xiabuzuoshuchiban}}</td>
                                        </tr>
                                        <tr>
                                            <td>上部梯级断裂</td>
                                            <td>{{appStatus.shangbutijiduanlie}}</td>
                                        </tr>
                                        <tr>
                                            <td>下部梯级断裂</td>
                                            <td>{{appStatus.xiabutijiduanlie}}</td>
                                        </tr>
                                        <tr>
                                            <td>驱动链张紧左</td>
                                            <td>{{appStatus.qudonglianzhangjinzuo}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="base-title">实时统计</div>
                            <div class="count-table w-740">
                                <table border="0"
                                       cellspacing="0"
                                       cellpadding="0">
                                    <thead>
                                        <tr>
                                            <td>运行时间</td>
                                            <td>运行次数</td>
                                            <td>安全回路断开次数</td>
                                            <td>盖板打开次数</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{traceability.run_time}}小时</td>
                                            <td>{{traceability.runtime_frequency}}次</td>
                                            <td>{{traceability.system_safety_circuit}}次</td>
                                            <td>{{traceability.cover_board}}次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div class="base-pic">
                            <img src="../../../../../../assets/images/escalator.png"
                                 alt="">
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="故障"
                             name="fault">
                    <div class="m-second-main">
                        <div class="fault-btn-list">
                            <el-button :class="{'active':item.active}"
                                       v-for="(item,i) in alarmList"
                                       :key="i"
                                       type="info">{{item.text}}</el-button>
                        </div>
                    </div>
                    <!-- <div class="m-second-main"
                         v-if="machine.type == 2">
                        <div class="fault-btn-list w-400">
                            <el-button type="info active">安全回路断路</el-button>
                            <el-button type="info active">市电故障</el-button>
                            <el-button type="info active">扶手带入口夹入异物</el-button>
                            <el-button type="info">梳齿板处异物卡阻</el-button>
                            <el-button type="info">梯阶或踏板下陷</el-button>
                            <el-button type="info">动链断裂或过分伸长</el-button>
                        </div>
                    </div> -->
                </el-tab-pane>
            </el-tabs>

        </div>
        <el-dialog class="chart-dialog"
                   :visible.sync="dialogChartVisible">
            <div class="button-tab">

                <span>{{cateString}}</span>
                <!--正常 #2b908f-->
                <!--报警 #90ee7e-->
                <!--故障 #f45b5b-->
                <!-- <el-button class="popBtns"
                           :class="{'active':i+1 == cateType}"
                           v-for="(val,i) in btns"
                           :key="i"
                           type="info">{{val}}</el-button> -->

            </div>
            <div class="f-title">{{machine.install_address}} - {{machine.title}}</div>
            <div class="data-chart">
                <div>
                    <chart style="width:100%;height:700px;"
                           :options="cateType%2 == 1 ?options :option1"></chart>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { basicDetail, apparatus, faultAlarm, popchart } from '../../../../../../api/index.js';
import dtStatus from '../../../../../../common/utils/diantiStatus.js';
import ftStatus from '../../../../../../common/utils/futiStatus.js';

import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import { setInterval } from 'timers';
export default {
    components: {
        chart: ECharts
    },
    data() {
        return {
            tt: null,
            tl: null,
            tm: null,
            cateType: 1,
            cateString: '',
            dialogChartVisible: false,
            activeSecondName: 'base',
            tableData: [{
                runTime: '1200小时',
                runNo: '512次',
                openNo: '400次',
                trigNo: '1000次',
                bendNo: '252次'
            }],
            btns: [],
            machine: {},
            terminal_list: [],
            alarmList: [],
            traceability: {},
            sbData: {},
            appStatus: {},
            options: {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontSize: 60,
                    },
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: 60,
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: 60,
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ],
                series: [
                    {
                        // name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: []
                    }
                ]
            },
            option1: {
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 50,
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 50,
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [{
                    data: [],
                    type: 'line'
                }]
            }
        };
    },
    methods: {
        showPop() {
            this.dialogChartVisible = true;
            clearInterval(this.tt);
            // this.getChartData();
            this.intervalGetChartData();
            // this.tm = setInterval(() => {
            //     this.getChartData();
            // }, 5000);

        },
        intervalGetChartData() {
            let index = 1;
            let maxIndex = '';
            if (this.machine.type == 1) {
                maxIndex = 9;
            } else {
                maxIndex = 4;
            }
            this.getChartData(index);
            this.tt = setInterval(() => {
                if (index < maxIndex) {
                    index++;
                } else {
                    index = 1;
                }
                this.getChartData(index);
            }, 5000);


        },
        async basicDetail() {
            let res = await basicDetail({
                machine_id: this.$route.params.id
            });
            if (res.code == 200) {
                this.machine = res.data.machine;
                this.terminal_list = res.data.terminal_list;
            } else {
                this.$layer.alert(res.message);
            }
        },
        async getapparatus() {
            let res = await apparatus({
                machine_id: this.$route.params.id
            });
            if (res.code == 200) {

                let data = res.data;
                let appStatus = {};
                // console.log(data.check_status == 0);
                if (this.machine.type == 1) {
                    this.traceability = data.traceability;
                    this.sbData = data.data;
                    appStatus = {
                        now_status: data.realtime.now_status === '' ? '' : dtStatus.now_status[data.realtime.now_status],
                        direction: data.realtime.direction === '' ? '' : dtStatus.direction[data.realtime.direction],
                        floor_status: data.realtime.floor_status === '' ? '' : dtStatus.floor_status[data.realtime.floor_status],
                        door_status: data.realtime.door_status === '' ? '' : dtStatus.door_status[data.realtime.door_status],
                        has_people: data.realtime.has_people === '' ? '' : dtStatus.has_people[data.realtime.has_people],
                        power_status: data.realtime.power_status === '' ? '' : dtStatus.power_status[data.realtime.power_status],
                        check_status: data.check_status === '' ? '' : dtStatus.check_status[data.check_status],
                        yinjidianyuan: data.yinjidianyuan === '' ? '' : dtStatus.yinjidianyuan[data.yinjidianyuan],
                        anquanhuilu: data.anquanhuilu === '' ? '' : dtStatus.anquanhuilu[data.anquanhuilu],
                        speed: data.realtime.speed
                    }
                } else {
                    this.traceability = {
                        run_time: data.run_time,
                        runtime_frequency: data.runtime_frequency,
                        system_safety_circuit: data.system_safety_circuit,
                        cover_board: data.cover_board
                    };
                    appStatus = {
                        current_status: data.current_status === '' ? '' : ftStatus.current_status[data.current_status],
                        direction: data.direction === '' ? '' : ftStatus.direction[data.direction],
                        anquanhuilu: data.anquanhuilu === '' ? '' : ftStatus.anquanhuilu[data.anquanhuilu],
                        power_status: data.power_status === '' ? '' : ftStatus.power_status[data.power_status],
                        baozhafankui: data.baozhafankui === '' ? '' : ftStatus.baozhafankui[data.baozhafankui],
                        shangbugaiban: data.shangbugaiban === '' ? '' : ftStatus.shangbugaiban[data.shangbugaiban],
                        xiabugaiban: data.xiabugaiban === '' ? '' : ftStatus.xiabugaiban[data.xiabugaiban],
                        shangbuyoufushoudai: data.shangbuyoufushoudai === '' ? '' : ftStatus.shangbuyoufushoudai[data.shangbuyoufushoudai],
                        xiabuyoufushoudai: data.xiabuyoufushoudai === '' ? '' : ftStatus.xiabuyoufushoudai[data.xiabuyoufushoudai],
                        shangbuzuoshuchiban: data.shangbuzuoshuchiban === '' ? '' : ftStatus.shangbuzuoshuchiban[data.shangbuzuoshuchiban],
                        xiabuzuoshuchiban: data.xiabuzuoshuchiban === '' ? '' : ftStatus.xiabuzuoshuchiban[data.xiabuzuoshuchiban],
                        shangbutijiduanlie: data.shangbutijiduanlie === '' ? '' : ftStatus.shangbutijiduanlie[data.shangbutijiduanlie],
                        xiabutijiduanlie: data.xiabutijiduanlie === '' ? '' : ftStatus.xiabutijiduanlie[data.xiabutijiduanlie],
                        qudonglianzhangjinzuo: data.qudonglianzhangjinzuo === '' ? '' : ftStatus.qudonglianzhangjinzuo[data.qudonglianzhangjinzuo],
                    }
                }
                this.appStatus = appStatus;
                // this.getChartData(data.today_statistics);
                // console.log(this.appStatus);
            } else {
                this.$layer.alert(res.message);
            }
        },
        async getChartData(type) {
            if (type) {
                this.cateType = type;
            }
            if (this.machine.type == 1) {
                this.btns = [
                    '运行时间',
                    '运行次数',
                    '开关门次数',
                    '平层触发次数',
                    '钢丝折弯次数',
                    '报警触发次数',
                    '运行触发次数',
                    '抱闸触发次数',
                    '抱闸反馈次数'
                ]
            } else {
                this.btns = [
                    '运行时间',
                    '运行次数',
                    '安全回路断开次数',
                    '盖板打开次数'
                ]
            }


            this.cateString = this.btns[this.cateType - 1];


            // console.log(this.btns);
            let res = await popchart({
                machine_id: this.$route.params.id,
                type: this.cateType
            });

            if (res.code == 200) {
                let data = res.data.week_data;
                let xData = [];
                let ValueData = [];

                data.forEach(item => {
                    xData.push(item.x_title);
                    ValueData.push(item.y_value);
                });
                this.options.xAxis[0].data = xData;
                this.option1.xAxis.data = xData;
                this.options.series[0].data = ValueData;
                this.option1.series[0].data = ValueData;


                // console.log(res.data);
            } else {
                this.$layer.alert(res.message);
            }
        },
        async faultAlarm() {
            let res = await faultAlarm({
                machine_id: this.$route.params.id
            })
            if (res.code == 200) {
                let obj = res.data;
                let arr = [];
                obj.alarm_option.forEach((item, index) => {
                    let dir = false;
                    obj.current_alarm_option.forEach(cItem => {
                        if (index == (cItem - 1)) {
                            dir = true;
                        }
                    })
                    arr.push({
                        text: item,
                        active: dir
                    })
                })
                // console.log(arr);
                this.alarmList = arr;
            } else {
                this.$$layer.alert(res.message);
            }
        },
        handleClick(tab, event) {
            if (tab.index == 1) {

                clearInterval(this.tl);
                this.getapparatus();
                this.tl = setInterval(() => {
                    this.getapparatus();
                }, 10000);
            } else if (tab.index == 2) {
                this.faultAlarm();
                clearInterval(this.tl);
                clearInterval(this.tm);
            } else {
                clearInterval(this.tl);
                clearInterval(this.tm);
            }
            // console.log(tab, event);
        }
    },
    created() {
        this.basicDetail();
    },
    destroyed() {
        clearInterval(this.tl);
        clearInterval(this.tt);
        clearInterval(this.tm);
    }
}
</script>

<style lang="scss">
.f-title{
    display: flex;
    margin:0 auto;
    justify-content: center;
    font-size: 50px;
}
.popBtns {
    font-size: 22px !important;
}
.fault-btn-list {
    width: 750px;
    &.w-400 {
        width: 400px;
    }
    .el-button--info {
        width: 290px;
        line-height: 25px;
        border-radius: 2px;
        margin: 25px;
        border: 0;
        font-size: 16px;
        &.active {
            background: #eb6100;
        }
    }
    .el-button + .el-button {
        margin-left: 25px;
    }
}

.base-title {
    font-size: 16px;
    padding: 15px 0;
}

.m-second-main {
    .el-form-item__label {
        color: #066fc0;
        padding: 0 30px 0 0;
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
        margin-bottom: 10px;
    }
}

.base-information {
    display: flex;
    .base-form {
        flex-shrink: 0;
        margin-right: 20px;
        width: 500px;
    }
}
.button-tab {
    margin: 0 auto;
    font-size: 60px;
    text-align: center;
    justify-content: center;
    width: 100%;
}

.base-pic {
    width: 700px;
    min-height: 700px;
    display: flex;
    align-items: center;
    img {
        max-width: 650px;
        min-width: 400px;
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }
}

.base-table {
    width: 740px;
    flex-shrink: 0;
    margin-right: 20px;
    .el-table td,
    .el-table th {
        padding: 8px 0;
        text-align: center;
    }
    /*.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {*/
    /*border: 1px solid #000 !important;*/
    /*}*/
    .el-table {
        color: #333;
        /*th {*/
        /*&.is-leaf {*/
        /*border-bottom: 0 solid #EBEEF5 !important;*/
        /*}*/
        /*}*/
        table {
            width: 100%;
            border: 0;
            border-spacing: 0;
            table-layout: fixed;
            border-collapse: collapse;
        }
    }
    /*.el-table--border::after, .el-table--group::after, .el-table::before {*/
    /*background-color: transparent;*/
    /*}*/
}

.g-main-second {
    .base-table {
        .el-table thead {
            color: #333;
        }
        /*.el-table--border, .el-table--group {*/
        /*border: 0;*/
        /*}*/
    }
}

.trig-table {
    width: 600px;
    padding-top: 30px;
}

.time-status {
    &.w-530 {
        width: 500px;
    }
    table {
        width: 100%;
        border: 0;
        table-layout: fixed;
        border-collapse: collapse;
        td {
            line-height: 40px;
            text-align: center;
            border: 1px solid #ebeef5;
            &:first-child {
                color: #fff;
                width: 200px;
                background: #00b0f0;
            }
        }
        tbody {
            tr:hover {
                td:not(:first-child) {
                    background: #f5f7fa;
                }
            }
        }
    }
}
.count-table {
    margin-bottom: 20px;
    &.w-740 {
        width: 740px;
    }
    table {
        width: 100%;
        border: 0;
        table-layout: fixed;
        border-collapse: collapse;
        td {
            line-height: 40px;
            text-align: center;
            border: 1px solid #ebeef5;
        }
        tbody {
            tr:hover {
                td {
                    background: #f5f7fa;
                }
            }
        }
    }
}
.data-chart-box {
    padding: 20px 0;
    margin: 0 auto;
}
</style>
