const { useState, useEffect, useRef, useCallback } = React;

// --- MULTILINGUAL TITLES DATA ---
const TITLE_TRANSLATIONS = [
  {
    lang: "FR",
    langName: "Français",
    flag: "🇫🇷",
    main: "Les sciences qui ont changé la vie humaine",
    sub: "Trois pionniers français qui ont transformé notre compréhension de la vie, de la maladie et du corps humain.",
    fontClass: "font-serif tracking-tight",
  },
  {
    lang: "EN",
    langName: "English",
    flag: "🇬🇧",
    main: "The Sciences That Changed Human Life",
    sub: "Three French pioneers who changed our understanding of life, disease and the human body.",
    fontClass: "font-serif tracking-tight",
  },
  {
    lang: "HI",
    langName: "हिन्दी",
    flag: "🇮🇳",
    main: "वे विज्ञान जिन्होंने मानव जीवन बदल दिया",
    sub: "तीन फ़्रांसीसी वैज्ञानिक जिन्होंने जीवन, रोग और मानव शरीर की हमारी समझ को बदल दिया।",
    fontClass: "font-devanagari font-bold",
  },

];

// --- HISTORICAL IMAGES REGISTRY ---
const HISTORICAL_IMAGES = {
  pinelSalpetriere: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pinel_delivrant_les_alienes.jpg/1280px-Pinel_delivrant_les_alienes.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Pinel_delivrant_les_alienes.jpg",
    title: "Pinel délivrant les aliénés à la Salpêtrière en 1795",
    artist: "Tony Robert-Fleury (1876)",
    location: "Bibliothèque de l'Académie nationale de médecine, Paris",
    caption: "Philippe Pinel à la Salpêtrière — Représentation historique majeure de sa réforme humaniste et médicale, ordonnant le retrait des fers et chaînes des malades mentaux.",
    englishCaption: "Philippe Pinel at the Salpêtrière — Iconic historical painting depicting the moral and medical reform in 1795: replacing punitive chains with clinical care and human dignity."
  },
  pinelPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Philippe_Pinel.jpg/800px-Philippe_Pinel.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/1/15/Philippe_Pinel.jpg",
    title: "Portrait de Philippe Pinel (1745–1826)",
    artist: "François-Séraphin Delpech / Marie-Gabrielle Capet",
    location: "Musée d'Histoire de la Médecine, Paris",
    caption: "Dr Philippe Pinel, médecin-chef à Bicêtre puis à la Salpêtrière, père de la psychiatrie moderne.",
    englishCaption: "Dr. Philippe Pinel, pioneer of nosology and humane psychiatry."
  },
  pasteurLab: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg/1024px-Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg",
    title: "Louis Pasteur dans son laboratoire (1885)",
    artist: "Albert Edelfelt (Musée d'Orsay, Paris)",
    location: "Musée d'Orsay, Paris",
    caption: "Louis Pasteur observant un bocal contenant une moelle épinière de lapin infecté par la rage, l'année du vaccin historique.",
    englishCaption: "Louis Pasteur in his rue d'Ulm laboratory in 1885, contemplating the desiccated spinal cord of a rabid rabbit."
  },
  pasteurPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Louis_Pasteur%2C_foto_crop.jpg/800px-Louis_Pasteur%2C_foto_crop.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Louis_Pasteur%2C_foto_crop.jpg",
    title: "Louis Pasteur (1822–1895)",
    artist: "Atelier Nadar, Paris (c. 1878)",
    location: "Bibliothèque nationale de France",
    caption: "Photographie d'époque par Nadar : Louis Pasteur, chimiste et microbiologiste français.",
    englishCaption: "Portrait of Louis Pasteur by legendary French photographer Nadar."
  },
  pasteurMeisterEngraving: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Louis_Pasteur_vaccinating_a_child_against_rabies._Wood_engra_Wellcome_V0010574.jpg/1024px-Louis_Pasteur_vaccinating_a_child_against_rabies._Wood_engra_Wellcome_V0010574.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/0/07/Louis_Pasteur_vaccinating_a_child_against_rabies._Wood_engra_Wellcome_V0010574.jpg",
    title: "Première vaccination antirabique sur Joseph Meister (1885)",
    artist: "Gravure d'époque — Wellcome Library",
    location: "Wellcome Collection, Londres",
    caption: "Le 6 juillet 1885, le jeune Joseph Meister, mordu 14 fois par un chien enragé, reçoit le vaccin expérimental de Pasteur sous la supervision du Dr Grancher.",
    englishCaption: "July 6, 1885: 9-year-old Joseph Meister receives the rabies vaccine, a triumphant proof of laboratory immunology."
  },
  curiePortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/800px-Marie_Curie_c._1920s.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg",
    title: "Marie Curie (1867–1934)",
    artist: "Studio Henri Manuel, Paris (c. 1920)",
    location: "Musée Curie / Archives Institut du Radium",
    caption: "Marie Skłodowska-Curie : deux fois lauréate du Prix Nobel (Physique 1903, Chimie 1911).",
    englishCaption: "Marie Curie: the first person to win two Nobel Prizes in distinct scientific fields."
  },
  curieLabCouple: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Pierre_and_Marie_Curie.jpg/1024px-Pierre_and_Marie_Curie.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/1/18/Pierre_and_Marie_Curie.jpg",
    title: "Pierre et Marie Curie dans leur hangar de l'EPCI (Paris)",
    artist: "Photographie historique (c. 1900)",
    location: "Musée Curie, Paris",
    caption: "Pierre et Marie Curie dans leur laboratoire rudimentaire de la rue Lhomond où ils ont isolé le polonium et le radium.",
    englishCaption: "Pierre and Marie Curie in their makeshift shed laboratory where tons of pitchblende were processed."
  },
  curiePetiteCurie: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Marie_Curie_in_a_mobile_x-ray_vehicle_during_WWI.jpg/1024px-Marie_Curie_in_a_mobile_x-ray_vehicle_during_WWI.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/8/87/Marie_Curie_in_a_mobile_x-ray_vehicle_during_WWI.jpg",
    title: "Marie Curie et 'Les Petites Curies' (Grande Guerre 1914–1918)",
    artist: "Archives militaires françaises / Musée Curie",
    location: "Institut Curie, Paris",
    caption: "Marie Curie au volant d'une des 20 unités mobiles radiologiques ('Petites Curies') déployées sur le front pour radiographier les soldats blessés.",
    englishCaption: "Marie Curie in a mobile field X-ray vehicle ('Petite Curie') saving hundreds of thousands of soldiers during WWI."
  },
  pierreCuriePortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pierre_Curie_by_Dujardin_c1906.jpg/800px-Pierre_Curie_by_Dujardin_c1906.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Pierre_Curie_by_Dujardin_c1906.jpg",
    title: "Pierre Curie (1859–1906)",
    artist: "Héliogravure Dujardin",
    location: "Bibliothèque de l'Institut de France",
    caption: "Pierre Curie, physicien pionnier de la piézoélectricité, du magnétisme et de la radioactivité.",
    englishCaption: "Pierre Curie, pioneering French physicist who shared the 1903 Nobel Prize."
  },
  edwardJennerPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Edward_Jenner._Oil_painting._Wellcome_V0023503.jpg/800px-Edward_Jenner._Oil_painting._Wellcome_V0023503.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Edward_Jenner._Oil_painting._Wellcome_V0023503.jpg",
    title: "Edward Jenner (1749–1823)",
    artist: "James Northcote (Wellcome Collection)",
    location: "Wellcome Collection",
    caption: "Médecin britannique ayant mis au point la première vaccination contre la variole en 1796.",
    englishCaption: "Edward Jenner, who pioneered the smallpox vaccine in 1796 before Pasteur's microbiological revolution."
  },
  josephMeisterPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Joseph_Meister.jpg/800px-Joseph_Meister.jpg",
    fallbackSrc: "https://upload.wikimedia.org/wikipedia/commons/5/52/Joseph_Meister.jpg",
    title: "Joseph Meister (1876–1940)",
    artist: "Photographie d'époque (Institut Pasteur)",
    location: "Archives de l'Institut Pasteur",
    caption: "Joseph Meister, le premier humain guéri de la rage par Pasteur, devenu plus tard le gardien fidèle de l'Institut Pasteur.",
    englishCaption: "Joseph Meister, the 9-year-old boy saved in 1885 who later devoted his life as the guardian of the Pasteur Institute."
  }
};

// --- WIKIPEDIA LINKS COMPONENT ---
function WikipediaLink({ name, url, role, className = "" }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Open Wikipedia article for ${name} in a new tab`}
      className={`inline-flex items-center gap-1.5 font-medium text-french-cream hover:text-french-gold border-b border-french-gold/40 hover:border-french-gold pb-0.5 transition-all duration-200 group ${className}`}
    >
      <span>{name}</span>
      <span className="text-xs text-french-gold/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 font-sans">↗</span>
      {role && <span className="text-xs text-french-textMuted font-normal">({role})</span>}
    </a>
  );
}

// --- FRENCH AUDIO PRONUNCIATION HOOK ---
function useFrenchSpeech() {
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      // Try finding a French voice
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(v => v.lang.startsWith('fr'));
      if (frenchVoice) utterance.voice = frenchVoice;
      window.speechSynthesis.speak(utterance);
    }
  };
  return { speak };
}

// --- LIGHTBOX MODAL ---
function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl max-h-[92vh] flex flex-col bg-[#0e131d] border border-french-gold/30 rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#141a27] border-b border-french-border">
          <div className="flex items-center gap-2 text-french-gold text-sm tracking-wider uppercase font-serif">
            <span>🏛️ Archival Document</span>
            <span className="text-french-border">•</span>
            <span className="text-french-cream/90 font-sans normal-case text-xs font-semibold">{image.title}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1 text-xs text-french-cream/70 hover:text-white bg-french-surface hover:bg-french-surfaceLight border border-french-border rounded transition-colors"
          >
            <span>Fermer / Close</span>
            <span className="text-sm font-mono">✕</span>
          </button>
        </div>

        {/* Modal Image Area */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 bg-[#090c12] overflow-hidden min-h-[300px]">
          <img
            src={image.src}
            alt={image.title}
            className="max-h-[68vh] w-auto max-w-full object-contain rounded shadow-lg select-none"
            onError={(e) => {
              if (image.fallbackSrc && e.target.src !== image.fallbackSrc) {
                e.target.src = image.fallbackSrc;
              }
            }}
          />
        </div>

        {/* Modal Caption */}
        <div className="px-6 py-4 bg-[#121723] border-t border-french-border text-sm space-y-1.5">
          <div className="text-french-cream font-serif text-base italic leading-relaxed">
            "{image.caption}"
          </div>
          <div className="text-french-textMuted text-xs leading-relaxed">
            {image.englishCaption}
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-french-gold/80 border-t border-french-border/40 font-mono">
            <span>Artiste / Source: {image.artist}</span>
            <span>Conservé à : {image.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 1: CENTERED OPENING TITLE & HOOK
// ==========================================
function Slide1Title({ onNext, onSelectLang, currentLangIndex, onOpenLightbox }) {
  const currentTrans = TITLE_TRANSLATIONS[currentLangIndex];
  const { speak } = useFrenchSpeech();

  return (
    <div className="h-full flex flex-col justify-between items-center relative py-6 px-6 sm:px-12 text-center select-none overflow-hidden">
      {/* Top Bar with Minimal French Seal & Lang Switcher */}
      <div className="w-full flex items-center justify-between max-w-6xl z-10 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-4 french-flag-accent rounded-sm shadow-sm" />
          <span className="font-serif tracking-widest text-xs uppercase text-french-gold/90 font-medium">
            République Française • Histoire des Sciences
          </span>
        </div>

        {/* Discreet Language Indicator */}
        <div className="flex items-center gap-1.5 bg-french-surface/80 backdrop-blur border border-french-border px-3 py-1 rounded-full text-xs">
          <span className="text-french-textMuted mr-1">Langue:</span>
          {TITLE_TRANSLATIONS.map((t, idx) => (
            <button
              key={t.lang}
              onClick={() => onSelectLang(idx)}
              className={`px-2 py-0.5 rounded transition-all text-xs font-mono font-medium ${
                idx === currentLangIndex
                  ? "bg-french-gold text-[#0a0d14] font-bold shadow-sm"
                  : "text-french-textMuted hover:text-french-cream hover:bg-french-surfaceLight"
              }`}
            >
              {t.lang}
            </button>
          ))}
        </div>
      </div>

      {/* CENTERED PRESENTATION TITLE HERO (EXACTLY IN VISUAL CENTER) */}
      <div className="my-auto max-w-4xl z-10 flex flex-col items-center justify-center space-y-8 animate-fade-in">
        
        {/* French Pronunciation helper */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-french-gold font-serif">
          <span className="h-px w-8 bg-french-gold/40"></span>
          <span>Une présentation interactive</span>
          <button 
            onClick={() => speak("Les sciences qui ont changé la vie humaine")}
            title="Écouter la prononciation française / Listen in French"
            className="hover:scale-110 transition-transform ml-1 text-french-gold"
          >
            🔊
          </button>
          <span className="h-px w-8 bg-french-gold/40"></span>
        </div>

        {/* Main Changing Title */}
        <div className="min-h-[140px] sm:min-h-[160px] flex items-center justify-center transition-all duration-700">
          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-serif text-french-cream font-bold leading-[1.1] text-center tracking-tight transition-opacity duration-500`}>
            {currentTrans.main}
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-xl text-french-textMuted font-light leading-relaxed font-sans px-4">
          {currentTrans.sub}
        </p>

        {/* Three Pillars Preview Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-serif">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-french-surface/60 border border-french-border rounded-lg text-french-cream/90 hover:border-french-gold/50 transition-colors">
            <span className="text-xl">🦠</span>
            <span><strong className="text-french-gold">Pasteur</strong> • Microbes & Vaccins</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2 bg-french-surface/60 border border-french-border rounded-lg text-french-cream/90 hover:border-french-gold/50 transition-colors">
            <span className="text-xl">⚛️</span>
            <span><strong className="text-french-gold">Curie</strong> • Radioactivité & Médecine</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2 bg-french-surface/60 border border-french-border rounded-lg text-french-cream/90 hover:border-french-gold/50 transition-colors">
            <span className="text-xl">🧠</span>
            <span><strong className="text-french-gold">Pinel</strong> • Réforme Psychiatrique</span>
          </div>
        </div>

        {/* Call To Action Start Button */}
        <div className="pt-6">
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-french-gold/90 to-french-goldLight text-[#0a0d14] font-semibold text-base rounded-full shadow-lg hover:shadow-french-gold/20 hover:scale-105 transition-all duration-300"
          >
            <span>Commencer la présentation</span>
            <span className="font-mono text-lg group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="w-full max-w-6xl flex items-center justify-between text-xs text-french-textMuted/70 border-t border-french-border/30 pt-3 z-10 font-mono">
        <span>Navigation : Touches ← / → ou Espace</span>
        <span>01 / 08</span>
        <span>Mode Présentation disponible (F)</span>
      </div>

      {/* Decorative Archival Background Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20 archival-grain" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-french-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-french-red/15 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

// ==========================================
// SLIDE 2: THE GRAND NARRATIVE & CONCEPT
// ==========================================
function Slide2Overview({ onNext, onPrev, onOpenLightbox }) {
  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto select-none">
      {/* Slide Header */}
      <div className="flex items-center justify-between border-b border-french-border pb-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-french-gold">02 • Thèse Fondamentale / Core Concept</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-french-cream mt-1">
            La trajectoire de la curiosité française vers l'impact mondial
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-serif italic text-french-textMuted">
          <span>"France → Curiosité → Découverte → Impact → Monde"</span>
        </div>
      </div>

      {/* Narrative Architecture Flow */}
      <div className="my-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
        {/* Pasteur Card */}
        <div className="flex flex-col bg-french-surface/70 border border-french-border hover:border-french-gold/50 rounded-lg p-6 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🦠</span>
            <span className="text-xs font-mono uppercase px-2 py-1 bg-french-surfaceLight rounded text-french-gold border border-french-border">1822–1895</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-french-cream group-hover:text-french-gold transition-colors">
            <WikipediaLink name="Louis Pasteur" url="https://en.wikipedia.org/wiki/Louis_Pasteur" />
          </h3>
          <p className="text-xs font-mono text-french-gold/90 uppercase tracking-wider mt-1 mb-3">
            L'infiniment petit & La Vaccination
          </p>
          <div className="text-sm text-french-textMuted space-y-2 flex-1">
            <p className="leading-relaxed">
              <strong>Le défi invisible :</strong> Des micro-organismes invisibles altéraient le vin français, le lait, et tuaient par des maladies inexpliquées.
            </p>
            <p className="leading-relaxed text-french-cream/80 italic font-serif">
              "Pasteur a rendu visible l'ennemi biologique et a transformé la vaccination en une science universelle."
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-french-border/50 text-xs text-french-gold flex items-center justify-between font-mono">
            <span>Impact : Microbiologie & Hygiène</span>
            <span>Slide 03 →</span>
          </div>
        </div>

        {/* Curie Card */}
        <div className="flex flex-col bg-french-surface/70 border border-french-border hover:border-french-gold/50 rounded-lg p-6 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">⚛️</span>
            <span className="text-xs font-mono uppercase px-2 py-1 bg-french-surfaceLight rounded text-french-gold border border-french-border">1867–1934</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-french-cream group-hover:text-french-gold transition-colors">
            <WikipediaLink name="Marie Curie" url="https://en.wikipedia.org/wiki/Marie_Curie" />
          </h3>
          <p className="text-xs font-mono text-french-gold/90 uppercase tracking-wider mt-1 mb-3">
            L'énergie atomique & La Radiologie
          </p>
          <div className="text-sm text-french-textMuted space-y-2 flex-1">
            <p className="leading-relaxed">
              <strong>L'énergie invisible :</strong> Des rayonnements spontanés émis par la matière minérale brute sans apport extérieur de lumière.
            </p>
            <p className="leading-relaxed text-french-cream/80 italic font-serif">
              "De la Pologne à la Sorbonne, elle a décodé la radioactivité et équipé les ambulances du front de la Grande Guerre."
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-french-border/50 text-xs text-french-gold flex items-center justify-between font-mono">
            <span>Impact : Oncologie & Imagerie</span>
            <span>Slide 04 →</span>
          </div>
        </div>

        {/* Pinel Card */}
        <div className="flex flex-col bg-french-surface/70 border border-french-border hover:border-french-gold/50 rounded-lg p-6 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🧠</span>
            <span className="text-xs font-mono uppercase px-2 py-1 bg-french-surfaceLight rounded text-french-gold border border-french-border">1745–1826</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-french-cream group-hover:text-french-gold transition-colors">
            <WikipediaLink name="Philippe Pinel" url="https://en.wikipedia.org/wiki/Philippe_Pinel" />
          </h3>
          <p className="text-xs font-mono text-french-gold/90 uppercase tracking-wider mt-1 mb-3">
            L'esprit humain & Le Traitement Moral
          </p>
          <div className="text-sm text-french-textMuted space-y-2 flex-1">
            <p className="leading-relaxed">
              <strong>La souffrance incomprise :</strong> La folie traitée comme possession démoniaque, crime ou honte, condamnant les malades aux chaînes.
            </p>
            <p className="leading-relaxed text-french-cream/80 italic font-serif">
              "À Bicêtre et la Salpêtrière, il a substitué l'observation clinique et l'humanité à la barbarie carcérale."
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-french-border/50 text-xs text-french-gold flex items-center justify-between font-mono">
            <span>Impact : Naissance de la Psychiatrie</span>
            <span>Slide 05 →</span>
          </div>
        </div>
      </div>

      {/* Thematic Unification Banner */}
      <div className="bg-french-surfaceLight/60 border border-french-border rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-french-gold/20 flex items-center justify-center text-french-gold font-serif font-bold">
            💡
          </div>
          <div className="text-xs sm:text-sm">
            <span className="font-semibold text-french-cream font-serif">Le fil conducteur commun :</span>{" "}
            <span className="text-french-textMuted">Révéler et soigner ce que l'œil humain ne voyait pas ou condamnait à tort.</span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-french-gold">
          <span>Passez aux études approfondies</span>
          <span>→</span>
        </div>
      </div>

      {/* Slide Navigation Footer */}
      <div className="flex items-center justify-between text-xs text-french-textMuted pt-4 border-t border-french-border/40 font-mono">
        <button onClick={onPrev} className="hover:text-french-gold transition-colors">← Précédent</button>
        <span>02 / 08</span>
        <button onClick={onNext} className="hover:text-french-gold transition-colors">Suivant →</button>
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 3: LOUIS PASTEUR
// ==========================================
function Slide3Pasteur({ onNext, onPrev, onOpenLightbox }) {
  const { speak } = useFrenchSpeech();

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-french-border pb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono tracking-widest text-french-gold">03 • Section 1</span>
          <span className="text-french-border">|</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-french-cream flex items-center gap-2">
            <span>🇫🇷</span>
            <WikipediaLink name="Louis Pasteur" url="https://en.wikipedia.org/wiki/Louis_Pasteur" />
            <span className="text-french-textMuted font-light text-xl">— Microbes & Vaccins</span>
          </h2>
        </div>
        <button
          onClick={() => speak("Louis Pasteur, la fermentation microbienne, la pasteurisation et le vaccin contre la rage")}
          className="text-xs text-french-gold hover:text-french-goldLight border border-french-border px-2.5 py-1 rounded flex items-center gap-1.5"
          title="Écouter en français"
        >
          <span>Prononciation</span> 🔊
        </button>
      </div>

      {/* Main Narrative Columns */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* Left Column: Historical Artwork */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div 
            onClick={() => onOpenLightbox(HISTORICAL_IMAGES.pasteurLab)}
            className="historical-photo-container rounded-lg shadow-xl"
          >
            <img
              src={HISTORICAL_IMAGES.pasteurLab.src}
              alt={HISTORICAL_IMAGES.pasteurLab.title}
              className="w-full h-64 sm:h-72 object-cover object-top"
              onError={(e) => { e.target.src = HISTORICAL_IMAGES.pasteurLab.fallbackSrc; }}
            />
          </div>
          <div className="bg-french-surface/80 border border-french-border p-3.5 rounded-lg text-xs space-y-1">
            <div className="flex items-center justify-between text-french-gold font-serif">
              <span>Albert Edelfelt (1885) • Musée d'Orsay</span>
              <span className="font-mono text-[10px]">Cliquer pour zoom 🔍</span>
            </div>
            <p className="text-french-cream/90 italic font-serif">
              Pasteur observant la moelle épinière de lapin infectée dans son laboratoire de la rue d'Ulm.
            </p>
          </div>

          {/* Key Historical Nuance Notice */}
          <div className="bg-french-surfaceLight/60 border-l-2 border-french-gold p-3 rounded-r-lg text-xs space-y-1">
            <span className="text-french-gold font-semibold uppercase font-mono text-[10px]">Précision Historique Essentielle</span>
            <p className="text-french-textMuted leading-relaxed">
              Pasteur n'a <em>pas</em> inventé le premier vaccin du monde : le médecin britannique <WikipediaLink name="Edward Jenner" url="https://en.wikipedia.org/wiki/Edward_Jenner" /> avait créé le vaccin contre la variole en 1796. Pasteur a en revanche <strong>systématisé la vaccination</strong> en laboratoire à partir de micro-organismes atténués.
            </p>
          </div>
        </div>

        {/* Right Column: The Scientific Progression */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-bold text-french-gold">
              D'une énigme du vin français à la conquête des maladies
            </h3>
            
            {/* Step-by-step Story Chain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Step 1 */}
              <div className="bg-french-surface/60 border border-french-border p-3 rounded-lg">
                <div className="text-french-gold font-mono font-bold mb-1">1. Le problème du vin (1860s)</div>
                <p className="text-french-textMuted leading-relaxed">
                  L'industrie vinicole française souffre d'acidification. Pasteur démontre que la fermentation est causée par des levures vivantes, et l'aigrissement par des bactéries parasites.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-french-surface/60 border border-french-border p-3 rounded-lg">
                <div className="text-french-gold font-mono font-bold mb-1">2. La Pasteurisation</div>
                <p className="text-french-textMuted leading-relaxed">
                  En chauffant les liquides à 55–60°C avant refroidissement, il élimine les bactéries pathogènes sans altérer le goût — un procédé qui sauve l'économie alimentaire mondiale.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-french-surface/60 border border-french-border p-3 rounded-lg">
                <div className="text-french-gold font-mono font-bold mb-1">3. La Théorie des Germes</div>
                <p className="text-french-textMuted leading-relaxed">
                  Réfutation magistrale de la "génération spontanée" grâce aux ballons à col de cygne. Les maladies infectieuses proviennent d'agents microbiens extérieurs.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-french-surface/60 border border-french-border p-3 rounded-lg">
                <div className="text-french-gold font-mono font-bold mb-1">4. L'Atténuation & Les Vaccins</div>
                <p className="text-french-textMuted leading-relaxed">
                  Découverte qu'un microbe vieilli ou atténué confère l'immunité (choléra des poules, charbon des moutons, puis le virus redoutable de la rage).
                </p>
              </div>
            </div>
          </div>

          {/* The Dramatic Climax: Joseph Meister (1885) */}
          <div className="bg-[#182030] border border-french-gold/40 rounded-lg p-4 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-french-red/40 text-french-cream text-[11px] font-mono rounded border border-french-red/60 font-semibold">
                    Juillet 1885 • Le Moment Décisif
                  </span>
                  <span className="text-xs text-french-gold font-serif">L'épreuve humaine</span>
                </div>
                <h4 className="text-base font-serif font-bold text-french-cream">
                  Le sauvetage du jeune <WikipediaLink name="Joseph Meister" url="https://en.wikipedia.org/wiki/Joseph_Meister" /> (9 ans)
                </h4>
                <p className="text-xs text-french-textMuted leading-relaxed">
                  Mordu 14 fois par un chien enragé en Alsace, Joseph Meister était condamné à une mort certaine et atroce. Pasteur et le Dr Jacques-Joseph Grancher tentent l'inoculation d'une série de 13 injections de moelle de lapin atténuée. L'enfant survit sans séquelles : le premier vaccin antirabique humain triomphe.
                </p>
              </div>
              <button
                onClick={() => onOpenLightbox(HISTORICAL_IMAGES.pasteurMeisterEngraving)}
                className="hidden sm:block flex-shrink-0 w-24 h-24 border border-french-gold/30 rounded overflow-hidden hover:opacity-90 transition-opacity"
                title="Agrandir la gravure historique"
              >
                <img
                  src={HISTORICAL_IMAGES.pasteurMeisterEngraving.src}
                  alt="Vaccination Joseph Meister"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = HISTORICAL_IMAGES.pasteurMeisterEngraving.fallbackSrc; }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between text-xs text-french-textMuted pt-3 border-t border-french-border/40 font-mono">
        <button onClick={onPrev} className="hover:text-french-gold transition-colors">← Précédent</button>
        <span>03 / 08 • Pasteur</span>
        <button onClick={onNext} className="hover:text-french-gold transition-colors">Suivant : Marie Curie →</button>
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 4: MARIE CURIE
// ==========================================
function Slide4Curie({ onNext, onPrev, onOpenLightbox }) {
  const { speak } = useFrenchSpeech();

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-french-border pb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono tracking-widest text-french-gold">04 • Section 2</span>
          <span className="text-french-border">|</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-french-cream flex items-center gap-2">
            <span>⚛️</span>
            <WikipediaLink name="Marie Curie" url="https://en.wikipedia.org/wiki/Marie_Curie" />
            <span className="text-french-textMuted font-light text-xl">— Radioactivité & Médecine</span>
          </h2>
        </div>
        <button
          onClick={() => speak("Marie Curie, la radioactivité, le polonium, le radium et les Petites Curies sur le front")}
          className="text-xs text-french-gold hover:text-french-goldLight border border-french-border px-2.5 py-1 rounded flex items-center gap-1.5"
          title="Écouter en français"
        >
          <span>Prononciation</span> 🔊
        </button>
      </div>

      {/* Main Grid */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* Left Column: Historical Gallery & Connection */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div 
            onClick={() => onOpenLightbox(HISTORICAL_IMAGES.curiePetiteCurie)}
            className="historical-photo-container rounded-lg shadow-xl"
          >
            <img
              src={HISTORICAL_IMAGES.curiePetiteCurie.src}
              alt={HISTORICAL_IMAGES.curiePetiteCurie.title}
              className="w-full h-60 sm:h-64 object-cover"
              onError={(e) => { e.target.src = HISTORICAL_IMAGES.curiePetiteCurie.fallbackSrc; }}
            />
          </div>

          <div className="bg-french-surface/80 border border-french-border p-3.5 rounded-lg text-xs space-y-1.5">
            <div className="flex items-center justify-between text-french-gold font-serif">
              <span>"Les Petites Curies" (1914–1918)</span>
              <span className="font-mono text-[10px]">Archives Institut Curie</span>
            </div>
            <p className="text-french-cream/90 italic font-serif">
              Marie Curie au volant d'une unité radiologique mobile sur le front de la Première Guerre mondiale.
            </p>
          </div>

          {/* Poland to Paris Trajectory Notice */}
          <div className="bg-french-surfaceLight/60 border-l-2 border-french-blue p-3 rounded-r-lg text-xs space-y-1">
            <span className="text-french-gold font-semibold uppercase font-mono text-[10px]">La Trajectoire Franco-Polonaise</span>
            <p className="text-french-textMuted leading-relaxed">
              Née <strong>Maria Skłodowska</strong> à Varsovie, elle rejoint Paris en 1891 pour étudier à la Sorbonne. Travaillant aux côtés de son mari <WikipediaLink name="Pierre Curie" url="https://en.wikipedia.org/wiki/Pierre_Curie" />, ses découvertes s'ancrent dans la recherche française tout en rayonnant mondialement.
            </p>
          </div>
        </div>

        {/* Right Column: Narrative Steps */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-bold text-french-gold">
              Du minerai brut aux applications médicales qui sauvent des vies
            </h3>

            {/* Scientific Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-french-surface/60 border border-french-border p-3 rounded-lg">
                <div className="text-french-gold font-mono font-bold mb-1">1. Découverte du Polonium & Radium (1898)</div>
                <p className="text-french-textMuted leading-relaxed">
                  À partir de tonnes de pechblende traitées dans un hangar précaire de Paris, elle isole deux éléments radioactifs inconnus et forge le concept de <em>radioactivité</em>.
                </p>
              </div>

              <div className="bg-french-surface/60 border border-french-border p-3 rounded-lg">
                <div className="text-french-gold font-mono font-bold mb-1">2. Double Prix Nobel Historique</div>
                <p className="text-french-textMuted leading-relaxed">
                  Prix Nobel de Physique (1903) avec Pierre Curie et Henri Becquerel, puis Prix Nobel de Chimie (1911). Première femme et seule personne couronnée dans deux sciences distinctes.
                </p>
              </div>

              <div className="bg-french-surface/60 border border-french-border p-3 rounded-lg">
                <div className="text-french-gold font-mono font-bold mb-1">3. La Curiethérapie (Oncologie)</div>
                <p className="text-french-textMuted leading-relaxed">
                  L'application ciblée du radium pour détruire les cellules cancéreuses donne naissance à la radiothérapie moderne pour traiter les tumeurs malignes.
                </p>
              </div>

              <div className="bg-french-surface/60 border border-french-border p-3 rounded-lg">
                <div className="text-french-gold font-mono font-bold mb-1">4. Révolution des Rayons X au Front</div>
                <p className="text-french-textMuted leading-relaxed">
                  Pendant la Grande Guerre, elle crée 20 ambulances radiologiques et 200 postes fixes, formant des opératrices et radiographiant plus d'un million de blessés.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Narrative Chain Box */}
          <div className="bg-[#121b2a] border border-french-border p-3.5 rounded-lg">
            <div className="text-xs uppercase font-mono tracking-wider text-french-gold mb-2">
              Le Continuum Scientifique
            </div>
            <div className="flex flex-wrap items-center justify-between text-xs gap-2 font-serif text-french-cream">
              <span className="px-2 py-1 bg-french-surface border border-french-border rounded">Radioactivité fondamentale</span>
              <span className="text-french-gold font-mono">→</span>
              <span className="px-2 py-1 bg-french-surface border border-french-border rounded">Isolement des éléments</span>
              <span className="text-french-gold font-mono">→</span>
              <span className="px-2 py-1 bg-french-surface border border-french-border rounded">Imagerie X de terrain</span>
              <span className="text-french-gold font-mono">→</span>
              <span className="px-2 py-1 bg-french-surface border border-french-border rounded text-french-gold">Oncologie moderne</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between text-xs text-french-textMuted pt-3 border-t border-french-border/40 font-mono">
        <button onClick={onPrev} className="hover:text-french-gold transition-colors">← Précédent : Pasteur</button>
        <span>04 / 08 • Curie</span>
        <button onClick={onNext} className="hover:text-french-gold transition-colors">Suivant : Philippe Pinel →</button>
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 5: PHILIPPE PINEL (ICONIC ARTWORK)
// ==========================================
function Slide5Pinel({ onNext, onPrev, onOpenLightbox }) {
  const { speak } = useFrenchSpeech();

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-french-border pb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono tracking-widest text-french-gold">05 • Section 3</span>
          <span className="text-french-border">|</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-french-cream flex items-center gap-2">
            <span>🧠</span>
            <WikipediaLink name="Philippe Pinel" url="https://en.wikipedia.org/wiki/Philippe_Pinel" />
            <span className="text-french-textMuted font-light text-xl">— La Réforme de la Santé Mentale</span>
          </h2>
        </div>
        <button
          onClick={() => speak("Philippe Pinel, la réforme de la psychiatrie, l'asile de la Salpêtrière et le traitement moral")}
          className="text-xs text-french-gold hover:text-french-goldLight border border-french-border px-2.5 py-1 rounded flex items-center gap-1.5"
          title="Écouter en français"
        >
          <span>Prononciation</span> 🔊
        </button>
      </div>

      {/* Main Grid: Prominent Iconic Artwork Display */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-3">
        {/* Left Column: ICONIC MASTERPIECE PAINTING */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div 
            onClick={() => onOpenLightbox(HISTORICAL_IMAGES.pinelSalpetriere)}
            className="historical-photo-container rounded-lg shadow-2xl border-2 border-french-gold/40 group"
          >
            <img
              src={HISTORICAL_IMAGES.pinelSalpetriere.src}
              alt={HISTORICAL_IMAGES.pinelSalpetriere.title}
              className="w-full h-72 sm:h-84 object-cover object-center"
              onError={(e) => { e.target.src = HISTORICAL_IMAGES.pinelSalpetriere.fallbackSrc; }}
            />
          </div>

          <div className="bg-french-surface/90 border border-french-border p-3.5 rounded-lg text-xs space-y-1">
            <div className="flex items-center justify-between text-french-gold font-serif">
              <span className="font-bold">Tony Robert-Fleury (1876) • Académie nationale de médecine</span>
              <span className="font-mono text-[10px] bg-french-gold/20 px-2 py-0.5 rounded text-french-gold">Cliquer pour plein écran 🔍</span>
            </div>
            <p className="text-french-cream/90 italic font-serif text-xs leading-relaxed">
              "Pinel délivrant les aliénés à la Salpêtrière en 1795" — La scène fondatrice symbolisant le passage de la répression carcérale au soin médical.
            </p>
          </div>
        </div>

        {/* Right Column: Historical Analysis & The Shift */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-bold text-french-gold">
              Du châtiment à l'observation clinique humaine
            </h3>

            {/* Comparison Transformation Box */}
            <div className="space-y-2 text-xs">
              <div className="bg-french-red/10 border-l-2 border-french-red p-2.5 rounded-r">
                <span className="font-mono font-bold text-french-red text-[11px] block uppercase">Avant Pinel (L'Ancien Régime)</span>
                <p className="text-french-textMuted mt-0.5 leading-relaxed">
                  Les aliénés étaient enchaînés dans des cachots humides à Bicêtre, battus, livrés aux spectacles publics payants, confondus avec les criminels.
                </p>
              </div>

              <div className="bg-french-gold/10 border-l-2 border-french-gold p-2.5 rounded-r">
                <span className="font-mono font-bold text-french-gold text-[11px] block uppercase">La Révolution Médicale de Pinel</span>
                <p className="text-french-textMuted mt-0.5 leading-relaxed">
                  Suppression progressive des chaînes de fer, introduction du dialogue thérapeutique, classification méthodique des troubles (nosographie), et création de l'hôpital psychiatrique moderne.
                </p>
              </div>
            </div>
          </div>

          {/* Historical Nuance Box */}
          <div className="bg-french-surfaceLight/70 border border-french-border p-3.5 rounded-lg text-xs space-y-1.5">
            <span className="text-french-gold font-semibold uppercase font-mono text-[10px]">Rigueur Historique</span>
            <p className="text-french-textMuted leading-relaxed">
              L'histoire n'a pas été un acte magique instantané : le surveillant-chef <strong>Jean-Baptiste Pussin</strong> avait amorcé le déchaînement à Bicêtre en 1797. Pinel a apporté la <em>caution médicale, philosophique et théorique</em> qui a institutionnalisé cette révolution humaine dans toute l'Europe.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between text-xs text-french-textMuted pt-3 border-t border-french-border/40 font-mono">
        <button onClick={onPrev} className="hover:text-french-gold transition-colors">← Précédent : Curie</button>
        <span>05 / 08 • Pinel</span>
        <button onClick={onNext} className="hover:text-french-gold transition-colors">Suivant : Chronologie Interactive →</button>
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 6: INTERACTIVE SYNCHRONIZED TIMELINE
// ==========================================
const TIMELINE_EVENTS = [
  {
    year: "1793–1795",
    figure: "Pinel",
    icon: "🧠",
    title: "La Réforme de Bicêtre & Salpêtrière",
    desc: "Nommé médecin des aliénés en pleine Révolution française, Pinel supprime les fers et instaure le 'traitement moral', fondant la psychiatrie clinique moderne.",
    quote: "« Les aliénés ne sont point des coupables qu'il faut punir, mais des malades dont l'état pénible mérite tous les égards. » — Philippe Pinel"
  },
  {
    year: "1796",
    figure: "Jenner (Contexte)",
    icon: "💉",
    title: "Vaccin antivariolique de Jenner",
    desc: "Edward Jenner inocule le pus de vaccine chez l'homme contre la variole en Angleterre, premier jalon empirique qui inspirera les futurs travaux de Pasteur.",
    quote: "Prémisse historique indispensable à l'immunologie moderne."
  },
  {
    year: "1822",
    figure: "Pasteur",
    icon: "🇫🇷",
    title: "Naissance de Louis Pasteur",
    desc: "Naissance à Dole (Jura). Étudiant à l'École normale supérieure de Paris, il débute par la chimie et la cristallographie avant d'explorer les micro-organismes.",
    quote: "« Dans les champs de l'observation, le hasard ne favorise que les esprits préparés. » — Louis Pasteur"
  },
  {
    year: "1857–1864",
    figure: "Pasteur",
    icon: "🍷",
    title: "Fermentation & Pasteurisation",
    desc: "Pasteur démontre le rôle des levures dans la fermentation et conçoit la pasteurisation pour sauver la filière du vin et de la bière en France.",
    quote: "Réfutation définitive de la théorie de la génération spontanée."
  },
  {
    year: "1867",
    figure: "Curie",
    icon: "🇵🇱",
    title: "Naissance de Maria Skłodowska",
    desc: "Naissance à Varsovie en Pologne. Passionnée de sciences, elle rejoint Paris en 1891 pour étudier la physique et les mathématiques à la Sorbonne.",
    quote: "« La vie n'est facile pour aucun de nous. Mais quoi, il faut avoir de la persévérance... » — Marie Curie"
  },
  {
    year: "1885",
    figure: "Pasteur",
    icon: "🐕",
    title: "Vaccination de Joseph Meister",
    desc: "Succès mondial du vaccin contre la rage administré à Joseph Meister, consacrant l'immunologie et entraînant la création de l'Institut Pasteur (1888).",
    quote: "Premier vaccin humain issu d'un processus systématique d'atténuation en laboratoire."
  },
  {
    year: "1898",
    figure: "Curie",
    icon: "⚛️",
    title: "Découverte du Radium & Polonium",
    desc: "Pierre et Marie Curie annoncent à l'Académie des sciences la découverte de deux nouveaux éléments radioactifs et inventent le terme de radioactivité.",
    quote: "Fondation de la physique nucléaire et de la radiothérapie médicale."
  },
  {
    year: "1914–1918",
    figure: "Curie",
    icon: "🚑",
    title: "Les Petites Curies sur le Front",
    desc: "Création et déploiement de 20 voitures radiologiques mobiles et 200 postes fixes, révolutionnant la chirurgie de guerre pour plus d'un million de soldats.",
    quote: "La recherche fondamentale immédiatement appliquée au secours des blessés."
  }
];

function Slide6Timeline({ onNext, onPrev }) {
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const activeEvent = TIMELINE_EVENTS[selectedEventIndex];

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-french-border pb-3">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-french-gold">06 • Chronologie Comparative</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-french-cream">
            L'Épopée Chronologique : Un Siècle et Demi de Découvertes
          </h2>
        </div>
        <div className="text-xs font-mono text-french-textMuted hidden sm:block">
          Cliquez sur un repère pour afficher les détails
        </div>
      </div>

      {/* Horizontal Interactive Timeline Scrollbar */}
      <div className="my-auto space-y-6 pt-2">
        {/* Timeline Bar with Nodes */}
        <div className="relative py-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-french-border -translate-y-1/2 z-0" />
          <div className="relative z-10 flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
            {TIMELINE_EVENTS.map((ev, index) => {
              const isSelected = index === selectedEventIndex;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedEventIndex(index)}
                  className={`flex flex-col items-center group focus:outline-none transition-all duration-200 min-w-[90px]`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-300 ${
                      isSelected
                        ? "bg-french-gold text-[#0a0d14] border-french-goldLight scale-125 shadow-lg shadow-french-gold/30 font-bold"
                        : "bg-[#141a27] text-french-cream border-french-border group-hover:border-french-gold/60 group-hover:scale-110"
                    }`}
                  >
                    <span>{ev.icon}</span>
                  </div>
                  <span
                    className={`mt-2 font-mono text-xs transition-colors ${
                      isSelected ? "text-french-gold font-bold" : "text-french-textMuted group-hover:text-french-cream"
                    }`}
                  >
                    {ev.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Event Spotlight Card */}
        <div className="bg-french-surface/80 border border-french-gold/40 rounded-xl p-6 sm:p-8 transition-all duration-300 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-french-border pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 bg-french-surfaceLight rounded-lg border border-french-border">{activeEvent.icon}</span>
              <div>
                <span className="text-xs font-mono uppercase text-french-gold tracking-widest">{activeEvent.year} • {activeEvent.figure}</span>
                <h3 className="text-2xl font-serif font-bold text-french-cream">{activeEvent.title}</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedEventIndex((prev) => (prev > 0 ? prev - 1 : TIMELINE_EVENTS.length - 1))}
                className="px-3 py-1 bg-french-surface border border-french-border hover:border-french-gold rounded text-xs text-french-cream"
              >
                ← Précédent
              </button>
              <button
                onClick={() => setSelectedEventIndex((prev) => (prev < TIMELINE_EVENTS.length - 1 ? prev + 1 : 0))}
                className="px-3 py-1 bg-french-surface border border-french-border hover:border-french-gold rounded text-xs text-french-cream"
              >
                Suivant →
              </button>
            </div>
          </div>

          <p className="text-base text-french-cream/90 leading-relaxed font-sans mb-4">
            {activeEvent.desc}
          </p>

          <div className="bg-[#0e131d] border-l-2 border-french-gold p-3.5 rounded-r text-sm text-french-gold/90 font-serif italic">
            {activeEvent.quote}
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between text-xs text-french-textMuted pt-3 border-t border-french-border/40 font-mono">
        <button onClick={onPrev} className="hover:text-french-gold transition-colors">← Précédent : Pinel</button>
        <span>06 / 08 • Chronologie</span>
        <button onClick={onNext} className="hover:text-french-gold transition-colors">Suivant : Synthèse Conceptuelle →</button>
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 7: CONCEPTUAL SYNTHESIS
// ==========================================
function Slide7Synthesis({ onNext, onPrev }) {
  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-french-border pb-3">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-french-gold">07 • Synthèse Conceptuelle</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-french-cream">
            Le Lien Fondateur : Rendre Visible et Compris l'Invisible
          </h2>
        </div>
      </div>

      {/* Tripartite Matrix of Transformation */}
      <div className="my-auto space-y-4 pt-2">
        <p className="text-sm text-french-textMuted max-w-3xl font-light leading-relaxed">
          Bien que leurs disciplines soient distinctes (microbiologie, physique nucléaire, psychiatrie clinique), ces trois pionniers partagent un même principe épistémologique français : <strong>substituer l'observation méthodique à la fatalité ou aux préjugés</strong>.
        </p>

        {/* Matrix Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pasteur Column */}
          <div className="bg-french-surface/70 border border-french-border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-french-gold font-serif font-bold text-lg border-b border-french-border pb-2">
              <span>🦠</span>
              <span>Louis Pasteur</span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-french-gold font-mono block text-[11px]">L'Invisible Défi :</span>
                <span className="text-french-textMuted">Micro-organismes et bactéries pathogènes responsables de pourritures et d'épidémies.</span>
              </div>
              <div>
                <span className="text-french-gold font-mono block text-[11px]">L'Outil de Rupture :</span>
                <span className="text-french-cream/90">Microscope, ballons à col de cygne, culture et atténuation biologique.</span>
              </div>
              <div>
                <span className="text-french-gold font-mono block text-[11px]">L'Héritage Humain :</span>
                <span className="text-french-textMuted">Préservation alimentaire, hygiène hospitalière, immunisation planétaire.</span>
              </div>
            </div>
          </div>

          {/* Curie Column */}
          <div className="bg-french-surface/70 border border-french-border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-french-gold font-serif font-bold text-lg border-b border-french-border pb-2">
              <span>⚛️</span>
              <span>Marie Curie</span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-french-gold font-mono block text-[11px]">L'Invisible Défi :</span>
                <span className="text-french-textMuted">Rayonnement subatomique invisible tapi au cœur de la matière minérale.</span>
              </div>
              <div>
                <span className="text-french-gold font-mono block text-[11px]">L'Outil de Rupture :</span>
                <span className="text-french-cream/90">Électromètre piézoélectrique de Pierre Curie, fractionnement chimique intensif.</span>
              </div>
              <div>
                <span className="text-french-gold font-mono block text-[11px]">L'Héritage Humain :</span>
                <span className="text-french-textMuted">Radiographie médicale d'urgence, thérapies anticancéreuses, physique quantique.</span>
              </div>
            </div>
          </div>

          {/* Pinel Column */}
          <div className="bg-french-surface/70 border border-french-border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-french-gold font-serif font-bold text-lg border-b border-french-border pb-2">
              <span>🧠</span>
              <span>Philippe Pinel</span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-french-gold font-mono block text-[11px]">L'Invisible Défi :</span>
                <span className="text-french-textMuted">Souffrance psychologique confondue avec possession diabolique ou perversion morale.</span>
              </div>
              <div>
                <span className="text-french-gold font-mono block text-[11px]">L'Outil de Rupture :</span>
                <span className="text-french-cream/90">Observation clinique directe, suppression des chaînes, nosographie médicale.</span>
              </div>
              <div>
                <span className="text-french-gold font-mono block text-[11px]">L'Héritage Humain :</span>
                <span className="text-french-textMuted">Droit à la dignité pour les malades mentaux, psychiatrie hospitalière, psychothérapie.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between text-xs text-french-textMuted pt-3 border-t border-french-border/40 font-mono">
        <button onClick={onPrev} className="hover:text-french-gold transition-colors">← Précédent : Chronologie</button>
        <span>07 / 08 • Synthèse</span>
        <button onClick={onNext} className="hover:text-french-gold transition-colors">Suivant : Pavillon Interactif →</button>
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 8: INTERACTIVE DISCOVERY PAVILION
// ==========================================
function Slide8Explore({ onPrev, onOpenLightbox }) {
  const [selectedScientist, setSelectedScientist] = useState("pasteur");
  const { speak } = useFrenchSpeech();

  const data = {
    pasteur: {
      name: "Louis Pasteur",
      wikiUrl: "https://en.wikipedia.org/wiki/Louis_Pasteur",
      sub: "Microbiologie, Fermentation & Immunologie",
      lifespan: "1822 (Dole) – 1895 (Marnes-la-Coquette)",
      icon: "🦠",
      imageKey: "pasteurLab",
      quote: "« La science n'a pas de patrie, parce que le savoir est le patrimoine de l'humanité, le flambeau qui éclaire le monde. »",
      keyVocab: [
        { fr: "La fermentation", en: "Fermentation process caused by living microbes" },
        { fr: "La pasteurisation", en: "Thermal inactivation of pathogenic bacteria" },
        { fr: "La rage", en: "Rabies virus eradicated via attenuated spinal cords" },
        { fr: "Le vaccin atténué", en: "Weakened pathogen generating active immunity" }
      ],
      associatedFigures: [
        { name: "Joseph Meister", url: "https://en.wikipedia.org/wiki/Joseph_Meister", role: "1er vacciné guéri" },
        { name: "Edward Jenner", url: "https://en.wikipedia.org/wiki/Edward_Jenner", role: "Pionnier de la variole" }
      ],
      museumLink: "Institut Pasteur de Paris • Musée Pasteur"
    },
    curie: {
      name: "Marie Curie",
      wikiUrl: "https://en.wikipedia.org/wiki/Marie_Curie",
      sub: "Radioactivité, Chimie & Imagerie Médicale",
      lifespan: "1867 (Varsovie) – 1934 (Passy, Haute-Savoie)",
      icon: "⚛️",
      imageKey: "curiePetiteCurie",
      quote: "« Rien dans la vie n'est à craindre, tout est seulement à comprendre. Il est temps de comprendre davantage pour craindre moins. »",
      keyVocab: [
        { fr: "La radioactivité", en: "Spontaneous atomic radiation coined by Curie" },
        { fr: "Le polonium & le radium", en: "New chemical elements discovered in 1898" },
        { fr: "Les Petites Curies", en: "Mobile radiographic ambulance units for WWI" },
        { fr: "La curiethérapie", en: "Targeted radioactive oncology for tumors" }
      ],
      associatedFigures: [
        { name: "Pierre Curie", url: "https://en.wikipedia.org/wiki/Pierre_Curie", role: "Époux & co-découvreur" },
        { name: "Henri Becquerel", url: "https://en.wikipedia.org/wiki/Henri_Becquerel", role: "Co-lauréat Nobel 1903" }
      ],
      museumLink: "Musée Curie • Institut du Radium, Paris 5e"
    },
    pinel: {
      name: "Philippe Pinel",
      wikiUrl: "https://en.wikipedia.org/wiki/Philippe_Pinel",
      sub: "Psychiatrie Clinique, Nosographie & Réforme Humaniste",
      lifespan: "1745 (Jonquières) – 1826 (Paris)",
      icon: "🧠",
      imageKey: "pinelSalpetriere",
      quote: "« C'est un principe fondamental : ne jamais employer la violence envers les insensés, mais chercher à gagner leur confiance par de la douceur. »",
      keyVocab: [
        { fr: "Le traitement moral", en: "Moral & psychological compassionate therapy" },
        { fr: "La Salpêtrière & Bicêtre", en: "Historic Paris hospitals reformed by Pinel" },
        { fr: "La nosographie", en: "Systematic scientific classification of mental illness" },
        { fr: "L'aliéné mental", en: "Recognition of patients as sick persons, not criminals" }
      ],
      associatedFigures: [
        { name: "Jean-Baptiste Pussin", url: "https://en.wikipedia.org/wiki/Jean-Baptiste_Pussin", role: "Surveillant réformateur" },
        { name: "Esquirol", url: "https://en.wikipedia.org/wiki/Jean-%C3%89tienne_Dominique_Esquirol", role: "Disciple & successeur" }
      ],
      museumLink: "Hôpital de la Salpêtrière • Musée d'Histoire de la Médecine"
    }
  };

  const active = data[selectedScientist];

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-french-border pb-3">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-french-gold">08 • Pavillon Interactif / Explorer</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-french-cream">
            Explorez les Pionniers & Leur Vocabulaire Français
          </h2>
        </div>

        {/* 3 Tab Selector Buttons */}
        <div className="flex items-center gap-2">
          {["pasteur", "curie", "pinel"].map((key) => {
            const item = data[key];
            const isSel = selectedScientist === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedScientist(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-all ${
                  isSel
                    ? "bg-french-gold text-[#0a0d14] font-bold shadow-md"
                    : "bg-french-surface border border-french-border text-french-cream hover:border-french-gold/60"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Exhibition Dossier */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-3">
        {/* Left Column: Image & Wikipedia Direct Link */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div
            onClick={() => onOpenLightbox(HISTORICAL_IMAGES[active.imageKey])}
            className="historical-photo-container rounded-lg shadow-xl"
          >
            <img
              src={HISTORICAL_IMAGES[active.imageKey].src}
              alt={HISTORICAL_IMAGES[active.imageKey].title}
              className="w-full h-56 sm:h-64 object-cover"
              onError={(e) => { e.target.src = HISTORICAL_IMAGES[active.imageKey].fallbackSrc; }}
            />
          </div>

          {/* Quick Wiki Badge and Pronounce Bar */}
          <div className="bg-french-surface/80 border border-french-border p-3.5 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-xs text-french-textMuted font-mono">Article encyclopédique :</div>
              <WikipediaLink name={`${active.name} sur Wikipédia`} url={active.wikiUrl} className="text-sm font-serif" />
            </div>
            <button
              onClick={() => speak(active.name + ", " + active.sub)}
              className="px-2.5 py-1 bg-french-surfaceLight border border-french-border rounded text-xs text-french-gold hover:text-french-goldLight flex items-center gap-1"
            >
              <span>Écouter</span> 🔊
            </button>
          </div>

          <div className="text-[11px] font-mono text-french-textMuted flex items-center justify-between px-1">
            <span>{active.lifespan}</span>
            <span>🏛️ {active.museumLink}</span>
          </div>
        </div>

        {/* Right Column: Key French Vocabulary & Connections */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold text-french-cream">
                  <WikipediaLink name={active.name} url={active.wikiUrl} />
                </h3>
                <p className="text-xs font-mono text-french-gold uppercase tracking-wider">{active.sub}</p>
              </div>
            </div>

            {/* French Vocabulary Cards */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-french-textMuted block mb-2">
                Terminologie Clé en Français (Key Scientific Lexicon)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {active.keyVocab.map((v, i) => (
                  <div key={i} className="bg-french-surface/60 border border-french-border p-2.5 rounded group hover:border-french-gold/40">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-french-cream group-hover:text-french-gold text-sm">
                        {v.fr}
                      </span>
                      <button
                        onClick={() => speak(v.fr)}
                        title="Prononcer"
                        className="text-[10px] text-french-textMuted hover:text-french-gold"
                      >
                        🔊
                      </button>
                    </div>
                    <p className="text-french-textMuted mt-0.5 text-[11px] leading-relaxed">{v.en}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Clickable Historical Personages */}
            <div className="bg-french-surfaceLight/50 border border-french-border p-3 rounded-lg text-xs space-y-1.5">
              <span className="text-french-gold font-mono uppercase text-[10px] block">Personnages Historiques Associés</span>
              <div className="flex flex-wrap gap-4">
                {active.associatedFigures.map((fig, idx) => (
                  <WikipediaLink key={idx} name={fig.name} url={fig.url} role={fig.role} />
                ))}
              </div>
            </div>
          </div>

          {/* Authentic French Quote */}
          <div className="bg-[#121927] border-l-2 border-french-gold p-3 rounded-r text-xs text-french-cream/90 font-serif italic">
            {active.quote}
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between text-xs text-french-textMuted pt-3 border-t border-french-border/40 font-mono">
        <button onClick={onPrev} className="hover:text-french-gold transition-colors">← Précédent : Synthèse</button>
        <span>08 / 08 • Pavillon d'Exploration</span>
        <span className="text-french-gold">Fin de la présentation • Merci !</span>
      </div>
    </div>
  );
}

// ==========================================
// SPEAKER NOTES DRAWER (PRESENTER TOOL)
// ==========================================
function SpeakerNotesDrawer({ currentSlide, isOpen, onClose }) {
  const notes = [
    {
      title: "Slide 1: Introduction & Accroche",
      frenchCue: "« Bonjour à tous. Aujourd'hui, nous vous présentons les trois pionniers français qui ont transformé notre compréhension de la vie, de la maladie et de l'esprit humain. »",
      talkingPoints: [
        "Positionner le titre au centre : il s'agit d'une présentation académique et cinématographique.",
        "Mentionner que le fil conducteur n'est pas trois biographies isolées, mais la façon dont la curiosité scientifique française a résolu des problèmes invisibles.",
        "Insister sur la transition multilingue (Français, Anglais, Hindi)."
      ]
    },
    {
      title: "Slide 2: Thèse & Trajectoire",
      frenchCue: "« La science française a toujours articulé la curiosité fondamentale et les besoins réels de la société. »",
      talkingPoints: [
        "Présenter les trois piliers : Pasteur (le microcosme biologique), Curie (l'énergie atomique), Pinel (la souffrance psychologique).",
        "Mettre en valeur le dénominateur commun : 'Rendre compréhensible ce qui était invisible ou condamné'."
      ]
    },
    {
      title: "Slide 3: Louis Pasteur",
      frenchCue: "« Tout a commencé par un problème très français : l'altération du vin et de la bière. »",
      talkingPoints: [
        "Expliquer la chaîne : Vin français → Levures → Pasteurisation → Théorie des germes → Vaccins.",
        "IMPORTANT : Préciser qu'Edward Jenner avait inventé le vaccin contre la variole en 1796 ; Pasteur a systématisé la vaccination en laboratoire.",
        "Raconter avec émotion le cas de Joseph Meister en juillet 1885."
      ]
    },
    {
      title: "Slide 4: Marie Curie",
      frenchCue: "« Marie Curie incarne l'alliance de la persévérance polonaise et de l'excellence scientifique française. »",
      talkingPoints: [
        "Clarifier la trajectoire : Née Maria Skłodowska en Pologne, arrivée à Paris à la Sorbonne en 1891.",
        "Expliquer la découverte du Radium et du Polonium avec Pierre Curie.",
        "Mettre en avant 'Les Petites Curies' : l'application immédiate de la physique sur les champs de bataille de 1914–1918."
      ]
    },
    {
      title: "Slide 5: Philippe Pinel",
      frenchCue: "« À la Salpêtrière et à Bicêtre, Pinel a substitué la médecine à la barbarie carcérale. »",
      talkingPoints: [
        "Cliquer sur le tableau de Tony Robert-Fleury pour l'agrandir en plein écran devant le public.",
        "Distinguer le mythe de la réalité : Jean-Baptiste Pussin avait commencé la réforme, Pinel l'a théorisée médicalement.",
        "Souligner le concept de 'traitement moral' : écoute, observation, humanité."
      ]
    },
    {
      title: "Slide 6: Chronologie Interactive",
      frenchCue: "« Observons comment ces découvertes se répondent au fil d'un siècle d'histoire. »",
      talkingPoints: [
        "Cliquer sur les différents repères temporels (1793, 1822, 1885, 1898, 1914).",
        "Faire remarquer la simultanéité des révolutions scientifiques à Paris."
      ]
    },
    {
      title: "Slide 7: Synthèse Conceptuelle",
      frenchCue: "« Le point commun de ces trois esprits est d'avoir abattu les frontières de l'ignorance. »",
      talkingPoints: [
        "Conclure sur le message humaniste de la science.",
        "Résumer la matrice de transformation : Problème → Outil → Héritage."
      ]
    },
    {
      title: "Slide 8: Pavillon d'Exploration & Questions",
      frenchCue: "« Nous vous invitons maintenant à explorer les termes et les documents d'archives. Avez-vous des questions ? »",
      talkingPoints: [
        "Interagir avec le public en cliquant sur les termes français (bouton audio).",
        "Rappeler les liens Wikipédia accessibles en direct pour les recherches approfondies."
      ]
    }
  ];

  const current = notes[currentSlide] || notes[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-[#0c1018]/95 backdrop-blur-lg border-l border-french-gold/30 shadow-2xl p-6 flex flex-col justify-between animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-french-border pb-3">
          <div className="flex items-center gap-2 text-french-gold font-serif font-bold">
            <span>🎙️ Notes Présentateur (Touche N)</span>
          </div>
          <button onClick={onClose} className="text-french-textMuted hover:text-french-cream text-lg font-mono">✕</button>
        </div>

        <div>
          <span className="text-xs font-mono text-french-gold uppercase tracking-wider">Diapositive {currentSlide + 1} / 8</span>
          <h4 className="text-lg font-serif font-bold text-french-cream mt-0.5">{current.title}</h4>
        </div>

        <div className="bg-french-surface/90 border border-french-border p-3 rounded text-xs space-y-1">
          <span className="text-french-gold font-mono text-[10px] uppercase font-bold">Phrase d'accroche conseillée :</span>
          <p className="text-french-cream/90 italic font-serif leading-relaxed">
            {current.frenchCue}
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-french-textMuted uppercase tracking-wider">Points d'appui oratoires :</span>
          <ul className="space-y-2 text-xs text-french-textMuted">
            {current.talkingPoints.map((tp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-french-gold font-mono mt-0.5">•</span>
                <span className="leading-relaxed">{tp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-french-border text-[11px] font-mono text-french-textMuted/70 flex items-center justify-between">
        <span>Raccourcis : F (Plein écran) • N (Notes)</span>
        <button onClick={onClose} className="text-french-gold hover:underline">Fermer</button>
      </div>
    </div>
  );
}

// ==========================================
// MAIN PRESENTATION SHELL APP COMPONENT
// ==========================================
function PresentationApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);
  const [isSpeakerNotesOpen, setIsSpeakerNotesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalSlides = 8;

  // Auto-cycle multilingual title on Slide 1 every 3.5 seconds
  useEffect(() => {
    if (currentSlide !== 0) return;
    const interval = setInterval(() => {
      setCurrentLangIndex((prev) => (prev + 1) % TITLE_TRANSLATIONS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Next & Prev Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  // Toggle Fullscreen API Presentation Mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Keyboard navigation listener (←, →, Spacebar, N for notes, F for fullscreen, ESC for lightbox)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore keyboard navigation when typing in inputs if any
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (activeLightboxImage) {
        if (e.key === "Escape") setActiveLightboxImage(null);
        return;
      }

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setIsSpeakerNotesOpen((prev) => !prev);
      } else if (e.key >= "1" && e.key <= "8") {
        goToSlide(parseInt(e.key, 10) - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, activeLightboxImage]);

  // Slides Array
  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <Slide1Title
            onNext={nextSlide}
            currentLangIndex={currentLangIndex}
            onSelectLang={(idx) => setCurrentLangIndex(idx)}
            onOpenLightbox={(img) => setActiveLightboxImage(img)}
          />
        );
      case 1:
        return (
          <Slide2Overview
            onNext={nextSlide}
            onPrev={prevSlide}
            onOpenLightbox={(img) => setActiveLightboxImage(img)}
          />
        );
      case 2:
        return (
          <Slide3Pasteur
            onNext={nextSlide}
            onPrev={prevSlide}
            onOpenLightbox={(img) => setActiveLightboxImage(img)}
          />
        );
      case 3:
        return (
          <Slide4Curie
            onNext={nextSlide}
            onPrev={prevSlide}
            onOpenLightbox={(img) => setActiveLightboxImage(img)}
          />
        );
      case 4:
        return (
          <Slide5Pinel
            onNext={nextSlide}
            onPrev={prevSlide}
            onOpenLightbox={(img) => setActiveLightboxImage(img)}
          />
        );
      case 5:
        return (
          <Slide6Timeline
            onNext={nextSlide}
            onPrev={prevSlide}
          />
        );
      case 6:
        return (
          <Slide7Synthesis
            onNext={nextSlide}
            onPrev={prevSlide}
          />
        );
      case 7:
        return (
          <Slide8Explore
            onPrev={prevSlide}
            onOpenLightbox={(img) => setActiveLightboxImage(img)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col bg-[#0a0d14] text-[#e8e4dc] font-sans">
      
      {/* Top Presentation Control Header */}
      <header className="h-12 border-b border-french-border/50 bg-[#0d121c]/90 backdrop-blur px-4 sm:px-8 flex items-center justify-between z-30 select-none">
        {/* Left: Presentation Branding */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-3.5 french-flag-accent rounded-xs" />
          <button 
            onClick={() => goToSlide(0)}
            className="font-serif text-sm tracking-wider font-semibold text-french-cream hover:text-french-gold transition-colors flex items-center gap-2"
          >
            <span>Les Sciences Françaises</span>
            <span className="hidden sm:inline text-xs text-french-textMuted font-normal font-sans">• Exposition Universitaire</span>
          </button>
        </div>

        {/* Center: Slide Quick Navigation Dots */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#141a27] px-3 py-1 rounded-full border border-french-border/80 text-xs font-mono">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                currentSlide === idx
                  ? "bg-french-gold text-[#0a0d14] font-bold shadow"
                  : "text-french-textMuted hover:text-french-cream hover:bg-french-surfaceLight"
              }`}
              title={`Aller à la diapositive 0${idx + 1}`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>

        {/* Right: Presentation Tools (Fullscreen, Speaker Notes, Controls) */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setIsSpeakerNotesOpen((prev) => !prev)}
            className={`px-3 py-1 rounded border transition-colors flex items-center gap-1.5 ${
              isSpeakerNotesOpen 
                ? "bg-french-gold text-[#0a0d14] border-french-gold font-bold" 
                : "bg-french-surface border-french-border text-french-cream hover:border-french-gold/60"
            }`}
            title="Afficher les notes orales du présentateur (Touche N)"
          >
            <span>🎙️</span>
            <span className="hidden sm:inline">Notes (N)</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="px-3 py-1 bg-french-surface hover:bg-french-surfaceLight border border-french-border hover:border-french-gold/60 rounded text-french-cream transition-colors flex items-center gap-1.5"
            title="Activer le mode présentation plein écran (Touche F)"
          >
            <span>⛶</span>
            <span className="hidden sm:inline">Plein Écran (F)</span>
          </button>
        </div>
      </header>

      {/* Main Slide Presentation Stage (16:9 responsive viewport) */}
      <main className="flex-1 relative w-full h-[calc(100vh-3rem)] overflow-hidden bg-[#0a0d14]">
        <div className="w-full h-full animate-fade-in">
          {renderSlide()}
        </div>
      </main>

      {/* Floating Bottom Presentation Navigation Controls */}
      <div className="fixed bottom-4 right-6 z-30 flex items-center gap-2 bg-[#121824]/90 backdrop-blur border border-french-border px-3 py-1.5 rounded-full shadow-2xl">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-1.5 text-french-cream hover:text-french-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Diapositive précédente (Flèche gauche)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <span className="text-xs font-mono px-2 text-french-gold font-semibold">
          0{currentSlide + 1} / 0{totalSlides}
        </span>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="p-1.5 text-french-cream hover:text-french-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Diapositive suivante (Flèche droite ou Espace)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress Bar along the bottom edge */}
      <div className="w-full h-1 bg-[#121622] z-30">
        <div
          className="h-full bg-gradient-to-r from-french-gold via-french-goldLight to-french-gold transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Lightbox Modal for Artworks */}
      {activeLightboxImage && (
        <ImageLightbox
          image={activeLightboxImage}
          onClose={() => setActiveLightboxImage(null)}
        />
      )}

      {/* Speaker Notes Drawer */}
      <SpeakerNotesDrawer
        currentSlide={currentSlide}
        isOpen={isSpeakerNotesOpen}
        onClose={() => setIsSpeakerNotesOpen(false)}
      />
    </div>
  );
}

// Render root
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<PresentationApp />);
}
