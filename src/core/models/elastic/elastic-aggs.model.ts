/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： ElasticSearch 聚合資料模型
 * @CREATE Wednesday, 15th September 2021 8:21:04 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */

/**
 * 查詢結果元資料資料模型
 */
type Shards = {
  total: number;
  successful: number;
  skipped: number;
  failed: number;
};

/**
 * ElasticSearch 聚合 Bucket
 */
export type ElasticAggsBucket = {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: ElasticBucket[];
};

/**
 *  ElasticSearch 單筆聚合 Bucket
 */
export type ElasticBucket = {
  key: any;
  doc_count: any;
  [property: string]: ElasticAggsBucket;
};

/**
 *  ElasticSearch 聚合資料模型
 */
export interface ElasticAggs {
  took: number;
  timed_out: boolean;
  _shards: Shards;
  aggregations: { [property: string]: ElasticAggsBucket };
}
