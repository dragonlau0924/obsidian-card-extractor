/**
 * Markdown 格式导出
 *
 * 这个模块负责将提取的卡片格式化为 Markdown 文件
 */

import { ExtractionResult, ExtractedCard } from '../extractor/parser';
import { ValidationReport } from '../extractor/validator';

export interface ExportOptions {
  includeMetadata: boolean;      // 是否包含元数据
  includeSourceLink: boolean;    // 是否包含源文件链接
  includeValidationReport: boolean; // 是否包含验证报告
  separator: string;             // 卡片之间的分隔符
}

/**
 * Markdown 导出器
 */
export class MarkdownExporter {
  private defaultOptions: ExportOptions = {
    includeMetadata: true,
    includeSourceLink: true,
    includeValidationReport: false,
    separator: '\n---\n\n'
  };

  /**
   * 将提取结果导出为 Markdown 格式
   */
  export(
    result: ExtractionResult,
    options?: Partial<ExportOptions>,
    validationReport?: ValidationReport
  ): string {
    // 纯粹的卡片内容，卡片之间用两个空行分隔
    const cards = result.cards.map(card => card.content);
    return cards.join('\n\n');
  }

  /**
   * 生成文档头部
   */
  private generateHeader(result: ExtractionResult, options: ExportOptions): string {
    const lines: string[] = [];

    lines.push('# 提取的卡片集合\n');

    if (options.includeMetadata) {
      lines.push('## 元数据\n');
      lines.push(`- 提取时间：${new Date().toLocaleString('zh-CN')}`);
      if (options.includeSourceLink) {
        lines.push(`- 源文件：[[${result.sourceFile}]]`);
      }
      lines.push(`- 卡片数量：${result.totalCount}`);
      lines.push('');
    }

    return lines.join('\n');
  }

  /**
   * 格式化单个卡片
   */
  private formatCard(card: ExtractedCard, index: number, options: ExportOptions): string {
    const lines: string[] = [];

    // 添加卡片序号和元信息
    if (options.includeMetadata) {
      lines.push(`<!-- Card #${index + 1} -->`);
      lines.push(`<!-- Source: Line ${card.startLine}-${card.endLine} -->`);
      if (card.id) {
        lines.push(`<!-- Original ID: ${card.id} -->`);
      }
      lines.push('');
    }

    // 添加卡片内容
    lines.push(card.content);

    return lines.join('\n');
  }

  /**
   * 格式化验证报告
   */
  private formatValidationReport(report: ValidationReport): string {
    const lines: string[] = [];

    lines.push('## 验证报告\n');
    lines.push(`- 总计：${report.totalCards} 张卡片`);
    lines.push(`- ✅ 有效：${report.validCards} 张`);
    lines.push(`- ⚠️ 无效：${report.invalidCards} 张`);

    if (report.errors.length > 0) {
      lines.push('\n### 问题详情\n');
      report.errors.forEach(error => {
        lines.push(`**卡片 #${error.cardIndex + 1}**: ${error.cardTitle}`);
        error.errors.forEach(err => {
          lines.push(`- ${err}`);
        });
        lines.push('');
      });
    }

    return lines.join('\n');
  }

  /**
   * 生成文档尾部
   */
  private generateFooter(result: ExtractionResult): string {
    return `\n---\n*提取完成，共 ${result.totalCount} 张卡片*`;
  }
}
