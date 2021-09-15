/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警範本
 * @CREATE Friday, 10th September 2021 11:29:13 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Consumer, CoreTemplate, Producer } from '../../core';
/**
 * 報警範本
 */
export declare class AlarmTemplate<M = any, P = any> extends CoreTemplate {
    protected consumer: Consumer<M>;
    protected producer: Producer<P>;
    protected name: string;
    /**
     * @param consumer 資料消費者
     * @param producer 資料生產者
     * @param name     範本名稱
     */
    constructor(consumer: Consumer<M>, producer: Producer<P>, name?: string);
    /**
     * 執行計算
     *
     * @method public
     */
    execute(): void;
}
