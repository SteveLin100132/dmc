/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象消費者資料解析策略
 * @CREATE Thursday, 9th September 2021 2:29:11 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 抽象消費者資料解析策略
 */
export interface ConsumerResolveStrategy<S = any, R = any> {
    /**
     * 解析資料
     *
     * @method public
     * @param source 原始資料
     * @return 回傳解析後的資料
     */
    resolve(source: S): Promise<R>;
}
