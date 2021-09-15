/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 資料驅動報警範例
 * @CREATE Tuesday, 14th September 2021 10:42:33 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Log4js } from '../../lib';
import { DataDrivenService } from './data-driven.service';

const logger = new Log4js('ENVIROMENT');
const alarmService = new DataDrivenService('enviroment');
alarmService.execute().subscribe(res => logger.trace(JSON.stringify(res)));
