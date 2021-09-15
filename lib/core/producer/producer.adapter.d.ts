/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 資料生產者轉接器
 * @CREATE Thursday, 9th September 2021 2:31:54 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Producer, PublishCallback } from './producer';
/**
 * 資料生產者轉接器
 */
export declare abstract class ProducerAdapter<P = any, D = any> implements Producer<D> {
    protected producer: P;
    /**
     * @param producer 資料生產者
     */
    constructor(producer: P);
    /**
     * 上拋資料
     *
     * @method public
     * @param data 資料
     * @param cb   上拋回呼
     */
    abstract publish(data: D[] | D, cb?: PublishCallback): void;
}
