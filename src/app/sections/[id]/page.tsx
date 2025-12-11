'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Rocket, FileSearch, CheckCircle, Wrench, Bot, GitBranch, Code, Award,
  BookOpen, ChevronRight, ArrowLeft, FileCode, Sparkles, Wind, MessageSquare, Brain, Zap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { store } from '@/lib/store';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Rocket, FileSearch, CheckCircle, Wrench, Bot, GitBranch, Code, Award,
  FileCode, Sparkles, Wind, MessageSquare, Brain, Zap, BookOpen
};

export default function SectionDetailPage() {
  const params = useParams();
  const sectionId = params.id as string;
  
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  
  const section = store.getSectionById(sectionId);
  const contents = store.getContents(sectionId);
  const subSections = store.getSubSections(sectionId);

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

  if (!section) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">板块不存在</h1>
          <Link href="/sections" className="text-primary hover:underline">
            返回板块列表
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[section.icon] || BookOpen;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onLogin={() => setShowAuth(true)} 
        onLogout={handleLogout}
        onSearch={(q) => window.location.href = `/search?q=${encodeURIComponent(q)}`}
      />

      <main className="container mx-auto px-4 py-8">
        <Link href="/sections" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回板块列表
        </Link>

        {/* Section Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{section.title}</h1>
            <p className="text-muted-foreground text-lg">{section.description}</p>
          </div>
        </div>

        {/* Sub Sections */}
        {subSections.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">子板块</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subSections.map((sub) => {
                const SubIcon = iconMap[sub.icon] || BookOpen;
                const subContents = store.getContents(sub.id);
                return (
                  <Link key={sub.id} href={`/sections/${sub.id}`}>
                    <Card className="card-hover cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/80 to-purple-600/80 flex items-center justify-center">
                            <SubIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-base flex items-center justify-between">
                              {sub.title}
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-1">
                              {sub.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <span className="text-xs text-muted-foreground">{subContents.length} 篇内容</span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Contents */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {subSections.length > 0 ? '本板块内容' : '内容列表'}
          </h2>
          {contents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>暂无内容</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contents.map((content, index) => (
                <Link key={content.id} href={`/content/${content.id}`}>
                  <Card className="card-hover cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 text-lg font-semibold text-muted-foreground">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                            {content.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 mb-3">
                            {content.summary}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              阅读
                            </span>
                            <div className="flex gap-2">
                              {content.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
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
