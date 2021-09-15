"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProduceStrategyFactory = void 0;
const confluent_produce_strategy_1 = require("./confluent-produce.strategy");
const json_producer_strategy_1 = require("./json-producer.strategy");
/**
 * 資料生產者解析策略簡單工廠
 */
class ProduceStrategyFactory {
    /**
     * 產生對應的消費者資料解析策略
     *
     * @method public
     * @param options 配置
     * @return 回傳對應的生產者資料解析策略
     */
    generate(optinos) {
        const topic = optinos.topic;
        const key = optinos.key;
        if (optinos.confluent) {
            const hosts = optinos.hosts || 'http://localhost:8081';
            return new confluent_produce_strategy_1.ConfluentProduceStrategy(hosts, topic, key);
        }
        else {
            return new json_producer_strategy_1.JsonProducerStrategy(topic, key);
        }
    }
}
exports.ProduceStrategyFactory = ProduceStrategyFactory;
