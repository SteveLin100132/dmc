/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 合成資料資料模型
 * @CREATE Thursday, 16th September 2021 10:51:30 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/* eslint-disable camelcase */

/**
 * 合成資料資料模型
 */
export interface Composition {
  /**
   * 時間戳
   */
  inj_dt: number;
  /**
   * 廠別代碼
   */
  Plant: string;
  /**
   * 建築
   */
  Building: string;
  /**
   * 參數名稱
   */
  NAME: string;
  /**
   * 環境地點
   */
  Location: string;
  /**
   * 環境溫度數值
   */
  WD: number;
  /**
   * 環境濕度數值
   */
  SD: number;
}
