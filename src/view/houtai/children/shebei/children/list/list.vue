<template>
    <div class="g-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name:'shebei' }">设备管理</el-breadcrumb-item>
            <el-breadcrumb-item>设备列表</el-breadcrumb-item>
            <el-breadcrumb-item class="active">{{name}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item class="active">21幢东电梯</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="g-main">
            <div class="g-main-box">
                <el-row>
                    <!-- <el-button size="medium"
                               @click="createMachine"
                               type="primary">+ 添加</el-button>-->
                    <el-button size="medium"
                               @click="openPop"
                               type="primary">+ 添加</el-button>
                </el-row>
                <el-table :data="list"
                          style="width: 100%">
                    <el-table-column fixed
                                     prop="id"
                                     label="序号"
                                     width="100">
                    </el-table-column>
                    <el-table-column prop="equ_reg_code"
                                     label="设备注册代码"
                                     width="120">
                    </el-table-column>
                    <el-table-column prop="title"
                                     label="名称"
                                     width="150">
                    </el-table-column>
                    <el-table-column prop="equ_type"
                                     label="型号"
                                     width="100">
                    </el-table-column>
                    <el-table-column prop="install_address"
                                     label="安装地址"
                                     width="160">
                    </el-table-column>
                    <el-table-column prop="contract"
                                     label="设备合同号"
                                     width="120">
                    </el-table-column>
                    <el-table-column prop="business"
                                     label="厂商">
                    </el-table-column>
                    <el-table-column prop="check_date"
                                     label="年检日期"
                                     width="130">
                    </el-table-column>
                    <el-table-column prop="release_date"
                                     label="出厂日期"
                                     width="130">
                    </el-table-column>
                    <el-table-column prop="install_unit"
                                     label="安装单位"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="install_date"
                                     label="安装日期"
                                     width="130">
                    </el-table-column>
                    <el-table-column prop="height_floor"
                                     label="最高楼层"
                                     width="130">
                    </el-table-column>
                    <el-table-column prop="lower_floor"
                                     label="最低楼层"
                                     width="130">
                    </el-table-column>
                    <el-table-column prop="doors"
                                     label="门数"
                                     width="130">
                    </el-table-column>
                    <el-table-column prop="speed"
                                     label="电梯速度"
                                     width="130">
                    </el-table-column>
                    <el-table-column prop="typeStr"
                                     label="类型"
                                     width="130">
                    </el-table-column>
                    <el-table-column fixed="right"
                                     label="操作"
                                     width="400">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button type="success"
                                           icon="el-icon-edit"
                                           @click.native.prevent="editItem(scope.$index)"
                                           size="small">编辑</el-button>
                                <el-button type=""
                                           icon="el-icon-delete"
                                           size="small"
                                           @click.native.prevent="delMachine(scope.$index)">删除
                                </el-button>
                                <el-button type=""
                                           icon="el-icon-document"
                                           size="small"
                                           @click.native.prevent="gotozd(scope.$index)">终端列表
                                </el-button>
                                <el-button type=""
                                           icon="el-icon-document"
                                           size="small"
                                           @click.native.prevent="gotoDetail(scope.$index)">设备详情
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog title="设备列表"
                       :visible.sync="dialogFormVisible">
                <el-form ref="form"
                         :model="form"
                         label-width="180px">
                    <el-form-item label="设备注册代码">
                        <el-input v-model="form.equ_reg_code"></el-input>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="型号">
                        <el-input v-model="form.equ_type"></el-input>
                    </el-form-item>
                    <el-form-item label="安装地址">
                        <el-input v-model="form.install_address"></el-input>
                    </el-form-item>
                    <el-form-item label="设备合同号">
                        <el-input v-model="form.contract"></el-input>
                    </el-form-item>
                    <el-form-item label="厂商">
                        <el-input v-model="form.business"></el-input>
                    </el-form-item>
                    <el-form-item label="年检日期">
                        <el-date-picker class="w-full"
                                        v-model="form.check_date"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="出厂日期">
                        <el-date-picker class="w-full"
                                        v-model="form.release_date"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="安装单位">
                        <el-input v-model="form.install_unit"></el-input>
                    </el-form-item>
                    <el-form-item label="安装日期">
                        <el-date-picker class="w-full"
                                        v-model="form.install_date"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="最高楼层">
                        <el-input v-model="form.height_floor"></el-input>
                    </el-form-item>
                    <el-form-item label="最低楼层">
                        <el-input v-model="form.lower_floor"></el-input>
                    </el-form-item>
                    <el-form-item label="门数">
                        <el-input v-model="form.doors"></el-input>
                    </el-form-item>
                    <el-form-item label="电梯速度">
                        <el-input v-model="form.speed"></el-input>
                    </el-form-item>
                    <el-form-item label="电梯">
                        <el-select class="w-full"
                                   v-model="form.type"
                                   placeholder="选择类型">
                            <el-option label="直梯"
                                       value="1"></el-option>
                            <el-option label="扶梯"
                                       value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备应急救援位置">
                        <el-input v-model="form.eerl"></el-input>
                    </el-form-item>
                    <el-form-item label="提升高度">
                        <el-input v-model="form.lifting_height"></el-input>
                    </el-form-item>
                    <el-form-item label="倾斜角度">
                        <el-input v-model="form.tilt_angle"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="openPop">取 消</el-button>
                    <el-button type="primary"
                               @click="createMachine">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { machine, createMachine, delMachine } from '../../../../../../api/index';
export default {
    data() {
        return {
            name: this.$route.query.name,
            list: [],
            form: {
                id: '',
                equ_reg_code: '',
                title: '',
                equ_type: '',
                install_address: '',
                contract: '',
                business: '',
                check_date: '',
                release_date: '',
                region_id: this.$route.params.id,
                install_unit: '',
                install_date: '',
                height_floor: '',
                lower_floor: '',
                doors: '',
                speed: '',
                type: '',
                eerl: '',
                lifting_height: '',
                tilt_angle: ''

            },
            formRule: {
                equ_reg_code: [
                    { required: true, message: '请输入设备注册代码' },
                ],
                title: [
                    { required: true, message: '请输入名称!' },
                ],
                equ_type: [
                    { required: true, message: '请输入型号!' },
                ],
                install_address: [
                    { required: true, message: '请输入安装地址!' },
                ],
                contract: [
                    { required: true, message: '请输入设备合同号!' },
                ],
                business: [
                    { required: true, message: '请输入厂商!' },
                ],
                check_date: [
                    { required: true, message: '请选择年检时间!' },
                ],
                check_date: [
                    { required: true, message: '请选择年检时间!' },
                ],
                release_date: [
                    { required: true, message: '请选择出厂时间!' },
                ],
                install_unit: [
                    { required: true, message: '请输入安装单位!' },
                ],
                install_date: [
                    { required: true, message: '请选择安装日期!' },
                ],
                height_floor: [
                    { required: true, message: '请输入最高楼层!' },
                ],
                lower_floor: [
                    { required: true, message: '请输入最低楼层!' },
                ],
                doors: [
                    { required: true, message: '请输入门数!' },
                ],
                speed: [
                    { required: true, message: '请输入电梯速度!' },
                ],
                type: [
                    { required: true, message: '请选择电梯类型!' },
                ],
                eerl: [
                    { required: true, message: '请输入设备应急救援位置!' },
                ],
                lifting_height: [
                    { required: true, message: '请输入提升高度!' },
                ],
                tilt_angle: [
                    { required: true, message: '请输入倾斜角度!' },
                ],
            },
            dialogFormVisible: false
        };
    },
    methods: {
        openPop() {
            this.dialogFormVisible = !this.dialogFormVisible;
            if (!this.dialogFormVisible) {
                this.form = {
                    id: '',
                    equ_reg_code: '',
                    title: '',
                    equ_type: '',
                    install_address: '',
                    contract: '',
                    business: '',
                    check_date: '',
                    release_date: '',
                    region_id: this.$route.params.id,
                    install_unit: '',
                    install_date: '',
                    height_floor: '',
                    lower_floor: '',
                    doors: '',
                    speed: '',
                    type: '',
                    eerl: '',
                    lifting_height: '',
                    tilt_angle: ''
                }
            }
        },
        editItem(i) {
            // console.log(this.list[i]);
            // return ;
            this.form = {
                id: this.list[i].id,
                equ_reg_code: this.list[i].equ_reg_code,
                title: this.list[i].title,
                equ_type: this.list[i].equ_type,
                install_address: this.list[i].install_address,
                contract: this.list[i].contract,
                business: this.list[i].business,
                check_date: this.list[i].check_date,
                release_date: this.list[i].release_date,
                region_id: this.$route.params.id,
                install_unit: this.list[i].install_unit,
                install_date: this.list[i].install_date,
                height_floor: this.list[i].height_floor,
                lower_floor: this.list[i].lower_floor,
                doors: this.list[i].doors,
                speed: this.list[i].speed,
                type: String(this.list[i].type),
                eerl: this.list[i].eerl,
                lifting_height: this.list[i].lifting_height,
                tilt_angle: this.list[i].tilt_angle
            }
            this.openPop();
        },
        //获取设备列表
        async machine() {
            let res = await machine({
                region_id: this.$route.params.id,
                page: 1,
                pagesize: 10000
            });
            if (res.code == 200) {
                res.data.list.forEach(item => {
                    if (item.type == 1) {
                        item.typeStr = '电梯';
                    } else {
                        item.typeStr = '扶梯';
                    }
                })
                this.list = res.data.list;
            } else {
                this.$layer.alert(res.message);
            }
        },
        //添加修改设备
        async createMachine() {
            let validator = new this.$validator(this.formRule);
            let model = this.form;
            validator.validate(model, async (errors, fields) => {
                if (!errors) {
                    let res = await createMachine(this.form);
                    if (res.code == 200) {
                        this.$layer.alert(res.message);
                        this.machine();
                        this.openPop();
                    } else {
                        this.$layer.alert(res.message);
                    }
                    // this.$layer.alert(errors[0].message);
                } else {
                    this.$layer.alert(errors[0].message);
                }
            });

        },
        //删除设备
        async delMachine(index) {
            this.$layer.confirm('确定删除此设备吗？', async (i) => {
                let res = await delMachine({
                    id: this.list[index].id
                })

                if (res.code == 200) {
                    this.$layer.alert(res.message);
                    this.list.splice(index, 1);
                } else {
                    this.$layer.alert(res.message);
                }
                // this.delRegionAction(index);
                this.$layer.close(i);
            });
        },
        gotozd(index) {
            this.$router.push({
                name: 'zd',
                params: { id: this.list[index].id },
                query: {
                    title: this.list[index].title,
                    parentId: this.$route.params.id,
                    parentName: this.name
                }
            });
        },
        gotoDetail(i) {
            this.$router.push({ name: 'sbDetail', params: { id: this.list[i].id }, query: { listId: this.$route.params.id, } })
        },
    },
    created() {
        this.machine();
    }
}
</script>

<style>
</style>