/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Log4js 日誌轉接器
 * @CREATE Thursday, 9th September 2021 5:50:19 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Configuration } from 'log4js';
import { LoggerAdapter } from './../../logger';
/**
 * Log4js 日誌轉接器
 */
export declare class Log4js implements LoggerAdapter {
    /**
     * Log4js 日誌
     */
    private logger;
    /**
     * @param type   日誌類別
     * @param config 日誌設定
     */
    constructor(type: string, config?: Configuration);
    /**
     * 一般日誌
     *
     * @method public
     * @param args 日誌參數
     */
    log(...args: any[]): void;
    /**
     * TRACE級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    trace(message: any, ...args: any[]): void;
    /**
     * DEBUG級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    debug(message: any, ...args: any[]): void;
    /**
     * INFO級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    info(message: any, ...args: any[]): void;
    /**
     * WARN級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    warn(message: any, ...args: any[]): void;
    /**
     * ERROR級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    error(message: any, ...args: any[]): void;
    /**
     * FATAL級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    fatal(message: any, ...args: any[]): void;
    /**
     * MARK級別日誌
     *
     * @method public
     * @param message 日誌內文
     * @param args    日誌參數
     */
    mark(message: any, ...args: any[]): void;
}
