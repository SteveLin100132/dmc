/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： ElasticSearch 聚合資料解析策略
 * @CREATE Wednesday, 15th September 2021 8:29:47 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { ConsumerResolveStrategy as Strategy, ElasticAggs } from '../../../../core';
/**
 * ElasticSearch 聚合資料解析策略
 */
export declare class ElasticAggsStrategy<R = any> implements Strategy<ElasticAggs, R[]> {
    /**
     * 解析資料
     *
     * @method public
     * @param source 原始資料
     * @return 回傳解析後的資料
     */
    resolve(source: ElasticAggs): Promise<R[]>;
}
