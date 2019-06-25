

<template>
    <div class="g-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name:'shebei' }">设备管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name:'sbList',params:{id:parentId},query:{name:parentName} }">设备列表</el-breadcrumb-item>
            <el-breadcrumb-item class="active">{{parentName}}</el-breadcrumb-item>
            <el-breadcrumb-item class="active">{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="g-main">
            <div class="g-main-box">
                <el-row>
                    <!-- <el-button size="medium"
                               @click="createTerminal"
                               type="primary">+ 添加</el-button> -->
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
                    <el-table-column prop="eid"
                                     label="采集终端ID"
                                     width="180">
                    </el-table-column>
                    <el-table-column prop="terminal_name"
                                     label="终端名称"
                                     width="150">
                    </el-table-column>
                    <el-table-column prop="unti_type"
                                     label="设备型号"
                                     width="150">
                    </el-table-column>
                    <el-table-column prop="status"
                                     label="状态"
                                     width="120">
                    </el-table-column>
                    <el-table-column prop="version"
                                     label="版本"
                                     width="120">
                    </el-table-column>
                    <el-table-column prop="company"
                                     label="厂商">
                    </el-table-column>
                    <el-table-column fixed="right"
                                     label="操作"
                                     width="280">
                        <template slot-scope="scope">
                            <el-button-group>

                                <el-button type="success"
                                           icon="el-icon-edit"
                                           @click.native.prevent="editItem(scope.$index)"
                                           size="small">编辑</el-button>
                                <!-- <el-button type="success"
                                           icon="el-icon-delete"
                                           @click.native.prevent="gotoDetail(scope.$index)"
                                           size="small">终端详情</el-button> -->
                                <el-button type=""
                                           icon="el-icon-delete"
                                           size="small"
                                           @click.native.prevent="delTerminal(scope.$index)">删除
                                </el-button>
                                <el-button type=""
                                           icon="el-icon-refresh"
                                           size="small">重启</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog title="终端"
                       :visible.sync="dialogFormVisible">
                <el-form ref="aform"
                         :model="form"
                         label-width="180px">
                    <el-form-item label="采集终端ID">
                        <el-input v-model="form.eid"></el-input>
                    </el-form-item>
                    <el-form-item label="终端名称">
                        <el-input v-model="form.terminal_name"></el-input>
                    </el-form-item>
                    <el-form-item label="设备型号">
                        <el-input v-model="form.unti_type"></el-input>
                    </el-form-item>
                    <el-form-item label="版本">
                        <el-input v-model="form.version"></el-input>
                    </el-form-item>
                    <el-form-item label="厂商">
                        <el-input v-model="form.company"></el-input>
                    </el-form-item>
                    <el-form-item label="编号">
                        <el-input v-model="form.serial_number"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="管理设备id">
                        <el-input v-model="form.machine_id"></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="终端id">
                        <el-input v-model="form.id"></el-input>
                    </el-form-item> -->
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="openPop">取 消</el-button>
                    <el-button type="primary"
                               @click="createTerminal">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { terminal, createTerminal, delTerminal } from '../../../../../../api/index.js';
export default {
    data() {
        return {
            parentId: this.$route.query.parentId,
            parentName: this.$route.query.parentName,
            title: this.$route.query.title,
            list: [],
            form: {
                eid: '',
                terminal_name: '',
                unti_type: '',
                version: '',
                company: '',
                serial_number: '',
                machine_id: this.$route.params.id,
                id: ''
            },
            formRule: {
                eid: [
                    { required: true, message: '请输入采集终端ID!' },
                ],
                terminal_name: [
                    { required: true, message: '请输入终端名称!' },
                ],
                unti_type: [
                    { required: true, message: '请输入设备型号!' },
                ],
                version: [
                    { required: true, message: '请输入版本!' },
                ],
                company: [
                    { required: true, message: '请输入厂商!' },
                ],
                serial_number: [
                    { required: true, message: '请输入编号!' },
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
                    eid: '',
                    terminal_name: '',
                    unti_type: '',
                    version: '',
                    company: '',
                    serial_number: '',
                    machine_id: this.$route.params.id,
                    id: ''
                }
            }
        },
        gotoDetail(i) {
            this.$router.push({ name: 'sbDetail', params: { id: this.list[i].machine_id } })
        },
        editItem(i) {
            // console.log(this.list[i]);
            // return ;
            this.form = {
                eid: this.list[i].eid,
                terminal_name: this.list[i].terminal_name,
                unti_type: this.list[i].unti_type,
                version: this.list[i].version,
                company: this.list[i].company,
                serial_number: this.list[i].serial_number,
                machine_id: this.$route.params.id,
                id: this.list[i].id
            }
            this.openPop();
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //获取终端列表
        async terminal() {
            let res = await terminal({
                machine_id: this.$route.params.id,
                page: 1,
                pagesize: 10000
            })
            if (res.code == 200) {
                this.list = res.data.list;
            } else {
                this.$layer.alert(res.message);
            }
        },
        //创建
        async createTerminal() {
            let validator = new this.$validator(this.formRule);
            let model = this.form;
            validator.validate(model, async (errors, fields) => {
                if (!errors) {
                    let res = await createTerminal(this.form);
                    if (res.code == 200) {
                        this.$layer.alert(res.message);
                        this.terminal();
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
        delTerminal(index) {
            this.$layer.confirm('确定删除此终端么？', async (i) => {
                let res = await delTerminal({
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
        }
    },
    created() {
        this.terminal();
    }
}
</script>

<style>
</style>
