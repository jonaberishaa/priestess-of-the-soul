'use client';

import { useState } from 'react';
import { salePrice } from '@/data/products';
import { useWishlist } from '@/components/WishlistContext';
import { useCart } from '@/components/CartContext';
import type { Product } from '@/data/products';
import { PRODUCT_SIZES } from '@/data/ring-sizes';

const GIFT_MESSAGES = [
  'Krijuar për ty që shkel tokën si tempull dhe e jeton ditën si ceremoni.',
  'Nuk është thjesht një stoli, por një kujtim i hyjnisë brenda teje.',
  'Në çdo detaj ka një përkujtim – Ti ke qenë gjithmonë e shenjtë.',
  'Për një grua që nuk pranon të jetë e zakonshme – magji që ndriçon Hyjnoren në ty.',
  'Ti je art, rit dhe prani – kjo unazë flet për ty.',
  'Je gjithmonë me mua, edhe kur s\'jemi afër – ky aksesor është përqafim në një formë tjetër.',
  'Në çdo detaj, një kujtim i asaj që më bën me ndje kur të shoh.',
  'Ti je art i gjallë – dhe ky aksesor është një pasqyrim i bukur i shpirtit tënd.',
  'Për ty që mbart magjinë në çdo hap – kjo dhuratë është një kujtim i fuqisë tënde.',
  'Në këtë ditë të veçantë, uroj të të kujtohet sa e bukur, e shenjtë dhe e plotë që je.',
  'Një dhuratë e vogël, për një ditë të veçantë – uroj të ndjehesh ashtu siç je: e bukur dhe e çmuar.',
  'Gëzuar ditëlindjen, hyjneshë – Ti je një kujtim i bukurisë së vërtetë në këtë botë.',
  'Urime të përzemërta – elegancë për një shpirt të bukur.',
];

const SIZE_CHART = [
  { eu: 'EU 10', us: 'US 5',    mm: '50mm', diameter: '15.9mm' },
  { eu: 'EU 12', us: 'US 6',    mm: '52mm', diameter: '16.6mm' },
  { eu: 'EU 14', us: 'US 6.5',  mm: '54mm', diameter: '17.2mm' },
  { eu: 'EU 16', us: 'US 7.5',  mm: '56mm', diameter: '17.8mm' },
  { eu: 'EU 17', us: 'US 8',    mm: '57mm', diameter: '18.2mm' },
  { eu: 'EU 18', us: 'US 8.5',  mm: '58mm', diameter: '18.5mm' },
  { eu: 'EU 20', us: 'US 9.5',  mm: '60mm', diameter: '19.1mm' },
  { eu: 'EU 22', us: 'US 10.5', mm: '62mm', diameter: '19.7mm' },
];

function RingSizerModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'app' | 'spango' | 'unaze'>('app');

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#201616]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#fffffc] w-full max-w-lg overflow-y-auto max-h-[92vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#201616] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#fffef2]/50 mb-0.5">Udhëzues</p>
            <h2 className="font-heading text-2xl text-[#fffef2]">Gjej Madhësinë Tënde</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#fffef2]/40 hover:text-[#fffef2] text-2xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#201616]/10">
          {([
            { key: 'app',    icon: '📱', label: 'Me App' },
            { key: 'spango', icon: '📏', label: 'Me Spango' },
            { key: 'unaze',  icon: '💍', label: 'Me Unazë' },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-3 text-xs tracking-wider uppercase font-body transition-colors flex flex-col items-center gap-1 ${
                tab === t.key
                  ? 'bg-[#201616] text-[#fffef2]'
                  : 'text-[#201616]/50 hover:text-[#201616] hover:bg-[#201616]/5'
              }`}
            >
              <span className="text-lg">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="px-6 py-6">

          {/* TAB 1: App */}
          {tab === 'app' && (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-[#201616]/70 font-body leading-relaxed">
                Shkarkoni një nga aplikacionet falas më poshtë dhe gjeni madhësinë tuaj saktësisht brenda 1 minutës.
              </p>

              {/* iOS */}
              <div className="border border-[#201616]/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🍎</span>
                  <h3 className="font-heading text-lg text-[#201616]">iPhone (iOS)</h3>
                </div>
                <div className="bg-[#f5f0e8] px-4 py-3 mb-3">
                  <p className="text-xs font-bold text-[#201616] tracking-wider uppercase mb-0.5">Ring Sizer — by Setworks</p>
                  <p className="text-xs text-[#201616]/50 font-body">App Store · Falas</p>
                </div>
                <ol className="flex flex-col gap-2">
                  {[
                    'Hap App Store → kërko "Ring Sizer Setworks"',
                    'Shkarko dhe hap aplikacionin',
                    'Zgjidh "Measure Finger" nga ekrani kryesor',
                    'Vendos gishtin (gishtin unazor — zakonisht gishti 4) mbi ekranin e telefonit',
                    'Lëviz vizat e verdha derisa të përshtaten saktësisht me anët e gishtin',
                    'Aplikacioni do të shfaqë madhësinë EU — shëno numrin dhe kthehu të porosisësh!',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 items-start text-sm font-body text-[#201616]/80">
                      <span className="w-5 h-5 rounded-full bg-[#201616] text-[#fffef2] text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Android */}
              <div className="border border-[#201616]/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🤖</span>
                  <h3 className="font-heading text-lg text-[#201616]">Android</h3>
                </div>
                <div className="bg-[#f5f0e8] px-4 py-3 mb-3">
                  <p className="text-xs font-bold text-[#201616] tracking-wider uppercase mb-0.5">Ring Sizer — by Setworks</p>
                  <p className="text-xs text-[#201616]/50 font-body">Google Play · Falas</p>
                </div>
                <ol className="flex flex-col gap-2">
                  {[
                    'Hap Google Play Store → kërko "Ring Sizer Setworks"',
                    'Shkarko dhe hap aplikacionin',
                    'Shtyp "Measure Your Finger"',
                    'Vendos gishtin tënd mbi ekran sipas udhëzimit',
                    'Rregulloji skajet derisa të përshtaten saktë me gishtin',
                    'Shëno madhësinë EU dhe kthehu të porosisësh!',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 items-start text-sm font-body text-[#201616]/80">
                      <span className="w-5 h-5 rounded-full bg-[#201616] text-[#fffef2] text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-[#f5f0e8] px-4 py-3 text-xs font-body text-[#201616]/60 leading-relaxed">
                💡 <strong className="text-[#201616]">Këshillë:</strong> Mat gishtin në mbrëmje — gishtat ënjten pak gjatë ditës nga nxehtësia, kështu madhësia do të jetë më e saktë.
              </div>
            </div>
          )}

          {/* TAB 2: Spango/Letër */}
          {tab === 'spango' && (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-[#201616]/70 font-body leading-relaxed">
                Kjo metodë nuk kërkon asgjë përveç një cope letre ose spangoje dhe vizores.
              </p>

              <div className="border border-[#201616]/10 p-4 flex flex-col gap-3">
                <h3 className="font-heading text-lg text-[#201616]">Metoda me Spango ose Letër</h3>
                <ol className="flex flex-col gap-3">
                  {[
                    { step: 'Merr një copë letre të ngushtë (rreth 5mm e gjerë) ose një spango të hollë.', tip: null },
                    { step: 'Mbështille rreth gishtin ku do të vendosësh unazën — kaloje pak mbi nyje pasi unaza duhet t\'i kalojë.', tip: 'Mos e shtrëngoni shumë — duhet të jetë komode.' },
                    { step: 'Shëno me laps pikën ku skajet takohen (për letrën) ose shëno me thumb-nail ku mbaron (për spangon).', tip: null },
                    { step: 'Shtri letrën/spangon në vizore dhe mat gjatësinë në milimetra (mm).', tip: null },
                    { step: 'Gjej madhësinë EU në tabelën më poshtë duke krahasuar gjatësinë e spangos me kolumnën "Perimetri".', tip: null },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-[#201616] text-[#fffef2] text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-body text-[#201616]/80">{item.step}</p>
                        {item.tip && (
                          <p className="text-xs text-gold font-body mt-0.5 italic">→ {item.tip}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Size chart */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/40 mb-2">Tabela e Madhësive</p>
                <table className="w-full text-xs font-body border-collapse">
                  <thead>
                    <tr className="bg-[#201616] text-[#fffef2]">
                      <th className="px-3 py-2 text-left tracking-wider">EU</th>
                      <th className="px-3 py-2 text-left tracking-wider">US</th>
                      <th className="px-3 py-2 text-left tracking-wider">Perimetri</th>
                      <th className="px-3 py-2 text-left tracking-wider">Diametri</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row, i) => (
                      <tr key={row.eu} className={i % 2 === 0 ? 'bg-[#f9f7f2]' : 'bg-white'}>
                        <td className="px-3 py-2 font-bold text-[#201616]">{row.eu}</td>
                        <td className="px-3 py-2 text-[#201616]/70">{row.us}</td>
                        <td className="px-3 py-2 text-[#201616]/70">{row.mm}</td>
                        <td className="px-3 py-2 text-[#201616]/70">{row.diameter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#f5f0e8] px-4 py-3 text-xs font-body text-[#201616]/60 leading-relaxed">
                💡 <strong className="text-[#201616]">Nëse je mes dy madhësive</strong> — zgjidh madhësinë më të madhe për rehati.
              </div>
            </div>
          )}

          {/* TAB 3: Unazë ekzistuese */}
          {tab === 'unaze' && (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-[#201616]/70 font-body leading-relaxed">
                Nëse keni tashmë një unazë që ju rri mirë, kjo është metoda më e saktë.
              </p>

              <div className="border border-[#201616]/10 p-4 flex flex-col gap-3">
                <h3 className="font-heading text-lg text-[#201616]">Metoda me Unazë Ekzistuese</h3>
                <ol className="flex flex-col gap-3">
                  {[
                    { step: 'Vendos unazën mbi një fletë letre të bardhë.', tip: null },
                    { step: 'Vizato me laps saktësisht sipas brendësisë së unazës (rrethit të brendshëm).', tip: 'Mbaje lapsin pingul me letrën për saktësi.' },
                    { step: 'Mat diametrin e rrethit — nga njëra anë e brendshme tek tjetra (jo anët e jashtme).', tip: null },
                    { step: 'Ky numër në mm është diametri — gjeje madhësinë EU në tabelën më poshtë.', tip: null },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-[#201616] text-[#fffef2] text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-body text-[#201616]/80">{item.step}</p>
                        {item.tip && (
                          <p className="text-xs text-gold font-body mt-0.5 italic">→ {item.tip}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Size chart by diameter */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/40 mb-2">Tabela e Madhësive — Sipas Diametrit</p>
                <table className="w-full text-xs font-body border-collapse">
                  <thead>
                    <tr className="bg-[#201616] text-[#fffef2]">
                      <th className="px-3 py-2 text-left tracking-wider">EU</th>
                      <th className="px-3 py-2 text-left tracking-wider">US</th>
                      <th className="px-3 py-2 text-left tracking-wider">Diametri i Brendshëm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row, i) => (
                      <tr key={row.eu} className={i % 2 === 0 ? 'bg-[#f9f7f2]' : 'bg-white'}>
                        <td className="px-3 py-2 font-bold text-[#201616]">{row.eu}</td>
                        <td className="px-3 py-2 text-[#201616]/70">{row.us}</td>
                        <td className="px-3 py-2 font-semibold text-[#b31b1b]">{row.diameter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#f5f0e8] px-4 py-3 text-xs font-body text-[#201616]/60 leading-relaxed">
                💡 <strong className="text-[#201616]">Kujdes:</strong> Mat diametrin e brendshëm të unazës — jo të jashtmin. Ndryshimi mund të jetë 1–2mm dhe ndikon në madhësinë finale.
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-[#201616]/10 text-center">
            <p className="text-xs text-[#201616]/40 font-body leading-relaxed">
              Nuk je e sigurt? Na dërgoni mesazh në WhatsApp dhe do t&apos;ju ndihmojmë me gëzim. 🌹
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductActions({ product }: { product: Product }) {
  const isRing = product.type === 'Unaza';
  const { toggle, has } = useWishlist();
  const { add, openDrawer } = useCart();
  const wishlisted = has(product.id);

  // Madhësitë e disponueshme vetëm për këtë produkt
  const availableSizes = PRODUCT_SIZES[product.id] ?? [];

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizerOpen, setSizerOpen] = useState(false);

  const handleAddToCart = () => {
    if (isRing && !selectedSize) {
      alert('Ju lutem zgjidhni madhësinë e unazës.');
      return;
    }
    add(product, selectedSize || undefined, selectedMessage || undefined);
    setAddedToCart(true);
    openDrawer();
  };

  const waText = encodeURIComponent(
    `Përshëndetje! Jam e interesuar për: ${product.name} (${salePrice(product.price)})${isRing && selectedSize ? ` — Madhësia: ${selectedSize}` : ''}`
  );

  return (
    <>
      {sizerOpen && <RingSizerModal onClose={() => setSizerOpen(false)} />}

      {/* Ring size picker */}
      {isRing && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] tracking-widest uppercase text-[#201616]/50">Madhësia e Unazës</p>
            <button
              onClick={() => setSizerOpen(true)}
              className="text-[10px] tracking-wider uppercase text-[#b31b1b] hover:text-[#8a1515] font-body flex items-center gap-1 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nuk di madhësinë?
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSizes.length > 0 ? availableSizes.map((s) => (
              <button key={s} onClick={() => setSelectedSize(s)}
                className={`px-3 py-1.5 text-xs border transition-colors ${selectedSize === s ? 'bg-[#201616] text-[#fffef2] border-[#201616]' : 'border-[#201616]/30 text-[#201616] hover:border-[#201616]'}`}>
                {s}
              </button>
            )) : (
              <p className="text-xs text-[#201616]/40 font-body italic">Na kontaktoni për madhësinë e disponueshme.</p>
            )}
          </div>
          {!selectedSize && (
            <button
              onClick={() => setSizerOpen(true)}
              className="mt-3 w-full border border-dashed border-[#b31b1b]/40 text-[#b31b1b] py-2 text-[10px] tracking-[0.25em] uppercase font-body hover:bg-[#b31b1b]/5 transition-colors"
            >
              📏 Gjej Madhësinë Tënde →
            </button>
          )}
        </div>
      )}

      {/* Gift message */}
      <div className="mb-6">
        <p className="text-[10px] tracking-widest uppercase text-[#201616]/50 mb-3">Mesazh Dhurate (opsional)</p>
        <div className="relative">
          <select
            value={selectedMessage}
            onChange={(e) => setSelectedMessage(e.target.value)}
            className="w-full border border-[#201616]/20 bg-[#fffef2] px-4 py-2.5 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body appearance-none pr-8"
          >
            <option value="">— Zgjidh mesazhin —</option>
            {GIFT_MESSAGES.map((msg) => (
              <option key={msg} value={msg}>{msg}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#201616]/40 text-xs">▾</span>
        </div>
        {selectedMessage && (
          <p className="mt-2 text-xs text-[#201616]/60 font-body italic leading-relaxed">"{selectedMessage}"</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mb-10">
        <button
          onClick={handleAddToCart}
          className={`btn-primary text-center w-full transition-all ${addedToCart ? 'bg-green-700 border-green-700' : ''}`}
        >
          {addedToCart ? '✓ U Shtua në Shportë!' : 'Shto në Shportë'}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => toggle(product.id)}
            className={`flex items-center justify-center gap-2 border px-4 py-3 text-xs tracking-[0.25em] uppercase transition-colors ${wishlisted ? 'bg-[#b31b1b]/10 border-[#b31b1b] text-[#b31b1b]' : 'border-[#201616]/30 text-[#201616] hover:border-[#b31b1b] hover:text-[#b31b1b]'}`}>
            <svg className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlisted ? 'Në Wishlist' : 'Wishlist'}
          </button>
          <a href={`https://wa.me/38349646439?text=${waText}`} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 border border-[#201616]/30 text-[#201616] px-4 py-3 text-xs tracking-[0.25em] uppercase hover:border-[#25d366] hover:text-[#25d366] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
