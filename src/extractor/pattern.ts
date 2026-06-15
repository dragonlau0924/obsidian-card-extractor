/**
 * 正则模式定义和管理
 *
 * 这个模块负责定义和管理用于提取卡片的正则表达式模式
 */

export interface CardPattern {
  name: string;
  description: string;
  regex: RegExp;
}

/**
 * Anki 卡片格式模式
 *
 * 匹配规则：
 * - 起始：三级标题 (### )
 * - 内容：任意多行内容（包括列表、【想法】、【原文】等）
 * - 结束：HTML 注释 <!--ID: 数字-->
 *
 * 示例：
 * ### 什么是"游戏"?
 * - 待解决的谜题：
 *   - 通过**学习基础模式**，然后**封装**、**调用**。
 * 【想法】
 * - 游戏就是模式的学习和实践
 * 【原文】
 * - **世界充满了这样的系统...**
 * <!--ID: 1724420858668-->
 */
export const ANKI_CARD_PATTERN: CardPattern = {
  name: "Anki Card",
  description: "提取以三级标题开头、以 HTML 注释结尾的 Anki 卡片",
  // 匹配：### 开头 -> 任意内容 -> <!--ID: 数字--> 结尾
  // 使用 dotAll 模式(s flag)让 . 匹配换行符
  // 使用非贪婪匹配(?:[\s\S]*?)避免跨卡片匹配
  regex: /^###\s+.+$[\s\S]*?<!--ID:\s*\d+\s*-->/gm
};

/**
 * 默认模式集合
 */
export const DEFAULT_PATTERNS: CardPattern[] = [
  ANKI_CARD_PATTERN
];

/**
 * 模式管理器
 */
export class PatternManager {
  private patterns: CardPattern[] = [];

  constructor() {
    // 初始化时加载默认模式
    this.patterns = [...DEFAULT_PATTERNS];
  }

  /**
   * 获取所有模式
   */
  getPatterns(): CardPattern[] {
    return this.patterns;
  }

  /**
   * 根据名称获取模式
   */
  getPattern(name: string): CardPattern | undefined {
    return this.patterns.find(p => p.name === name);
  }

  /**
   * 添加自定义模式
   */
  addPattern(pattern: CardPattern): void {
    this.patterns.push(pattern);
  }

  /**
   * 移除模式
   */
  removePattern(name: string): boolean {
    const index = this.patterns.findIndex(p => p.name === name);
    if (index !== -1) {
      this.patterns.splice(index, 1);
      return true;
    }
    return false;
  }
}
