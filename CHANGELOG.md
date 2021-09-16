# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2021-09-16
### Added
#### Consumer
- 建立複合式 Consumer 轉接器，可插入多個轉接器，介接多個數據來源


## [1.0.0] - 2021-09-14
### Added
#### Logger
- 建立抽象日誌轉接器，提供客製日誌功能
- 建立 Log4js 日誌轉接器
#### Storage
- 建立備援儲存功能，提供資料保存
- 建立 Local Storage 的備援儲存功能
#### CRON
- 建立抽象排程執行器，提供客製設定排程工作
- 建立 ElasticSearch 查詢排程執行器
#### Consumer
- 建立 Consumer 抽象類別，提供客製 Consumer 轉接器
- 建立 Kafka Consumer 轉接器
- 建立 MQTT Consumer 轉接器
- 建立 CRON Consumer 轉接器
- 建立 Consumer 資料解析策略
  - 建立 Kafka Confluent Avro 資料解析策略
  - 建立 Kafka JSON 資料解析策略
  - 建立 MQTT JSON 資料解析策略
  - 建立 ElasticSearch Hits 資料解析策略
  - 建立 ElasticSearch 聚合資料解析策略
#### Producer
- 建立 Producer 抽象類別，提供客製 Producer 轉接器
- 建立 Kafka Producer 轉接器
- 建立 HTTP Post 轉接器
#### Alarm
- 建立抽象報警流程範本，只需繼承並實作(或覆寫)對應屬性及方法，即可發送報警
- 建立抽象報警狀態物件，只需繼承並實作對應方法，即可讓報警自動升級或解除
- 報警流程範本內建時間驅動(`Timer-Driven`)、資料驅動(`Data-Driven`)及混合驅動(`Mixin-Driven`)，三種驅動報警的類型
- 報警流程範本內建失敗重新拋送機制，當上拋失敗，可設定重新拋送次數及間格時間，進行重拋
- 報警流程範本內建備援機制，當服務終止，會保存之前報警的升級紀錄，避免重新啟動後，誤拋報警資料