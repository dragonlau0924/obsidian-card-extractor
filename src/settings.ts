/**
 * 插件设置面板
 *
 * 这个模块定义插件的设置项和设置界面
 */

import { App, PluginSettingTab, Setting } from 'obsidian';
import CardExtractorPlugin from './main';

/**
 * 插件设置数据结构
 */
export interface CardExtractorSettings {
  exportFolder: string;           // 导出文件夹
  openAfterExport: boolean;        // 导出后是否打开文件
  overwriteExisting: boolean;      // 是否覆盖已存在的文件
}

/**
 * 默认设置
 */
export const DEFAULT_SETTINGS: CardExtractorSettings = {
  exportFolder: '+',
  openAfterExport: true,
  overwriteExisting: false
};

/**
 * 设置面板
 */
export class CardExtractorSettingTab extends PluginSettingTab {
  plugin: CardExtractorPlugin;

  constructor(app: App, plugin: CardExtractorPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Card Extractor 设置' });

    // 导出文件夹设置
    new Setting(containerEl)
      .setName('导出文件夹')
      .setDesc('提取的卡片将保存到此文件夹')
      .addText(text => text
        .setPlaceholder('+')
        .setValue(this.plugin.settings.exportFolder)
        .onChange(async (value) => {
          this.plugin.settings.exportFolder = value || '+';
          await this.plugin.saveSettings();
        }));

    // 行为设置组
    containerEl.createEl('h3', { text: '行为设置' });

    new Setting(containerEl)
      .setName('导出后打开文件')
      .setDesc('提取完成后自动打开导出的文件')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.openAfterExport)
        .onChange(async (value) => {
          this.plugin.settings.openAfterExport = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('覆盖已存在的文件')
      .setDesc('如果目标文件已存在，是否覆盖（关闭则添加时间戳创建新文件）')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.overwriteExisting)
        .onChange(async (value) => {
          this.plugin.settings.overwriteExisting = value;
          await this.plugin.saveSettings();
        }));
  }
}
