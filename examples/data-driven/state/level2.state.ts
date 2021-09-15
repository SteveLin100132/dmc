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
   * 報警閥值(溫度超過 40 度)
   */
  private _threshold = 40;
  /**
   * 報警解除閥值(溫度低於 28 度)
   */
  private _released = 28;
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
    if (temperature > this._threshold) {
      // 溫度超過 40 度，升級報警至 L1
      this.logger.info(
        `${alarm.key} ${temperature} over ${this._threshold} update to L1`,
      );
      alarm.updateLevel(new Level1State());
    } else if (temperature <= this._released) {
      // 溫度低於 28 度，報警解除
      this.logger.info(
        `${alarm.key} ${temperature} less than ${this._released} released`,
      );
      alarm.updateLevel(new NoneState());
    }
  }
}
