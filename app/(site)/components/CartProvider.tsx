'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface CartItem {
  color: string
  colorLabel: string
  qty: number
  price: number
}

interface CartContextValue {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void
  updateQty: (color: string, qty: number) => void
  removeItem: (color: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  mounted: boolean
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'kofferklar-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Always initialize with [] — matches SSR output, prevents hydration mismatch.
  // NEVER read localStorage here; localStorage is undefined in Node.js.
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Effect 1: Load from localStorage ONCE after client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // Silently ignore corrupt/malformed data — fall back to empty cart
    }
    setMounted(true)
  }, [])

  // Effect 2: Write to localStorage on every items change, but only after mount.
  // The `!mounted` guard prevents writing before the initial read completes,
  // which would overwrite a non-empty stored cart with [].
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, mounted])

  // CART-05: merge logic — same color → increment qty; different color → append
  const addToCart = useCallback(
    (incoming: Omit<CartItem, 'qty'> & { qty?: number }) => {
      const amount = incoming.qty ?? 1
      setItems(prev => {
        const idx = prev.findIndex(i => i.color === incoming.color)
        if (idx !== -1) {
          const next = [...prev]
          next[idx] = { ...next[idx], qty: next[idx].qty + amount }
          return next
        }
        return [
          ...prev,
          {
            color: incoming.color,
            colorLabel: incoming.colorLabel,
            qty: amount,
            price: incoming.price,
          },
        ]
      })
    },
    []
  )

  // updateQty guard: reject qty < 1 to prevent negative quantities
  const updateQty = useCallback((color: string, qty: number) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => (i.color === color ? { ...i, qty } : i)))
  }, [])

  const removeItem = useCallback((color: string) => {
    setItems(prev => prev.filter(i => i.color !== color))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  // Price snapshotted at add time (v1 design decision — no real payment backend)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        mounted,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
