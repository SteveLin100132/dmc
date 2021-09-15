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
import { ElasticAggsStrategy, ElasticHitsStrategy } from './../../consumer';

/**
 * ElasticSearch 查詢排程執行器
 */
export class ElasticsearchSearchExecutor
  implements CronExecutor<TransportRequestPromise<any>>
{
  /**
   * @param _client          ElasticSearch客戶端
   * @param _index           ElasticSearch Index
   * @param _type            ElasticSearch Type
   * @param _queryBuilder    查詢語句建構者
   * @param _resolveStrategy 資料解析策略
   */
  constructor(
    private _client: Client,
    private _index: string,
    private _type: string,
    private _queryBuilder: ElasticBuilder,
    private _resolveStrategy: 'hits' | 'aggs' = 'hits',
  ) {}

  /**
   * 執行特定動作
   *
   * @method public
   * @return 回傳執行結果
   */
  public async exec(): Promise<TransportRequestPromise<any>> {
    // 建構查詢語句
    const query = this._queryBuilder.build().toJSON();

    // 取得查詢結果
    const result = await this._client.search({
      index: this._index,
      type: this._type,
      body: query,
    });
    return this._resolveStrategy === 'hits'
      ? new ElasticHitsStrategy().resolve(result as any)
      : new ElasticAggsStrategy().resolve(result as any);
  }
}
