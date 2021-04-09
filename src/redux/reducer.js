import {combineReducers} from "redux";
import {SET_HEAD_TITLE, SET_COLLAPSED} from "./action-types";

// 管理左边菜单的展开和缩放
function collapsed(state = false, action) {
    switch (action.type) {
        case SET_COLLAPSED:
            return action.data
        default:
            return state
    }
}

// 管理头部标题
function headTitle(state = '', action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    collapsed
})
