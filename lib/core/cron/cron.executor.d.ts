/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 排程執行器
 * @CREATE Tuesday, 14th September 2021 6:49:28 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 排程執行器
 */
export interface CronExecutor<R = any> {
    /**
     * 執行特定動作
     *
     * @method public
     * @return 回傳執行結果
     */
    exec(): Promise<R>;
}
