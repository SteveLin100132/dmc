/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： HTTP 資料生產者轉接器
 * @CREATE Thursday, 9th September 2021 3:30:10 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { AxiosInstance } from 'axios';
import { ProducerAdapter, PublishCallback } from './../../../core';
/**
 * HTTP 資料生產者轉接器
 */
export declare class HttpProducerAdapter<D = any> extends ProducerAdapter<AxiosInstance, D> {
    private _url;
    protected producer: AxiosInstance;
    /**
     * @param producer 資料生產者
     */
    constructor(_url: string, producer?: AxiosInstance);
    /**
     * 上拋資料
     *
     * @method public
     * @param data 資料
     * @param cb   上拋回呼
     */
    publish(data: D, cb?: PublishCallback): void;
}
