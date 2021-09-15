/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警上拋資料結果資料模型
 * @CREATE Tuesday, 14th September 2021 1:04:04 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { AlarmModel } from './../alarm';

/**
 * 報警上拋資料結果資料模型
 */
export interface AlarmPayload<P = AlarmModel> {
  /**
   * 錯誤訊息
   */
  error?: any;
  /**
   * 上拋資料
   */
  result: P;
}
