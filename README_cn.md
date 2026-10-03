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

1. 在 `CcQunResearch` 账号下创建 `CcQunResearch.github.io` 仓库。
2. 把本 PRISM 目录内的文件放到仓库根目录，包含隐藏目录 `.github/`；不要上传 `node_modules/`、`.next/` 或原始简历文件。
3. 仓库 Settings → Pages → Build and deployment 选择 GitHub Actions。
4. 推送到 `main` 或 `master`，等待 Actions 中的部署任务成功。
5. 访问 https://ccqunresearch.github.io/ 。这是预期发布地址，当前源码交付不代表已经上线。

注意：本地仓库的 origin 仍指向 PRISM 上游模板。发布前请改为自己的仓库，勿向上游推送。

## 维护

- `content/`：英文内容。
- `content_zh/`：中文简介、导航和简历。
- `content/publications.bib`：全部 15 篇论文、双语摘要、链接及同等贡献标记。
- `content/profile.json`：教育和工作经历。
- `public/bio.jpg`：从所提供简历提取的个人照片。
- `docs/content-sources.md`：内容来源及信息核对说明。

更详细的技术说明见 [README.md](README.md)。

## 论文主图与 CCF 标签

15 篇论文均使用从原 PDF 裁切的主图，保存在 `public/papers/`。桌面端左图右文，手机端上图下文；图片角标显示会议/期刊和年份，点击图片可查看大图。

在 `content/publications.bib` 中用 `preview={/papers/文件名.webp}` 指定图片，用 `ccf={A}`（或 B/C）指定分类。CCF 标签仅在中文版显示，预印本不显示。分类统一采用 2026 年第七版目录（ICLR 为 A 类），不是按论文发表年份回溯评级。`preview` 和 `ccf` 字段不会进入导出的 BibTeX。

图片来源、PDF 页码、图号和裁切坐标见 `docs/paper-figures.json`；核对依据见 `docs/content-sources.md`。
