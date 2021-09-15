/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象核心範本
 * @CREATE Thursday, 9th September 2021 5:53:12 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Consumer, Log4js, Producer } from '../../core';
/**
 * 抽象核心範本
 */
export declare abstract class CoreTemplate {
    protected consumer: Consumer;
    protected producer: Producer;
    protected name: string;
    /**
     * 日誌
     */
    protected logger: Log4js;
    /**
     * @param consumer 資料消費者
     * @param producer 資料生產者
     * @param name     範本名稱
     */
    constructor(consumer: Consumer, producer: Producer, name?: string);
    /**
     * 執行計算
     *
     * @method public
     */
    abstract execute(): void;
}
