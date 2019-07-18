<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'app',
    components: {},
    methods: {

    },
    mounted() {
    }
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

html,
body {
    zoom: 1;
}

html {
    -webkit-text-size-adjust: none;
}

body {
    color: #333;
    font: 14px/1.5 'Microsoft Yahei', 'Helvetica Neue', Helvetica, Arial,
        STHeiTi, sans-serif;
}

html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
    margin: 0;
    padding: 0;
}

ul li {
    list-style-type: none;
    vertical-align: bottom;
}

img {
    border: 0 none;
    vertical-align: top;
}

a {
    text-decoration: none;
    outline: 0 none;
    cursor: pointer;
    vertical-align: top;
}

a:hover {
    text-decoration: underline;
}

ol,
ul {
    list-style: none outside none;
}

li {
    list-style-type: none;
}

address,
caption,
cite,
code,
dfn,
em,
i,
strong,
th,
var,
optgroup {
    font-style: normal;
    font-weight: normal;
}

a,
input {
    outline: 0 none;
}

label {
    vertical-align: middle;
}

table {
    table-layout: fixed;
}
::-webkit-input-placeholder {
    color: #a2b6c7;
}

:-moz-placeholder {
    color: #a2b6c7;
}

::-moz-placeholder {
    color: #a2b6c7;
}

:-ms-input-placeholder {
    color: #a2b6c7;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
}

/*主题*/
.el-container {
    display: flex;
    width: 100%;
    height: 100%;
}

.el-header {
    background-color: #fff;
    color: #555;
    font-size: 18px;
    text-align: left;
    line-height: 60px;
    padding-left: 60px !important;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-tit {
        font-weight: normal;
    }
    .m-head-handle {
        display: flex;
        align-items: center;
        .handle-col {
            position: relative;
            padding: 0 20px;
            &:before {
                position: absolute;
                left: 0;
                top: 40%;
                content: '';
                width: 0;
                height: 20%;
                border-left: 1px solid #d0dee9;
            }
            &:first-child {
                &:before {
                    border-left: 0;
                }
            }
            .el-badge,
            .el-icon-switch-button {
                cursor: pointer;
            }
        }
        .el-badge {
            .el-badge__content.is-fixed {
                top: 16px;
            }
        }
        .user-face {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;
            cursor: pointer;
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}

.el-aside {
    height: 100%;
    color: #fff;
    background: #096ec0;
    .aside-tit {
        font-size: 18px;
        color: #fff;
        height: 80px;
        line-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #0669bc;
        .logo-small-icon {
            width: 31px;
            height: 44px;
            display: inline-block;
            margin-right: 10px;
            background: url('assets/images/logo.png') no-repeat center center;
            background-size: contain;
        }
    }
    .el-menu {
        border-right: 0;
    }
    .el-submenu__icon-arrow {
        font-size: 16px;
    }
    .el-submenu__title {
        i {
            color: #fff;
        }
    }
    .el-menu-item {
        border-left: 2px solid transparent;
        a {
            width: 100%;
            height: 100%;
            color: #fff;
            display: block;
            &:hover {
                text-decoration: none;
            }
        }
        &.is-active {
            background: #4090cd !important;
            border-left: 2px solid #3de8fa;
            box-sizing: border-box;
        }
    }
    .u-slide-icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        margin-right: 8px;
        &.s-home-icon {
            background: url('assets/images/home.png') no-repeat center center;
            background-size: contain;
        }
        &.s-facility-icon {
            background: url('assets/images/facility.png') no-repeat center
                center;
            background-size: contain;
        }
        &.s-function-icon {
            background: url('assets/images/function.png') no-repeat center
                center;
            background-size: contain;
        }
        &.s-urgency-icon {
            background: url('assets/images/urgency.png') no-repeat center center;
            background-size: contain;
        }
        &.s-loop-icon {
            background: url('assets/images/loop.png') no-repeat center center;
            background-size: contain;
        }
    }
}

.el-main {
    color: #333;
    background-color: #e7eaef;
}

body > .el-container {
    margin-bottom: 40px;
}

.g-container {
    min-width: 1200px;
    background: #fff;
    /*menu*/
    .el-menu {
        &.el-menu--horizontal {
            border-bottom: 1px solid #d0dee9 !important;
        }
        .el-menu-item {
            position: relative;
            min-width: 180px;
            text-align: center;
            &:before {
                position: absolute;
                left: 0;
                top: 35%;
                content: '';
                width: 0;
                height: 30%;
                border-left: 1px solid #d0dee9;
            }
            &:first-child {
                &:before {
                    border-left: 0;
                }
            }
        }
    }
    .el-menu--horizontal > .el-menu-item {
        border-bottom: 0;
    }
    .el-menu--horizontal > .el-menu-item.is-active,
    .el-menu--horizontal > .el-menu-item:active {
        color: #066fc0 !important;
        border-bottom: 0 !important;
    }
    .el-breadcrumb {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #d0dee9;
        .el-breadcrumb__item {
            position: relative;
            min-width: 140px;
            padding: 0 20px;
            text-align: center;
            &.active {
                .el-breadcrumb__inner {
                    color: #066fc0;
                }
            }
            &:before {
                position: absolute;
                left: -1px;
                top: 35%;
                content: '';
                width: 0;
                height: 30%;
                border-left: 1px solid #d0dee9;
            }
            &:first-child {
                &:before {
                    border-left: 0;
                }
            }
            .el-breadcrumb__separator {
                display: none;
            }
        }
        .el-breadcrumb__inner a,
        .el-breadcrumb__inner.is-link {
            font-weight: normal;
        }
    }
}

.g-main {
    padding: 15px 30px 20px;
    .el-table thead {
        color: #066fc0;
    }
}
.g-main-second {
    padding: 5px 30px 0;
    .el-table thead {
        color: #066fc0;
    }
    .line-tabs {
        .el-tabs__nav-wrap {
            .el-tabs__item {
                padding: 0 20px;
                min-width: auto !important;
                &:before {
                    border-left: 0;
                }
            }
        }
    }
}
.m-second-main {
    padding: 0 20px 20px;
    overflow-x: auto;
}
/*tab*/
.line-tabs {
    &.el-tabs__header {
        margin-bottom: 0;
    }
    .el-tabs__nav-wrap::after {
        height: 1px;
        background-color: #d0dee9 !important;
    }
    .el-tabs__nav-wrap {
        .el-tabs__item {
            position: relative;
            min-width: 200px;
            text-align: center;
            padding: 0;
            height: 60px;
            line-height: 60px;
            outline: none;
            &:before {
                position: absolute;
                left: -1px;
                top: 35%;
                content: '';
                width: 0;
                height: 30%;
                border-left: 1px solid #d0dee9;
            }
            &:first-child {
                &:before {
                    border-left: 0;
                }
            }
        }
        .el-tabs__active-bar {
            height: 0;
            display: none;
        }
    }
}

.button-tab {
    display: flex;
    .el-button {
        flex: 1;
        margin-left: 15px;
        border-radius: 0;
        border: 0;
        height: 40px;
        &:first-of-type {
            margin-left: 0;
        }
        &.active {
            background: #00a0e9;
        }
    }
}
.el-dialog {
    .el-form {
        padding-right: 40px;
        max-height: 500px;
        overflow-y: auto;
        .el-input {
            &.w-200 {
                width: 200px;
            }
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner,
        .el-select {
            &.w-full {
                width: 100%;
            }
        }
    }
}
.chart-dialog {
    .el-dialog {
        width: 80%;
        height: 80%;
        color: #fff;
        background: #333 !important;
    }
    .el-dialog__title,
    .el-dialog__body {
        color: #fff;
    }

    
}
</style>
