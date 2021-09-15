/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 資料消費者解析策略簡單工廠
 * @CREATE Thursday, 9th September 2021 2:37:21 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { ConsumerResolveStrategy } from '../../../core';
/**
 * 工廠配置
 */
export declare type ConsumeFactoryOptions = {
    confluent: boolean;
    hosts?: string;
};
/**
 * 資料消費者解析策略簡單工廠
 */
export declare class ConsumeStrategyFactory<R = any> {
    /**
     * 產生對應的消費者資料解析策略
     *
     * @method public
     * @param options 配置
     * @return 回傳對應的消費者資料解析策略
     */
    generate(optinos: ConsumeFactoryOptions): ConsumerResolveStrategy<any, R>;
}
