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
import { Composition } from '../models';
import { NoneState } from './none.state';

/**
 * L1 報警狀態
 */
export class Level1State extends AlarmState {
  /**
   * 報警閥值(溫度超過 30 度)
   */
  private _temperature = 30;
  /**
   * 報警閥值(濕度超過 70 度)
   */
  private _humidity = 28;
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
  public change(alarm: Alarm<Composition>): void | Promise<void> {
    const temperature = alarm.data.WD;
    const humidity = alarm.data.SD;
    if (temperature <= this._temperature && humidity <= this._humidity) {
      // 溫度低於 30 度且濕度超過 70%，報警解除
      this.logger.info(
        `${alarm.key} temperature: ${temperature} less than ${this._temperature} and humdity: ${humidity} less than ${this._humidity} released`,
      );
      alarm.updateLevel(new NoneState());
    }
  }
}
