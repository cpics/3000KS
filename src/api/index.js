import fetch from '../common/fetch/index';

export const domain = '//holy.365dianti.com/index/index';
// export const domain = '//192.168.222.55:91/index/index';

//登录
export const login = params => fetch.post(`${domain}/login`, params);

//首页
export const getIndex = params => fetch.post(`${domain}`, params);

//添加区域
export const createRegion = params =>
    fetch.post(`${domain}/createRegion`, params);

//区域列表
export const region = params => fetch.post(`${domain}/region`, params);

//删除区域
export const delRegion = params => fetch.post(`${domain}/delRegion`, params);

//设备列表
export const machine = params => fetch.post(`${domain}/machine`, params);

//添加设备
export const createMachine = params =>
    fetch.post(`${domain}/createMachine`, params);

//删除设备
export const delMachine = params => fetch.post(`${domain}/delMachine`, params);

//终端列表
export const terminal = params => fetch.post(`${domain}/terminal`, params);

//添加修改终端
export const createTerminal = params =>
    fetch.post(`${domain}/createTerminal`, params);

//删除终端
export const delTerminal = params =>
    fetch.post(`${domain}/delTerminal`, params);

//设备详情
export const basicDetail = params => fetch.post(`${domain}/basic`, params);

//实时状态
export const apparatus = params => fetch.post(`${domain}/apparatus`, params);

//设备故障
export const faultAlarm = params => fetch.post(`${domain}/faultAlarm`, params);

//详情页图表数据
export const popchart = params => fetch.post(`${domain}/popchart`, params);
