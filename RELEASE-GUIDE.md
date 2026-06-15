# 发布到 GitHub 指南

## 准备工作

### 1. 在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. 仓库名称：`obsidian-card-extractor`
3. 描述：`Extract structured cards from Obsidian notes with hierarchy preservation`
4. 选择 Public
5. **不要**初始化 README（我们已经有了）
6. 创建仓库

### 2. 更新 README 中的链接

在 `README.md` 中，将以下内容替换为你的实际 GitHub 用户名：

- `yourusername` → 你的 GitHub 用户名

需要替换的地方：
- 所有的 `https://github.com/yourusername/obsidian-card-extractor`

---

## 发布步骤

### 方法 A：从插件目录初始化（推荐）

```bash
# 1. 进入插件目录
cd .obsidian/plugins/card-extractor

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 创建第一个提交
git commit -m "Initial release v0.1.0"

# 5. 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/obsidian-card-extractor.git

# 6. 推送到 GitHub
git branch -M main
git push -u origin main

# 7. 创建第一个版本标签
git tag 0.1.0
git push origin 0.1.0
```

### 方法 B：手动上传

1. 将 `.obsidian/plugins/card-extractor/` 下的所有文件打包
2. 在 GitHub 仓库页面点击 "uploading an existing file"
3. 上传所有文件
4. 提交更改

---

## 创建 Release（重要）

### 自动创建（推荐）

当你推送标签时，GitHub Actions 会自动：
1. 构建插件
2. 创建一个草稿 Release
3. 上传 `main.js`, `manifest.json`, `styles.css`

你需要：
1. 访问 https://github.com/YOUR_USERNAME/obsidian-card-extractor/releases
2. 编辑草稿 Release
3. 添加更新说明（Release Notes）
4. 点击 "Publish release"

### 手动创建

如果自动创建失败，手动操作：

1. 访问你的仓库页面
2. 点击右侧 "Releases" → "Create a new release"
3. 标签版本：`0.1.0`
4. Release 标题：`v0.1.0 - Initial Release`
5. 描述：

```markdown
## Features
- ✨ Extract cards with regex pattern matching
- 🌲 Preserve hierarchical structure (H1, H2, H3)
- ✨ Clean output with no metadata noise
- ⚡ Command palette and sidebar integration

## Installation
Download `main.js`, `manifest.json`, and `styles.css` from the assets below.
```

6. 上传文件：
   - `main.js`
   - `manifest.json`
   - `styles.css`

7. 点击 "Publish release"

---

## 更新 manifest.json

在发布前，更新 `manifest.json` 中的作者信息：

```json
{
  "id": "card-extractor",
  "name": "Card Extractor",
  "version": "0.1.0",
  "minAppVersion": "0.15.0",
  "description": "Extract structured cards from Obsidian notes with hierarchy preservation",
  "author": "YOUR_NAME",
  "authorUrl": "https://github.com/YOUR_USERNAME",
  "isDesktopOnly": false
}
```

---

## 提交到 Obsidian 社区插件（可选）

如果想让插件出现在 Obsidian 社区插件市场：

1. Fork https://github.com/obsidianmd/obsidian-releases
2. 在 `community-plugins.json` 中添加你的插件信息
3. 创建 Pull Request
4. 等待 Obsidian 团队审核

**注意**：这需要你的插件至少有一个正式发布的版本。

---

## 后续版本发布

### 更新版本

1. 编辑 `package.json`，修改版本号：
   ```json
   "version": "0.2.0"
   ```

2. 运行版本更新脚本：
   ```bash
   npm run version
   ```

3. 构建插件：
   ```bash
   npm run build
   ```

4. 提交更改并创建标签：
   ```bash
   git add .
   git commit -m "Release v0.2.0"
   git tag 0.2.0
   git push origin main
   git push origin 0.2.0
   ```

5. GitHub Actions 会自动创建新的 Release

---

## 常见问题

### Q: GitHub Actions 失败了怎么办？
A: 检查 Actions 页面的错误日志，通常是缺少依赖或构建错误。可以手动创建 Release。

### Q: 用户如何安装我的插件？
A: 用户需要：
1. 下载 Release 中的 `main.js`, `manifest.json`, `styles.css`
2. 在他们的 vault 中创建 `.obsidian/plugins/card-extractor/` 文件夹
3. 将三个文件放入该文件夹
4. 重启 Obsidian 并启用插件

### Q: 如何让插件出现在社区插件列表中？
A: 需要提交 PR 到 obsidian-releases 仓库。详见上方"提交到 Obsidian 社区插件"章节。

---

## 检查清单

发布前确认：

- [ ] 更新 `manifest.json` 中的 `author` 和 `authorUrl`
- [ ] 更新 `README.md` 中的所有 `yourusername`
- [ ] 运行 `npm run build` 确保无错误
- [ ] 测试插件功能正常
- [ ] 创建 Git 仓库并推送到 GitHub
- [ ] 创建第一个 Release (0.1.0)
- [ ] 在 Release 中上传 `main.js`, `manifest.json`, `styles.css`
- [ ] 编写清晰的 Release Notes

---

## 需要帮助？

如果你在发布过程中遇到问题：
1. 检查 GitHub Actions 日志
2. 参考 Obsidian 官方插件开发文档：https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin
3. 查看其他插件的发布方式作为参考

---

**提示**：第一次发布可能需要 10-15 分钟，请耐心等待 GitHub Actions 完成构建。
