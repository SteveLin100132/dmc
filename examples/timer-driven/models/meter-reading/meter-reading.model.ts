/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 電表讀值資料模型
 * @CREATE Monday, 13th September 2021 8:24:22 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/* eslint-disable camelcase */

/**
 * 電表讀值資料模型
 */
export interface MeterReading {
  /**
   * 時間戳
   */
  evt_dt: number;
  /**
   * 發送來源
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
   * 電表 ID
   */
  meterId: string;
  /**
   * 電表讀值
   */
  reading: number;
}
