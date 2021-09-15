/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 未達報警狀態
 * @CREATE Monday, 13th September 2021 8:21:09 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as dayjs from 'dayjs';
import { Alarm, AlarmLevel, AlarmState } from '../../../lib';
import { MeterReading } from '../models';
import { Level4State } from './level4.state';

/**
 * 未達報警狀態
 */
export class NoneState extends AlarmState {
  /**
   * 報警閥值(沒有收到數據超過 20 分鐘)
   */
  private _threshold = 1000 * 60 * 20;
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
  public change(alarm: Alarm<MeterReading>): void | Promise<void> {
    const current = new Date().getTime();
    const timetstamp = dayjs(alarm.data.evt_dt).format('YYYY-MM-DD hh:mm:ss');
    if (current - alarm.data.evt_dt > this._threshold) {
      this.logger.info(`${alarm.key} ${timetstamp} over 20min update to L4`);
      alarm.updateLevel(new Level4State());
    }
  }
}
