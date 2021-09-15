/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警儲存資料模型
 * @CREATE Tuesday, 14th September 2021 8:02:13 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { AlarmLevel } from './../../models';

/**
 * 報警儲存資料模型
 */
export interface AlarmStorage<D = any> {
  /**
   * 報警等級
   */
  level: AlarmLevel;
  /**
   * 報警觸發時間
   */
  timestamp: number;
  /**
   * 報警資料
   */
  entity: D;
}
