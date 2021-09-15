/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 本地儲存功能轉接器
 * @CREATE Monday, 13th September 2021 5:22:07 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { LocalStorage } from 'node-localstorage';
import { StorageAdapter } from './storage.adapter';

/**
 * 本地儲存功能轉接器
 */
export class LocalStorageAdapter extends StorageAdapter<LocalStorage> {
  /**
   * @param path    儲存路徑
   * @param storage 儲存功能
   */
  constructor(
    protected path = './storage',
    protected storage = new LocalStorage(path),
  ) {
    super(storage);
  }

  /**
   * 保存特定鍵值資料
   *
   * @method public
   * @param key   鍵值
   * @param value 要保存的資料
   */
  public set(key: any, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  /**
   * 取得特定鍵值的資料
   *
   * @method public
   * @param key 鍵值
   * @return 回傳特定鍵值的資料
   */
  public get<T = any>(key: string): T | null {
    return JSON.parse(this.storage.getItem(key) || '');
  }

  /**
   * 刪除特定鍵值的資料
   *
   * @method public
   * @param key 鍵值
   */
  public delete(key: any): void {
    this.storage.removeItem(key);
  }
}
