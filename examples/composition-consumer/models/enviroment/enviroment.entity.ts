/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 環境參數資料實體
 * @CREATE Tuesday, 14th September 2021 10:50:57 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Enviroment } from './enviroment.model';

/**
 * 環境參數資料實體
 */
export class EnviromentEntity implements Enviroment {
  /**
   * 時間戳
   */
  public inj_dt = new Date().getTime();
  /**
   * 廠別代碼
   */
  public Plant = '';
  /**
   * 建築
   */
  public Building = '';
  /**
   * 參數名稱
   */
  public NAME = '';
  /**
   * 環境參數類型
   */
  public Type = '';
  /**
   * 環境地點
   */
  public Location = '';
  /**
   * 環境參數數值
   */
  public Number = 0;
  /**
   * 上拋時間戳
   */
  public UploadTime = new Date().getTime();

  /**
   * @param env 環境參數資料
   */
  constructor(env?: Partial<Enviroment>) {
    Object.assign(this, env);
  }
}
