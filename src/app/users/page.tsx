"use client";
import { useState, useRef, FocusEvent } from 'react';

const MyComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Button ref untuk tombol yang mengontrol popup
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Exclude ref untuk elemen yang tidak memicu penutupan popup
  const excludeRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    const relatedTarget = event.relatedTarget as Node | null;

    // Jika fokus berpindah ke luar dari button atau excludeRef, maka tutup popup
    if (relatedTarget && !buttonRef.current?.contains(relatedTarget) && !excludeRef.current?.contains(relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)} 
        onBlur={handleBlur}
        onFocus={() => setIsOpen(true)}
      >
        Klik untuk Buka Popup
      </button>

      {isOpen && <div className="popup">Ini adalah popup!</div>}

      {/* Elemen lain yang tidak memicu penutupan popup */}
      <div 
        ref={excludeRef} 
        tabIndex={0} // Elemen ini harus bisa menerima fokus
        style={{ marginTop: '20px', background: 'lightgrey', padding: '10px' }}
      >
        Elemen ini tidak akan menutup popup jika diklik
      </div>
    </div>
  );
};

export default MyComponent;
