/**
 * Card Extractor Plugin
 *
 * 从 Obsidian 笔记中提取 Anki 风格的卡片
 */

import { Notice, Plugin, TFile, MarkdownView } from 'obsidian';
import { CardExtractorSettings, CardExtractorSettingTab, DEFAULT_SETTINGS } from './settings';
import { PatternManager, ANKI_CARD_PATTERN } from './extractor/pattern';
import { CardParser } from './extractor/parser';
import { ResultValidator } from './extractor/validator';
import { MarkdownExporter } from './exporter/markdown';
import { FileManager } from './exporter/file-manager';
import { CommandManager } from './ui/commands';
import { HierarchyParser } from './extractor/hierarchy-parser';

/**
 * 提取选项
 */
interface ExtractOptions {
  showValidation?: boolean;
  openAfterExport?: boolean;
  useHierarchy?: boolean;  // 是否使用层级结构提取
}

export default class CardExtractorPlugin extends Plugin {
  settings: CardExtractorSettings;
  private patternManager: PatternManager;
  private parser: CardParser;
  private validator: ResultValidator;
  private exporter: MarkdownExporter;
  private fileManager: FileManager;
  private commandManager: CommandManager;
  private hierarchyParser: HierarchyParser;

  async onload() {
    console.log('加载 Card Extractor 插件');

    // 加载设置
    await this.loadSettings();

    // 初始化模块
    this.patternManager = new PatternManager();
    this.parser = new CardParser();
    this.validator = new ResultValidator();
    this.exporter = new MarkdownExporter();
    this.fileManager = new FileManager(this.app);
    this.commandManager = new CommandManager(this);
    this.hierarchyParser = new HierarchyParser();

    // 注册命令
    this.commandManager.registerCommands();

    // 添加设置面板
    this.addSettingTab(new CardExtractorSettingTab(this.app, this));

    // 添加功能区图标（可选）
    this.addRibbonIcon('file-text', 'Extract Cards', async () => {
      // 尝试获取当前活跃的 Markdown 视图
      const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

      if (activeView && activeView.file) {
        const file = activeView.file;
        const content = await this.app.vault.read(file);
        await this.extractCards(content, file.path);
      } else {
        // 如果没有活跃的 Markdown 视图，尝试获取当前活跃的文件
        const activeFile = this.app.workspace.getActiveFile();
        if (activeFile && activeFile.extension === 'md') {
          const content = await this.app.vault.read(activeFile);
          await this.extractCards(content, activeFile.path);
        } else {
          new Notice('⚠️ 请先打开一个 Markdown 文件');
        }
      }
    });
  }

  onunload() {
    console.log('卸载 Card Extractor 插件');
  }

  /**
   * 核心提取方法
   */
  async extractCards(
    content: string,
    sourceFilePath: string,
    options?: ExtractOptions
  ): Promise<void> {
    const opts = {
      showValidation: options?.showValidation ?? false,
      openAfterExport: options?.openAfterExport ?? this.settings.openAfterExport,
      useHierarchy: options?.useHierarchy ?? true  // 默认使用层级提取
    };

    try {
      // 1. 获取匹配模式
      const pattern = this.patternManager.getPattern('Anki Card');
      if (!pattern) {
        throw new Error('找不到 Anki Card 匹配模式');
      }

      let markdown: string;
      let totalCount: number;

      if (opts.useHierarchy) {
        // 使用层级结构提取
        const hierarchyResult = this.hierarchyParser.parse(content, pattern, sourceFilePath);

        if (hierarchyResult.totalCards === 0) {
          new Notice('⚠️ 未找到符合格式的卡片');
          return;
        }

        markdown = this.hierarchyParser.toMarkdown(hierarchyResult.tree);
        totalCount = hierarchyResult.totalCards;
      } else {
        // 使用原有的平铺提取
        const result = this.parser.extract(content, pattern, sourceFilePath);

        if (result.totalCount === 0) {
          new Notice('⚠️ 未找到符合格式的卡片');
          return;
        }

        markdown = this.exporter.export(result);
        totalCount = result.totalCount;
      }

      // 2. 保存到文件
      const filename = this.fileManager.generateDefaultFilename(sourceFilePath);
      const saveOptions = {
        targetFolder: this.settings.exportFolder,
        filename,
        overwrite: this.settings.overwriteExisting
      };

      const savedFile = await this.fileManager.saveToFile(markdown, saveOptions);

      // 3. 显示成功通知
      const message = `✅ 成功提取 ${totalCount} 张卡片`;
      new Notice(message);

      // 4. 打开导出的文件（如果设置了）
      if (opts.openAfterExport) {
        await this.app.workspace.getLeaf().openFile(savedFile);
      }

    } catch (error) {
      console.error('提取卡片时出错:', error);
      new Notice(`❌ 提取失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 加载设置
   */
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  /**
   * 保存设置
   */
  async saveSettings() {
    await this.saveData(this.settings);
  }
}
