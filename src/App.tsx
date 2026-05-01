import { useState } from 'react';
import { Menu, Search, Share2, Globe, Clock, ChevronRight, TrendingUp } from 'lucide-react';

// --- MOCK DATA ---
const TOP_STORY = {
  id: 'main-1',
  category: 'WORLD NEWS',
  title: "US Israel Iran War News Highlights: Trump admin says war 'terminated' before 60-day deadline; Iran Prez calls US blockade 'extension of military ops'",
  excerpt: 'US-Iran War: The ongoing standoff between the United States and Iran reflects a complex and evolving geopolitical crisis shaped by decades of mistrust, military posturing, and recent escalations...',
  source: 'USA News Media',
  date: 'May 01, 2026, 08:34 AM EDT',
  imageUrl: 'https://images.unsplash.com/photo-1580128660010-fd027e1e587a?q=80&w=1470&auto=format&fit=crop', // Placeholder for US Politics / Whitehouse
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
  },
  {
    id: 'f2',
    title: 'Silicon Valley startups shift focus heavily to quantum computing infrastructure',
    category: 'TECHNOLOGY',
    time: '5 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'f3',
    title: 'Major storms set to impact the East Coast this weekend, millions under travel advisory',
    category: 'WEATHER',
    time: '6 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'f4',
    title: 'Los Angeles gears up for the 2028 Olympics with massive transit overhaul plan',
    category: 'SPORTS',
    time: '8 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop',
  }
];

const CATEGORIES = ['US NEWS', 'WORLD', 'POLITICS', 'BUSINESS', 'TECH', 'SPORTS', 'OPINION'];

// --- COMPONENTS ---

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#1a1a1a] font-sans selection:bg-red-500 selection:text-white">
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
              <a href="/" className="flex items-center gap-2">
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
            <h2 className="text-2xl font-serif font-bold italic border-b-2 border-black pb-2 mb-8 inline-block pr-12">Trending Across Regions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {FEED_NEWS.map((news) => (
                <article key={news.id} className="group cursor-pointer flex flex-col">
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
            <div className="bg-black text-white p-8 relative border-2 border-black">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-4 text-red-500 font-bold">Editorial Briefing</p>
              <h3 className="text-[22px] font-serif italic mb-6 leading-tight text-white font-light">
                "The American Dream is increasingly becoming a digital-first reality for global entrepreneurs."
              </h3>
              <p className="text-[9px] uppercase tracking-widest font-bold opacity-70 mb-8 border-b border-gray-800 pb-4">— USA News Desk</p>
              
              <form className="relative z-10 flex flex-col gap-4 mt-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 bg-white text-black placeholder-gray-500 rounded-none border-none focus:outline-none focus:ring-2 focus:ring-red-600 font-bold text-sm"
                />
                <button 
                  type="button"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 px-4 rounded-none transition-colors uppercase tracking-[0.2em] text-[10px] flex justify-center items-center gap-2"
                >
                  Subscribe <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Ad Placement Mock */}
          <div className="flex-1 bg-gray-50 border-t border-gray-200 p-4 text-center text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center justify-center min-h-[300px] w-auto border m-6">
             Rectangle Ad Placeholder
          </div>
        </aside>
        
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
                <li><a href="#" className="hover:text-red-600 transition-colors">About Us</a></li>
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
