'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import Image from 'next/image'
import Link from 'next/link'

// Premium feature: Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 2500;

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, cartTotal } = useCartStore()
  const overlayRef = useRef<HTMLDivElement>(null)

  const total = cartTotal()
  const shippingProgress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - total

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        closeCart()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.body.style.overflow = 'hidden' // Prevent body scroll
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeCart])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-medium text-gray-900 font-serif flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C99846]" />
                Your Cart
              </h2>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors"
                  onClick={closeCart}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close panel</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {amountToFreeShipping > 0 ? (
                    <>You are <span className="text-[#C99846]">₹{amountToFreeShipping.toFixed(2)}</span> away from Free Shipping!</>
                  ) : (
                    <span className="text-green-600">You have unlocked Free Shipping! 🎉</span>
                  )}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#C99846] h-1.5 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-orange-200" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 font-serif">Your cart is empty</p>
                  <p className="text-sm text-gray-500 max-w-[250px]">Explore our collections to find premium spiritual products for your daily rituals.</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-3 bg-[#C99846] text-white rounded-md hover:bg-[#B3873C] transition-colors font-medium shadow-sm hover:shadow-md"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul role="list" className="-my-6 divide-y divide-gray-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-6 group">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50 relative group-hover:border-[#C99846]/30 transition-colors">
                        <Image
                          src={item.image || 'https://via.placeholder.com/100'}
                          alt={item.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900 font-serif">
                            <h3>
                              <Link href={`/product/${item.id}`} onClick={closeCart} className="hover:text-[#C99846] transition-colors line-clamp-1">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="ml-4 text-[#C99846]">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center border border-gray-200 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              -
                            </button>
                            <p className="text-gray-700 px-2 font-medium w-8 text-center">{item.quantity}</p>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="font-medium text-red-500 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 text-xs tracking-wide uppercase"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
                <div className="flex justify-between text-base font-medium text-gray-900 font-serif">
                  <p>Subtotal</p>
                  <p className="text-[#C99846]">₹{total.toFixed(2)}</p>
                </div>
                <p className="mt-1.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex items-center justify-center rounded-md border border-transparent bg-[#C99846] px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-[#B3873C] hover:shadow-md transition-all duration-300"
                  >
                    Checkout securely
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <button
                      type="button"
                      className="font-medium text-[#C99846] hover:text-[#B3873C] transition-colors"
                      onClick={closeCart}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
                
                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t border-gray-200/60 flex justify-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1.5 text-xs">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Authentic
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
