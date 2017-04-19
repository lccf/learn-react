import { createAction } from 'redux-actions';
import { filterRequestModel, externalCallbackModel } from './model';
// panel
export const ACTION_SHOW_PANEL = 'ACTION_SHOW_PANEL';
export const actionShowPanel = createAction(
  ACTION_SHOW_PANEL
);

export const ACTION_HIDE_PANEL = 'ACTION_HIDE_PANEL';
export const actionHidePanel = createAction(
  ACTION_HIDE_PANEL
)
// 显示二级菜单
export const ACTION_SHOW_FILTER = 'ACTION_SHOW_FILTER';
export const actionShowFilter = createAction(
  ACTION_SHOW_FILTER,
  (code: string | number) => ({ code })
)
export const ACTION_HIDE_FILTER = 'ACTION_HIDE_FILTER';
export const actionHideFilter = createAction(
  ACTION_HIDE_FILTER,
  (code: string | number) => ({ code })
)
// 显示分类
export const ACTION_SHOW_CATE = 'ACTION_SHOW_CATE';
export const actionShowCate = createAction(
  ACTION_SHOW_CATE,
  (showCate: boolean) => ({ showCate })
)
// 隐藏分类
export const ACTION_HIDE_CATE = 'ACTION_HIDE_CATE';
export const actionHideCate = createAction(
  ACTION_HIDE_CATE,
  (text: string) => ({ text })
)
// 展开分类
export const ACTION_EXPAND_CATE = 'ACTION_EXPAND_CATE';
export const actionExpandCate = createAction(
  ACTION_EXPAND_CATE,
  (cateId: string, level: number) => ({ cateId, level })
)
// 变更筛选项
export const ACTION_UPDATE_FILTER = 'ACTION_UPDATE_FILTER';
export const actionUpdateFilter = createAction(
  ACTION_UPDATE_FILTER,
  (data: any) => data
);
// 测试动作
export const ACTION_TEST = 'ACTION_TEST';
export const actionTest = createAction(
  ACTION_TEST,
  (cateId: string) => ({ cateId })
);
// 重置筛选项
export const ACTION_RESET = 'ACTION_RESET';
export const actionReset = createAction(
  ACTION_RESET
);
// 清理当前分级选项
export const ACTION_CLEAR_FILTER = 'ACTION_CLEAR_FILTER';

// 确认筛选
export const ACTION_OK = 'ACTION_OK';
export const actionOk = createAction(
  ACTION_OK
);