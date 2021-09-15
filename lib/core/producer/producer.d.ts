/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象資料生產者
 * @CREATE Thursday, 9th September 2021 2:31:54 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 上拋回乎型別
 */
export declare type PublishCallback = (error: any, result: any) => void;
/**
 * 抽象資料生產者
 */
export interface Producer<D = any> {
    /**
     * 上拋資料
     *
     * @method public
     * @param data 資料
     * @param cb   上拋回呼
     */
    publish(data: D, cb?: PublishCallback): void;
}
