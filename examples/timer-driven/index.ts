/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 時間驅動報警範例
 * @CREATE Friday, 10th September 2021 11:39:02 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Log4js } from '../../lib';
import { TimerDrivenService } from './timer-driven.service';

const logger = new Log4js('POWER_METER');
const alarmService = new TimerDrivenService('power-meter');
alarmService.execute().subscribe(res => logger.trace(JSON.stringify(res)));
