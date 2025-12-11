'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => boolean;
  onRegister: (username: string, email: string, password: string) => boolean;
}

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const success = onLogin(email, password);
      if (!success) {
        setError('邮箱或密码错误');
      } else {
        onClose();
      }
    } else {
      if (!username || !email || !password) {
        setError('请填写所有字段');
        return;
      }
      const success = onRegister(username, email, password);
      if (!success) {
        setError('该邮箱已被注册');
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-background rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === 'login' ? '登录' : '注册'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-2">用户名</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">邮箱</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">密码</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full">
            {mode === 'login' ? '登录' : '注册'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <p>
              还没有账号？{' '}
              <button
                onClick={() => setMode('register')}
                className="text-primary hover:underline"
              >
                立即注册
              </button>
            </p>
          ) : (
            <p>
              已有账号？{' '}
              <button
                onClick={() => setMode('login')}
                className="text-primary hover:underline"
              >
                立即登录
              </button>
            </p>
          )}
        </div>

        {mode === 'login' && (
          <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
            <p className="font-medium mb-1">测试账号：</p>
            <p>邮箱：admin@aicodinglearn.com</p>
            <p>密码：admin123</p>
          </div>
        )}
      </div>
    </div>
  );
}
