'use client';

import { useState } from 'react';

export const SIZE_CHART = [
  { eu: 'EU 50', us: 'US 5',    mm: '50mm', diameter: '15.9mm' },
  { eu: 'EU 52', us: 'US 6',    mm: '52mm', diameter: '16.6mm' },
  { eu: 'EU 54', us: 'US 6.5',  mm: '54mm', diameter: '17.2mm' },
  { eu: 'EU 56', us: 'US 7.5',  mm: '56mm', diameter: '17.8mm' },
  { eu: 'EU 57', us: 'US 8',    mm: '57mm', diameter: '18.2mm' },
  { eu: 'EU 58', us: 'US 8.5',  mm: '58mm', diameter: '18.5mm' },
  { eu: 'EU 60', us: 'US 9.5',  mm: '60mm', diameter: '19.1mm' },
  { eu: 'EU 62', us: 'US 10.5', mm: '62mm', diameter: '19.7mm' },
];

// Standard ID-1 bank card width (ATM/debit/credit) - same worldwide, used to
// calibrate real-world mm against this specific screen's pixels.
const CARD_WIDTH_MM = 85.6;

// Small residual correction from real-world testing: a US 8 ring (EU 58,
// 18.5mm) matched the on-screen circle at roughly EU 56.75 (~18.1mm) even
// with accurate whole-popup calibration - manual slider matching alone
// tends to undershoot slightly. Nudges the circle back up to compensate.
const SIZE_CORRECTION = 1.02;

function SizeChartTable() {
  return (
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
  );
}

export default function RingSizerModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'unaze' | 'spango' | 'ekran'>('unaze');
  const [calibrated, setCalibrated] = useState(false);
  const [cardWidthPx, setCardWidthPx] = useState(440);
  const [sizeIndex, setSizeIndex] = useState(2);

  const pxPerMm = cardWidthPx / CARD_WIDTH_MM;
  const activeSize = SIZE_CHART[sizeIndex];
  const circlePx = parseFloat(activeSize.diameter) * pxPerMm * SIZE_CORRECTION;

  // While calibrating, the whole popup IS the reference card - resize it
  // directly to match a real card instead of a separate box nested inside
  // it, which kept running into padding/fit issues at different screen
  // sizes. The popup naturally has to shrink to fit small phones and can
  // grow for denser desktop/laptop screens, so this doubles as the
  // calibration slider's range too.
  const calibrating = tab === 'ekran' && !calibrated;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 bg-[#201616]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-[#fffffc] overflow-y-auto max-h-[92vh] shadow-2xl max-w-[96vw] ${calibrating ? '' : 'w-full max-w-lg'}`}
        style={calibrating ? { width: cardWidthPx } : undefined}
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
            { key: 'unaze',  icon: '💍', label: 'Me Unazë' },
            { key: 'spango', icon: '📏', label: 'Me Spango' },
            { key: 'ekran',  icon: '🖥️', label: 'Në Ekran' },
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

        <div className="px-4 sm:px-6 py-6">

          {/* TAB: Spango/Letër */}
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
                    { step: 'Mbështille rreth gishtin ku do të vendosësh unazën - kaloje pak mbi nyje pasi unaza duhet t\'i kalojë.', tip: 'Mos e shtrëngoni shumë - duhet të jetë komode.' },
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
                <SizeChartTable />
              </div>

              <div className="bg-[#f5f0e8] px-4 py-3 text-xs font-body text-[#201616]/60 leading-relaxed">
                💡 <strong className="text-[#201616]">Nëse je mes dy madhësive</strong> - zgjidh madhësinë më të madhe për rehati.
              </div>
            </div>
          )}

          {/* TAB: Unazë ekzistuese */}
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
                    { step: 'Mat diametrin e rrethit - nga njëra anë e brendshme tek tjetra (jo anët e jashtme).', tip: null },
                    { step: 'Ky numër në mm është diametri - gjeje madhësinë EU në tabelën më poshtë.', tip: null },
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
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/40 mb-2">Tabela e Madhësive - Sipas Diametrit</p>
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
                💡 <strong className="text-[#201616]">Kujdes:</strong> Mat diametrin e brendshëm të unazës - jo të jashtmin. Ndryshimi mund të jetë 1–2mm dhe ndikon në madhësinë finale.
              </div>
            </div>
          )}

          {/* TAB: Në ekran (interactive) */}
          {tab === 'ekran' && calibrating && (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-[#201616]/70 font-body leading-relaxed">
                Për saktësi, kalibrojmë ekranin tënd me një kartë bankare (ATM, debit ose krediti - të gjitha kanë të njëjtën madhësi kudo në botë).
              </p>
              <div className="border border-[#201616]/10 p-4 flex flex-col gap-4 items-center">
                <p className="text-xs text-[#201616]/60 font-body text-center">
                  Mbaje kartën tënde drejt e mbi xhamin e ekranit dhe krahasoje me <strong>gjerësinë e kësaj dritareje</strong> (gjithë kutia më sipër). Rregullo rrëshqitësin derisa gjerësia të përputhet saktësisht me kartën.
                </p>
                <input
                  type="range"
                  min={220}
                  max={1400}
                  value={cardWidthPx}
                  onChange={(e) => setCardWidthPx(Number(e.target.value))}
                  className="w-full accent-[#b31b1b]"
                />
                <button
                  onClick={() => setCalibrated(true)}
                  className="btn-primary text-center w-full"
                >
                  Konfirmo dhe Vazhdo →
                </button>
              </div>
            </div>
          )}

          {tab === 'ekran' && !calibrating && (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-[#201616]/70 font-body leading-relaxed">
                Vendos unazën tënde direkt mbi rrethin më poshtë (mbi ekran) dhe lëviz rrëshqitësin derisa buza e brendshme e unazës të përputhet saktësisht me rrethin.
              </p>

              <div className="flex flex-col items-center gap-4 border border-[#201616]/10 p-4 sm:p-6">
                <div
                  className="!rounded-full border-2 border-[#b31b1b] flex-shrink-0"
                  style={{ width: circlePx, height: circlePx }}
                />
                <input
                  type="range"
                  min={0}
                  max={SIZE_CHART.length - 1}
                  step={1}
                  value={sizeIndex}
                  onChange={(e) => setSizeIndex(Number(e.target.value))}
                  className="w-full accent-[#b31b1b]"
                />
                <p className="text-sm font-body text-[#201616] text-center">
                  Madhësia jote: <strong>{activeSize.eu}</strong> · {activeSize.us} · {activeSize.mm}
                </p>
                <button
                  onClick={() => setCalibrated(false)}
                  className="text-[10px] tracking-wider uppercase text-[#201616]/40 hover:text-[#201616] font-body underline"
                >
                  Rikalibro ekranin
                </button>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/40 mb-2">Krahaso me Tabelën e Plotë</p>
                <SizeChartTable />
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
