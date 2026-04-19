import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Footer from '@/sections/Footer';
import { articles, Article } from '@/data/articles';

export default function KnowledgeHub() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gradient-to-b from-gray-900 to-black py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Knowledge Hub</h1>
          <p className="text-lg text-gray-400">
            Learn everything about blockchain, cryptocurrency, and how Vrox Network works
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-gray-700"
                >
                  <div className="space-y-4">
                    {/* Article Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white">{article.title}</h2>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-400">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime} min read</span>
                          <span>•</span>
                          <span>{article.category}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(article.id)}
                        className="mt-2 shrink-0 text-gray-400 hover:text-white"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            expandedId === article.id ? 'rotate-180' : ''
                          }`}
                        />
                      </Button>
                    </div>

                    {/* Excerpt */}
                    <p className="text-gray-300">{article.excerpt}</p>

                    {/* Expandable Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedId === article.id ? 'max-h-none' : 'max-h-0'
                      }`}
                    >
                      {expandedId === article.id && (
                        <div className="border-t border-gray-800 pt-4">
                          <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
                            <p>{article.content}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                      <a
                        href={`/learn/${article.slug}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                      >
                        Read Full Article →
                      </a>
                      <span className="text-xs text-gray-500">{article.wordCount.toLocaleString()} words</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-xl font-bold text-white">Recent Posts</h3>
              <div className="space-y-3">
                {articles.slice(0, 5).map((article) => (
                  <a
                    key={article.id}
                    href={`/learn/${article.slug}`}
                    className="block rounded-lg border border-gray-800 bg-gray-800/50 p-3 transition-all hover:border-blue-500/50 hover:bg-gray-800"
                  >
                    <p className="text-sm font-semibold text-white hover:text-blue-400">
                      {article.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{article.date}</p>
                  </a>
                ))}
              </div>

              {/* Categories */}
              <div className="mt-6 border-t border-gray-800 pt-6">
                <h4 className="mb-3 text-sm font-bold text-white uppercase tracking-wider">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Blockchain', 'Crypto', 'Tutorial', 'Updates'].map((cat) => (
                    <a
                      key={cat}
                      href={`#category-${cat.toLowerCase()}`}
                      className="rounded-full border border-gray-700 bg-gray-800/50 px-3 py-1 text-xs font-medium text-gray-300 transition-all hover:border-blue-500 hover:text-blue-400"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
