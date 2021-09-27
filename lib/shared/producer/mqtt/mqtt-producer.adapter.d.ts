/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： MQTT 資料生產者轉接器
 * @CREATE Monday, 27th September 2021 8:17:42 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Client } from 'mqtt';
import { ProducerAdapter, PublishCallback } from './../../../core';
/**
 * MQTT 資料生產者轉接器
 */
export declare class MqttProducerAdapter extends ProducerAdapter<Client, string> {
    protected producer: Client;
    protected topic: string;
    /**
     * @param producer 資料生產者
     * @param topic    要上拋的主題
     */
    constructor(producer: Client, topic: string);
    /**
     * 上拋資料
     *
     * @method public
     * @param message 資料
     * @param cb      上拋回呼
     */
    publish(message: string, cb?: PublishCallback): void;
}
