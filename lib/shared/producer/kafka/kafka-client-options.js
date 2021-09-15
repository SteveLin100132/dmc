"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Kafka 客戶端配置
 * @CREATE Thursday, 9th September 2021 2:47:08 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKafkaClientOptions = void 0;
const uuid_1 = require("uuid");
/**
 * Kafka 客戶端配置
 *
 * @param hosts Kafka 位置
 * @param sasl     啟用 Kafka SASL
 * @param username Kafka SASL 帳號
 * @param password Kafka SASL 密碼
 * @return 回傳 Kafka 客戶端配置
 */
function generateKafkaClientOptions(hosts, sasl, username, password) {
    const options = {
        kafkaHost: hosts,
        clientId: (0, uuid_1.v4)(),
        connectTimeout: 60000,
        requestTimeout: 60000,
        connectRetryOptions: {
            retries: 30,
            factor: 2,
            minTimeout: 60000,
            maxTimeout: 60000,
            randomize: false,
        },
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
exports.generateKafkaClientOptions = generateKafkaClientOptions;
