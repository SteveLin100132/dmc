/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： L2 報警狀態
 * @CREATE Tuesday, 14th September 2021 11:11:20 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Alarm, AlarmLevel, AlarmState } from '../../../lib';
import { Enviroment } from '../models';
import { Level1State } from './level1.state';
import { NoneState } from './none.state';

/**
 * L2 報警狀態
 */
export class Level2State extends AlarmState {
  /**
   * 報警閥值(溫度超過 28 度)
   */
  private _threshold = 28;
  /**
   * 報警持續上線時間(5 秒)
   */
  private _timeBounce = 1000 * 5;
  /**
   * 報警等級
   */
  public level: AlarmLevel = 'L2';

  constructor() {
    super('L2.STATE');
  }

  /**
   * 更新報警
   *
   * @method public
   * @param alarm 報警狀態
   */
  public change(alarm: Alarm<Enviroment>): void | Promise<void> {
    const temperature = alarm.data.Number;
    const current = new Date().getTime();
    if (
      temperature > this._threshold &&
      current - alarm.timestamp >= this._timeBounce
    ) {
      // 溫度超過 28 度，持續 5 秒鐘，升級報警至 L1
      this.logger.info(
        `${alarm.key} ${temperature} over ${this._threshold} update in 5sec to L1`,
      );
      alarm.updateLevel(new Level1State());
    } else if (temperature <= this._threshold) {
      // 溫度低於 28 度，報警解除
      this.logger.info(
        `${alarm.key} ${temperature} less than ${this._threshold} released`,
      );
      alarm.updateLevel(new NoneState());
    }
  }
}
