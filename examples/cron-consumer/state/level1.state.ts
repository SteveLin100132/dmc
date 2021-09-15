/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： L1 報警狀態
 * @CREATE Wednesday, 15th September 2021 11:16:33 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as dayjs from 'dayjs';
import { Alarm, AlarmLevel, AlarmState } from '../../../lib';
import { RawConsumption } from '../models';
import { NoneState } from './none.state';

/**
 * L1 報警狀態
 */
export class Level1State extends AlarmState {
  /**
   * 報警解除閥值(近 20 分鐘內有數據產生)
   */
  private _released = 1000 * 60 * 20;
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
  public change(alarm: Alarm<RawConsumption>): void | Promise<void> {
    const current = new Date().getTime();
    const timetstamp = dayjs(alarm.data.evt_dt).format('YYYY-MM-DD hh:mm:ss');
    if (current - alarm.data.evt_dt <= this._released) {
      // 近 20 分鐘內有數據，報警解除
      this.logger.info(`${alarm.key} ${timetstamp} less 20min released`);
      alarm.updateLevel(new NoneState());
    }
  }
}
