'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, User, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { store } from '@/lib/store';

export default function QAPage() {
  const [user, setUser] = useState<{ id: string; username: string; role: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [questions, setQuestions] = useState(store.getQuestions());
  const [newQuestion, setNewQuestion] = useState({ title: '', body: '' });
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const currentUser = store.getCurrentUser();
    if (currentUser) {
      setUser({ id: currentUser.id, username: currentUser.username, role: currentUser.role });
    }
  }, []);

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

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (!newQuestion.title.trim() || !newQuestion.body.trim()) return;

    store.addQuestion({
      userId: user.id,
      title: newQuestion.title,
      body: newQuestion.body,
    });
    setNewQuestion({ title: '', body: '' });
    setQuestions(store.getQuestions());
  };

  const handleSubmitReply = (questionId: string) => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (!replyText.trim()) return;

    store.addReply({
      questionId,
      userId: user.id,
      body: replyText,
      isAdminReply: user.role === 'admin',
    });
    setReplyText('');
    setQuestions(store.getQuestions());
  };

  const getReplies = (questionId: string) => {
    return store.getReplies(questionId);
  };

  const getUserName = (userId: string) => {
    const u = store.getUserById(userId);
    return u?.username || '未知用户';
  };

  const isAdmin = (userId: string) => {
    const u = store.getUserById(userId);
    return u?.role === 'admin';
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
          <h1 className="text-3xl font-bold mb-2">问答社区</h1>
          <p className="text-muted-foreground">在这里提问，获得社区和管理员的帮助</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">提出问题</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  <div>
                    <Input
                      placeholder="问题标题"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="详细描述你的问题..."
                      rows={4}
                      value={newQuestion.body}
                      onChange={(e) => setNewQuestion({ ...newQuestion, body: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    发布问题
                  </Button>
                </form>
                {!user && (
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    请先<button onClick={() => setShowAuth(true)} className="text-primary hover:underline">登录</button>后发布问题
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-2 space-y-6">
            {questions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>暂无问题，成为第一个提问的人吧！</p>
              </div>
            ) : (
              questions.map((question) => {
                const replies = getReplies(question.id);
                const isExpanded = selectedQuestion === question.id;

                return (
                  <Card key={question.id} className="overflow-hidden">
                    <CardHeader className="cursor-pointer" onClick={() => setSelectedQuestion(isExpanded ? null : question.id)}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium">{getUserName(question.userId)}</span>
                            {isAdmin(question.userId) && <span className="admin-badge">管理员</span>}
                            <span className="text-xs text-muted-foreground">
                              {new Date(question.createdAt).toLocaleDateString('zh-CN')}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{question.title}</CardTitle>
                          <p className="text-muted-foreground mt-2 line-clamp-2">{question.body}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {question.status === 'answered' && (
                            <span className="flex items-center gap-1 text-green-500 text-sm">
                              <CheckCircle className="w-4 h-4" />
                              已回答
                            </span>
                          )}
                          <span className="text-sm text-muted-foreground">{replies.length} 回复</span>
                        </div>
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="border-t pt-4">
                        {/* Replies */}
                        {replies.length > 0 && (
                          <div className="space-y-4 mb-6">
                            {replies.map((reply) => (
                              <div 
                                key={reply.id} 
                                className={`p-4 rounded-lg ${reply.isAdminReply ? 'bg-amber-50 border border-amber-200' : 'bg-muted'}`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${reply.isAdminReply ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
                                    <User className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-sm font-medium">{getUserName(reply.userId)}</span>
                                  {reply.isAdminReply && <span className="admin-badge">管理员</span>}
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(reply.createdAt).toLocaleDateString('zh-CN')}
                                  </span>
                                </div>
                                <p className="text-sm">{reply.body}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Form */}
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="写下你的回复..."
                            rows={2}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1"
                          />
                          <Button onClick={() => handleSubmitReply(question.id)} className="self-end">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })
            )}
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
