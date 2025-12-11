# AI编程学习平台

一个帮助人们学习AI编程的网站，内容丰富、界面美观、支持响应式设计。

## 功能特点

### 📚 丰富的学习内容
- **8个主要板块**：入门指南、需求分析、可行性分析、编程工具、AI助手、GitHub/Gitee、项目实战、最佳实践
- **子板块支持**：VS Code、Cursor、Windsurf、ChatGPT、Claude、GitHub Copilot等
- **13+篇精选内容**：涵盖AI编程的方方面面，从零基础到实战

### 👤 用户系统
- 用户注册和登录
- 管理员权限区分
- 管理员回复有特殊标识（金色徽章）

### 💬 问答社区
- 用户可以提问
- 支持回复功能
- 管理员回复有特殊高亮显示

### 🛠️ 管理后台
- 板块管理（增删改查）
- 子板块支持
- 内容管理（增删改查）
- 支持Markdown格式

### 🎨 界面设计
- 现代简约风格
- 渐变色和卡片设计
- 响应式布局（手机/平板/电脑）
- 流畅的动画效果

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **UI组件**: shadcn/ui + Radix UI
- **图标**: Lucide React

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 测试账号

- **管理员账号**
  - 邮箱: admin@aicodinglearn.com
  - 密码: admin123

## 项目结构

```
src/
├── app/                    # 页面
│   ├── page.tsx           # 首页
│   ├── sections/          # 板块页面
│   ├── content/           # 内容详情页
│   ├── qa/                # 问答社区
│   └── admin/             # 管理后台
├── components/            # 组件
│   ├── ui/               # UI基础组件
│   ├── Header.tsx        # 头部导航
│   └── AuthModal.tsx     # 登录/注册弹窗
└── lib/                   # 工具和数据
    ├── types.ts          # 类型定义
    ├── store.ts          # 状态管理
    ├── utils.ts          # 工具函数
    └── data/             # 初始数据
        ├── sections.ts   # 板块数据
        └── contents.ts   # 内容数据
```

## 内容板块

1. **入门指南** - 从零开始了解AI编程
2. **需求分析** - 学习如何清晰描述需求
3. **可行性分析** - 评估项目可行性
4. **编程工具软件** - VS Code、Cursor、Windsurf等
5. **AI编程助手** - ChatGPT、Claude、Copilot等
6. **GitHub与Gitee** - 代码托管平台使用
7. **项目实战** - 实际案例学习
8. **最佳实践** - 提高效率的技巧

## 特色

- ✅ 零基础友好，内容通俗易懂
- ✅ 结构化内容，便于快速学习
- ✅ 丰富的示例和模板
- ✅ 术语解释详细
- ✅ 响应式设计，支持各种设备
- ✅ 管理员可自由管理内容

## License

MIT
