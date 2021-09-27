"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： MQTT JSON 序列化生產資料解析策略
 * @CREATE Monday, 27th September 2021 8:25:13 am
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
exports.MqttJsonProducerStrategy = void 0;
/**
 * MQTT JSON 序列化生產資料解析策略
 */
class MqttJsonProducerStrategy {
    /**
     * 解析資料
     *
     * @method public
     * @return 回傳解析後的資料
     */
    resolve(source) {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.stringify(source);
        });
    }
}
exports.MqttJsonProducerStrategy = MqttJsonProducerStrategy;
