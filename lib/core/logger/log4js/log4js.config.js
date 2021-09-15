"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG4JS_CONFIG = void 0;
/**
 * Log4js 日誌初始設定
 */
exports.LOG4JS_CONFIG = {
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
