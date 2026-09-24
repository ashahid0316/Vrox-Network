import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Footer from '@/sections/Footer';
import { articles } from '@/data/articles';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/learn')}
            className="mb-8 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Knowledge Hub
          </Button>
          <Card className="border border-gray-800 bg-gray-900/50 p-8 text-center">
            <h1 className="text-2xl font-bold text-white">Article not found</h1>
            <p className="mt-4 text-gray-400">The article you're looking for doesn't exist.</p>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related articles (for sidebar)
  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 5);

  // Split content into paragraphs/sections
  const contentParagraphs = article.content.split('\n\n');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Article Header */}
      <div className="border-b border-gray-800 bg-gradient-to-b from-gray-900 to-black py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/learn')}
            className="mb-6 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Knowledge Hub
          </Button>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{article.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-400">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
            <span>•</span>
            <span className="text-blue-400">{article.category}</span>
            <span>•</span>
            <span>{article.wordCount.toLocaleString()} words</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-800 bg-gray-900/50 p-8">
              <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed font-medium text-gray-200">{article.excerpt}</p>

                {/* Main article content area */}
                <div className="border-t border-gray-800 pt-8 space-y-6">
                  {contentParagraphs.map((para, index) => {
                    // Check if paragraph is a section header (e.g. "1. What is Restaking?")
                    const isHeader = /^\d+\.\s/.test(para);
                    if (isHeader) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
                          {para}
                        </h2>
                      );
                    }
                    return (
                      <p key={index} className="text-base leading-relaxed text-gray-300">
                        {para}
                      </p>
                    );
                  })}
                </div>

                {/* Colorful Highlight & Summary Card (matching the mobile app design) */}
                <div className="my-8 rounded-xl bg-gradient-to-r from-purple-900/80 to-indigo-900/80 p-6 border border-purple-500/50 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-3">Key Highlights &amp; Summary</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li className="flex items-start">
                      <span className="mr-2 text-yellow-400 font-bold">•</span>
                      <span><strong>Maximum Capital Efficiency:</strong> Reuse staked assets across multiple decentralized protocols.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-yellow-400 font-bold">•</span>
                      <span><strong>Shared Security:</strong> Bootstrap AVSs instantly without separate validator pools.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-yellow-400 font-bold">•</span>
                      <span><strong>Balanced Participation:</strong> Weigh slashing risks against enhanced passive yield opportunities.</span>
                    </li>
                  </ul>
                </div>

                {/* Author Info */}
                <div className="border-t border-gray-800 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
                      VN
                    </div>
                    <div>
                      <p className="font-semibold text-white">{article.author}</p>
                      <p className="text-sm text-gray-400">Published on {article.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Table of Contents */}
            <Card className="sticky top-24 border border-gray-800 bg-gray-900/50 p-6 mb-6">
              <h3 className="mb-4 text-lg font-bold text-white">Table of Contents</h3>
              <div className="space-y-2 text-sm">
                <a href="#intro" className="block text-gray-400 hover:text-blue-400 transition-colors">
                  • Introduction
                </a>
                <a href="#main" className="block text-gray-400 hover:text-blue-400 transition-colors">
                  • Main Content &amp; AVSs
                </a>
                <a href="#conclusion" className="block text-gray-400 hover:text-blue-400 transition-colors">
                  • Key Highlights &amp; Summary
                </a>
              </div>
            </Card>

            {/* Related Articles */}
            <Card className="border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Related Articles</h3>
              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <a
                    key={rel.id}
                    href={`/learn/${rel.slug}`}
                    className="block rounded-lg border border-gray-800 bg-gray-800/50 p-3 transition-all hover:border-blue-500/50 hover:bg-gray-800"
                  >
                    <p className="text-sm font-semibold text-white hover:text-blue-400">
                      {rel.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{rel.date}</p>
                  </a>
                ))}
                {relatedArticles.length === 0 && (
                  <p className="text-sm text-gray-500">No related articles yet</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
