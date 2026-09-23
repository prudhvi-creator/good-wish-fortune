import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Coffee, Heart, MapPin, Sparkles, Ticket, Volume2, VolumeX, X } from 'lucide-react';
import { SevenSegmentDisplay } from './SevenSegmentDisplay';
import { MachineForm } from './MachineForm';
import { FortuneCard } from './FortuneCard';
import { StationIllustration } from './StationIllustration';
import { generateFortuneResult, type GeneratedResult } from '../utils/seedUtils';
import { soundSynth } from '../utils/audioUtils';

const stages = ['Waiting for a little magic', 'Coin received. Shukriya!', 'Setting the scale…', 'Finding your little good wish…', 'Printing a pocketful of luck…'];
const memories = [
  { title: 'That two-rupee kind of magic.', text: 'The bus was late. The chai was hot. And that little machine in the corner promised to tell your future. Somehow, that tiny paper ticket made the whole journey better.' },
  { title: 'A window seat. A world of stories.', text: 'A tiffin packed for the road, an old song on the radio, and a race to claim the window seat. Some journeys stay with us long after the last stop.' },
  { title: 'Chai, and five more minutes.', text: 'The clink of a glass. The smell of ginger. “One more chai?” Before everything was in a hurry, a bus-stop break was a small adventure of its own.' },
];

export function FortuneMachine() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(68.4);
  const [stage, setStage] = useState(0);
  const [displayedWeight, setDisplayedWeight] = useState(0);
  const [attempt, setAttempt] = useState(1);
  const [muted, setMuted] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [memory, setMemory] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const running = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const coinButton = useRef<HTMLDivElement>(null);
  const busy = stage > 0;

  useEffect(() => {
    soundSynth.setMuted(false);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!result) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [result]);

  function later(fn: () => void, delay: number) {
    timers.current.push(setTimeout(fn, delay));
  }

  function insertCoin() {
    if (running.current || !name.trim() || !Number.isFinite(weight) || weight < 1 || weight > 250) return;
    running.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStage(1);
    setDisplayedWeight(0);
    soundSynth.playCoin();
    later(() => { setStage(2); soundSynth.playMotor(1200); }, 650);
    for (let i = 1; i <= 20; i++) later(() => setDisplayedWeight(Number((weight * i / 20).toFixed(1))), 650 + i * 60);
    later(() => { setStage(3); soundSynth.playBeep(); }, 2000);
    later(() => { setStage(4); soundSynth.playPrint(1100); }, 3100);
    later(() => {
      setResult(generateFortuneResult(name.trim(), 'traveler', weight, attempt));
      soundSynth.playCardReady();
      setStage(0);
      running.current = false;
    }, 4400);
  }

  function closeTicket() {
    dialog.current?.close();
    setResult(null);
    setAttempt(value => value + 1);
    setDisplayedWeight(0);
    coinButton.current?.querySelector<HTMLButtonElement>('.insert-button')?.focus();
  }

  function toggleSound() {
    soundSynth.setMuted(!muted);
    setMuted(!muted);
    if (muted) soundSynth.playBeep();
  }

  return (
    <div className="page-shell">
      <div className="top-stripe" />
      <header className="site-header">
        <a className="brand" href="#" aria-label="Good Wish home"><span className="brand-symbol">✳</span><span>good wish<span className="brand-caption">A LITTLE LUCK. A LOT OF NOSTALGIA.</span></span></a>
        <nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#our-story">The good old days <ArrowUpRight size={14} /></a></nav>
        <button className="sound-toggle" onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? 'Enable sound' : 'Mute sound'}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}<span>Sound {muted ? 'off' : 'on'}</span></button>
      </header>
      <main>
        <section className="hero-layout" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span /> STRAIGHT FROM THE GOOD OLD DAYS</div>
            <h1 id="hero-title">A little coin.<br />A little luck.<br /><em>A whole lot of<br className="desktop-break" /> bachpan.</em></h1>
            <p className="hero-description">Remember that fortune machine at the bus stand?<br className="desktop-break" /> The one that knew your weight <em>and</em> your future?<br className="desktop-break" /> Go on. Take a little trip down memory lane.</p>
            <a className="hero-link" href="#fortune-machine">Your next stop: a good wish <ArrowUpRight size={18} /></a>
            <div className="scene"><span className="scene-label">SOMEWHERE AT AN INDIAN BUS STAND, 1996</span><StationIllustration /><span className="scene-note">Same old feeling. No bus to catch.</span></div>
          </div>
          <div className="machine-column" id="fortune-machine">
            <div className="machine-overline"><span><span className="live-dot" /> OPEN FOR GOOD FORTUNES</span><span>EST. IN YOUR CHILDHOOD</span></div>
            <section className={`fortune-machine ${busy ? 'is-operating' : ''}`} aria-label="Interactive fortune machine" aria-busy={busy}>
              <span className="screw screw-tl" aria-hidden="true" /><span className="screw screw-tr" aria-hidden="true" />
              <div className="machine-sign"><span className="sign-flower">✺</span><div><span className="hindi-sign" lang="hi">आपका वज़न • आपका भाग्य</span><h2>GOOD WISH</h2><span className="sign-subtitle">THE ORIGINAL FORTUNE & WEIGHT CO.</span></div><span className="sign-flower">✺</span></div>
              <div className="machine-meta"><span>MODEL GW–1996</span><span>खुशियों का सफ़र</span><span>₹2 PER WISH</span></div>
              <div className="instrument-panel">
                <div className="display-label"><span><span className="live-dot" /> {busy ? 'A LITTLE MAGIC AT WORK' : 'STEP RIGHT UP, TRAVELLER'}</span><Sparkles size={14} /></div>
                <div className="display-row"><SevenSegmentDisplay value={displayedWeight} isMeasuring={stage === 2} /><div className={`coin-slot ${stage === 1 ? 'coin-inserting' : ''}`}><span className="coin">₹<b>2</b></span><span className="slot" /><span>INSERT COIN</span></div></div>
                <div className="machine-status" role="status"><span>›</span> {stages[stage]}<span className="cursor">_</span></div>
                <div className="progress-track"><span style={{ width: `${stage * 25}%` }} /></div>
              </div>
              <div className="form-panel" ref={coinButton}><MachineForm name={name} setName={setName} weight={weight} setWeight={setWeight} onInsertCoin={insertCoin} disabled={busy} /></div>
              <div className={`ticket-outlet ${stage === 4 ? 'printing' : ''}`} aria-hidden="true"><div className="outlet-slot" /><div className="mini-ticket">GOOD WISH<br />✦ शुभ यात्रा ✦</div></div>
              <div className="machine-bottom"><span>★ MADE OF MEMORIES ★</span><span>COLLECT YOUR SMILE HERE <ArrowDown size={11} /></span></div>
              <span className="screw screw-bl" aria-hidden="true" /><span className="screw screw-br" aria-hidden="true" />
            </section>
            <div className="machine-feet" aria-hidden="true"><i /><i /></div>
            <p className="machine-caption"><Heart size={13} /> Just like you remember. A little more magical.</p>
          </div>
        </section>
        <div className="journey-strip"><span>शुभ यात्रा</span><span>✦</span><span>SMALL COINS, BIG DREAMS</span><span>✦</span><span>GOOD VIBES, DESI STYLE</span><span>✦</span><span>यादों का सफ़र</span><span>✦</span><span>A TICKET TO THE GOOD OLD DAYS</span></div>
        <section className="how-section" id="how-it-works" aria-labelledby="how-title"><div className="section-intro"><span className="eyebrow">NO APP. NO QUEUE. JUST YOU.</span><h2 id="how-title">Old-school magic.<br />Three little steps.</h2></div><div className="how-step"><span className="step-number">01</span><h3>Say a little hello</h3><p>Your good name and weight.<br />The machine likes introductions.</p></div><div className="how-step"><span className="step-number">02</span><h3>Drop in a little hope</h3><p>Insert an imaginary ₹2 coin.<br />Listen. It still makes that sound.</p></div><div className="how-step"><span className="step-number">03</span><h3>Pocket a good wish</h3><p>A fortune ticket, just for you.<br />Save it. Share it. Smile a little.</p></div></section>
        <section className="story-section" id="our-story" aria-labelledby="story-title"><div className="story-icon"><Coffee size={34} strokeWidth={1.3} /><span>एक प्याली यादें</span></div><div className="story-copy" aria-live="polite"><span className="eyebrow">A LOVE LETTER TO SIMPLER TIMES</span><h2 id="story-title">{memories[memory].title}</h2><p>{memories[memory].text}</p></div><div className="story-navigation"><span>0{memory + 1} / 03</span><button onClick={() => setMemory(value => (value + 1) % memories.length)} aria-label="Read the next memory"><ArrowUpRight size={22} /></button></div></section>
        <div className="closing-note"><MapPin size={14} /><span>From the bus stands of India, with love.</span><span className="closing-hindi" lang="hi">फिर मिलेंगे।</span></div>
      </main>
      <footer className="site-footer"><a className="footer-brand" href="#">✳ good wish</a><p>A little make-believe. A very real smile.</p><span>MADE WITH <Heart size={12} /> & A CUP OF CHAI</span></footer>
      {result && <dialog ref={dialog} className="ticket-dialog" aria-labelledby="ticket-title" onCancel={event => { event.preventDefault(); closeTicket(); }} onClick={event => { if (event.target === event.currentTarget) closeTicket(); }}><div className="dialog-content"><div className="dialog-header"><span id="ticket-title"><Ticket size={18} /> A little luck, freshly printed.</span><button onClick={closeTicket} aria-label="Close fortune ticket" autoFocus><X size={20} /></button></div><FortuneCard result={result} userName={name.trim()} userWeight={weight} onTryAgain={closeTicket} /></div></dialog>}
    </div>
  );
}
