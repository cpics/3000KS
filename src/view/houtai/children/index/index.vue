<template>
    <div class="g-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item class="active">地图概况</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="g-main">
            <div class="map-survey">
                <div class="map-box">
                    <img src="../../../../assets/images/map.png"
                         alt="">
                </div>
                <div class="survey-chart">
                    <div class="survey-info">
                        <div class="survey-tit">概况信息</div>
                        <div class="survey-msg">
                            <div class="s-msg">
                                <div class="s-msg-row">
                                    <label>设备总数量</label>
                                    <div class="s-msg-info">
                                        <span class="s-num">{{info.equ_count}}台</span>
                                    </div>
                                </div>
                                <div class="s-msg-row">
                                    <label>在线设备数量</label>
                                    <div class="s-msg-info">
                                        <span class="s-num">{{info.online_count}}台</span>
                                        <!-- <i class="online-icon"></i> -->
                                    </div>
                                </div>
                                <div class="s-msg-row">
                                    <label>离线设备数量</label>
                                    <div class="s-msg-info">
                                        <span class="s-num">{{info.offline_count}}台</span>
                                        <!-- <i class="offline-icon"></i> -->
                                    </div>
                                </div>
                            </div>
                            <div class="s-chart">
                                <!--宽高150px-->
                                <!--在线 #37a2da-->
                                <!--离线 #ffd85c-->

                            </div>
                        </div>
                    </div>
                    <div class="data-analysis">
                        <div class="data-title">
                            <div class="data-tit">数据分析
                                <el-link type="primary"
                                         @click="dialogChartVisible = true">[查看大图]
                                    <i class="el-icon-view el-icon--right"></i>
                                </el-link>
                            </div>
                            <div class="data-handle">
                                <span>更多数据&gt;&gt;</span>
                            </div>
                        </div>
                        <div class="data-chart">
                            <div class="button-tab">
                                <!--正常 #2b908f-->
                                <!--报警 #90ee7e-->
                                <!--故障 #f45b5b-->
                                <el-button @click="changeType('today')"
                                           :class="{'active':type=='today'}"
                                           type="info ">今日数据</el-button>
                                <el-button @click="changeType('week')"
                                           :class="{'active':type=='week'}"
                                           type="info ">最近一周</el-button>
                                <el-button @click="changeType('month')"
                                           :class="{'active':type=='month'}"
                                           type="info">最近一月</el-button>
                            </div>
                            <div class="data-chart-box">
                                今日数据

                            </div>
                            <div>
                                <chart :options="options"></chart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog class="chart-dialog"
                   :visible.sync="dialogChartVisible">
            <div class="data-chart">
                <div class="button-tab">
                    <!--正常 #2b908f-->
                    <!--报警 #90ee7e-->
                    <!--故障 #f45b5b-->
                    <el-button @click="changeType('today')"
                               :class="{'active':type=='today'}"
                               type="info ">今日数据</el-button>
                    <el-button @click="changeType('week')"
                               :class="{'active':type=='week'}"
                               type="info ">最近一周</el-button>
                    <el-button @click="changeType('month')"
                               :class="{'active':type=='month'}"
                               type="info">最近一月</el-button>
                </div>
                <div class="data-chart-box">
                    今日数据
                </div>
                <div>
                    <chart style="width:100%;height:700px;"
                           :options="options1"></chart>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getIndex } from '../../../../api/index.js';
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
// import 'echarts/lib/component/polar'
export default {
    data() {
        return {
            dialogChartVisible: false,
            info: {},
            type: 'today',
            options: {

                legend: {},
                tooltip: {},
                dataset: {
                    source: [

                    ]
                },
                xAxis: { type: 'category' },
                yAxis: {},
                series: [
                    { type: 'bar' },
                    { type: 'bar' },
                    { type: 'bar' }
                ]
            },
            options1: {
                legend: {
                    textStyle: {
                        color: '#fff'
                    },

                },
                tooltip: {},
                dataset: {
                    source: [

                    ]
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [
                    { type: 'bar' },
                    { type: 'bar' },
                    { type: 'bar' }
                ]
            },
            product: ['product', '正常', '报警', '故障'],
            today: [],
            month: [],
            week: []
        }
    },
    components: {
        chart: ECharts
    },
    methods: {
        changeType(type) {
            this.type = type;
            this.options.dataset.source = [
                this.product,
                ...this[type]
            ]
            this.options1.dataset.source = [
                this.product,
                ...this[type]
            ]
        },
        async getIndex() {
            let res = await getIndex();

            if (res.code == 200) {

                this.info = res.data;
                this.info.list.month.forEach(item => {
                    let arr = [];
                    arr.push(item.date);
                    arr.push(item.normal);
                    arr.push(item.alarm);
                    arr.push(item.fault);
                    this.month.push(arr);
                })
                this.info.list.today.forEach(item => {
                    let arr = [];
                    arr.push(item.date);
                    arr.push(item.normal);
                    arr.push(item.alarm);
                    arr.push(item.fault);
                    this.today.push(arr);
                })
                this.info.list.week.forEach(item => {
                    let arr = [];
                    arr.push(item.date);
                    arr.push(item.normal);
                    arr.push(item.alarm);
                    arr.push(item.fault);
                    this.week.push(arr);
                });
                this.changeType('today');
                // this.options.dataset.source = [
                //     this.product,
                //     ...this.today
                // ]
            } else {
                this.$layer.alert(res.message);
            }
        }
    },
    mounted() {

    },
    created() {
        this.getIndex();
    }
}
</script>

<style lang="scss" scoped>
.map-survey {
    display: flex;
    width: 100%;
    .map-box {
        flex: 1;
        max-width: 1000px;
        box-sizing: border-box;
        border: 1px solid #d9d9d9;
        img {
            width: 100%;
            display: block;
        }
    }
    .survey-chart {
        flex-shrink: 0;
        width: 530px;
        margin-left: 20px;
    }
}
.survey-chart {
    .survey-info {
        width: 100%;
        background: #eee;
        padding: 15px;
        color: #333;
        font-size: 14px;
        box-sizing: border-box;
    }
    .survey-tit {
        font-size: 16px;
    }
    .survey-msg {
        min-height: 150px;
        display: flex;
        align-items: center;
    }
    .s-msg {
        padding: 15px 0;
    }
    .s-msg-row {
        width: 300px;
        display: flex;
        padding: 4px 0;
        label {
            width: 120px;
            text-align: right;
            margin-right: 20px;
            flex-shrink: 0;
        }
        .s-msg-info {
            width: 170px;
        }
        .s-num {
            min-width: 70px;
            display: inline-block;
        }
        .online-icon,
        .offline-icon {
            width: 30px;
            height: 14px;
            display: inline-block;
            margin-left: 5px;
        }
        .online-icon {
            background: #37a2da;
        }
        .offline-icon {
            background: #ffd85c;
        }
    }
}
.data-analysis {
    padding: 20px;
    .data-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        .data-tit {
            font-size: 16px;
        }
    }
}
.data-chart-box {
    padding: 20px 0;
}
</style>
