// 用户类型
export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // 实际应用中应该加密
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

// 板块类型
export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  parentId?: string; // 支持子板块
  createdAt: string;
  updatedAt: string;
}

// 内容类型
export interface Content {
  id: string;
  sectionId: string;
  title: string;
  summary: string;
  body: string; // Markdown格式
  tags: string[];
  order: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// 问题类型
export interface Question {
  id: string;
  userId: string;
  contentId?: string; // 关联的内容（可选）
  title: string;
  body: string;
  status: 'open' | 'answered' | 'closed';
  createdAt: string;
  updatedAt: string;
}

// 回复类型
export interface Reply {
  id: string;
  questionId: string;
  userId: string;
  body: string;
  isAdminReply: boolean;
  createdAt: string;
  updatedAt: string;
}

// 术语解释类型
export interface Glossary {
  term: string;
  definition: string;
  example?: string;
}
