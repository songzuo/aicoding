import { Content } from '../types';

export const initialContents: Content[] = [
  {
    id: 'what-is-ai-coding',
    sectionId: 'getting-started',
    title: '什么是AI编程？',
    summary: '了解AI编程的基本概念，以及它如何改变软件开发的方式',
    body: `# 什么是AI编程？

## 简单理解

**AI编程**就是借助人工智能工具来帮助你写代码。你不需要记住复杂的编程语法，只需要用自然语言（比如中文或英文）告诉AI你想要什么，AI就会帮你生成代码。

## 打个比方

想象你要装修房子：
- **传统编程**：你需要自己学会砌墙、刷漆、接电线等所有技能
- **AI编程**：你只需要告诉装修师傅"我想要一个北欧风格的客厅"，师傅就会帮你完成

## AI编程能做什么？

| 任务类型 | 具体例子 |
|---------|---------|
| 生成代码 | 根据你的描述自动写出程序代码 |
| 解释代码 | 帮你理解别人写的代码是什么意思 |
| 修复错误 | 找出代码中的问题并修复 |
| 优化代码 | 让代码运行得更快、更好 |
| 学习辅导 | 回答你的编程问题 |

## 谁适合学习AI编程？

- ✅ 想做自己的软件/网站/App的人
- ✅ 想提高工作效率的职场人
- ✅ 对编程感兴趣但觉得太难的人
- ✅ 已经会编程但想提高效率的开发者

## 学习AI编程需要什么基础？

**好消息是：几乎不需要任何编程基础！**

你只需要：
1. 会使用电脑和浏览器
2. 能够清晰地描述你的需求
3. 有耐心和学习的热情`,
    tags: ['入门', 'AI编程', '基础概念'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ai-coding-workflow',
    sectionId: 'getting-started',
    title: 'AI编程的基本流程',
    summary: '掌握AI编程的标准工作流程，从想法到实现的完整路径',
    body: `# AI编程的基本流程

## 五步工作法

### 第一步：明确需求 🎯
在开始之前，先想清楚你要做什么。

**好的需求描述**：
> "我想做一个待办事项应用，用户可以添加任务、标记完成、删除任务"

### 第二步：选择工具 🛠️
根据你的需求选择合适的AI工具：
- 简单问答：ChatGPT、Claude
- 写代码：Cursor、Windsurf
- 做网站：Cursor + Next.js

### 第三步：与AI对话 💬
用清晰的语言告诉AI你的需求。

### 第四步：测试运行 🧪
拿到AI生成的代码后运行测试。

### 第五步：迭代优化 🔄
如果结果不满意，继续与AI对话改进。

## 小贴士
1. **不要一次要求太多** - 分步骤来
2. **保存每个版本** - 方便回退
3. **多尝试不同的描述方式**`,
    tags: ['入门', '流程', '方法论'],
    order: 2,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'first-ai-project',
    sectionId: 'getting-started',
    title: '你的第一个AI编程项目',
    summary: '手把手教你完成第一个AI编程项目，建立信心',
    body: `# 你的第一个AI编程项目

## 项目目标
创建一个**个人名片网页**，包含：
- 你的名字和头像
- 简单的自我介绍
- 联系方式链接

## 开始制作

### 第一步：打开AI助手
访问 chat.openai.com 或 claude.ai

### 第二步：输入需求
\`\`\`
请帮我创建一个个人名片网页，要求：
1. 居中显示的卡片样式
2. 渐变色背景
3. 圆形头像占位符
4. 现代简约风格
请生成完整的HTML代码，包含内联CSS样式。
\`\`\`

### 第三步：保存并查看
1. 打开记事本
2. 粘贴AI生成的代码
3. 保存为 mycard.html
4. 双击用浏览器打开

## 恭喜你！
你已经完成了第一个AI编程项目！🎉`,
    tags: ['入门', '实战', '项目'],
    order: 3,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'how-to-describe-requirements',
    sectionId: 'requirements-analysis',
    title: '如何清晰地描述需求',
    summary: '学习用AI能理解的方式描述你的想法',
    body: `# 如何清晰地描述需求

## 为什么需求描述很重要？
AI就像一个非常聪明但不会读心术的助手。你描述得越清楚，它给你的结果就越准确。

## 需求描述的SMART原则

### S - Specific（具体的）
❌ "帮我做个好看的网站"
✅ "帮我做一个蓝色主题的个人博客网站，顶部有导航栏"

### M - Measurable（可衡量的）
❌ "按钮要大一点"
✅ "按钮宽度设为200像素，高度50像素"

### A - Achievable（可实现的）
❌ "做一个像淘宝一样的电商平台"
✅ "做一个简单的商品展示页面，显示6个商品"

### R - Relevant（相关的）
提供相关的背景信息

### T - Time-bound（有时间限制的）
说明项目的范围

## 需求描述模板
\`\`\`
【项目名称】：
【项目目的】：
【目标用户】：
【主要功能】：
【设计要求】：
【技术要求】：
\`\`\``,
    tags: ['需求分析', '沟通技巧', '方法论'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'feasibility-basics',
    sectionId: 'feasibility-analysis',
    title: '可行性分析基础',
    summary: '学习如何评估一个项目是否可行',
    body: `# 可行性分析基础

## 什么是可行性分析？
在开始一个项目之前，评估：
- 这个项目**能不能做**？
- 需要**多长时间**？
- 需要**什么资源**？

## 可行性分析的四个维度

### 1. 技术可行性 🔧
现有的AI工具能实现这个功能吗？

### 2. 时间可行性 ⏰
| 项目类型 | AI辅助时间 |
|---------|-----------|
| 简单页面 | 1-2小时 |
| 小型网站 | 1-3天 |
| 中型应用 | 1-2周 |

### 3. 资源可行性 💰
是否需要付费工具、服务器、域名？

### 4. 学习可行性 📚
需要学习哪些知识？

## 小贴士
1. **从小开始** - 先做最简单的版本
2. **快速验证** - 用最少的时间验证想法
3. **逐步迭代** - 根据反馈不断改进`,
    tags: ['可行性分析', '项目规划', '方法论'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tools-overview',
    sectionId: 'programming-tools',
    title: '编程工具概览',
    summary: '了解AI编程中常用的工具软件',
    body: `# 编程工具概览

## 工具分类

### 1. 代码编辑器
| 工具 | 特点 | 价格 |
|-----|------|------|
| VS Code | 功能强大，插件丰富 | 免费 |
| Cursor | 内置AI，智能补全 | 免费/付费 |
| Windsurf | 流畅的AI体验 | 免费/付费 |

### 2. AI对话工具
| 工具 | 特点 |
|-----|------|
| ChatGPT | 通用性强 |
| Claude | 代码质量高 |
| 通义千问 | 中文友好 |

### 3. 辅助工具
- Git：代码版本管理
- GitHub/Gitee：代码托管
- Node.js：运行JavaScript

## 新手推荐配置
1. **浏览器** - Chrome或Edge
2. **AI工具** - ChatGPT免费版
3. **编辑器** - VS Code

这个配置足够完成大部分学习和简单项目。`,
    tags: ['工具', '软件', '入门'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'vscode-guide',
    sectionId: 'vscode',
    title: 'VS Code完全指南',
    summary: '从安装到精通VS Code的完整教程',
    body: `# VS Code完全指南

## 什么是VS Code？
VS Code是微软开发的免费代码编辑器，是目前最流行的编程工具。

**优势**：
- ✅ 完全免费
- ✅ 跨平台
- ✅ 插件丰富
- ✅ 社区活跃

## 安装步骤
1. 访问 https://code.visualstudio.com/
2. 下载对应系统的安装包
3. 双击安装，一路下一步

## 必装插件
1. **Chinese Language Pack** - 中文界面
2. **Live Server** - 实时预览
3. **Prettier** - 代码格式化

## 常用快捷键
| 快捷键 | 功能 |
|-------|------|
| Ctrl+S | 保存 |
| Ctrl+Z | 撤销 |
| Ctrl+P | 快速打开文件 |
| Ctrl+\` | 打开终端 |`,
    tags: ['VS Code', '工具', '教程'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cursor-guide',
    sectionId: 'cursor',
    title: 'Cursor使用指南',
    summary: '学习使用专为AI编程设计的Cursor编辑器',
    body: `# Cursor使用指南

## 什么是Cursor？
Cursor是专为AI编程设计的代码编辑器，深度集成了AI能力。

**优势**：
- 🤖 内置AI对话
- ⚡ 智能代码补全
- 🔄 一键代码重构

## 核心功能

### 1. AI对话（Ctrl+K）
直接用自然语言描述你想要的代码。

### 2. 内联编辑（Ctrl+L）
选中代码后让AI修改。

### 3. 智能补全（Tab）
根据上下文自动建议代码。

## 使用技巧
1. **提供上下文** - 描述清楚项目背景
2. **分步骤操作** - 每次专注一个功能
3. **使用@符号引用** - 引用特定文件`,
    tags: ['Cursor', '工具', 'AI编程'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'chatgpt-for-coding',
    sectionId: 'chatgpt',
    title: 'ChatGPT编程指南',
    summary: '如何有效使用ChatGPT进行编程',
    body: `# ChatGPT编程指南

## ChatGPT简介
ChatGPT是OpenAI开发的AI对话助手，是最流行的AI编程工具之一。

## 编程提问技巧

### 1. 说明编程语言和框架
❌ "写一个登录功能"
✅ "用React写一个登录表单组件"

### 2. 提供上下文
说明项目背景和具体要求

### 3. 分步骤提问
一次专注一个功能

## 常用提问模板

### 生成代码
\`\`\`
请用[语言]实现[功能]
要求：
1. [要求1]
2. [要求2]
\`\`\`

### 修复错误
\`\`\`
代码：[粘贴代码]
错误：[粘贴错误]
请帮我修复
\`\`\``,
    tags: ['ChatGPT', 'AI助手', '教程'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'git-basics',
    sectionId: 'github-gitee',
    title: 'Git基础入门',
    summary: '了解版本控制的基本概念和Git的使用方法',
    body: `# Git基础入门

## 什么是Git？
Git是一个**版本控制系统**，帮助你管理代码的历史记录。

## 核心概念
- **仓库**：存放代码的地方
- **提交**：保存一次修改
- **分支**：代码的平行版本

## 常用命令
\`\`\`bash
# 初始化仓库
git init

# 添加文件
git add .

# 提交修改
git commit -m "描述"

# 查看状态
git status
\`\`\`

## 工作流程
1. 修改代码
2. git add .
3. git commit -m "说明"
4. 继续开发...`,
    tags: ['Git', '版本控制', '入门'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'github-guide',
    sectionId: 'github-gitee',
    title: 'GitHub使用指南',
    summary: '学习使用全球最大的代码托管平台',
    body: `# GitHub使用指南

## 什么是GitHub？
GitHub是全球最大的代码托管平台。

## 创建仓库
1. 点击"New repository"
2. 填写仓库名称
3. 选择公开或私有
4. 点击"Create"

## 上传代码
\`\`\`bash
git clone https://github.com/用户名/仓库名.git
cd 仓库名
# 添加代码文件
git add .
git commit -m "添加代码"
git push
\`\`\`

## GitHub Pages
免费托管静态网站：
1. 进入仓库Settings
2. 找到Pages选项
3. 选择main分支
4. 获得网址`,
    tags: ['GitHub', '代码托管', '教程'],
    order: 2,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'project-todo-app',
    sectionId: 'project-practice',
    title: '实战：待办事项应用',
    summary: '从零开始用AI编程创建一个完整的待办事项应用',
    body: `# 实战：待办事项应用

## 项目目标
创建一个功能完整的待办事项应用：
- 添加任务
- 标记完成
- 删除任务
- 数据持久化

## 第一步：描述需求
\`\`\`
请创建一个待办事项应用：
1. 输入框和添加按钮
2. 任务列表显示
3. 完成和删除功能
4. 使用localStorage保存
5. 美观的界面设计
\`\`\`

## 第二步：获取代码
AI会生成HTML、CSS、JavaScript代码

## 第三步：测试运行
保存为HTML文件，用浏览器打开

## 第四步：迭代优化
继续与AI对话，添加更多功能`,
    tags: ['实战', '项目', '待办事项'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'best-practices-prompts',
    sectionId: 'best-practices',
    title: '提示词最佳实践',
    summary: '编写高效AI提示词的技巧和模板',
    body: `# 提示词最佳实践

## 核心原则

### 1. 具体明确
❌ "做个网站"
✅ "用React做一个博客首页，显示文章列表"

### 2. 分步骤
一次只要求一个功能

### 3. 提供上下文
说明项目背景、技术栈、目标用户

### 4. 指定输出格式
"请添加注释"、"请解释每一步"

## 提示词模板
\`\`\`
角色：你是一个[角色]
任务：请帮我[任务描述]
要求：
1. [要求1]
2. [要求2]
输出：[期望的输出格式]
\`\`\`

## 常见错误
- 需求模糊
- 一次要求太多
- 没有提供上下文`,
    tags: ['最佳实践', '提示词', '技巧'],
    order: 1,
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
