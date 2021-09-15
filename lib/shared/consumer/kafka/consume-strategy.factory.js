"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumeStrategyFactory = void 0;
const confluent_consume_strategy_1 = require("./confluent-consume.strategy");
const json_consume_strategy_1 = require("./json-consume.strategy");
/**
 * 資料消費者解析策略簡單工廠
 */
class ConsumeStrategyFactory {
    /**
     * 產生對應的消費者資料解析策略
     *
     * @method public
     * @param options 配置
     * @return 回傳對應的消費者資料解析策略
     */
    generate(optinos) {
        if (optinos.confluent) {
            const hosts = optinos.hosts || 'http://localhost:8081';
            return new confluent_consume_strategy_1.ConfluentConsumeStrategy(hosts);
        }
        else {
            return new json_consume_strategy_1.JsonConsumeStrategy();
        }
    }
}
exports.ConsumeStrategyFactory = ConsumeStrategyFactory;
