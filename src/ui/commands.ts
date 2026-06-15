/**
 * 命令注册
 *
 * 这个模块负责注册插件命令和快捷键
 */

import { Command, Editor, MarkdownView, Notice } from 'obsidian';
import CardExtractorPlugin from '../main';

/**
 * 命令管理器
 */
export class CommandManager {
  constructor(private plugin: CardExtractorPlugin) {}

  /**
   * 注册所有命令
   */
  registerCommands(): void {
    // 主命令：提取当前笔记的卡片
    this.plugin.addCommand({
      id: 'extract-cards-from-current-note',
      name: '提取当前笔记的卡片',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        this.extractCardsFromCurrentNote(editor, view);
      }
    });

    // 快速提取（使用默认设置）
    this.plugin.addCommand({
      id: 'extract-cards-quick',
      name: '快速提取卡片（默认设置）',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        this.extractCardsQuick(editor, view);
      }
    });
  }

  /**
   * 从当前笔记提取卡片（带用户交互）
   */
  private async extractCardsFromCurrentNote(editor: Editor, view: MarkdownView): Promise<void> {
    const file = view.file;
    if (!file) {
      new Notice('⚠️ 没有打开的文件');
      return;
    }

    new Notice('🔍 开始提取卡片...');

    try {
      // 获取文件内容
      const content = editor.getValue();

      // 调用插件的提取方法
      await this.plugin.extractCards(content, file.path, {
        showValidation: true,
        openAfterExport: true
      });

    } catch (error) {
      console.error('提取卡片时出错:', error);
      new Notice(`❌ 提取失败: ${error.message}`);
    }
  }

  /**
   * 快速提取（不显示中间步骤）
   */
  private async extractCardsQuick(editor: Editor, view: MarkdownView): Promise<void> {
    const file = view.file;
    if (!file) {
      new Notice('⚠️ 没有打开的文件');
      return;
    }

    new Notice('⚡ 快速提取中...');

    try {
      const content = editor.getValue();

      await this.plugin.extractCards(content, file.path, {
        showValidation: false,
        openAfterExport: true
      });

    } catch (error) {
      console.error('快速提取时出错:', error);
      new Notice(`❌ 提取失败: ${error.message}`);
    }
  }
}
