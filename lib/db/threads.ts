import type { ChatMessage, ChatThread } from '@/lib/types'
import { getStoredThreads, saveStoredThreads, generateId } from './localStorage'

// localStorage-based thread operations
// Note: userId parameter is kept for API compatibility but not used (no-auth mode)

export async function fetchThreads(_userId: string): Promise<ChatThread[]> {
  // In no-auth mode, return all threads from localStorage
  const stored = getStoredThreads()
  return stored.map((t: any) => ({
    id: t.id,
    title: t.title || 'New Chat',
    createdAt: t.createdAt || Date.now(),
    projectId: t.projectId || undefined,
    pageType: (t.pageType || 'home') as 'home' | 'compare',
    messages: (t.messages || []) as ChatMessage[],
  }))
}

export async function createThread(params: {
  userId: string
  title?: string
  projectId?: string | null
  pageType?: 'home' | 'compare'
  initialMessage?: ChatMessage | null
}): Promise<ChatThread> {
  const { title, projectId, pageType = 'home', initialMessage } = params
  
  const newThread: ChatThread = {
    id: generateId(),
    title: title ?? 'New Chat',
    createdAt: Date.now(),
    projectId: projectId ?? undefined,
    pageType,
    messages: initialMessage ? [initialMessage] : [],
  }

  const threads = getStoredThreads()
  threads.unshift(newThread) // Add to beginning
  saveStoredThreads(threads)

  return newThread
}

export async function deleteThread(_userId: string, chatId: string): Promise<void> {
  const threads = getStoredThreads()
  const filtered = threads.filter((t: any) => t.id !== chatId)
  saveStoredThreads(filtered)
}

export async function updateThreadTitle(_userId: string, chatId: string, title: string): Promise<void> {
  const threads = getStoredThreads()
  const updated = threads.map((t: any) => 
    t.id === chatId ? { ...t, title } : t
  )
  saveStoredThreads(updated)
}
