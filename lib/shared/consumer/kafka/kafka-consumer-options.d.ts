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
import { ConsumerGroupOptions } from 'kafka-node';
/**
 * Kafka 資料消費者配置
 *
 * @param hosts    Kafka 位置
 * @param sasl     啟用 Kafka SASL
 * @param username Kafka SASL 帳號
 * @param password Kafka SASL 密碼
 * @return 回傳 Kafka 資料消費者配置
 */
export declare function generateKafkaConsumerOptions(hosts: string, sasl?: boolean, username?: string, password?: string): ConsumerGroupOptions;
