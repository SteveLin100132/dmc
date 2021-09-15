/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 重新拋送資料生產者轉接器
 * @CREATE Monday, 13th September 2021 1:32:59 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { ProducerAdapter, RetryOption } from 'wistroni40-retry';
import { AlarmModel, Producer } from './../../core';
/**
 * 重新拋送資料生產者轉接器
 */
export declare class RetryProducerAdapter<P = AlarmModel> extends ProducerAdapter<Producer> {
    protected producer: Producer;
    protected options?: RetryOption | undefined;
    /**
     * @param producer 資料生產者
     * @param options  重拋配置
     */
    constructor(producer: Producer, options?: RetryOption | undefined);
    /**
     * 發送數據
     *
     * @method public
     * @param payload  要拋送的數據
     * @param callback 拋送後的回乎函數
     */
    send(payload: P, callback: (error: any, result: any) => void): void;
}
