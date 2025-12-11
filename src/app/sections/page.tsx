'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Rocket, FileSearch, CheckCircle, Wrench, Bot, GitBranch, Code, Award,
  BookOpen, ChevronRight, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { store } from '@/lib/store';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Rocket, FileSearch, CheckCircle, Wrench, Bot, GitBranch, Code, Award,
};

export default function SectionsPage() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const sections = store.getSections();

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

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onLogin={() => setShowAuth(true)} 
        onLogout={handleLogout}
        onSearch={(q) => window.location.href = `/search?q=${encodeURIComponent(q)}`}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold mb-2">学习板块</h1>
          <p className="text-muted-foreground">选择你感兴趣的板块开始学习</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const IconComponent = iconMap[section.icon] || BookOpen;
            const sectionContents = store.getContents(section.id);
            const subSections = store.getSubSections(section.id);

            return (
              <Link key={section.id} href={`/sections/${section.id}`}>
                <Card className="h-full card-hover cursor-pointer group">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="flex items-center justify-between text-xl">
                      {section.title}
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </CardTitle>
                    <CardDescription className="text-base">{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{sectionContents.length} 篇内容</span>
                      {subSections.length > 0 && (
                        <span>{subSections.length} 个子板块</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}
