import { useRef, useState } from 'react';
import { Check, Copy, Download, RefreshCw } from 'lucide-react';
import type { GeneratedResult } from '../utils/seedUtils';

interface FortuneCardProps {
  result: GeneratedResult;
  userName: string;
  userWeight: number;
  onTryAgain: () => void;
}

export function FortuneCard({ result, userName, userWeight, onTryAgain }: FortuneCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  async function download() {
    if (!cardRef.current || saving) return;
    setSaving(true);
    setMessage('');
    try {
      const { default: html2canvas } = await import('html2canvas');
      await document.fonts.ready;
      const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: '#faf2dd', logging: false });
      const link = document.createElement('a');
      link.download = `good-wish-${result.ticketSerial}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setMessage('Your keepsake is ready. Download started.');
    } catch {
      setMessage('Could not save the ticket. Please try again.');
    } finally { setSaving(false); }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${userName}’s Good Wish: ${result.fortune.text}\nLucky number: ${result.luckyNumber} · Lucky colour: ${result.luckyColor}\nA little nostalgia from ${result.station}.`);
      setCopied(true);
      setMessage('Fortune copied. Pass a little good luck along!');
    } catch { setMessage('Copy is unavailable here. You can download your ticket instead.'); }
  }
  return <div className="fortune-card-wrapper">
    <div ref={cardRef} className="fortune-ticket">
      <div className="ticket-meta"><span>{result.ticketSerial}</span><span>{result.formattedDate}</span></div>
      <div className="ticket-brand">शुभ यात्रा</div><h3>Good Wish</h3><p className="ticket-station">{result.station} · FORTUNE DEPARTMENT</p>
      <div className="ticket-perforation">✦</div>
      <div className="ticket-passenger"><span>A little good luck for <strong>{userName}</strong></span><span>WEIGHT ENTERED<strong>{userWeight.toFixed(1)} kg</strong></span></div>
      <span className="fortune-badge">✧ {result.fortune.badge}</span>
      <blockquote>“{result.fortune.text}”</blockquote>
      <div className="ticket-luck"><div><span>LUCKY NUMBER</span><strong>{String(result.luckyNumber).padStart(2, '0')}</strong></div><div><span>LUCKY COLOUR</span><strong>{result.luckyColor.toLowerCase()}</strong></div></div>
      <p className="ticket-advice">{result.secondaryPrint}</p>
      <div className="ticket-bottom"><span>₹2 OF MAKE-BELIEVE<br />A POCKETFUL OF POSSIBILITY</span><span className="ticket-stamp">GOOD<br />LUCK ★</span></div>
      <p className="ticket-disclaimer">A playful keepsake, just for fun.</p>
    </div>
    <div className="ticket-actions"><button className="primary-action" onClick={download} disabled={saving}><Download size={17} />{saving ? 'Saving…' : 'Keep my ticket'}</button><button onClick={copy}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Copied' : 'Copy fortune'}</button></div>
    <p className="action-message" role="status">{message}</p>
    <button className="text-button another-ticket" onClick={onTryAgain}><RefreshCw size={15} /> One more for the journey?</button>
  </div>;
}

