import { User, Section, Content, Question, Reply } from './types';
import { initialSections, subSections } from './data/sections';
import { initialContents } from './data/contents';

// 简单的状态管理
class Store {
  private users: User[] = [
    {
      id: 'admin-1',
      username: 'admin',
      email: 'admin@aicodinglearn.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
  ];

  private sections: Section[] = [...initialSections, ...subSections];
  private contents: Content[] = [...initialContents];
  private questions: Question[] = [];
  private replies: Reply[] = [];
  private currentUser: User | null = null;

  // 用户相关
  register(username: string, email: string, password: string): User | null {
    if (this.users.find(u => u.email === email)) {
      return null;
    }
    const user: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
    }
    return user || null;
  }

  logout() {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // 板块相关
  getSections(): Section[] {
    return this.sections.filter(s => !s.parentId).sort((a, b) => a.order - b.order);
  }

  getSubSections(parentId: string): Section[] {
    return this.sections.filter(s => s.parentId === parentId).sort((a, b) => a.order - b.order);
  }

  getSectionById(id: string): Section | undefined {
    return this.sections.find(s => s.id === id);
  }

  addSection(section: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>): Section {
    const newSection: Section = {
      ...section,
      id: `section-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.sections.push(newSection);
    return newSection;
  }

  updateSection(id: string, updates: Partial<Section>): Section | null {
    const index = this.sections.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.sections[index] = {
      ...this.sections[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.sections[index];
  }

  deleteSection(id: string): boolean {
    const index = this.sections.findIndex(s => s.id === id);
    if (index === -1) return false;
    this.sections.splice(index, 1);
    // 删除子板块
    this.sections = this.sections.filter(s => s.parentId !== id);
    // 删除相关内容
    this.contents = this.contents.filter(c => c.sectionId !== id);
    return true;
  }

  // 内容相关
  getContents(sectionId?: string): Content[] {
    if (sectionId) {
      return this.contents.filter(c => c.sectionId === sectionId).sort((a, b) => a.order - b.order);
    }
    return this.contents.sort((a, b) => a.order - b.order);
  }

  getContentById(id: string): Content | undefined {
    return this.contents.find(c => c.id === id);
  }

  addContent(content: Omit<Content, 'id' | 'viewCount' | 'createdAt' | 'updatedAt'>): Content {
    const newContent: Content = {
      ...content,
      id: `content-${Date.now()}`,
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.contents.push(newContent);
    return newContent;
  }

  updateContent(id: string, updates: Partial<Content>): Content | null {
    const index = this.contents.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.contents[index] = {
      ...this.contents[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.contents[index];
  }

  deleteContent(id: string): boolean {
    const index = this.contents.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.contents.splice(index, 1);
    return true;
  }

  incrementViewCount(id: string): void {
    const content = this.contents.find(c => c.id === id);
    if (content) {
      content.viewCount++;
    }
  }

  // 问答相关
  getQuestions(): Question[] {
    return this.questions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getQuestionById(id: string): Question | undefined {
    return this.questions.find(q => q.id === id);
  }

  addQuestion(question: Omit<Question, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Question {
    const newQuestion: Question = {
      ...question,
      id: `question-${Date.now()}`,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.questions.push(newQuestion);
    return newQuestion;
  }

  // 回复相关
  getReplies(questionId: string): Reply[] {
    return this.replies
      .filter(r => r.questionId === questionId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  addReply(reply: Omit<Reply, 'id' | 'createdAt' | 'updatedAt'>): Reply {
    const newReply: Reply = {
      ...reply,
      id: `reply-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.replies.push(newReply);
    // 更新问题状态
    const question = this.questions.find(q => q.id === reply.questionId);
    if (question && reply.isAdminReply) {
      question.status = 'answered';
    }
    return newReply;
  }

  // 搜索
  searchContents(query: string): Content[] {
    const lowerQuery = query.toLowerCase();
    return this.contents.filter(c => 
      c.title.toLowerCase().includes(lowerQuery) ||
      c.summary.toLowerCase().includes(lowerQuery) ||
      c.body.toLowerCase().includes(lowerQuery) ||
      c.tags.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }

  // 获取用户
  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }
}

export const store = new Store();
