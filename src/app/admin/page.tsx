'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, FolderOpen, FileText, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { store } from '@/lib/store';
import { Section, Content } from '@/lib/types';

export default function AdminPage() {
  const [user, setUser] = useState<{ id: string; username: string; role: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [sections, setSections] = useState(store.getSections());
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [newSection, setNewSection] = useState({ title: '', description: '', icon: 'BookOpen' });
  const [newContent, setNewContent] = useState({ title: '', summary: '', body: '', tags: '' });

  useEffect(() => {
    const currentUser = store.getCurrentUser();
    if (currentUser) {
      setUser({ id: currentUser.id, username: currentUser.username, role: currentUser.role });
    }
  }, []);

  useEffect(() => {
    if (selectedSection) {
      setContents(store.getContents(selectedSection));
    }
  }, [selectedSection]);

  const handleLogin = (email: string, password: string) => {
    const loggedInUser = store.login(email, password);
    if (loggedInUser) {
      setUser({ id: loggedInUser.id, username: loggedInUser.username, role: loggedInUser.role });
      return true;
    }
    return false;
  };

  const handleRegister = (username: string, email: string, password: string) => {
    const newUser = store.register(username, email, password);
    if (newUser) {
      store.login(email, password);
      setUser({ id: newUser.id, username: newUser.username, role: newUser.role });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    store.logout();
    setUser(null);
  };

  const handleAddSection = () => {
    if (!newSection.title.trim()) return;
    store.addSection({
      title: newSection.title,
      description: newSection.description,
      icon: newSection.icon,
      order: sections.length + 1,
    });
    setSections(store.getSections());
    setNewSection({ title: '', description: '', icon: 'BookOpen' });
  };

  const handleUpdateSection = () => {
    if (!editingSection) return;
    store.updateSection(editingSection.id, editingSection);
    setSections(store.getSections());
    setEditingSection(null);
  };

  const handleDeleteSection = (id: string) => {
    if (confirm('确定要删除这个板块吗？相关内容也会被删除。')) {
      store.deleteSection(id);
      setSections(store.getSections());
      if (selectedSection === id) {
        setSelectedSection(null);
        setContents([]);
      }
    }
  };

  const handleAddContent = () => {
    if (!selectedSection || !newContent.title.trim()) return;
    store.addContent({
      sectionId: selectedSection,
      title: newContent.title,
      summary: newContent.summary,
      body: newContent.body,
      tags: newContent.tags.split(',').map(t => t.trim()).filter(Boolean),
      order: contents.length + 1,
    });
    setContents(store.getContents(selectedSection));
    setNewContent({ title: '', summary: '', body: '', tags: '' });
  };

  const handleUpdateContent = () => {
    if (!editingContent) return;
    store.updateContent(editingContent.id, editingContent);
    if (selectedSection) {
      setContents(store.getContents(selectedSection));
    }
    setEditingContent(null);
  };

  const handleDeleteContent = (id: string) => {
    if (confirm('确定要删除这个内容吗？')) {
      store.deleteContent(id);
      if (selectedSection) {
        setContents(store.getContents(selectedSection));
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          user={user} 
          onLogin={() => setShowAuth(true)} 
          onLogout={handleLogout}
          onSearch={() => {}}
        />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">需要管理员权限</h1>
          <p className="text-muted-foreground mb-6">请使用管理员账号登录</p>
          <Button onClick={() => setShowAuth(true)}>登录</Button>
        </div>
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onLogin={() => setShowAuth(true)} 
        onLogout={handleLogout}
        onSearch={() => {}}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold mb-2">管理后台</h1>
          <p className="text-muted-foreground">管理板块和内容</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sections Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5" />
                  板块管理
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Section Form */}
                <div className="space-y-2 p-3 bg-muted rounded-lg">
                  <Input
                    placeholder="板块标题"
                    value={newSection.title}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                  />
                  <Input
                    placeholder="板块描述"
                    value={newSection.description}
                    onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                  />
                  <Button onClick={handleAddSection} size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    添加板块
                  </Button>
                </div>

                {/* Sections List */}
                <div className="space-y-2">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedSection === section.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedSection(section.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{section.title}</span>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => { e.stopPropagation(); setEditingSection(section); }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => { e.stopPropagation(); handleDeleteSection(section.id); }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{section.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contents Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  内容管理
                  {selectedSection && (
                    <span className="text-sm font-normal text-muted-foreground">
                      - {store.getSectionById(selectedSection)?.title}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedSection ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>请先选择一个板块</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Add Content Form */}
                    <div className="space-y-2 p-4 bg-muted rounded-lg">
                      <Input
                        placeholder="内容标题"
                        value={newContent.title}
                        onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                      />
                      <Input
                        placeholder="内容摘要"
                        value={newContent.summary}
                        onChange={(e) => setNewContent({ ...newContent, summary: e.target.value })}
                      />
                      <Textarea
                        placeholder="内容正文（支持Markdown）"
                        rows={4}
                        value={newContent.body}
                        onChange={(e) => setNewContent({ ...newContent, body: e.target.value })}
                      />
                      <Input
                        placeholder="标签（用逗号分隔）"
                        value={newContent.tags}
                        onChange={(e) => setNewContent({ ...newContent, tags: e.target.value })}
                      />
                      <Button onClick={handleAddContent} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        添加内容
                      </Button>
                    </div>

                    {/* Contents List */}
                    <div className="space-y-2">
                      {contents.map((content) => (
                        <div key={content.id} className="p-4 rounded-lg border">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium">{content.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{content.summary}</p>
                              <div className="flex gap-2 mt-2">
                                {content.tags.map(tag => (
                                  <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-1 ml-4">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setEditingContent(content)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteContent(content.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditingSection(null)} />
          <div className="relative bg-background rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">编辑板块</h2>
            <div className="space-y-4">
              <Input
                placeholder="板块标题"
                value={editingSection.title}
                onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
              />
              <Textarea
                placeholder="板块描述"
                value={editingSection.description}
                onChange={(e) => setEditingSection({ ...editingSection, description: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={handleUpdateSection} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
                <Button variant="outline" onClick={() => setEditingSection(null)}>
                  <X className="w-4 h-4 mr-2" />
                  取消
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Content Modal */}
      {editingContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditingContent(null)} />
          <div className="relative bg-background rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">编辑内容</h2>
            <div className="space-y-4">
              <Input
                placeholder="内容标题"
                value={editingContent.title}
                onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
              />
              <Input
                placeholder="内容摘要"
                value={editingContent.summary}
                onChange={(e) => setEditingContent({ ...editingContent, summary: e.target.value })}
              />
              <Textarea
                placeholder="内容正文（支持Markdown）"
                rows={10}
                value={editingContent.body}
                onChange={(e) => setEditingContent({ ...editingContent, body: e.target.value })}
              />
              <Input
                placeholder="标签（用逗号分隔）"
                value={editingContent.tags.join(', ')}
                onChange={(e) => setEditingContent({ 
                  ...editingContent, 
                  tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
                })}
              />
              <div className="flex gap-2">
                <Button onClick={handleUpdateContent} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
                <Button variant="outline" onClick={() => setEditingContent(null)}>
                  <X className="w-4 h-4 mr-2" />
                  取消
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}
