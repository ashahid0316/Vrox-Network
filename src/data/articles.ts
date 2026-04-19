export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: number;
  wordCount: number;
  author: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'What is Blockchain Technology?',
    slug: 'what-is-blockchain',
    excerpt:
      'Discover the fundamentals of blockchain technology and how it powers cryptocurrencies like Bitcoin and Ethereum.',
    content: `
      Blockchain technology is a revolutionary system that has transformed how we think about data storage, security, and trust. 
      At its core, blockchain is a distributed ledger technology that maintains a continuously growing list of records called blocks. 
      Each block contains a cryptographic hash of the previous block, transaction data, and a timestamp.

      [Content will be updated later - placeholder for 800-1500 words]
    `,
    date: 'April 10, 2026',
    category: 'Blockchain',
    readTime: 8,
    wordCount: 1200,
    author: 'Vrox Network',
  },
];
