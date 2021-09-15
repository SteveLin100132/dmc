/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象儲存功能轉接器
 * @CREATE Monday, 13th September 2021 5:15:47 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 抽象儲存功能轉接器
 *
 * @template S 儲存功能物件型別
 */
export abstract class StorageAdapter<S = any> {
  /**
   * @param storage 儲存功能
   */
  constructor(protected storage: S) {}

  /**
   * 保存特定鍵值資料
   *
   * @method public
   * @param key   鍵值
   * @param value 要保存的資料
   */
  public abstract set(key: any, value: any): void | Promise<void>;

  /**
   * 取得特定鍵值的資料
   *
   * @method public
   * @param key 鍵值
   * @return 回傳特定鍵值的資料
   */
  public abstract get<T = any>(key: any): (T | null) | Promise<T | null>;

  /**
   * 刪除特定鍵值的資料
   *
   * @method public
   * @param key 鍵值
   */
  public abstract delete(key: any): void | Promise<void>;
}
