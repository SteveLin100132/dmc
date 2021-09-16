/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 合成資料資料實體
 * @CREATE Thursday, 16th September 2021 11:39:57 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/* eslint-disable camelcase */

import { Enviroment } from '../enviroment';
import { Composition } from './composition.model';

/**
 * 合成資料資料實體
 */
export class CompositionEntity implements Composition {
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
   * 環境地點
   */
  public Location = '';
  /**
   * 環境溫度數值
   */
  public WD = 0;
  /**
   * 環境濕度數值
   */
  public SD = 0;

  /**
   * @param composition 合成資料
   */
  constructor(composition: Composition) {
    Object.assign(this, composition);
  }

  /**
   * 更新數據
   *
   * @method public
   * @param type 環境參數類型
   * @param env  環境參數資料
   * @return 回傳物件本身
   */
  public update(type: 'wd' | 'sd' | string, env: Enviroment): this {
    this.inj_dt = env.inj_dt;
    this.Plant = env.Plant;
    this.Building = env.Building;
    this.NAME = env.NAME;
    this.Location = env.Location;
    this.WD = type === 'wd' ? env.Number : this.WD;
    this.SD = type === 'sd' ? env.Number : this.SD;
    return this;
  }
}
