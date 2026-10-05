"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown, Globe } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { AnnouncementBar } from "./AnnouncementBar";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import CartDrawer from "../cart/CartDrawer";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

const NAV_ITEMS = [
  { key: "home", name: "Home", href: "/" },
  {
    key: "shop",
    name: "Shop",
    href: "/shop",
    hasMegaMenu: true,
    megaMenu: [
      {
        title: "PUJA ESSENTIALS",
        links: [
          { name: "Puja Thalis", href: "/shop/puja-essentials?sub=thali" },
          { name: "Brass Diyas & Lamps", href: "/shop/puja-essentials?sub=diyas" },
          { name: "Kalash & Panchapatra", href: "/shop/puja-essentials?sub=kalash" },
          { name: "Puja Bells & Accessories", href: "/shop/puja-essentials?sub=bells" },
          { name: "Kumkum & Chandan Paste", href: "/shop/puja-essentials?sub=chandan" },
        ],
      },
      {
        title: "DEVOTION",
        links: [
          { name: "Handcrafted Idols & Murtis", href: "/shop/decor?sub=idols" },
          { name: "5 Mukhi Rudraksha", href: "/shop/puja-essentials?sub=rudraksha" },
          { name: "Sacred Japa Malas", href: "/shop/puja-essentials?sub=mala" },
          { name: "Energized Shree Yantras", href: "/shop/decor?sub=yantra" },
          { name: "Sacred Scriptures & Books", href: "/shop/books" },
        ],
      },
      {
        title: "HOME & TEMPLE",
        links: [
          { name: "Traditional Brassware", href: "/shop/decor?sub=brassware" },
          { name: "Natural Incense & Agarbatti", href: "/shop/puja-essentials?sub=incense" },
          { name: "Sacred Temple Decor", href: "/shop/decor" },
          { name: "Home Mandir Accessories", href: "/shop/decor?sub=mandir" },
        ],
      },
      {
        title: "GIFTING",
        links: [
          { name: "Wedding Sacred Gifts", href: "/shop/gifts?occ=wedding" },
          { name: "Housewarming Blessings", href: "/shop/gifts?occ=housewarming" },
          { name: "Festival Gift Sets", href: "/shop/gifts?occ=festival" },
          { name: "Corporate Devotional Hampers", href: "/shop/gifts?occ=corporate" },
          { name: "Exclusive Gift Boxes", href: "/shop/gifts" },
        ],
      },
      {
        title: "COLLECTIONS",
        links: [
          { name: "New Arrivals", href: "/shop/new" },
          { name: "Best Sellers", href: "/shop/best-sellers" },
          { name: "Festival Collection", href: "/shop/gifts" },
          { name: "Exclusive Artisan Pieces", href: "/shop" },
        ],
      },
    ],
  },
  { key: "collections", name: "Collections", href: "/shop/new" },
  {
    key: "seva",
    name: "Seva",
    href: "/seva",
    hasMegaMenu: true,
    megaMenu: [
      {
        title: "ONLINE POOJA",
        links: [
          { name: "Maha Rudrabhisheka", href: "/seva/maha-rudrabhisheka" },
          { name: "Mahalakshmi Puja", href: "/seva/shri-mahalakshmi-puja" },
          { name: "Vighnaharta Ganesha", href: "/seva/vighnaharta-ganesha-puja" },
          { name: "Satyanarayan Mahapooja", href: "/seva/satyanarayan-mahapooja" },
        ],
      },
      {
        title: "SACRED HOMA (HAVANS)",
        links: [
          { name: "Maha Ganapathi Homa", href: "/seva/maha-ganapathi-homa" },
          { name: "Maha Mrityunjaya Homa", href: "/seva/maha-mrityunjaya-homa" },
          { name: "Navagraha Shanti Homa", href: "/seva/navagraha-shanti-homa" },
          { name: "Sudarshana Narasimha Homa", href: "/seva/sudarshana-narasimha-homa" },
        ],
      },
      {
        title: "COMMUNITY SEVA",
        links: [
          { name: "Daily Annadanam Seva", href: "/seva/annadanam-support" },
          { name: "Gau Mata Goshala Seva", href: "/seva/goshala-maintenance" },
          { name: "Ancient Temple Restoration", href: "/seva/temple-restoration" },
          { name: "Vidyadaan Vedic Education", href: "/seva/vidyadaan-initiative" },
        ],
      },
    ],
  },
  { key: "events", name: "Events", href: "/events" },
  { key: "gifting", name: "Gifting", href: "/shop/gifts" },
  { key: "journal", name: "Journal", href: "/blog" },
  { key: "about", name: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const { cartCount: getCartCount, openCart } = useCartStore();
  const cartCount = getCartCount();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const isHomepage = pathname === "/";

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = sessionStorage.getItem("baktiseva.locale");
      if (saved === "en" || saved === "hi" || saved === "kn") setSelectedLang(saved);
    } catch {
      /* ignore */
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setActiveMegaMenu(null);
    setIsLangOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Header background & text colors per Rule #7
  const isHeaderLight = isScrolled || !isHomepage;
  const headerBgClass = isHeaderLight
    ? "bg-ivory/95 backdrop-blur-md border-b border-burgundy/10 text-burgundy shadow-sm"
    : "bg-gradient-to-b from-wine/80 via-burgundy/40 to-transparent backdrop-blur-sm text-ivory";

  const textColorClass = isHeaderLight ? "text-burgundy" : "text-ivory";
  const navHoverClass = isHeaderLight ? "hover:text-gold" : "hover:text-champagne";

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full transition-all duration-300">
        <AnnouncementBar />
        <header
          className={`w-full transition-all duration-500 ease-in-out ${headerBgClass} ${isScrolled ? "h-14" : "h-16"
            }`}
          onMouseLeave={() => {
            setActiveMegaMenu(null);
            setIsLangOpen(false);
          }}
        >
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-full flex items-center justify-between relative">
            {/* Left: Logo & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                className={`lg:hidden p-2 -ml-2 transition-transform hover:scale-105 ${textColorClass}`}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>

              <Link href="/" className="flex items-center gap-2 group shrink-0">
                <img
                  src="/images/srilns_logo.png?v=3"
                  alt="Sri Lakshmi Narasimha Swamy Charitable Trust"
                  className="h-10 sm:h-12 lg:h-14 w-10 sm:w-12 lg:w-14 object-contain transition-all duration-300 group-hover:scale-105"
                />
                <div className={`flex flex-col justify-center hidden sm:flex ${textColorClass}`}>
                  <span className="font-heading text-sm lg:text-base font-bold tracking-wider leading-tight">
                    Sri Lakshmi Narasimha Swamy
                  </span>
                  <span className="font-heading text-xs lg:text-sm font-semibold tracking-wider leading-tight">
                    Charitable Trust
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Nav Items */}
            <nav className="hidden lg:flex items-center gap-5 text-[12px] tracking-wide font-medium uppercase h-full">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.key}
                  className="h-full flex items-center"
                  onMouseEnter={() => (item.hasMegaMenu ? setActiveMegaMenu(item.key) : setActiveMegaMenu(null))}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 transition-colors py-2 border-b-2 border-transparent hover:border-[#C59A4B] ${textColorClass} ${navHoverClass}`}
                  >
                    {item.name}
                    {item.hasMegaMenu && <ChevronDown className="w-3 h-3 opacity-70" />}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Mega Menu Dropdown (Anchored to header container) */}
            {NAV_ITEMS.map((item) => (
              item.hasMegaMenu && activeMegaMenu === item.key && (
                <div
                  key={`mega-${item.key}`}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[95vw] max-w-[1280px] bg-[#FFFDF7] text-[#222222] border border-[#641E2E]/15 shadow-2xl rounded-b-2xl overflow-hidden z-50 pt-1"
                  onMouseEnter={() => setActiveMegaMenu(item.key)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-8 text-[#222222]"
                  >
                    <div className="grid grid-cols-12 gap-8">
                      {/* 5 Content Columns */}
                      <div className="col-span-9 grid grid-cols-5 gap-6 border-r border-[#EEE3D0] pr-6">
                        {item.megaMenu?.map((section, idx) => (
                          <div key={idx} className="space-y-3">
                            <h4 className="text-[#641E2E] font-heading font-bold text-xs tracking-wider uppercase border-b border-[#C59A4B]/30 pb-2">
                              {section.title}
                            </h4>
                            <ul className="space-y-2">
                              {section.links.map((link, linkIdx) => (
                                <li key={linkIdx}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setActiveMegaMenu(null)}
                                    className="text-xs text-[#222222] hover:text-[#641E2E] font-medium hover:font-bold transition-all capitalize block py-0.5"
                                  >
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Highlight Feature Image Column */}
                      <div className="col-span-3 flex flex-col justify-between bg-[#F8F1E5] rounded-xl p-4 border border-[#EEE3D0]">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                          <img
                            src={
                              item.key === "seva"
                                ? "/images/sacred_homa_fire_1790597364613.jpg"
                                : "/images/brass_diya_lamp.jpg"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B]">
                            {item.key === "seva" ? "SACRED RITUALS" : "FEATURED COLLECTION"}
                          </span>
                          <h5 className="font-heading font-bold text-sm text-[#641E2E] mt-0.5">
                            {item.key === "seva"
                              ? "Book Online Homa & Receive Courier Prasadam"
                              : "Handcrafted Brass Diya & Temple Artifacts"}
                          </h5>
                          <Link
                            href={item.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="inline-block mt-2 text-[11px] font-bold text-[#641E2E] underline uppercase tracking-wider hover:text-[#B8860B]"
                          >
                            Explore Now →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            ))}

            {/* Right Action Icons: Search, Language, Account, Wishlist, Cart */}
            <div className={`flex items-center gap-4 sm:gap-6 ${textColorClass} h-full`}>
              {/* Search Toggle */}
              <button
                className={`${navHoverClass} transition-colors p-1.5 rounded-full hover:bg-[#641E2E]/5`}
                aria-label="Search Products"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" strokeWidth={1.6} />
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold tracking-wider ${navHoverClass} transition-colors p-1.5 rounded-md hover:bg-[#641E2E]/5 uppercase`}
                  aria-label="Language Selector"
                >
                  <Globe className="w-4 h-4" />
                  <span>{selectedLang}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-[#FFFDF7] text-[#342B27] border border-[#641E2E]/15 rounded-xl shadow-xl py-2 w-32 z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang.code);
                          try {
                            sessionStorage.setItem("baktiseva.locale", lang.code);
                          } catch {
                            /* ignore */
                          }
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#F8F1E5] flex items-center justify-between ${selectedLang === lang.code ? "text-[#641E2E] font-bold bg-[#F8F1E5]/60" : "text-[#49332D]"
                          }`}
                      >
                        <span>{lang.label}</span>
                        {selectedLang === lang.code && <span className="text-[#C59A4B]">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Account */}
              <Link
                href="/account"
                className={`hidden sm:block ${navHoverClass} transition-colors p-1.5 rounded-full hover:bg-[#641E2E]/5`}
                aria-label="User Account"
              >
                <User className="w-5 h-5" strokeWidth={1.6} />
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={`hidden sm:block ${navHoverClass} transition-colors p-1.5 rounded-full hover:bg-[#641E2E]/5`}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" strokeWidth={1.6} />
              </Link>

              {/* Shopping Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className={`relative ${navHoverClass} transition-colors p-1.5 rounded-full hover:bg-[#641E2E]/5`}
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.6} />
                {isMounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#641E2E] text-[10px] font-bold text-[#FFFDF7] shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            navItems={NAV_ITEMS}
          />
        )}
        {isSearchOpen && (
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        )}
      </AnimatePresence>
      <CartDrawer />
    </>
  );
}
