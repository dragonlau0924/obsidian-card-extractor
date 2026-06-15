/**
 * 层级结构解析器
 *
 * 提取一级、二级、三级标题，并构建知识树结构
 */

import { CardPattern } from './pattern';

/**
 * 层级节点类型
 */
export enum NodeType {
  H1 = 'h1',
  H2 = 'h2',
  CARD = 'card'  // 三级标题 + 卡片内容
}

/**
 * 层级节点
 */
export interface HierarchyNode {
  type: NodeType;
  title: string;           // 标题文本
  content?: string;        // 卡片的完整内容（仅对 CARD 类型有效）
  children: HierarchyNode[];
}

/**
 * 层级结构提取结果
 */
export interface HierarchyResult {
  tree: HierarchyNode[];
  totalCards: number;
  sourceFile: string;
}

/**
 * 层级结构解析器
 */
export class HierarchyParser {
  /**
   * 解析文档为层级结构
   */
  parse(content: string, cardPattern: CardPattern, sourceFile: string): HierarchyResult {
    const lines = content.split('\n');
    const tree: HierarchyNode[] = [];
    let currentH1: HierarchyNode | null = null;
    let currentH2: HierarchyNode | null = null;
    let totalCards = 0;

    // 先提取所有卡片及其位置
    const cards = this.extractCards(content, cardPattern);
    const cardMap = new Map(cards.map(c => [c.startLine, c]));

    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();

      // 检查是否是卡片的起始位置
      const card = cardMap.get(i + 1); // +1 因为行号从 1 开始
      if (card) {
        // 创建卡片节点
        const cardNode: HierarchyNode = {
          type: NodeType.CARD,
          title: card.title,
          content: card.content,
          children: []
        };

        // 添加到当前的层级
        if (currentH2) {
          currentH2.children.push(cardNode);
        } else if (currentH1) {
          currentH1.children.push(cardNode);
        } else {
          tree.push(cardNode);
        }

        totalCards++;
        // 跳过卡片的所有行
        i += card.content.split('\n').length;
        continue;
      }

      // 检查标题
      if (line.startsWith('# ') && !line.startsWith('## ')) {
        // 一级标题
        const title = line.substring(2).trim();
        currentH1 = {
          type: NodeType.H1,
          title,
          children: []
        };
        currentH2 = null;
        tree.push(currentH1);
      } else if (line.startsWith('## ') && !line.startsWith('### ')) {
        // 二级标题
        const title = line.substring(3).trim();
        currentH2 = {
          type: NodeType.H2,
          title,
          children: []
        };

        if (currentH1) {
          currentH1.children.push(currentH2);
        } else {
          tree.push(currentH2);
        }
      }

      i++;
    }

    return {
      tree,
      totalCards,
      sourceFile
    };
  }

  /**
   * 提取所有卡片及其位置
   */
  private extractCards(content: string, pattern: CardPattern): Array<{
    title: string;
    content: string;
    startLine: number;
    endLine: number;
  }> {
    const cards: Array<{
      title: string;
      content: string;
      startLine: number;
      endLine: number;
    }> = [];

    const matches = content.matchAll(pattern.regex);

    for (const match of matches) {
      if (match.index === undefined) continue;

      const cardContent = match[0];

      // 提取标题
      const titleMatch = cardContent.match(/^###\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : '未命名卡片';

      // 计算行号
      const beforeContent = content.substring(0, match.index);
      const startLine = beforeContent.split('\n').length;
      const cardLines = cardContent.split('\n').length;
      const endLine = startLine + cardLines - 1;

      cards.push({
        title,
        content: cardContent,
        startLine,
        endLine
      });
    }

    return cards;
  }

  /**
   * 将层级结构转换为 Markdown
   */
  toMarkdown(tree: HierarchyNode[], indent: number = 0): string {
    const lines: string[] = [];

    for (const node of tree) {
      if (node.type === NodeType.H1) {
        lines.push(`# ${node.title}`);
        lines.push('');
        if (node.children.length > 0) {
          lines.push(this.toMarkdown(node.children, indent));
        }
      } else if (node.type === NodeType.H2) {
        lines.push(`## ${node.title}`);
        lines.push('');
        if (node.children.length > 0) {
          lines.push(this.toMarkdown(node.children, indent));
        }
      } else if (node.type === NodeType.CARD) {
        lines.push(node.content || '');
        lines.push('');
      }
    }

    return lines.join('\n');
  }
}
