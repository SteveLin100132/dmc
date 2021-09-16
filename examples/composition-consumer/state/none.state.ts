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
import { Composition } from '../models';
import { Level4State } from './level4.state';

/**
 * 未達報警狀態
 */
export class NoneState extends AlarmState {
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
  public change(alarm: Alarm<Composition>): void | Promise<void> {
    const temperature = alarm.data.WD;
    const humidity = alarm.data.SD;
    if (temperature > this._temperature && humidity > this._humidity) {
      // 溫度超過 30 度且濕度超過 70%，升級報警至 L4
      this.logger.info(
        `${alarm.key} temperature: ${temperature} over ${this._temperature} and humdity: ${humidity} over ${this._humidity} update to L4`,
      );
      alarm.updateLevel(new Level4State());
    }
  }
}
