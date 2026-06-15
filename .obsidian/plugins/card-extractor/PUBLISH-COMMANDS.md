# 🚀 发布命令 - 复制粘贴执行

## 第一步：创建 GitHub 仓库

1. 访问：https://github.com/new
2. 仓库名称：`obsidian-card-extractor`
3. 描述：`Extract structured cards from Obsidian notes with hierarchy preservation`
4. 选择：**Public**
5. **不要勾选**：Initialize this repository with a README
6. 点击：**Create repository**

---

## 第二步：执行以下命令

复制以下命令到终端执行：

```bash
# 进入插件目录
cd .obsidian/plugins/card-extractor

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建第一个提交
git commit -m "Initial release v0.1.0"

# 添加远程仓库
git remote add origin https://github.com/dragonlau0924/obsidian-card-extractor.git

# 切换到 main 分支并推送
git branch -M main
git push -u origin main

# 创建版本标签
git tag 0.1.0
git push origin 0.1.0
```

---

## 第三步：等待自动构建

推送标签后，GitHub Actions 会自动：
1. 安装依赖
2. 构建插件
3. 创建 Release 草稿
4. 上传 `main.js`, `manifest.json`, `styles.css`

**等待时间**：约 2-5 分钟

**查看进度**：
https://github.com/dragonlau0924/obsidian-card-extractor/actions

---

## 第四步：发布 Release

1. 访问：https://github.com/dragonlau0924/obsidian-card-extractor/releases
2. 点击编辑草稿 Release
3. 添加 Release 说明：

```markdown
## ✨ Features

- 🎯 Extract cards using regex pattern matching
- 🌲 Preserve hierarchical structure (H1, H2, H3)
- ✨ Clean output with zero metadata noise
- ⚡ Command palette and sidebar integration
- 📁 Configurable export settings

## 📦 Installation

### Method 1: Manual Installation
1. Download `main.js`, `manifest.json`, and `styles.css` from the assets below
2. Create folder `<your-vault>/.obsidian/plugins/card-extractor/`
3. Copy the three files into the folder
4. Restart Obsidian
5. Enable the plugin in Settings → Community Plugins

### Method 2: BRAT (Beta Reviewers Auto-update Tool)
1. Install BRAT plugin
2. Add `dragonlau0924/obsidian-card-extractor` as a beta plugin
3. BRAT will handle installation and updates

## 📚 Documentation

- [README](https://github.com/dragonlau0924/obsidian-card-extractor#readme)
- [Release Guide](https://github.com/dragonlau0924/obsidian-card-extractor/blob/main/RELEASE-GUIDE.md)

## 🐛 Known Issues

- Card format with `【Notes】` and `【Reference】` markers may not render perfectly in mind mapping tools (workaround in development)

## 🙏 Feedback

Please report issues or suggest features at:
https://github.com/dragonlau0924/obsidian-card-extractor/issues
```

4. 点击：**Publish release**

---

## ✅ 验证发布

发布后，检查以下内容：

- [ ] Release 页面可以下载文件：
  - https://github.com/dragonlau0924/obsidian-card-extractor/releases/tag/0.1.0
- [ ] README 显示正常：
  - https://github.com/dragonlau0924/obsidian-card-extractor
- [ ] 所有链接可以点击

---

## 📢 宣传你的插件

发布后可以在这些地方分享：

1. **Obsidian Forum**
   - https://forum.obsidian.md/c/share-showcase/9

2. **Reddit**
   - r/ObsidianMD

3. **Discord**
   - Obsidian Community Discord

---

## 🔄 后续版本更新

更新插件时：

```bash
# 1. 修改 package.json 中的版本号
# 2. 构建
npm run build

# 3. 提交并打标签
git add .
git commit -m "Release v0.2.0"
git tag 0.2.0
git push origin main
git push origin 0.2.0
```

GitHub Actions 会自动创建新的 Release。

---

## ❓ 遇到问题？

### GitHub Actions 失败
- 查看 Actions 日志：https://github.com/dragonlau0924/obsidian-card-extractor/actions
- 检查是否缺少依赖或构建错误

### 无法推送代码
```bash
# 检查远程仓库设置
git remote -v

# 如果需要重新设置
git remote set-url origin https://github.com/dragonlau0924/obsidian-card-extractor.git
```

### Release 没有自动创建
- 手动创建 Release
- 上传 `.obsidian/plugins/card-extractor/main.js`
- 上传 `.obsidian/plugins/card-extractor/manifest.json`
- 上传 `.obsidian/plugins/card-extractor/styles.css`

---

## 📞 需要帮助？

如果遇到问题，欢迎在仓库中提 Issue：
https://github.com/dragonlau0924/obsidian-card-extractor/issues

---

祝发布顺利！🎉
