/**
 * 提取结果验证
 *
 * 这个模块负责验证提取结果的完整性和正确性
 */

import { ExtractedCard, ExtractionResult } from './parser';

export interface ValidationReport {
  valid: boolean;
  totalCards: number;
  validCards: number;
  invalidCards: number;
  errors: CardError[];
}

export interface CardError {
  cardTitle: string;
  cardIndex: number;
  errors: string[];
}

/**
 * 提取结果验证器
 */
export class ResultValidator {
  /**
   * 验证提取结果
   */
  validate(result: ExtractionResult): ValidationReport {
    const errors: CardError[] = [];
    let validCards = 0;
    let invalidCards = 0;

    result.cards.forEach((card, index) => {
      const cardErrors = this.validateCard(card);

      if (cardErrors.length === 0) {
        validCards++;
      } else {
        invalidCards++;
        errors.push({
          cardTitle: card.title,
          cardIndex: index,
          errors: cardErrors
        });
      }
    });

    return {
      valid: errors.length === 0,
      totalCards: result.totalCount,
      validCards,
      invalidCards,
      errors
    };
  }

  /**
   * 验证单个卡片
   */
  private validateCard(card: ExtractedCard): string[] {
    const errors: string[] = [];

    // 检查标题
    if (!card.title || card.title === '未命名卡片') {
      errors.push('缺少有效的标题');
    }

    // 检查 ID
    if (!card.id) {
      errors.push('缺少卡片 ID（<!--ID: xxx-->）');
    }

    // 检查内容长度
    if (card.content.length < 20) {
      errors.push('卡片内容过短（少于 20 字符）');
    }

    // 检查是否包含三级标题
    if (!card.content.match(/^###\s+/m)) {
      errors.push('缺少三级标题标记');
    }

    // 检查是否包含结束标记
    if (!card.content.match(/<!--ID:\s*\d+\s*-->/)) {
      errors.push('缺少结束标记（<!--ID: xxx-->）');
    }

    return errors;
  }

  /**
   * 生成验证报告文本
   */
  generateReport(report: ValidationReport): string {
    const lines: string[] = [];

    lines.push('# 卡片提取验证报告\n');
    lines.push(`- 总计卡片：${report.totalCards}`);
    lines.push(`- 有效卡片：${report.validCards}`);
    lines.push(`- 无效卡片：${report.invalidCards}`);
    lines.push(`- 验证状态：${report.valid ? '✅ 通过' : '⚠️ 存在问题'}\n`);

    if (report.errors.length > 0) {
      lines.push('## 问题详情\n');
      report.errors.forEach(error => {
        lines.push(`### 卡片 #${error.cardIndex + 1}: ${error.cardTitle}`);
        error.errors.forEach(err => {
          lines.push(`- ❌ ${err}`);
        });
        lines.push('');
      });
    }

    return lines.join('\n');
  }
}
