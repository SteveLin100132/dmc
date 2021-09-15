/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 電表差值資料實體
 * @CREATE Wednesday, 15th September 2021 8:10:07 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/* eslint-disable camelcase */

import { RawConsumption } from './raw-consumption.model';

/**
 * 電表差值資料實體
 */
export class RawConsumptionEntity implements RawConsumption {
  /**
   * 用電差值上拋時間戳
   */
  public evt_dt = new Date().getTime();
  /**
   * 電表拋送來源
   */
  public evt_pubBy = '';
  /**
   * 電表所屬 Site
   */
  public site = '';
  /**
   * 電表所屬建築
   */
  public building = '';
  /**
   * 電表標記
   */
  public probe = '';
  /**
   * 電表 ID
   */
  public meterId = '';
  /**
   * 電表讀數
   */
  public reading = 0;
  /**
   * 前一筆電表讀值上拋時間
   */
  public pre_evtDt = new Date().getTime();
  /**
   * 前一筆電表讀值
   */
  public preReading = 0;
  /**
   * 電表差值相距時間
   */
  public duration = 0;
  /**
   * 電表差值
   */
  public consumption = 0;

  /**
   * @param raw 電表差值資料
   */
  constructor(raw?: Partial<RawConsumption>) {
    Object.assign(this, raw);
  }
}
