# 崔超群的学术主页

保留 PRISM 示例的白底双栏布局、深色衬线标题与金色点缀，默认浅色。支持中英文、深浅色、移动端、论文分类搜索、BibTeX 引用及简历打印。

## 预览与构建

使用 Node.js 22 或更高版本：

```sh
npm ci
npm run dev
```

打开 http://localhost:3000 。正式构建运行 `npm run build`，静态文件输出到 `out/`。

## 发布到 GitHub Pages

主页：**https://ccqunresearch.github.io/**  
仓库：[CcQunResearch/ccqunresearch.github.io](https://github.com/CcQunResearch/ccqunresearch.github.io)

Pages 已配置为使用 **GitHub Actions**。更新 `main` 或 `master` 分支后，会自动执行代码检查、类型检查、静态构建及部署；也可在 Actions 中手动运行。发布流程使用 GitHub 自带的临时授权，不在源码中保存账号密码或个人令牌。

后续维护建议从已发布仓库克隆：

```sh
git clone https://github.com/CcQunResearch/ccqunresearch.github.io.git
cd ccqunresearch.github.io
npm ci
```

不要上传原始私人简历、账号凭据、`node_modules/` 或 `.next/`。原始 PRISM 本地模板目录与已发布仓库的提交历史相互独立。

## 维护

- `content/`：英文内容。
- `content_zh/`：中文简介、导航和简历。
- `content/publications.bib`：全部 15 篇论文、双语摘要、链接及同等贡献标记。
- `content/news.json`：按时间倒序排列的中英文动态。
- `content/profile.json`：教育和工作经历。
- `public/bio.jpg`：从所提供简历提取的个人照片。
- `docs/content-sources.md`：内容来源及信息核对说明。

更详细的技术说明见 [README.md](README.md)。

## 论文主图与 CCF 标签

15 篇论文均使用从原 PDF 裁切的主图，保存在 `public/papers/`。桌面端左图右文，手机端上图下文；图片角标显示会议/期刊和年份，点击图片可查看大图。

在 `content/publications.bib` 中用 `preview={/papers/文件名.webp}` 指定图片，用 `ccf={A}`（或 B/C）指定分类。CCF 标签仅在中文版显示，预印本不显示。分类统一采用 2026 年第七版目录（ICLR 为 A 类），不是按论文发表年份回溯评级。`preview` 和 `ccf` 字段不会进入导出的 BibTeX。

图片来源、PDF 页码、图号和裁切坐标见 `docs/paper-figures.json`；核对依据见 `docs/content-sources.md`。
