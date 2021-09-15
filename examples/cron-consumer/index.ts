/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 排程資料消費者報警範例
 * @CREATE Wednesday, 15th September 2021 8:00:55 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Log4js } from '../../lib';
import { CronConsumerService } from './cron-consumer.service';

const logger = new Log4js('RAW_CONSUMPTION');
const alarmService = new CronConsumerService('raw-consumption');
alarmService.execute().subscribe(res => logger.trace(JSON.stringify(res)));
