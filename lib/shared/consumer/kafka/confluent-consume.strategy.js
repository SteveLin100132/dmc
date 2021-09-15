"use strict";
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
exports.ConfluentConsumeStrategy = void 0;
const lib_1 = require("wisrtoni40-confluent-schema/lib");
/**
 * Confluent Avro 消費資料解析策略
 */
class ConfluentConsumeStrategy {
    /**
     * @param _host Confluent Schema Registry 位置
     */
    constructor(_host) {
        this._host = _host;
    }
    /**
     * 解析資料
     *
     * @method public
     * @param source 原始資料
     * @return 回傳解析後的資料
     */
    resolve(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const registry = new lib_1.ConfluentMultiRegistry(this._host);
            const avro = new lib_1.ConfluentAvroStrategy();
            const resolver = new lib_1.ConfluentSubResolveStrategy(registry, avro);
            const result = yield resolver.resolve(source.value);
            if (result) {
                return result;
            }
            else {
                throw new Error('Confluent avro deserialize failed');
            }
        });
    }
}
exports.ConfluentConsumeStrategy = ConfluentConsumeStrategy;
