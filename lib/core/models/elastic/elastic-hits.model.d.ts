/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： ElasticSearch Hits 資料模型
 * @CREATE Wednesday, 15th September 2021 8:19:08 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 單筆查詢結果資料模型
 */
declare type Hit<T = any> = {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: T;
};
/**
 * 查詢結果元資料資料模型
 */
declare type Shards = {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
};
/**
 * 查詢結果資料模型
 */
declare type Hits<T = any> = {
    total: number;
    max_score: number;
    hits: Hit<T>[];
};
/**
 * ElasticSearch Hits 資料模型
 */
export interface ElasticHits<T = any> {
    took: number;
    timed_out: boolean;
    _shards: Shards;
    hits: Hits<T>;
}
export {};
