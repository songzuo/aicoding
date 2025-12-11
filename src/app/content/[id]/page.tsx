'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, Eye, Tag } from 'lucide-react';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { store } from '@/lib/store';

export default function ContentDetailPage() {
  const params = useParams();
  const contentId = params.id as string;
  
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  
  const content = store.getContentById(contentId);
  const section = content ? store.getSectionById(content.sectionId) : null;

  useEffect(() => {
    const currentUser = store.getCurrentUser();
    if (currentUser) {
      setUser({ username: currentUser.username, role: currentUser.role });
    }
    if (content) {
      store.incrementViewCount(contentId);
    }
  }, [contentId, content]);

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

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">内容不存在</h1>
          <Link href="/sections" className="text-primary hover:underline">
            返回板块列表
          </Link>
        </div>
      </div>
    );
  }

  // Simple markdown to HTML conversion
  const renderMarkdown = (md: string) => {
    let html = md
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4 text-sm"><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
      // Tables
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => c.trim().match(/^[-:]+$/))) {
          return '';
        }
        const isHeader = !match.includes('---');
        const cellTag = isHeader ? 'th' : 'td';
        const cellClass = isHeader ? 'border px-4 py-2 bg-muted font-semibold' : 'border px-4 py-2';
        return `<tr>${cells.map(c => `<${cellTag} class="${cellClass}">${c.trim()}</${cellTag}>`).join('')}</tr>`;
      })
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 my-4 text-muted-foreground italic">$1</blockquote>')
      // Unordered lists
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4">$2</li>')
      // Checkboxes
      .replace(/- \[x\] (.*$)/gim, '<li class="ml-4 flex items-center gap-2"><span class="text-green-500">✓</span> $1</li>')
      .replace(/- \[ \] (.*$)/gim, '<li class="ml-4 flex items-center gap-2"><span class="text-muted-foreground">○</span> $1</li>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="my-4">')
      // Line breaks
      .replace(/\n/g, '<br/>');
    
    // Wrap tables
    html = html.replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<table class="w-full border-collapse my-4">$&</table>');
    
    return `<div class="prose prose-slate max-w-none"><p class="my-4">${html}</p></div>`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onLogin={() => setShowAuth(true)} 
        onLogout={handleLogout}
        onSearch={(q) => window.location.href = `/search?q=${encodeURIComponent(q)}`}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          href={section ? `/sections/${section.id}` : '/sections'} 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回{section?.title || '板块列表'}
        </Link>

        <article>
          {/* Header */}
          <header className="mb-8">
            {section && (
              <Link 
                href={`/sections/${section.id}`}
                className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 hover:bg-primary/20 transition-colors"
              >
                {section.title}
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{content.summary}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                阅读
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {content.viewCount} 次浏览
              </span>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {content.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Content */}
          <div 
            className="content-body"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.body) }}
          />
        </article>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Link 
              href={section ? `/sections/${section.id}` : '/sections'}
              className="text-primary hover:underline"
            >
              ← 返回{section?.title || '板块列表'}
            </Link>
            <Link 
              href="/qa"
              className="text-primary hover:underline"
            >
              有问题？去问答社区 →
            </Link>
          </div>
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
