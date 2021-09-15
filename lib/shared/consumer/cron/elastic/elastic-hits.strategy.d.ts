/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： ElasticSearch Hits 資料解析策略
 * @CREATE Wednesday, 15th September 2021 8:16:42 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { ConsumerResolveStrategy as Strategy, ElasticHits } from '../../../../core';
/**
 * ElasticSearch Hits 資料解析策略
 */
export declare class ElasticHitsStrategy<R = any> implements Strategy<ElasticHits<R>, R[]> {
    /**
     * 解析資料
     *
     * @method public
     * @param source 原始資料
     * @return 回傳解析後的資料
     */
    resolve(source: ElasticHits<R>): Promise<R[]>;
}
