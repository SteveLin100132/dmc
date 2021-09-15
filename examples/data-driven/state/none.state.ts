/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 未達報警狀態
 * @CREATE Tuesday, 14th September 2021 11:02:43 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Alarm, AlarmLevel, AlarmState } from '../../../lib';
import { Enviroment } from '../models';
import { Level4State } from './level4.state';

/**
 * 未達報警狀態
 */
export class NoneState extends AlarmState {
  /**
   * 報警閥值(溫度超過 28 度)
   */
  private _threshold = 28;
  /**
   * 報警等級
   */
  public level: AlarmLevel = null;

  constructor() {
    super('NONE.STATE');
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
      this.logger.info(
        `${alarm.key} ${temperature} over ${this._threshold} update to L4`,
      );
      alarm.updateLevel(new Level4State());
    }
  }
}
