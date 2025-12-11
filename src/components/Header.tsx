'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut, Settings, BookOpen, MessageSquare, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  user: { username: string; role: string } | null;
  onLogin: () => void;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ user, onLogin, onLogout, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block gradient-text">
              AI编程学习
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              首页
            </Link>
            <Link href="/sections" className="text-sm font-medium hover:text-primary transition-colors">
              学习板块
            </Link>
            <Link href="/qa" className="text-sm font-medium hover:text-primary transition-colors">
              问答社区
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
                管理后台
              </Link>
            )}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索内容..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{user.username}</span>
                  {user.role === 'admin' && (
                    <span className="admin-badge">管理员</span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  退出
                </Button>
              </div>
            ) : (
              <Button onClick={onLogin} className="hidden md:flex">
                登录 / 注册
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索内容..."
                  className="pl-9 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                首页
              </Link>
              <Link href="/sections" className="text-sm font-medium hover:text-primary">
                学习板块
              </Link>
              <Link href="/qa" className="text-sm font-medium hover:text-primary">
                问答社区
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin" className="text-sm font-medium text-orange-500">
                  管理后台
                </Link>
              )}
              {user ? (
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{user.username}</span>
                    {user.role === 'admin' && (
                      <span className="admin-badge">管理员</span>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={onLogout} className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    退出登录
                  </Button>
                </div>
              ) : (
                <Button onClick={onLogin} className="w-full">
                  登录 / 注册
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
