/**
 * 内容解析和提取
 *
 * 这个模块负责使用正则模式从 Markdown 内容中提取卡片
 */

import { CardPattern } from './pattern';

/**
 * 提取的卡片数据结构
 */
export interface ExtractedCard {
  content: string;        // 完整的卡片内容
  title: string;          // 卡片标题（三级标题的文本）
  startLine: number;      // 起始行号
  endLine: number;        // 结束行号
  id: string | null;      // 卡片 ID（从 HTML 注释中提取）
}

/**
 * 提取结果
 */
export interface ExtractionResult {
  cards: ExtractedCard[];
  totalCount: number;
  sourceFile: string;
}

/**
 * 卡片解析器
 */
export class CardParser {
  /**
   * 从文本中提取卡片
   *
   * @param content 要解析的文本内容
   * @param pattern 使用的匹配模式
   * @param sourceFile 源文件路径（用于记录）
   * @returns 提取结果
   */
  extract(content: string, pattern: CardPattern, sourceFile: string): ExtractionResult {
    const cards: ExtractedCard[] = [];
    const matches = content.matchAll(pattern.regex);

    for (const match of matches) {
      if (match.index === undefined) continue;

      const cardContent = match[0];
      const card = this.parseCard(cardContent, content, match.index);
      cards.push(card);
    }

    return {
      cards,
      totalCount: cards.length,
      sourceFile
    };
  }

  /**
   * 解析单个卡片，提取元数据
   */
  private parseCard(cardContent: string, fullContent: string, startIndex: number): ExtractedCard {
    // 提取标题（第一行的三级标题）
    const titleMatch = cardContent.match(/^###\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : '未命名卡片';

    // 提取 ID（从 HTML 注释中）
    const idMatch = cardContent.match(/<!--ID:\s*(\d+)\s*-->/);
    const id = idMatch ? idMatch[1] : null;

    // 计算行号
    const beforeContent = fullContent.substring(0, startIndex);
    const startLine = beforeContent.split('\n').length;
    const cardLines = cardContent.split('\n').length;
    const endLine = startLine + cardLines - 1;

    return {
      content: cardContent,
      title,
      startLine,
      endLine,
      id
    };
  }

  /**
   * 验证卡片格式是否完整
   */
  validateCard(card: ExtractedCard): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 检查是否有标题
    if (!card.title || card.title === '未命名卡片') {
      errors.push('缺少有效的标题');
    }

    // 检查是否有 ID
    if (!card.id) {
      errors.push('缺少卡片 ID');
    }

    // 检查内容长度
    if (card.content.length < 20) {
      errors.push('卡片内容过短');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
