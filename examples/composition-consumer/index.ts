/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 複合式資料消費者報警範例
 * @CREATE Thursday, 16th September 2021 10:35:32 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Log4js } from '../../lib';
import { CompositionConsumerService } from './composition-consumer.service';

const logger = new Log4js('COMPOSITE');
const alarmService = new CompositionConsumerService('composite');
alarmService.execute().subscribe(res => logger.trace(JSON.stringify(res)));
