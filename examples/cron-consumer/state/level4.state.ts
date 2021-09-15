/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： L4 報警狀態
 * @CREATE Wednesday, 15th September 2021 11:16:33 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as dayjs from 'dayjs';
import { Alarm, AlarmLevel, AlarmState } from '../../../lib';
import { RawConsumption } from '../models';
import { Level3State } from './level3.state';
import { NoneState } from './none.state';

/**
 * L4 報警狀態
 */
export class Level4State extends AlarmState {
  /**
   * 報警閥值(沒有收到數據超過 60 分鐘)
   */
  private _threshold = 1000 * 60 * 60;
  /**
   * 報警解除閥值(近 20 分鐘內有數據產生)
   */
  private _released = 1000 * 60 * 20;
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
  public change(alarm: Alarm<RawConsumption>): void | Promise<void> {
    const current = new Date().getTime();
    const timetstamp = dayjs(alarm.data.evt_dt).format('YYYY-MM-DD hh:mm:ss');
    if (current - alarm.data.evt_dt > this._threshold) {
      // 超過 60 分鐘沒有收到數據，升級報警至 L3
      this.logger.info(`${alarm.key} ${timetstamp} over 60min update to L3`);
      alarm.updateLevel(new Level3State());
    } else if (current - alarm.data.evt_dt <= this._released) {
      // 近 20 分鐘內有數據，報警解除
      this.logger.info(`${alarm.key} ${timetstamp} less 20min released`);
      alarm.updateLevel(new NoneState());
    }
  }
}
