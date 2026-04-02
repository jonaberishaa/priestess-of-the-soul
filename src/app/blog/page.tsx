import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog | Priestess of the Soul',
  description: 'Artikuj mbi bizhuteri shpirtërore, gurë natyral dhe femëroren e shenjtë nga Priestess of the Soul.',
};

const posts = [
  {
    slug: 'bizhuteri-shpirterore-guri-natyral',
    title: 'Bizhuteri Shpirtërore: Pse Gurët Natyral Kanë Fuqi dhe Si t\'i Zgjedhësh',
    excerpt: 'Bizhuteri shpirtërore nuk është thjesht një stoli, është një kujtesë e heshtur, e mbajtur pranë lëkurës. Zbulo fuqinë e gurëve natyral dhe si të zgjedhësh copën e duhur për ty.',
    date: '2 Prill 2026',
    image: '/blog-bizhuteri-shpirterore.jpg',
    category: 'Udhëzues',
  },
];

export default function BlogPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-[#fffffc] min-h-screen">

        {/* Page header */}
        <div className="bg-[#f6f5e9] border-b border-[#201616]/10 py-16 px-6 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/40 font-body mb-3">Priestess of the Soul</p>
          <h1 className="font-heading text-5xl text-[#201616]">Blog</h1>
        </div>

        {/* Posts grid */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
                <div className="relative w-full h-[240px] overflow-hidden bg-[#f6f5e9]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-2 pt-5 pb-6 border-b border-[#201616]/10">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#b31b1b] font-body">{post.category}</span>
                    <span className="text-[#201616]/20">·</span>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[#201616]/40 font-body">{post.date}</span>
                  </div>
                  <h2 className="font-heading text-xl text-[#201616] leading-snug group-hover:text-[#b31b1b] transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-[#201616]/60 leading-relaxed">{post.excerpt}</p>
                  <span className="mt-1 text-[11px] tracking-[0.2em] uppercase text-[#201616] font-body group-hover:text-[#b31b1b] transition-colors">
                    Lexo më shumë ✦
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
