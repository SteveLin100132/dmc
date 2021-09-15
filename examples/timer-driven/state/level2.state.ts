/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： L2 報警狀態
 * @CREATE Monday, 13th September 2021 9:24:14 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as dayjs from 'dayjs';
import { Alarm, AlarmLevel, AlarmState } from '../../../lib';
import { MeterReading } from '../models';
import { Level1State } from './level1.state';
import { NoneState } from './none.state';

/**
 * L2 報警狀態
 */
export class Level2State extends AlarmState {
  /**
   * 報警閥值(沒有收到數據超過 120 分鐘)
   */
  private _threshold = 1000 * 60 * 120;
  /**
   * 報警解除閥值(近 20 分鐘內有數據產生)
   */
  private _released = 1000 * 60 * 20;
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
  public change(alarm: Alarm<MeterReading>): void | Promise<void> {
    const current = new Date().getTime();
    const timetstamp = dayjs(alarm.data.evt_dt).format('YYYY-MM-DD hh:mm:ss');
    if (current - alarm.data.evt_dt > this._threshold) {
      // 超過 90 分鐘沒有收到數據，升級報警至 L2
      this.logger.info(`${alarm.key} ${timetstamp} over 120min update to L1`);
      alarm.updateLevel(new Level1State());
    } else if (current - alarm.data.evt_dt <= this._released) {
      // 近 20 分鐘內有數據，報警解除
      this.logger.info(`${alarm.key} ${timetstamp} less 20min released`);
      alarm.updateLevel(new NoneState());
    }
  }
}
