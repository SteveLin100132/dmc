/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Confluent Avro 消費資料解析策略
 * @CREATE Thursday, 9th September 2021 2:37:21 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Message as M } from 'kafka-node';
import { ConsumerResolveStrategy as Strategy } from '../../../core';
/**
 * Confluent Avro 消費資料解析策略
 */
export declare class ConfluentConsumeStrategy<R = any> implements Strategy<M, R> {
    private _host;
    /**
     * @param _host Confluent Schema Registry 位置
     */
    constructor(_host: string);
    /**
     * 解析資料
     *
     * @method public
     * @param source 原始資料
     * @return 回傳解析後的資料
     */
    resolve(source: M): Promise<R>;
}
