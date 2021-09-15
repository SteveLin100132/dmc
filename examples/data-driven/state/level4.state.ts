/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： L4 報警狀態
 * @CREATE Tuesday, 14th September 2021 11:04:46 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Alarm, AlarmLevel, AlarmState } from '../../../lib';
import { Enviroment } from '../models';
import { Level3State } from './level3.state';
import { NoneState } from './none.state';

/**
 * L4 報警狀態
 */
export class Level4State extends AlarmState {
  /**
   * 報警閥值(溫度超過 32 度)
   */
  private _threshold = 32;
  /**
   * 報警解除閥值(溫度低於 28 度)
   */
  private _released = 28;
  /**
   * 報警等級
   */
  public level: AlarmLevel = 'L4';

  constructor() {
    super('L4.STATE');
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
      // 溫度超過 32 度，升級報警至 L3
      this.logger.info(
        `${alarm.key} ${temperature} over ${this._threshold} update to L3`,
      );
      alarm.updateLevel(new Level3State());
    } else if (temperature <= this._released) {
      // 溫度低於 28 度，報警解除
      this.logger.info(
        `${alarm.key} ${temperature} less than ${this._released} released`,
      );
      alarm.updateLevel(new NoneState());
    }
  }
}
