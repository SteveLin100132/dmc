/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 環境參數資料模型
 * @CREATE Tuesday, 14th September 2021 10:46:25 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/* eslint-disable camelcase */

/**
 * 環境參數資料模型
 */
export interface Enviroment {
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
   * 環境參數類型
   */
  Type: string;
  /**
   * 環境地點
   */
  Location: string;
  /**
   * 環境參數數值
   */
  Number: number;
  /**
   * 上拋時間戳
   */
  UploadTime: number;
}
