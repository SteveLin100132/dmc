/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： L1 報警狀態
 * @CREATE Tuesday, 14th September 2021 11:12:33 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Alarm, AlarmLevel, AlarmState } from '../../../lib';
import { Enviroment } from '../models';
import { NoneState } from './none.state';

/**
 * L1 報警狀態
 */
export class Level1State extends AlarmState {
  /**
   * 報警解除閥值(溫度低於 28 度)
   */
  private _released = 28;
  /**
   * 報警等級
   */
  public level: AlarmLevel = 'L1';

  constructor() {
    super('L1.STATE');
  }

  /**
   * 更新報警
   *
   * @method public
   * @param alarm 報警狀態
   */
  public change(alarm: Alarm<Enviroment>): void | Promise<void> {
    const temperature = alarm.data.Number;
    if (temperature <= this._released) {
      // 溫度低於 28 度，報警解除
      this.logger.info(
        `${alarm.key} ${temperature} less than ${this._released} released`,
      );
      alarm.updateLevel(new NoneState());
    }
  }
}
