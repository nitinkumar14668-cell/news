"use client";
import React, { useState } from 'react';
import { Menu, Search, Share2, Globe, Clock, ChevronRight, TrendingUp, Settings, X, Plus, Check, CheckCircle2 } from 'lucide-react';

// --- MOCK DATA ---
const TOP_STORY = {
  id: 'main-1',
  category: 'WORLD NEWS',
  title: "US Israel Iran War News Highlights: Trump admin says war 'terminated' before 60-day deadline; Iran Prez calls US blockade 'extension of military ops'",
  excerpt: 'US-Iran War: The ongoing standoff between the United States and Iran reflects a complex and evolving geopolitical crisis shaped by decades of mistrust, military posturing, and recent escalations...',
  source: 'USA News Media',
  date: 'May 01, 2026, 08:34 AM EDT',
  imageUrl: 'https://images.unsplash.com/photo-1580128660010-fd027e1e587a?q=80&w=1470&auto=format&fit=crop', // Placeholder for US Politics / Whitehouse
  related: [
    "Senate Committee announces new hearing schedule for next month",
    "Global markets react to Middle East developments",
  ]
};

const TRENDING_NEWS = [
  { id: 't1', title: 'Tech Giants face new congressional hearing over AI regulations', category: 'TECHNOLOGY', time: '2 hours ago' },
  { id: 't2', title: 'Federal Reserve announces surprising rate cut ahead of summer', category: 'BUSINESS', time: '4 hours ago' },
  { id: 't3', title: 'New York to implement congestion pricing starting next month', category: 'US NEWS', time: '5 hours ago' },
  { id: 't4', title: 'Global markets rally as shipping routes reopen in the Red Sea', category: 'MARKETS', time: '7 hours ago' },
];

const FEED_NEWS = [
  {
    id: 'f1',
    title: 'Supreme Court issues ruling on digital privacy case involving major telecom providers',
    category: 'POLITICS',
    time: '3 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop',
    related: [
       "Telecom stocks rally following privacy ruling",
       "Tech giants brace for impact as new privacy standards emerge",
    ]
  },
  {
    id: 'f2',
    title: 'Silicon Valley startups shift focus heavily to quantum computing infrastructure',
    category: 'TECHNOLOGY',
    time: '5 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    related: [
      "Quantum computing's encryption threat explained",
      "Top VC firms increase funding for deep tech startups"
    ]
  },
  {
    id: 'f3',
    title: 'Major storms set to impact the East Coast this weekend, millions under travel advisory',
    category: 'WEATHER',
    time: '6 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1200&auto=format&fit=crop',
    related: [
      "Airline delay predictions for weekend travelers",
      "Emergency preparedness tips for coastal cities"
    ]
  },
  {
    id: 'f4',
    title: 'Los Angeles gears up for the 2028 Olympics with massive transit overhaul plan',
    category: 'SPORTS',
    time: '8 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop',
    related: [
      "Economic impact of LA28 on local businesses",
      "New sports added to the 2028 Olympic roster"
    ]
  }
];

const CATEGORIES = ['US NEWS', 'WORLD', 'POLITICS', 'BUSINESS', 'TECH', 'SPORTS', 'OPINION'];

// --- COMPONENTS ---

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'latest' | 'my-feed'>('latest');
  const [isPersonalizeModalOpen, setIsPersonalizeModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setEmailInput('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };
  
  const [preferences, setPreferences] = useState({
    categories: ['POLITICS', 'TECHNOLOGY'],
    regions: ['NEW YORK', 'CALIFORNIA'],
    keywords: ['AI', 'ELECTIONS']
  });

  const toggleCategory = (cat: string) => setPreferences(prev => ({
    ...prev,
    categories: prev.categories.includes(cat) ? prev.categories.filter(c => c !== cat) : [...prev.categories, cat]
  }));

  const toggleRegion = (reg: string) => setPreferences(prev => ({
    ...prev,
    regions: prev.regions.includes(reg) ? prev.regions.filter(r => r !== reg) : [...prev.regions, reg]
  }));

  const addKeyword = (kw: string) => {
    if(kw.trim() && !preferences.keywords.includes(kw.toUpperCase())) {
      setPreferences(prev => ({ ...prev, keywords: [...prev.keywords, kw.trim().toUpperCase()] }));
    }
  };

  const removeKeyword = (kw: string) => setPreferences(prev => ({
    ...prev,
    keywords: prev.keywords.filter(k => k !== kw)
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#1a1a1a] font-sans selection:bg-red-500 selection:text-white">
      {/* Personalize Modal */}
      {isPersonalizeModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-black p-6 md:p-8 flex flex-col relative">
            <button onClick={() => setIsPersonalizeModalOpen(false)} className="absolute top-6 right-6 text-black hover:text-red-600 transition-colors">
              <X className="w-8 h-8" />
            </button>
            <h2 className="text-3xl md:text-5xl font-serif font-black uppercase mb-2 leading-none tracking-tighter pr-12">Tailor Your News</h2>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-8 pb-4 border-b-2 border-black">Customize your feed across USA, India, and Global stories</p>
            
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-[11px] font-bold bg-black text-white inline-block px-3 py-1 uppercase tracking-widest mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                  {['POLITICS', 'BUSINESS', 'TECHNOLOGY', 'ENTERTAINMENT', 'HEALTH', 'SPORTS', 'WORLD', 'INDIA', 'OPINION'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors ${preferences.categories.includes(cat) ? 'border-red-600 bg-red-600 text-white' : 'border-gray-300 hover:border-black text-black'}`}
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            </div>

            {/* Regions */}
            <div className="mb-8">
               <h3 className="text-[11px] font-bold bg-black text-white inline-block px-3 py-1 uppercase tracking-widest mb-4">USA Regions & Cities</h3>
               <div className="flex flex-wrap gap-2">
                  {['EAST COAST', 'WEST COAST', 'MIDWEST', 'SOUTH', 'NEW YORK', 'CALIFORNIA', 'TEXAS', 'FLORIDA', 'WASHINGTON D.C.', 'SILICON VALLEY'].map(reg => (
                    <button 
                      key={reg}
                      onClick={() => toggleRegion(reg)}
                      className={`border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors ${preferences.regions.includes(reg) ? 'border-red-600 bg-red-600 text-white' : 'border-gray-300 hover:border-black text-black'}`}
                    >
                      {reg}
                    </button>
                  ))}
               </div>
            </div>

            {/* Keywords */}
            <div className="mb-8">
               <h3 className="text-[11px] font-bold bg-black text-white inline-block px-3 py-1 uppercase tracking-widest mb-4">Follow Keywords</h3>
               <div className="flex items-center gap-2 mb-4">
                  <input type="text" placeholder="e.g. AI, Elections, Space" className="flex-1 border-2 border-black px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600" onKeyDown={e => { if(e.key === 'Enter') addKeyword(e.currentTarget.value); }} id="keyword-input" />
                  <button onClick={() => { const input = document.getElementById('keyword-input') as HTMLInputElement; addKeyword(input.value); input.value=''; }} className="bg-black text-white px-6 py-3 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-red-600 transition-colors">Add</button>
               </div>
               <div className="flex flex-wrap gap-2">
                 {preferences.keywords.map(kw => (
                   <div key={kw} className="bg-gray-100 flex items-center gap-2 px-3 py-1 border border-gray-300">
                      <span className="text-[10px] font-bold uppercase tracking-wider">{kw}</span>
                      <button onClick={() => removeKeyword(kw)} className="hover:text-red-600 text-gray-500 transition-colors cursor-pointer"><X className="w-3 h-3" /></button>
                   </div>
                 ))}
                 {preferences.keywords.length === 0 && <span className="text-xs text-gray-400 italic">No keywords added yet.</span>}
               </div>
            </div>

            <button onClick={() => setIsPersonalizeModalOpen(false)} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 uppercase tracking-[0.2em] text-[12px] transition-colors mt-auto flex items-center justify-center gap-2 cursor-pointer">
              Save Preferences <Check className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}

      {/* 1. TOP HEADER */}
      <header className="bg-white border-b-4 border-black">
        {/* Secondary Navigation Strip (Scrollable on Mobile) - Moved to top to match dark top bar */}
        <div className="bg-black text-white px-4 sm:px-6 lg:px-8 py-2 md:py-3 shadow-sm overflow-x-auto scollobar-hide text-[11px] uppercase tracking-widest font-bold">
          <div className="max-w-7xl mx-auto flex justify-between items-center whitespace-nowrap min-w-max gap-8">
            <div className="flex gap-6 items-center">
              <span className="flex items-center text-red-500 hover:text-white cursor-pointer transition-colors">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                LIVE: Elections 2026
              </span>
              <span className="opacity-80">New York: 72°F</span>
            </div>
            <div className="flex gap-6">
              <span className="hover:text-red-500 cursor-pointer transition-colors">US Edition</span>
              <span className="opacity-50 hover:opacity-100 cursor-pointer transition-colors">India Edition</span>
              <span className="opacity-50 hover:opacity-100 cursor-pointer transition-colors">Global</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24 md:h-32">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-black hover:text-red-600 p-2 -ml-2 transition-colors"
                aria-label="Toggle Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }} className="flex items-center gap-2">
                <span className="font-serif font-black leading-none tracking-tighter uppercase text-[40px] md:text-[64px]">
                  USA<span className="text-red-600">NEWS</span>
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 ml-10 mt-6 uppercase text-[12px] font-bold tracking-widest text-[#1a1a1a]">
              {CATEGORIES.slice(0, 5).map((category) => (
                <a key={category} href={`#${category.toLowerCase()}`} className="text-black hover:text-red-600 py-1 transition-colors border-b-2 border-transparent hover:border-red-600 underline-offset-4">
                  {category}
                </a>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center space-x-4 mt-2">
              <button className="text-black hover:text-red-600 p-2 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="hidden sm:block bg-black hover:bg-red-600 text-white px-5 py-2.5 rounded-none font-bold text-[10px] uppercase tracking-widest transition-colors">
                LIVE TV
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t-2 border-black absolute w-full left-0 z-40 border-b-4">
            <nav className="flex flex-col px-4 pt-2 pb-6 space-y-2 uppercase text-[12px] font-bold tracking-widest">
              {CATEGORIES.map((category) => (
                <a 
                  key={category} 
                  href={`#${category.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-black hover:text-red-600 block py-3 px-2 border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50"
                >
                  {category}
                </a>
              ))}
              <div className="pt-4 px-2">
                <button className="w-full bg-black hover:bg-red-600 text-white px-4 py-4 rounded-none font-bold text-xs uppercase tracking-widest transition-colors">
                  WATCH LIVE TV
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-0 border-x-0 sm:border-x border-gray-200">
        
        {currentView === 'home' ? (
          <>
          {/* Left/Main Column */}
          <div className="w-full lg:w-[65%] flex flex-col gap-0 border-b lg:border-b-0 lg:border-r border-gray-200">
          
          {/* Top Story Section */}
          <article className="bg-[#ffffff] overflow-hidden p-6 md:p-8 flex flex-col border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 uppercase text-red-600 font-bold text-xs tracking-wider mb-4">
                <span>{TOP_STORY.category}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 flex items-center gap-1">
                   BREAKING
                </span>
              </div>
              
              <h1 className="text-[40px] md:text-[54px] font-serif font-black leading-[1.05] tracking-tight mb-6">
                {TOP_STORY.title}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="relative aspect-[4/3] w-full bg-gray-200 border-b-4 border-gray-200 grayscale hover:grayscale-0 transition-all duration-700">
                  <img 
                    src={TOP_STORY.imageUrl} 
                    alt="News Hero" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                    <p className="text-white text-[10px] uppercase tracking-widest font-bold">Presidential address from the White House regarding recent international developments. (File Photo)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-lg text-gray-700 font-serif leading-relaxed h-[130px] overflow-hidden">
                    {TOP_STORY.excerpt}
                  </p>
                  <a href="#" className="font-bold text-red-600 underline underline-offset-4 hover:text-black mb-4">Read Full Story</a>
                  
                  <div className="mb-4 space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-black">Related Coverage:</h4>
                    <ul className="flex flex-col gap-2">
                      {TOP_STORY.related.map((rel, i) => (
                        <li key={i} className="text-sm font-semibold text-gray-800 hover:text-red-600 hover:underline underline-offset-2 cursor-pointer flex gap-2">
                           <span className="text-red-600">•</span> {rel}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-500 mt-auto border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center sm:flex-col sm:items-start lg:flex-row lg:items-center gap-2">
                      <span className="text-black">{TOP_STORY.source}</span>
                      <span>{TOP_STORY.date}</span>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 hover:text-red-600 transition-colors">
                        <Share2 className="w-3 h-3" /> SHARE
                      </button>
                      <button className="flex items-center gap-2 hover:text-red-600 transition-colors">
                        <Globe className="w-3 h-3" /> GOOGLE NEWS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Ad Placement Mock */}
          <div className="w-full bg-gray-50 border-b border-gray-200 text-center text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center justify-center min-h-[120px]">
            Advertisement
          </div>

          {/* More News Feed */}
          <section className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-4 mb-8 gap-4">
              <div className="flex gap-6">
                <button onClick={() => setActiveTab('latest')} className={`text-[2rem] font-serif font-bold italic transition-colors leading-none tracking-tight ${activeTab === 'latest' ? 'text-black underline decoration-4 underline-offset-8' : 'text-gray-400 hover:text-black'}`}>Latest News</button>
                <button onClick={() => setActiveTab('my-feed')} className={`text-[2rem] font-serif font-bold italic transition-colors leading-none tracking-tight ${activeTab === 'my-feed' ? 'text-black underline decoration-4 underline-offset-8' : 'text-gray-400 hover:text-black'}`}>My Feed</button>
              </div>
              <button 
                onClick={() => setIsPersonalizeModalOpen(true)} 
                className="flex items-center gap-2 bg-white hover:bg-gray-100 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <Settings className="w-3 h-3" /> Personalize
              </button>
            </div>

            {activeTab === 'my-feed' && (
              <div className="mb-8 p-4 bg-gray-50 border border-gray-200 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mr-2 flex items-center gap-2"><Check className="w-3 h-3 text-red-600" /> ACTIVE FILTERS:</span>
                {[...preferences.categories, ...preferences.regions, ...preferences.keywords].map(t => (
                  <span key={t} className="bg-black text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">{t}</span>
                ))}
                {(!preferences.categories.length && !preferences.regions.length && !preferences.keywords.length) && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">All topics. Click Personalize to tailor your feed.</span>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {(activeTab === 'latest' ? FEED_NEWS : [...FEED_NEWS].reverse()).map((news) => (
                <article key={news.id + activeTab} className="group cursor-pointer flex flex-col">
                  <div className="aspect-[3/2] w-full bg-gray-200 overflow-hidden mb-4 border-b-[3px] border-transparent group-hover:border-red-600 transition-all duration-300">
                    <img 
                      src={news.imageUrl} 
                      alt={news.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-red-600 mb-3">
                    {news.category}
                  </div>
                  <h3 className="text-[22px] font-serif font-black leading-tight group-hover:underline mb-4 decoration-2 underline-offset-4">
                    {news.title}
                  </h3>
                  
                  <div className="mb-6 space-y-2">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.1em] text-gray-500">Related Articles</h4>
                    <ul className="flex flex-col gap-2 border-l-2 border-red-600 pl-3">
                      {news.related.map((rel, i) => (
                        <li key={i} className="text-xs font-semibold text-gray-700 hover:text-red-600 hover:underline underline-offset-2 cursor-pointer">
                           {rel}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mt-auto border-t border-gray-100 pt-3">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {news.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>

        {/* Right/Sidebar Column (Desktop) */}
        <aside className="w-full lg:w-[35%] bg-[#fcfcfc] flex flex-col">
          
          {/* Trending Section */}
          <div className="p-6 md:p-8 border-b border-gray-200">
            <h2 className="text-xl font-serif font-bold italic mb-6">Developing Stories</h2>
            
            <ul className="flex flex-col gap-6">
              {TRENDING_NEWS.map((news, index) => (
                <li key={news.id} className="group cursor-pointer flex items-start border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <span className="text-red-600 font-black text-3xl mr-4 leading-none">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-red-600 transition-colors mb-3">
                      {news.title}
                    </h3>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                      {news.category} • {news.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="p-6 md:p-8">
            <div className="bg-black text-white p-8 relative border-2 border-black min-h-[300px] flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-4 text-red-500 font-bold">Editorial Briefing</p>
              
              {isSubscribed ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-serif italic mb-2 leading-tight">You're on the list.</h3>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Check your inbox to confirm your subscription.</p>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-[22px] font-serif italic mb-6 leading-tight text-white font-light">
                    "The American Dream is increasingly becoming a digital-first reality for global entrepreneurs."
                  </h3>
                  <p className="text-[9px] uppercase tracking-widest font-bold opacity-70 mb-8 border-b border-gray-800 pb-4">— USA News Desk</p>
                  
                  <form onSubmit={handleSubscribe} className="relative z-10 flex flex-col gap-4 mt-4">
                    <input 
                      type="email" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                      placeholder="Your email address" 
                      className="w-full px-4 py-3 bg-white text-black placeholder-gray-500 rounded-none border-none focus:outline-none focus:ring-2 focus:ring-red-600 font-bold text-sm"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 px-4 rounded-none transition-colors uppercase tracking-[0.2em] text-[10px] flex justify-center items-center gap-2"
                    >
                      Subscribe <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Ad Placement Mock */}
          <div className="flex-1 bg-gray-50 border-t border-gray-200 p-4 text-center text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center justify-center min-h-[300px] w-auto border m-6">
             Rectangle Ad Placeholder
          </div>
        </aside>
          </>
        ) : (
          <div className="w-full p-6 md:p-12 flex flex-col gap-8 max-w-4xl mx-auto">
            <div>
              <h1 className="text-[40px] md:text-[54px] font-serif font-black leading-[1.05] tracking-tight mb-4">About USA <span className="text-red-600">NEWS</span></h1>
              <p className="text-xl text-gray-600 font-serif leading-relaxed">Delivering truth, clarity, and uncompromising journalism to American, Indian, and global audiences.</p>
            </div>
            
            <div className="border-t-2 border-black pt-8">
              <h2 className="text-2xl font-serif font-bold italic mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At USA NEWS, our mission is to provide accurate, unbiased, and comprehensive news coverage. We believe that an informed public is the cornerstone of a functioning democracy. In an era of misinformation, we strive to be a beacon of factual reporting, focusing on what matters most to our readers across the globe.
              </p>
              
              <h2 className="text-2xl font-serif font-bold italic mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We aim to bridge the gap between local nuances and global perspectives. By targeting audiences in the USA, India, and worldwide, we foster a connected community that understands the ripple effects of regional events on the global stage. Our vision is to be the most trusted source of news for the modern, globally-minded citizen.
              </p>

              <h2 className="text-2xl font-serif font-bold italic mb-4">The Team</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Our editorial team comprises veteran journalists, data analysts, and international correspondents who bring decades of experience from leading global newsrooms. Headquartered in New York, with major bureaus in Washington D.C., Silicon Valley, and New Delhi, we work around the clock to bring you stories that shape our world.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  { name: 'Eleanor Vance', role: 'Editor-in-Chief', exp: '20+ years of investigative journalism.' },
                  { name: 'Rajesh Kumar', role: 'Head of Global Desk', exp: 'Former international policy advisor.' },
                  { name: 'Sarah Jenkins', role: 'Chief Political Correspondent', exp: 'Covering Capitol Hill since 2012.' }
                ].map(member => (
                  <div key={member.name} className="border border-gray-200 p-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-red-600 mb-2">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.exp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black pt-12 pb-6 px-6 md:px-8 flex flex-col bg-white text-[#1a1a1a]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10 pb-10 border-b border-gray-200">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-serif font-black text-3xl tracking-tighter uppercase whitespace-nowrap">
                  USA<span className="text-red-600">NEWS</span>
                </span>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed font-semibold pr-4">
                Your trusted source for breaking news, in-depth analysis, and top stories from the United States and around the world.
              </p>
            </div>
            
            <div>
              <h4 className="text-black font-bold uppercase tracking-[0.15em] text-[10px] mb-6 border-l-2 border-red-600 pl-3">Categories</h4>
              <ul className="space-y-4 text-[13px] font-bold text-gray-500">
                <li><a href="#" className="hover:text-red-600 transition-colors">US Politics</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Business & Economy</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">World News</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Technology</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Health & Science</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-black font-bold uppercase tracking-[0.15em] text-[10px] mb-6 border-l-2 border-red-600 pl-3">Corporate</h4>
              <ul className="space-y-4 text-[13px] font-bold text-gray-500">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); window.scrollTo(0, 0); }} className="hover:text-red-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Advertise</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-black font-bold uppercase tracking-[0.15em] text-[10px] mb-6 border-l-2 border-red-600 pl-3">Legal</h4>
              <ul className="space-y-4 text-[13px] font-bold text-gray-500">
                <li><a href="#" className="hover:text-red-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
            <p>&copy; {new Date().getFullYear()} USA News Media Group. All rights reserved.</p>
            <p className="mt-4 md:mt-0 opacity-70">Targeting audiences in USA, India, and Globally.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
