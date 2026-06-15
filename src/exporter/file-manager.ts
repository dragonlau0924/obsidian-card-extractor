/**
 * 文件创建和保存
 *
 * 这个模块负责处理文件的创建、保存和路径管理
 */

import { App, TFile, normalizePath } from 'obsidian';

export interface SaveOptions {
  targetFolder: string;      // 目标文件夹
  filename: string;           // 文件名（不含扩展名）
  overwrite: boolean;         // 是否覆盖已存在的文件
}

/**
 * 文件管理器
 */
export class FileManager {
  constructor(private app: App) {}

  /**
   * 保存内容到文件
   *
   * @param content 要保存的内容
   * @param options 保存选项
   * @returns 创建的文件
   */
  async saveToFile(content: string, options: SaveOptions): Promise<TFile> {
    const { targetFolder, filename, overwrite } = options;

    // 确保目标文件夹存在
    await this.ensureFolder(targetFolder);

    // 构建完整路径
    const filePath = normalizePath(`${targetFolder}/${filename}.md`);

    // 检查文件是否已存在
    const existingFile = this.app.vault.getAbstractFileByPath(filePath);

    if (existingFile instanceof TFile) {
      if (overwrite) {
        // 覆盖现有文件
        await this.app.vault.modify(existingFile, content);
        return existingFile;
      } else {
        // 生成新文件名（添加时间戳）
        const newFilename = this.generateUniqueFilename(targetFolder, filename);
        return await this.createNewFile(content, targetFolder, newFilename);
      }
    } else {
      // 创建新文件
      return await this.createNewFile(content, targetFolder, filename);
    }
  }

  /**
   * 创建新文件
   */
  private async createNewFile(content: string, folder: string, filename: string): Promise<TFile> {
    const filePath = normalizePath(`${folder}/${filename}.md`);
    return await this.app.vault.create(filePath, content);
  }

  /**
   * 确保文件夹存在，不存在则创建
   */
  private async ensureFolder(folderPath: string): Promise<void> {
    const normalizedPath = normalizePath(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);

    if (!folder) {
      await this.app.vault.createFolder(normalizedPath);
    }
  }

  /**
   * 生成唯一的文件名（添加时间戳）
   */
  private generateUniqueFilename(folder: string, basename: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return `${basename}-${timestamp}`;
  }

  /**
   * 获取推荐的导出文件夹
   */
  getDefaultExportFolder(): string {
    // 根据 CLAUDE.md，导出路径应该是 +/ 文件夹
    return '+';
  }

  /**
   * 生成默认文件名
   */
  generateDefaultFilename(sourceFile: string): string {
    const basename = sourceFile.split('/').pop()?.replace('.md', '') || 'cards';
    const date = new Date().toISOString().slice(0, 10);
    return `${basename}-提取卡片-${date}`;
  }
}
