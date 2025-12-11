'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Rocket, FileSearch, CheckCircle, Wrench, Bot, GitBranch, Code, Award,
  ArrowRight, BookOpen, Users, MessageSquare, ChevronRight, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { store } from '@/lib/store';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Rocket, FileSearch, CheckCircle, Wrench, Bot, GitBranch, Code, Award,
};

export default function Home() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [sections, setSections] = useState(store.getSections());
  const [contents, setContents] = useState(store.getContents());

  useEffect(() => {
    const currentUser = store.getCurrentUser();
    if (currentUser) {
      setUser({ username: currentUser.username, role: currentUser.role });
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    const loggedInUser = store.login(email, password);
    if (loggedInUser) {
      setUser({ username: loggedInUser.username, role: loggedInUser.role });
      return true;
    }
    return false;
  };

  const handleRegister = (username: string, email: string, password: string) => {
    const newUser = store.register(username, email, password);
    if (newUser) {
      store.login(email, password);
      setUser({ username: newUser.username, role: newUser.role });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    store.logout();
    setUser(null);
  };

  const handleSearch = (query: string) => {
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header 
        user={user} 
        onLogin={() => setShowAuth(true)} 
        onLogout={handleLogout}
        onSearch={handleSearch}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              零基础也能学会AI编程
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              让<span className="gradient-text">人工智能</span>
              <br />成为你的编程助手
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              不需要编程基础，只需要清晰的想法。
              <br />
              学习如何与AI对话，让它帮你实现任何软件创意。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sections">
                <Button size="lg" className="w-full sm:w-auto">
                  开始学习
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/qa">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  问答社区
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{sections.length}</div>
              <div className="text-sm text-muted-foreground mt-1">学习板块</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{contents.length}+</div>
              <div className="text-sm text-muted-foreground mt-1">精选内容</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground mt-1">免费开放</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">随时学习</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">学习板块</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              从入门到实战，系统化的学习路径帮助你快速掌握AI编程
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => {
              const IconComponent = iconMap[section.icon] || BookOpen;
              const sectionContents = store.getContents(section.id);
              return (
                <Link key={section.id} href={`/sections/${section.id}`}>
                  <Card className="h-full card-hover cursor-pointer group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="flex items-center justify-between">
                        {section.title}
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        {sectionContents.length} 篇内容
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Contents */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">最新内容</h2>
              <p className="text-muted-foreground">精心编写的AI编程学习资料</p>
            </div>
            <Link href="/sections">
              <Button variant="outline">
                查看全部
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.slice(0, 6).map((content) => {
              const section = store.getSectionById(content.sectionId);
              return (
                <Link key={content.id} href={`/content/${content.id}`}>
                  <Card className="h-full card-hover cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                          {section?.title || '未分类'}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2">{content.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {content.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          阅读
                        </span>
                        <span>
                          {content.tags.slice(0, 2).map(tag => `#${tag}`).join(' ')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
            <p className="text-muted-foreground mb-8">
              加入我们，开启你的AI编程之旅。无论你是完全的新手还是有经验的开发者，这里都有适合你的内容。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <Button size="lg" onClick={() => setShowAuth(true)}>
                  免费注册
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Link href="/sections">
                  <Button size="lg">
                    继续学习
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">AI编程学习平台</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 AI编程学习平台. 让每个人都能用AI编程.
            </p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}
