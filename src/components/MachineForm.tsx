import { ArrowRight, Minus, Plus } from 'lucide-react';

interface MachineFormProps {
  name: string;
  setName: (value: string) => void;
  weight: number;
  setWeight: (value: number) => void;
  onInsertCoin: () => void;
  disabled: boolean;
}

export function MachineForm({ name, setName, weight, setWeight, onInsertCoin, disabled }: MachineFormProps) {
  const adjust = (delta: number) => setWeight(Math.max(1, Math.min(250, Number(((Number.isFinite(weight) ? weight : 68.4) + delta).toFixed(1)))));
  return (
    <form className="machine-form" onSubmit={event => {
      event.preventDefault();
      if (!disabled && name.trim() && weight >= 1 && weight <= 250) onInsertCoin();
    }}>
      <div className="form-heading"><span>YOUR LITTLE INTRODUCTION</span><span>01 / 02</span></div>
      <div className="input-grid">
        <div className="field"><label htmlFor="passenger-name">Your good name</label><input id="passenger-name" autoComplete="given-name" placeholder="Naam toh batao…" maxLength={30} required value={name} onChange={event => setName(event.target.value)} disabled={disabled} /></div>
        <div className="field"><label htmlFor="passenger-weight">Your weight <span>(kg)</span></label><div className="weight-control"><button type="button" aria-label="Decrease weight by one kilogram" onClick={() => adjust(-1)} disabled={disabled || weight <= 1}><Minus size={14} /></button><input id="passenger-weight" type="number" inputMode="decimal" min="1" max="250" step="0.1" required value={Number.isNaN(weight) ? '' : weight} onChange={event => setWeight(event.target.valueAsNumber)} disabled={disabled} /><button type="button" aria-label="Increase weight by one kilogram" onClick={() => adjust(1)} disabled={disabled || weight >= 250}><Plus size={14} /></button></div></div>
      </div>
      <button className="insert-button" type="submit" disabled={disabled || !name.trim() || !Number.isFinite(weight) || weight < 1 || weight > 250}><span className="button-coin">₹2</span><span>{disabled ? 'A little magic in the making…' : 'Insert coin. Meet your fortune.'}</span>{!disabled && <ArrowRight size={19} />}</button>
      <p className="free-note">Imaginary coin. Real nostalgia. Always free.</p>
    </form>
  );
}

