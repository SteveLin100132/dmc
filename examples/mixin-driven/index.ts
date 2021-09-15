/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 混合式驅動報警範例
 * @CREATE Wednesday, 15th September 2021 4:38:19 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Log4js } from '../../lib';
import { MixinDrivenService } from './mixin-driven.service';

const logger = new Log4js('MIXIN_ENVIROMENT');
const alarmService = new MixinDrivenService('mixin-enviroment');
alarmService.execute().subscribe(res => logger.trace(JSON.stringify(res)));
