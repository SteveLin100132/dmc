/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： ElasticSearch 查詢排程執行器
 * @CREATE Tuesday, 14th September 2021 6:52:22 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { TransportRequestPromise } from '@elastic/elasticsearch/lib/Transport';
import { Client } from 'elasticsearch';
import { CronExecutor, ElasticBuilder } from '../../../core';
/**
 * ElasticSearch 查詢排程執行器
 */
export declare class ElasticsearchSearchExecutor implements CronExecutor<TransportRequestPromise<any>> {
    private _client;
    private _index;
    private _type;
    private _queryBuilder;
    private _resolveStrategy;
    /**
     * @param _client          ElasticSearch客戶端
     * @param _index           ElasticSearch Index
     * @param _type            ElasticSearch Type
     * @param _queryBuilder    查詢語句建構者
     * @param _resolveStrategy 資料解析策略
     */
    constructor(_client: Client, _index: string, _type: string, _queryBuilder: ElasticBuilder, _resolveStrategy?: 'hits' | 'aggs');
    /**
     * 執行特定動作
     *
     * @method public
     * @return 回傳執行結果
     */
    exec(): Promise<TransportRequestPromise<any>>;
}
