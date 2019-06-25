<template>
    <div class="g-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">设备管理</el-breadcrumb-item>
            <el-breadcrumb-item>区域列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="g-main">
            <div class="g-main-box">
                <el-row>
                    <!-- <el-button size="medium"
                               @click="addQuyu"
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
                    <el-table-column prop="region_name"
                                     label="区域名称"
                                     width="180">
                    </el-table-column>
                    <el-table-column prop="address"
                                     label="地址"
                                     width="250">
                    </el-table-column>
                    <el-table-column prop="number"
                                     label="数量"
                                     width="100">
                    </el-table-column>
                    <el-table-column prop="manager_company"
                                     label="管理公司"
                                     width="120">
                    </el-table-column>
                    <el-table-column prop="manager_contact"
                                     label="管理员联系方式"
                                     width="200">
                    </el-table-column>
                    <el-table-column prop="repair_company"
                                     label="维保公司"
                                     width="150">
                    </el-table-column>
                    <el-table-column prop="repair_contact"
                                     label="维保员联系方式"
                                     width="200">
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
                                <el-button type=""
                                           icon="el-icon-delete"
                                           size="small"
                                           @click.native.prevent="delRegion(scope.$index)">删除
                                </el-button>
                                <el-button type=""
                                           icon="el-icon-document"
                                           size="small"
                                           @click.native.prevent="gotoDetail(scope.$index)">设备列表
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="添加区域"
                   :visible.sync="dialogFormVisible">
            <el-form ref="form"
                     :model="form"
                     label-width="180px">
                <!-- <el-form-item label="区域id">
                    <el-input v-model="form.id"></el-input>
                </el-form-item> -->
                <el-form-item label="区域名称">
                    <el-input v-model="form.region_name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item label="管理公司">
                    <el-input v-model="form.manager_company"></el-input>
                </el-form-item>
                <el-form-item label="管理员联系方式">
                    <el-input maxlength="11"
                              v-model="form.manager_contact"></el-input>
                </el-form-item>
                <el-form-item label="维保公司">
                    <el-input v-model="form.repair_company"></el-input>
                </el-form-item>
                <el-form-item label="维保人员联系方式">
                    <el-input maxlength="11"
                              v-model="form.repair_contact"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="openPop">取 消</el-button>
                <el-button type="primary"
                           @click="addQuyu">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { createRegion, region, delRegion } from '../../../../../../api/index.js';
import { constants } from 'fs';
export default {
    data() {
        return {
            list: [

            ],
            // addForm: {
            //     id: '',
            //     region_name: '南京',
            //     address: '吴江区',
            //     number: '10',
            //     manager_company: 'aaa有限公司',
            //     manager_contact: '15365335788',
            //     repair_company: 'bbb有限公司',
            //     repair_contact: '15365335787'
            // },
            dialogFormVisible: false,
            form: {
                id: '',
                region_name: '',
                address: '',
                number: '',
                manager_company: '',
                manager_contact: '',
                repair_company: '',
                repair_contact: ''
            },
            formRule: {
                region_name: [
                    { required: true, message: '请输入区域名称!' },
                ],
                address: [
                    { required: true, message: '请输入地址!' },
                ],
                number: [
                    { required: true, message: '请输入数量!' },
                ],
                manager_company: [
                    { required: true, message: '请输入管理公司!' },
                ],
                manager_contact: [
                    { required: true, message: '请输入管理员联系方式!' },
                ],
                repair_company: [
                    { required: true, message: '请输入维保公司!' },
                ],
                repair_contact: [
                    { required: true, message: '请输入维保人员联系方式!' },
                ],
            },
        };
    },
    methods: {
        //添加设备
        addQuyu() {
            let validator = new this.$validator(this.formRule);
            let model = this.form;
            validator.validate(model, async (errors, fields) => {
                if (!errors) {
                    let res = await createRegion(this.form);
                    if (res.code == 200) {
                        this.$layer.alert(res.message);
                        this.region();
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
        editItem(i) {
            // console.log(this.list[i]);
            // return ;
            this.form = {
                id: this.list[i].id,
                region_name: this.list[i].region_name,
                address: this.list[i].address,
                number: this.list[i].number,
                manager_company: this.list[i].manager_company,
                manager_contact: this.list[i].manager_contact,
                repair_company: this.list[i].repair_company,
                repair_contact: this.list[i].repair_contact
            }
            this.openPop();
        },
        openPop() {
            this.dialogFormVisible = !this.dialogFormVisible;
            if (!this.dialogFormVisible) {
                this.form = {
                    id: '',
                    region_name: '',
                    address: '',
                    number: '',
                    manager_company: '',
                    manager_contact: '',
                    repair_company: '',
                    repair_contact: ''
                }
            }
        },
        //获取区域列表
        async region() {
            let res = await region({
                page: 1,
                pagesize: 10000
            });
            if (res.code == 200) {
                this.list = res.data.list
            }
        },
        //删除区域
        delRegion(index) {
            this.$layer.confirm('确定删除此区域么？', async (i) => {
                let res = await delRegion({
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
        gotoDetail(index) {
            this.$router.push({
                name: 'sbList',
                params: { id: this.list[index].id },
                query: { name: this.list[index].region_name }
            });
        }
    },
    created() {
        this.region();
    }
}
</script>

<style lang="scss" scoped="">
</style>
