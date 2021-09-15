"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： ElasticSearch 查詢排程執行器
 * @CREATE Tuesday, 14th September 2021 6:52:22 pm
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
exports.ElasticsearchSearchExecutor = void 0;
const consumer_1 = require("./../../consumer");
/**
 * ElasticSearch 查詢排程執行器
 */
class ElasticsearchSearchExecutor {
    /**
     * @param _client          ElasticSearch客戶端
     * @param _index           ElasticSearch Index
     * @param _type            ElasticSearch Type
     * @param _queryBuilder    查詢語句建構者
     * @param _resolveStrategy 資料解析策略
     */
    constructor(_client, _index, _type, _queryBuilder, _resolveStrategy = 'hits') {
        this._client = _client;
        this._index = _index;
        this._type = _type;
        this._queryBuilder = _queryBuilder;
        this._resolveStrategy = _resolveStrategy;
    }
    /**
     * 執行特定動作
     *
     * @method public
     * @return 回傳執行結果
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            // 建構查詢語句
            const query = this._queryBuilder.build().toJSON();
            // 取得查詢結果
            const result = yield this._client.search({
                index: this._index,
                type: this._type,
                body: query,
            });
            return this._resolveStrategy === 'hits'
                ? new consumer_1.ElasticHitsStrategy().resolve(result)
                : new consumer_1.ElasticAggsStrategy().resolve(result);
        });
    }
}
exports.ElasticsearchSearchExecutor = ElasticsearchSearchExecutor;
