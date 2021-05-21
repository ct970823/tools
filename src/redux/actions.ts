import {SET_HEAD_TITLE, SET_COLLAPSED} from "./action-types";
// import {message} from "antd";

//设置左边菜单栏的展开和缩放
export const setCollapsed = (collapsed:Boolean) => ({type: SET_COLLAPSED, data: collapsed})
// 设置头部标题的同步action
export const setHeadTitle = (headTitle:String) => ({type: SET_HEAD_TITLE, data: headTitle})
