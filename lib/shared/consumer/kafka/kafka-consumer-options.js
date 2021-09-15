"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Kafka 資料消費者配置
 * @CREATE Thursday, 9th September 2021 2:37:22 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKafkaConsumerOptions = void 0;
const uuid_1 = require("uuid");
/**
 * Kafka 資料消費者配置
 *
 * @param hosts    Kafka 位置
 * @param sasl     啟用 Kafka SASL
 * @param username Kafka SASL 帳號
 * @param password Kafka SASL 密碼
 * @return 回傳 Kafka 資料消費者配置
 */
function generateKafkaConsumerOptions(hosts, sasl, username, password) {
    const options = {
        kafkaHost: hosts,
        groupId: (0, uuid_1.v4)(),
        sessionTimeout: 15000,
        protocol: ['roundrobin'],
        encoding: 'buffer',
        fromOffset: 'latest',
        outOfRangeOffset: 'latest',
        retries: 30,
        retryFactor: 2,
        retryMinTimeout: 60000,
    };
    if (sasl) {
        options.sasl = {
            mechanism: 'plain',
            username: username,
            password: password,
        };
    }
    return options;
}
exports.generateKafkaConsumerOptions = generateKafkaConsumerOptions;
