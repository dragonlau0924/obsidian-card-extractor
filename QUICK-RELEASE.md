# 🚀 Quick Release Checklist

在发布前快速检查：

## 📝 信息更新

- [ ] `manifest.json` 中的 `author` 改为你的名字
- [ ] `manifest.json` 中的 `authorUrl` 改为你的 GitHub 主页
- [ ] `README.md` 中所有 `yourusername` 替换为你的 GitHub 用户名

## 🔨 构建测试

```bash
cd .obsidian/plugins/card-extractor
npm run build
```

- [ ] 构建成功无错误
- [ ] 在 Obsidian 中测试插件功能正常

## 📦 Git 初始化

```bash
git init
git add .
git commit -m "Initial release v0.1.0"
git remote add origin https://github.com/YOUR_USERNAME/obsidian-card-extractor.git
git branch -M main
git push -u origin main
git tag 0.1.0
git push origin 0.1.0
```

## ✨ GitHub Release

1. GitHub Actions 会自动创建草稿 Release
2. 访问 https://github.com/YOUR_USERNAME/obsidian-card-extractor/releases
3. 编辑草稿，添加 Release Notes
4. 发布 Release

## 📋 发布后验证

- [ ] Release 页面可以下载 `main.js`, `manifest.json`, `styles.css`
- [ ] README 显示正常
- [ ] 所有链接可点击

---

**需要详细步骤？** 查看 [[RELEASE-GUIDE.md]]
