export function StationIllustration() {
  return <svg className="station-illustration" viewBox="0 0 600 235" fill="none" role="img" aria-label="An illustrated red Indian bus beside a little chai stall, with bunting overhead">
    <path d="M20 36 Q285 119 580 22" stroke="#6d7762" strokeWidth="1.5" />
    {[[65,48],[115,61],[165,71],[215,77],[265,78],[315,77],[365,72],[415,63],[465,50],[515,36]].map(([x,y],i)=><path key={x} d={`M${x} ${y} l24 5 -15 25 Z`} fill={['#bb5a38','#e6b650','#447465'][i%3]} />)}
    <circle cx="478" cy="117" r="58" fill="#e9bd64" opacity=".38" />
    <path d="M14 216 H584" stroke="#88836d" strokeWidth="1.5" />
    <path d="M75 191 Q33 163 36 99 Q79 117 75 191Z" fill="#789078" /><path d="M77 196 Q119 163 117 128 Q79 130 77 196Z" fill="#547662" /><path d="M76 148 V214" stroke="#365346" strokeWidth="3" />
    <path d="M112 121 Q112 101 132 101 H334 Q350 101 354 120 L367 173 V201 H112Z" fill="#b85238" stroke="#753e30" strokeWidth="2" />
    <path d="M119 140 H357 L363 166 H119Z" fill="#f0d9a6" /><path d="M119 177 H365" stroke="#e7b963" strokeWidth="3" />
    <rect x="125" y="111" width="39" height="36" rx="3" fill="#a4b4a1" stroke="#673e31" strokeWidth="2" /><rect x="173" y="111" width="39" height="36" rx="3" fill="#a4b4a1" stroke="#673e31" strokeWidth="2" /><rect x="221" y="111" width="39" height="36" rx="3" fill="#a4b4a1" stroke="#673e31" strokeWidth="2" /><rect x="269" y="111" width="32" height="72" rx="2" fill="#d7c49c" stroke="#673e31" strokeWidth="2" /><path d="M311 112 H337 L347 146 H311Z" fill="#a4b4a1" stroke="#673e31" strokeWidth="2" /><path d="M285 113 V182" stroke="#673e31" strokeWidth="2" />
    <text x="137" y="168" fill="#743c2c" fontSize="12" fontFamily="monospace" letterSpacing="3">शुभ यात्रा</text>
    <rect x="170" y="91" width="120" height="7" rx="2" fill="#597362" /><path d="M176 91 V84 H284 V91 M195 84 V91 M267 84 V91" stroke="#597362" strokeWidth="2" />
    <circle cx="156" cy="199" r="19" fill="#39463b" /><circle cx="156" cy="199" r="9" fill="#c3b798" /><circle cx="325" cy="199" r="19" fill="#39463b" /><circle cx="325" cy="199" r="9" fill="#c3b798" /><rect x="351" y="170" width="10" height="8" rx="2" fill="#f5d58a" />
    <path d="M414 151 V216 M534 151 V216" stroke="#5f6953" strokeWidth="5" /><path d="M400 152 L420 118 H529 L548 152Z" fill="#487363" /><path d="M413 152 L430 118 M440 152 L448 118 M467 152 V118 M493 152 L486 118 M522 152 L510 118" stroke="#ead6a9" strokeWidth="14" />
    <rect x="414" y="183" width="120" height="31" fill="#c59358" stroke="#7d6c49" strokeWidth="2" /><rect x="438" y="159" width="70" height="18" fill="#f7ebcd" /><text x="448" y="172" fill="#365748" fontFamily="monospace" fontWeight="bold" fontSize="12">CHAI ₹5</text>
    <path d="M425 175 H438 L435 183 H428Z M491 176 H503 L501 183 H493Z" fill="#824a30" /><path d="M517 166 Q529 166 529 177 H510 Q510 167 517 166Z" fill="#788476" /><path d="M513 161 Q507 156 514 152 M522 160 Q528 155 522 149" stroke="#9d987c" strokeWidth="1.5" />
    <path d="M558 205 l4 -15 5 15 M552 211 l6 -8 4 8" stroke="#789078" strokeWidth="2" />
  </svg>;
}

