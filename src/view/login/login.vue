<template>
    <div class="login-container">
        <div class="login-main">
            <div class="login-hd">
                <i class="login-icon"></i>
                <span>电梯物联监控中心</span>
            </div>
            <div class="login-box">
                <div class="login-tit">欢迎登录</div>
                <div class="login-form">
                    <div class="form-inner">
                        <div class="form-row">
                            <i class="el-icon-user"></i>
                            <div class="input-txt">
                                <input type="text"
                                       v-model="form.account"
                                       placeholder="用户名称">
                            </div>
                        </div>
                        <div class="form-row">
                            <i class="el-icon-lock"></i>
                            <div class="input-txt">
                                <input type="password"
                                       v-model="form.password"
                                       placeholder="用户密码">
                            </div>
                        </div>
                    </div>
                    <el-button @click="login"
                               type="primary">登&nbsp;&nbsp;录</el-button>
                    <!-- <div class="login-handle">
                        <div class="is-check-item">
                            <el-checkbox>记住用户</el-checkbox>
                        </div>
                        <div class="forgot-pwd">忘记密码？</div>
                    </div> -->
                </div>
            </div>
            <div class="login-tipper">
                Powered by 水珠物联
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '../../api/index.js';
import { mapMutations, mapState } from 'vuex';
export default {
    data() {
        return {
            form: {
                account: '',
                password: ''
            },
            loginRule: {
                account: [
                    { required: true, message: '请输入账号!' },
                ],
                password: [
                    { required: true, message: '请输入验证码!' },
                ]
            },
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        async login() {
            let validator = new this.$validator(this.loginRule);
            let model = this.form;
            validator.validate(model, async (errors, fields) => {
                if (!errors) {
                    let res = await login(this.form);
                    if (res.code == 200) {
                        this.setUserInfo(res.data);
                        // console.log(this.userInfo);
                        this.$router.push('/houtai');
                        // this.$layer.alert(res.message);
                    } else {
                        this.$layer.alert(res.message);
                    }
                    // this.$layer.alert(errors[0].message);
                } else {
                    this.$layer.alert(errors[0].message);
                }
            });

        }
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100%;
    background: #4097f1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-hd {
    color: #fff;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0 30px;
    .login-icon {
        width: 79px;
        height: 120px;
        display: inline-block;
        margin-right: 35px;
        background: url('../../assets/images/logo.png') no-repeat center center;
        background-size: contain;
    }
}

.login-box {
    width: 480px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    .login-tit {
        height: 90px;
        line-height: 90px;
        text-align: center;
        font-size: 16px;
        color: #066fc0;
        background: #f6f7fb;
        border-bottom: 1px solid #cad6e1;
    }
    .login-form {
        padding: 15px 50px 40px;
        .el-button {
            width: 100%;
            padding: 17px 20px;
            border-radius: 0;
            box-shadow: 0 0 10px rgba(74, 172, 247, 0.4);
            border: 0;
        }
    }
    .form-inner {
        margin-bottom: 40px;
    }
    .form-row {
        height: 30px;
        line-height: 30px;
        padding: 15px 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #cad6e1;
        i {
            color: #a2b6c7;
            margin-right: 25px;
        }
        .input-txt {
            flex: 1;
            input {
                width: 96%;
                line-height: 30px;
                border: 0;
                outline: none;
                display: block;
                background-color: transparent;
            }
        }
    }
    .login-handle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0 0;
        font-size: 14px;
        color: #a2b6c7;
    }
    .is-check-item {
        display: flex;
        align-items: center;
        .el-checkbox {
            color: #a2b6c7;
        }
    }
}
.login-tipper {
    color: #fff;
    text-align: center;
    padding: 25px 0;
}
</style>
