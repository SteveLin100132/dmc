/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 電表差值資料模型
 * @CREATE Wednesday, 15th September 2021 8:07:19 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/* eslint-disable camelcase */

/**
 * 電表差值資料模型
 */
export interface RawConsumption {
  /**
   * 用電差值上拋時間戳
   */
  evt_dt: number;
  /**
   * 電表拋送來源
   */
  evt_pubBy: string;
  /**
   * 電表所屬 Site
   */
  site: string;
  /**
   * 電表所屬建築
   */
  building: string;
  /**
   * 電表標記
   */
  probe: string;
  /**
   * 電表 ID
   */
  meterId: string;
  /**
   * 電表讀數
   */
  reading: number;
  /**
   * 前一筆電表讀值上拋時間
   */
  pre_evtDt: number;
  /**
   * 前一筆電表讀值
   */
  preReading: number;
  /**
   * 電表差值相距時間
   */
  duration: number;
  /**
   * 電表差值
   */
  consumption: number;
}
