"use client";

import { X, ChevronDown, User, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface NavLink {
  name: string;
  href: string;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

interface NavItem {
  name: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenu?: NavSection[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="fixed inset-0 z-[60] lg:hidden flex">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Menu Panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="relative w-4/5 max-w-sm h-full bg-wine border-r border-white/10 flex flex-col shadow-2xl"
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/" onClick={onClose}>
            <img
              src="/images/srilns_logo.png?v=3"
              alt="Sri Lakshmi Narasimha Swamy Charitable Trust"
              className="h-10 w-10 object-contain"
            />
          </Link>
          <button onClick={onClose} className="p-2 text-ivory hover:text-gold transition-colors">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.hasMegaMenu ? (
                <>
                  <button
                    onClick={() => toggleAccordion(item.name)}
                    className="w-full flex items-center justify-between p-3 text-ivory/90 hover:bg-white/5 rounded-md uppercase text-sm font-medium tracking-wide transition-colors"
                  >
                    {item.name}
                    <motion.div
                      animate={{ rotate: openAccordion === item.name ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: openAccordion === item.name ? "auto" : 0,
                      opacity: openAccordion === item.name ? 1 : 0
                    }}
                    className="overflow-hidden px-4"
                  >
                    <div className="py-2 space-y-4">
                      {item.megaMenu?.map((section, idx) => (
                        <div key={idx}>
                          <p className="text-gold text-xs font-semibold mb-2">{section.title}</p>
                          <ul className="space-y-2">
                            {section.links.map((link, linkIdx) => (
                              <li key={linkIdx}>
                                <Link
                                  href={link.href}
                                  onClick={onClose}
                                  className="text-ivory/70 hover:text-white text-sm capitalize transition-colors block py-1"
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block p-3 text-ivory/90 hover:bg-white/5 rounded-md uppercase text-sm font-medium tracking-wide transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 grid grid-cols-2 gap-4">
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-2 text-ivory/80 hover:text-gold text-sm justify-center py-2 bg-white/5 rounded-md transition-colors"
          >
            <User className="w-4 h-4" /> Account
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-2 text-ivory/80 hover:text-gold text-sm justify-center py-2 bg-white/5 rounded-md transition-colors"
          >
            <Heart className="w-4 h-4" /> Wishlist
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
