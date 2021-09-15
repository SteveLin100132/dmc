/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警範本設定檔資料模型
 * @CREATE Tuesday, 14th September 2021 1:41:54 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { RetryOption } from 'wistroni40-retry';

/**
 * 報警範本設定檔資料模型
 */
export interface AlarmConfig<C = any> {
  /**
   * 重新拋送機制配置
   */
  retry?: RetryOption;
  /**
   * 客製設定
   */
  custom?: C;
}
