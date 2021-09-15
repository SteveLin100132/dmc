/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 資料生產者解析策略簡單工廠
 * @CREATE Thursday, 9th September 2021 2:47:08 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { ProducerResolveStrategy } from './../../../core';
/**
 * 工廠配置
 */
export declare type ProduceFactoryOptions = {
    confluent: boolean;
    hosts?: string;
    topic: string;
    key?: string;
};
/**
 * 資料生產者解析策略簡單工廠
 */
export declare class ProduceStrategyFactory {
    /**
     * 產生對應的消費者資料解析策略
     *
     * @method public
     * @param options 配置
     * @return 回傳對應的生產者資料解析策略
     */
    generate(optinos: ProduceFactoryOptions): ProducerResolveStrategy;
}
