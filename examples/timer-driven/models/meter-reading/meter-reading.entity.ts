/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 電表讀值資料實體
 * @CREATE Monday, 13th September 2021 8:25:47 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/* eslint-disable camelcase */

import { MeterReading } from './meter-reading.model';

/**
 * 電表讀值資料實體
 */
export class MeterReadingEntity implements MeterReading {
  /**
   * 時間戳
   */
  public evt_dt = new Date().getTime();
  /**
   * 發送來源
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
   * 電表 ID
   */
  public meterId = '';
  /**
   * 電表讀值
   */
  public reading = 0;

  /**
   * @param reading 電表讀值資料
   */
  constructor(reading?: Partial<MeterReading>) {
    Object.assign(this, reading);
  }
}
