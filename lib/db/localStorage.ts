// Helper utilities for localStorage-based data storage

export function getStoredThreads(): any[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('ai-crysta:threads')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveStoredThreads(threads: any[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('ai-crysta:threads', JSON.stringify(threads))
  } catch (error) {
    console.error('Failed to save threads to localStorage:', error)
  }
}

export function generateId(): string {
  if (typeof crypto !== 'undefined' && (crypto as any).randomUUID) {
    return (crypto as any).randomUUID()
  }
  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

