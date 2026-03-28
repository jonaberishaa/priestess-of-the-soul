import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Products will be populated from Shopify CSV import
const products: { id: string; name: string; price: string; category: string; image?: string }[] = [];

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Header banner */}
        <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Koleksioni</p>
          <h1 className="font-heading text-5xl text-brown">Të gjitha Bizhuteritë</h1>
        </div>

        <div className="max-w-content mx-auto px-6 py-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {['Të gjitha', 'Unaza', 'Vathë', 'Gerdane'].map((f) => (
              <button
                key={f}
                className="text-xs tracking-widest uppercase px-5 py-2 border border-stone-light/40 text-stone hover:border-brown hover:text-brown transition-colors"
              >
                {f}
              </button>
            ))}
          </div>

          {/* Product grid */}
          {products.length === 0 ? (
            <div className="text-center py-24 text-stone">
              <p className="font-heading text-2xl mb-3">Produktet po vijnë</p>
              <p className="text-sm">Koleksioni po përgatitet. Kthehu së shpejti.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.id} className="group">
                  <div className="aspect-square bg-cream-warm border border-stone-light/20 mb-3 overflow-hidden group-hover:border-gold transition-colors">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone/30">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs uppercase tracking-widest text-stone mb-1">{p.category}</p>
                  <h3 className="font-heading text-lg text-brown mb-1">{p.name}</h3>
                  <p className="text-burgundy text-sm">{p.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
