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
import { Composition } from '../models';
import { Level3State } from './level3.state';
import { NoneState } from './none.state';

/**
 * L4 報警狀態
 */
export class Level4State extends AlarmState {
  /**
   * 報警閥值(溫度超過 30 度)
   */
  private _temperature = 30;
  /**
   * 報警閥值(濕度超過 70 度)
   */
  private _humidity = 28;
  /**
   * 報警持續上線時間(5 秒)
   */
  private _timeBounce = 1000 * 5;
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
  public change(alarm: Alarm<Composition>): void | Promise<void> {
    const temperature = alarm.data.WD;
    const humidity = alarm.data.SD;
    const current = new Date().getTime();
    if (current - alarm.timestamp >= this._timeBounce) {
      // 溫度超過 30 度且濕度超過 70%，持續 5 秒鐘，升級報警至 L3
      this.logger.info(
        `${alarm.key} temperature: ${temperature} over ${this._temperature} and humdity: ${humidity} over ${this._humidity} in 5sec update to L3`,
      );
      alarm.updateLevel(new Level3State());
    } else if (temperature <= this._temperature && humidity <= this._humidity) {
      // 溫度低於 30 度且濕度超過 70%，報警解除
      this.logger.info(
        `${alarm.key} temperature: ${temperature} less than ${this._temperature} and humdity: ${humidity} less than ${this._humidity} released`,
      );
      alarm.updateLevel(new NoneState());
    }
  }
}
