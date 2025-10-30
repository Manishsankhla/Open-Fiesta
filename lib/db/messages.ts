import type { ChatMessage } from '@/lib/types'
import { getStoredThreads, saveStoredThreads } from './localStorage'

// localStorage-based message operations
// Note: userId parameter is kept for API compatibility but not used (no-auth mode)

export async function addMessage(params: {
  userId: string
  chatId: string
  message: ChatMessage
}): Promise<void> {
  const { chatId, message } = params

  console.log('🔍 addMessage called (localStorage):', {
    chatId: chatId?.substring(0, 8) + '...',
    role: message.role,
    content: message.content?.substring(0, 50) + '...',
    modelId: message.modelId,
  })

  const threads = getStoredThreads()
  const threadIndex = threads.findIndex((t: any) => t.id === chatId)
  
  if (threadIndex === -1) {
    console.warn('Thread not found for message:', chatId)
    return
  }

  const thread = threads[threadIndex]
  const messages = thread.messages || []
  
  // Add new message
  messages.push({
    role: message.role,
    content: message.content,
    ts: message.ts || Date.now(),
    modelId: message.modelId,
    code: message.code,
    provider: message.provider,
    usedKeyType: message.usedKeyType,
    tokens: message.tokens,
  })

  // Update thread with new messages
  threads[threadIndex] = {
    ...thread,
    messages,
  }

  saveStoredThreads(threads)
  console.log('✅ Message saved to localStorage successfully')
}
