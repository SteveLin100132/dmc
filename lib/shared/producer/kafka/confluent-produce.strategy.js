"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Confluent Avro 生產資料解析策略
 * @CREATE Thursday, 9th September 2021 2:47:08 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluentProduceStrategy = void 0;
const lib_1 = require("wisrtoni40-confluent-schema/lib");
/**
 * Confluent Avro 生產資料解析策略
 */
class ConfluentProduceStrategy {
    /**
     * @param _host  Confluent Schema Registry 位置
     * @param _topic 要上拋的 Topic
     * @param _key   要上拋的 Key 值
     */
    constructor(_host, _topic, _key) {
        this._host = _host;
        this._topic = _topic;
        this._key = _key;
        this._host = this._host
            .split(',')
            .map(host => host.replace(/\/$/g, ''))
            .join(',');
    }
    /**
     * 解析資料
     *
     * @method public
     * @return 回傳解析後的資料
     */
    resolve(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const schemaRegistry = new lib_1.ConfluentMultiRegistry(this._host);
            const avro = new lib_1.ConfluentAvroStrategy();
            const resolver = new lib_1.ConfluentPubResolveStrategy(schemaRegistry, avro, this._topic);
            const result = yield resolver.resolve(source);
            if (result) {
                return [
                    {
                        topic: this._topic,
                        messages: result,
                    },
                ];
            }
            else {
                throw new Error('Confluent avro deserialize failed');
            }
        });
    }
}
exports.ConfluentProduceStrategy = ConfluentProduceStrategy;
