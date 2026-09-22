import {
  AT_RISE_EM,
  BRAND,
  INTRO_PANEL_ID,
  INTRO_SESSION_KEY,
  LIGHTING,
  LOADER_TIMELINES,
  loaderDuration,
  type LoaderTempo,
} from './intro-timeline';

/**
 * The intro loader, rendered into the server HTML.
 *
 * Everything here is static markup plus CSS keyframes (styles/intro-loader.css)
 * so the panel paints as soon as the document does — covering the stretch
 * where the bundle is still downloading and React has nothing on screen yet.
 * The previous client-mounted overlay could only appear after hydration, which
 * is why a cold load showed a bare dark screen and then a loader over an
 * already-finished page.
 *
 * SiteRevealProvider takes it away once the page is ready; nothing here
 * depends on JS to reach its finished state.
 */

/**
 * Runs before first paint, ahead of the panel below it in the document.
 *
 * A repeat visit or a reduced-motion preference has to be settled here rather
 * than in an effect — by the time React could decide, the panel would already
 * have been on screen for a frame.
 */
function bootScript(sessionKey: string): string {
  return `(function(){try{
var d=document,h=d.documentElement;
var seen=false;try{seen=sessionStorage.getItem('${sessionKey}')==='1'}catch(e){}
var still=false;try{still=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
if(seen||still){h.classList.add('intro-skip');return}
try{sessionStorage.setItem('${sessionKey}','1')}catch(e){}
h.classList.add('intro-active');
h.setAttribute('data-loader-active','');
window.__acobIntroStart=Date.now();
}catch(e){}})();`;
}

/**
 * Runs right after the panel is parsed, still before first paint.
 *
 * CSS can't animate to `width: auto`, so this measures each glyph's natural
 * width (and Technology's height) and writes them as exact animation targets.
 * Computed width is used rather than a bounding rect because the letters are
 * mid-transform — scaled and rotated — at this point. The values go into an
 * injected <style> rather than onto the elements, so React's hydration never
 * sees markup it didn't render.
 *
 * A measurement is only trusted once the loader stylesheet has actually
 * applied. Run before that, every span is still a plain inline box whose
 * computed width is the string `auto` — which used to land as a 0px cap on
 * every letter and pile the whole wordmark up on one spot for the length of
 * the build. So: confirm the panel is laid out by this stylesheet (its
 * `position: fixed` comes from nowhere else — the letters' own `display`
 * can't be used, they're flex items and read back blockified), require a
 * positive width for each glyph, and retry on the next frame otherwise. Nothing is written
 * until a whole pass is good, and `intro-measured` — which is what arms the
 * width clamp in CSS — is only added then. Without it the letters simply sit
 * at their natural width and swing in without the opening box, which is a far
 * better failure than a heap of overlapping glyphs.
 *
 * Measured again once webfonts are in, since the fallback face has different
 * metrics; and at build end the boxes are released to natural layout anyway.
 */
function measureScript(panelId: string, buildSeconds: number): string {
  return `(function(){try{
var h=document.documentElement;if(h.classList.contains('intro-skip'))return;
var p=document.getElementById('${panelId}');if(!p)return;
var letters=[].slice.call(p.querySelectorAll('[data-intro-i]'));
if(!letters.length)return;
var clip=p.querySelector('.intro-tech-clip');
var st=document.createElement('style');document.head.appendChild(st);
function px(el,prop){var v=parseFloat(getComputedStyle(el)[prop]);return v>0?v:0}
function measure(){
if(getComputedStyle(p).position!=='fixed')return false;
var css='',i,c,w;
for(i=0;i<letters.length;i++){c=letters[i].firstElementChild;if(!c)return false;
w=px(c,'width');if(!w)return false;
css+='#${panelId} [data-intro-i="'+letters[i].getAttribute('data-intro-i')+'"]{--intro-letter-cap:'+w+'px}';}
var tech=clip&&clip.firstElementChild;
if(tech){var th=px(tech,'height');if(!th)return false;
css+='#${panelId} .intro-tech-clip{--intro-tech-cap:'+th+'px}';}
st.textContent=css;h.classList.add('intro-measured');return true;}
var tries=0;
function attempt(){try{if(measure())return;
if(++tries>90)return;requestAnimationFrame(attempt)}catch(e){}}
attempt();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){try{measure()}catch(e){}});
setTimeout(function(){h.classList.add('intro-built')},${Math.round(buildSeconds * 1000)});
}catch(e){}})();`;
}

type LetterProps = {
  char: React.ReactNode;
  delay: number;
  /** Stable index the measure script keys each glyph's width on. */
  index: number;
  className?: string;
};

/**
 * One letter: the outer span opens up horizontally so the line keeps
 * re-centering, the inner swings out from its left edge — reading as the
 * letter emerging from behind its neighbour.
 */
function Letter({ char, delay, index, className }: LetterProps) {
  return (
    <span
      className="intro-letter"
      data-intro-i={index}
      style={{ '--intro-delay': `${delay}s` } as React.CSSProperties}
    >
      <span className={className}>{char}</span>
    </span>
  );
}

export default function IntroPanel({
  showAnniversary = false,
  tempo = 'tight',
}: {
  /** Reveal the gold "@10" anniversary mark beside Technology. */
  showAnniversary?: boolean;
  tempo?: LoaderTempo;
}) {
  const t = LOADER_TIMELINES[tempo];
  const build = loaderDuration(tempo, showAnniversary);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: bootScript(INTRO_SESSION_KEY) }}
      />

      <div
        id={INTRO_PANEL_ID}
        aria-hidden="true"
        data-build-duration={build}
        style={
          {
            '--intro-letter-duration': `${t.letterDuration}s`,
            '--intro-tech-duration': `${t.techDuration}s`,
            '--intro-build-duration': `${build}s`,
          } as React.CSSProperties
        }
      >
        <div className="intro-wordmark intro-breath">
          <div className="intro-line">
            {BRAND.split('').map((char, i) => (
              <Letter
                key={`brand-${i}`}
                index={i}
                char={char}
                delay={
                  i === 0 ? t.aStart : t.brandStart + t.brandStagger * (i - 1)
                }
              />
            ))}

            {/* the gap before LIGHTING opens up with the L */}
            <span
              className="intro-gap"
              style={
                {
                  '--intro-delay': `${t.lightingStart}s`,
                } as React.CSSProperties
              }
            />

            {LIGHTING.split('').map((char, i) => (
              <Letter
                key={`lighting-${i}`}
                index={BRAND.length + i}
                char={char}
                delay={t.lightingStart + t.lightingStagger * i}
                className="intro-accent"
              />
            ))}
          </div>

          {/* TECHNOLOGY slides down from underneath the line above */}
          <div
            className="intro-tech-clip"
            style={
              { '--intro-delay': `${t.techStart}s` } as React.CSSProperties
            }
          >
            <div
              className="intro-tech"
              style={
                { '--intro-delay': `${t.techStart}s` } as React.CSSProperties
              }
            >
              <span className="intro-tech-inner">
                <span className="intro-tech-word">Technology</span>
                {showAnniversary && (
                  <Letter
                    index={BRAND.length + LIGHTING.length}
                    delay={t.anniversaryStart}
                    className="intro-gold"
                    char={
                      <>
                        <span
                          className="intro-at"
                          style={
                            {
                              transform: `translateY(-${AT_RISE_EM}em)`,
                            } as React.CSSProperties
                          }
                        >
                          @
                        </span>
                        10
                      </>
                    }
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: measureScript(INTRO_PANEL_ID, build),
        }}
      />
    </>
  );
}
