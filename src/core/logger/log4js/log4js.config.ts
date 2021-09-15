/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Log4js 日誌初始設定
 * @CREATE Thursday, 9th September 2021 5:51:09 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Configuration } from 'log4js';

/**
 * Log4js 日誌初始設定
 */
export const LOG4JS_CONFIG: Configuration = {
  appenders: {
    std: {
      type: 'stdout',
    },
    file: {
      type: 'dateFile',
      filename: 'logs/app.log',
      pattern: '.yyyy-MM-dd',
      backups: 14,
      keepFileExt: true,
    },
  },
  categories: {
    default: {
      appenders: ['std', 'file'],
      level: 'all',
    },
  },
};
