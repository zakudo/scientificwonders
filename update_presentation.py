# -*- coding: utf-8 -*-
import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update <html lang="en"> and meta description
html = html.replace('<html lang="fr"', '<html lang="en"')
html = html.replace(
    'content="Une exposition et archive numérique sur Louis Pasteur, Marie Curie et Philippe Pinel — trois parcours scientifiques français qui ont transformé notre compréhension du monde.">',
    'content="A digital documentary archive and exhibition on Louis Pasteur, Marie Curie, and Philippe Pinel — three French scientific journeys that transformed human life and modern medicine.">'
)
html = html.replace(
    '<title>Les Sciences Qui Ont Changé La Vie Humaine — Exposition & Archive Scientifique</title>',
    '<title>The Sciences That Changed Human Life — Digital Science Archive & Exhibition</title>'
)

# 2. Update TITLE_TRANSLATIONS to prioritize English
old_translations = '''    const TITLE_TRANSLATIONS = [
      {
        lang: "FR",
        flag: "🇫🇷",
        lines: ["LES SCIENCES", "QUI ONT CHANGÉ", "LA VIE HUMAINE"],
        sub: "Three scientific journeys. Three French connections. One transformation of human understanding.",
      },
      {
        lang: "EN",
        flag: "🇬🇧",
        lines: ["THE SCIENCES", "THAT CHANGED", "HUMAN LIFE"],
        sub: "Three scientific journeys. Three French connections. One transformation of human understanding.",
      },
      {
        lang: "HI",
        flag: "🇮🇳",
        lines: ["वे विज्ञान", "जिन्होंने मानव जीवन", "बदल दिया"],
        sub: "तीन वैज्ञानिक यात्राएँ। तीन फ़्रांसीसी संबंध। मानव समझ का एक ऐतिहासिक परिवर्तन।",
      }
    ];'''

new_translations = '''    const TITLE_TRANSLATIONS = [
      {
        lang: "EN",
        flag: "🇬🇧",
        lines: ["THE SCIENCES", "THAT CHANGED", "HUMAN LIFE"],
        sub: "Three scientific journeys. Three French connections. One transformation of human understanding.",
      },
      {
        lang: "FR",
        flag: "🇫🇷",
        lines: ["LES SCIENCES", "QUI ONT CHANGÉ", "LA VIE HUMAINE"],
        sub: "Three scientific journeys. Three French connections. One transformation of human understanding.",
      },
      {
        lang: "HI",
        flag: "🇮🇳",
        lines: ["वे विज्ञान", "जिन्होंने मानव जीवन", "बदल दिया"],
        sub: "Three scientific journeys. Three French connections. One transformation of human understanding.",
      }
    ];'''

html = html.replace(old_translations, new_translations)

# 3. Update HISTORICAL_IMAGES to register all Pinel images
old_hist_images = '''const HISTORICAL_IMAGES = {
  pinelSalpetriere: {
    src: "assets/images/pinel-salpetriere.jpg",
    fallbackSrc:
      "assets/images/pinel-salpetriere.jpg",
    title: "Pinel freeing patients at the Salpêtrière in 1795",
    artist: "Tony Robert-Fleury",
    location: "Pitié-Salpêtrière Hospital, Paris",
    caption:
      "Tony Robert-Fleury's historical painting depicting Philippe Pinel freeing patients from their chains at the Salpêtrière.",
    englishCaption:
      "An iconic representation of Pinel's reform of psychiatric care, symbolizing a shift from punishment toward observation, dialogue, and human dignity."
  },

  pasteurLab: {
    src: "assets/images/pasteur-lab.jpg",
    fallbackSrc:
      "assets/images/pasteur-lab.jpg",
    title: "Louis Pasteur — 1885",
    artist: "Albert Edelfelt",
    location: "Musée d'Orsay, Paris",
    caption:
      "Portrait of Louis Pasteur painted by Albert Edelfelt in 1885.",
    englishCaption:
      "Louis Pasteur, one of France's most influential scientists, whose work transformed microbiology, vaccination, and public health."
  },

  pasteurMeisterEngraving: {
    src: "assets/images/pasteur-meister.jpg",
    fallbackSrc:
      "assets/images/pasteur-meister.jpg",
    title: "First rabies vaccination — Joseph Meister, 1885",
    artist: "Wellcome Collection",
    location: "Wellcome Collection, London",
    caption:
      "A historical representation of Pasteur's pioneering rabies vaccination work in 1885.",
    englishCaption:
      "Pasteur's pioneering rabies treatment in 1885 marked a major turning point in the history of vaccination."
  },

  curiePetiteCurie: {
    src: "assets/images/curie-petite-curie.jpg",
    fallbackSrc:
      "assets/images/curie-petite-curie.jpg",
    title: "Marie Curie and the Little Curies",
    artist: "Historical photograph",
    location: "France, World War I",
    caption:
      "Marie Curie with one of the mobile radiography units used during the First World War.",
    englishCaption:
      "Marie Curie used mobile X-ray units, known as the 'Little Curies', to bring radiography closer to wounded soldiers on the front."
  },

  curieLabCouple: {
    src: "assets/images/curie-lab-couple.jpg",
    fallbackSrc:
      "assets/images/curie-lab-couple.jpg",
    title: "Pierre and Marie Curie in their laboratory",
    artist: "Historical photograph",
    location: "Paris, France",
    caption:
      "Pierre and Marie Curie demonstrating experimental equipment used in their research into radioactivity.",
    englishCaption:
      "Pierre and Marie Curie conducting experiments that contributed to the discovery and study of radioactive elements."
  }
};'''

new_hist_images = '''const HISTORICAL_IMAGES = {
  pinelBicetre: {
    src: "assets/images/pinel-bicetre.jpg",
    fallbackSrc: "assets/images/pinel-bicetre.jpg",
    title: "Pinel Ordering the Chains Removed at Bicêtre in 1793",
    artist: "Charles-Louis Müller (1849)",
    location: "Académie Nationale de Médecine, Paris",
    caption: "Charles-Louis Müller's landmark painting depicting Dr. Philippe Pinel and superintendent Jean-Baptiste Pussin releasing male patients from carceral chains.",
    englishCaption: "The defining visual moment of the birth of modern psychiatry: substituting punitive irons with medical care, therapeutic patience, and moral dignity."
  },

  pinelSalpetriere: {
    src: "assets/images/pinel-salpetriere.jpg",
    fallbackSrc: "assets/images/pinel-salpetriere.jpg",
    title: "Pinel Freeing the Patients at La Salpêtrière in 1795",
    artist: "Tony Robert-Fleury (1876)",
    location: "Académie Nationale de Médecine / Pitié-Salpêtrière, Paris",
    caption: "Tony Robert-Fleury's monumental painting showing Philippe Pinel abolishing iron shackles for female inmates at La Salpêtrière.",
    englishCaption: "An iconic celebration of humanist clinical reform, marking the transition from custodial torture to clinical observation and therapy."
  },

  pinelTreatise: {
    src: "assets/images/pinel-treatise-1801.jpg",
    fallbackSrc: "assets/images/pinel-treatise-1801.jpg",
    title: "Traité médico-philosophique sur l'aliénation mentale (Paris, 1801)",
    artist: "Philippe Pinel — First Edition, Year IX",
    location: "Bibliothèque interuniversitaire de Santé, Paris",
    caption: "Title page of Pinel's foundational text establishing empirical clinical psychiatry and psychiatric nosology.",
    englishCaption: "Pinel's masterwork, classifying mental disorders into mania, melancholia, dementia, and idiotism through bedside empirical observation."
  },

  pinelInfirmary: {
    src: "assets/images/salpetriere-18th-century.jpg",
    fallbackSrc: "assets/images/salpetriere-18th-century.jpg",
    title: "General Infirmary of La Salpêtrière in the 18th Century",
    artist: "Historical Architectural Engraving (18th Century)",
    location: "Bibliothèque Nationale de France, Paris",
    caption: "Historical engraving of the vast Salpêtrière hospice complex where over 7,000 women were held prior to the humanist reforms.",
    englishCaption: "The pre-revolutionary asylum functioned as a carceral warehouse where patients were chained to walls in dark stone cells."
  },

  pinelPortrait: {
    src: "assets/images/pinel-portrait.jpg",
    fallbackSrc: "assets/images/pinel-portrait.jpg",
    title: "Portrait of Dr. Philippe Pinel (1745–1826)",
    artist: "Historical Engraving",
    location: "Académie Nationale de Médecine, Paris",
    caption: "Portrait of French physician Philippe Pinel, father of humane clinical psychiatry.",
    englishCaption: "Pinel established that mental affliction is a medical illness deserving of therapeutic care, listening, and compassion."
  },

  pasteurLab: {
    src: "assets/images/pasteur-lab.jpg",
    fallbackSrc: "assets/images/pasteur-lab.jpg",
    title: "Louis Pasteur in his Laboratory — 1885",
    artist: "Albert Edelfelt",
    location: "Musée d'Orsay, Paris",
    caption: "Albert Edelfelt's famous portrait of Louis Pasteur examining a spinal cord in his laboratory on Rue d'Ulm.",
    englishCaption: "Louis Pasteur, whose experimental methods transformed microbiology, infectious disease prevention, and public health."
  },

  pasteurMeisterEngraving: {
    src: "assets/images/pasteur-meister.jpg",
    fallbackSrc: "assets/images/pasteur-meister.jpg",
    title: "First Rabies Vaccination — Joseph Meister, July 6, 1885",
    artist: "Wood Engraving, Wellcome Collection",
    location: "Wellcome Collection, London",
    caption: "Historical engraving illustrating the critical moment Pasteur administered the rabies vaccine to 9-year-old Joseph Meister.",
    englishCaption: "The turning point in modern immunology: experimental lab attenuation systematically saving a human life from a fatal infection."
  },

  curiePetiteCurie: {
    src: "assets/images/curie-petite-curie.jpg",
    fallbackSrc: "assets/images/curie-petite-curie.jpg",
    title: "Marie Curie and the Mobile X-Ray Units ('Petites Curies')",
    artist: "Historical Photograph (c. 1915)",
    location: "Musée Curie / French Military Archives",
    caption: "Marie Curie in one of the 20 mobile field radiography vehicles deployed on the frontlines of World War I.",
    englishCaption: "Marie Curie brought radiology directly to wounded soldiers, supervising more than one million X-ray examinations on the battlefield."
  },

  curieLabCouple: {
    src: "assets/images/curie-lab-couple.jpg",
    fallbackSrc: "assets/images/curie-lab-couple.jpg",
    title: "Pierre and Marie Curie in their Paris Shed Laboratory",
    artist: "Historical Photograph (c. 1900)",
    location: "Musée Curie, Paris",
    caption: "Pierre and Marie Curie in their makeshift workshop on Rue Lhomond where tons of pitchblende were processed.",
    englishCaption: "The tireless laboratory work that led to the discovery and chemical extraction of Polonium and Radium in 1898."
  }
};'''

html = html.replace(old_hist_images, new_hist_images)

# 4. Remove manual language switcher and replace with automatic museum indicator
old_lang_switcher = '''              {/* Language Switcher */}
              
              <div className="flex items-center gap-1.5 bg-[#FAF6EE] border border-[#D6CEBE] px-3 py-1 rounded-xs text-xs">
                <span className="text-[#5C5851] mr-1 font-mono">Language:</span>
                {TITLE_TRANSLATIONS.map((t, idx) => (
                  <button
                    key={t.lang}
                    onClick={() => setCurrentLangIndex(idx)}
                    className={`px-2 py-0.5 rounded-xs transition-all font-mono text-xs ${
                      idx === currentLangIndex
                        ? "bg-[#6E1F2A] text-[#F2EBDD] font-bold shadow-sm"
                        : "text-[#5C5851] hover:text-[#171614] hover:bg-[#E6DDCB]"
                    }`}
                  >
                    {t.lang}
                  </button>
                ))}
              </div>'''

new_lang_indicator = '''              {/* Exhibition Metadata (Cycles language smoothly on its own) */}
              <div className="flex items-center gap-2 font-mono text-xs text-[#5C5851]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6E1F2A] animate-pulse"></span>
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  COLLEGE EXHIBITION · 1793–1960
                </span>
              </div>'''

html = html.replace(old_lang_switcher, new_lang_indicator)

# 5. Update pinelStorySlides with 4 UNIQUE images
old_pinel_slides = '''      const pinelStorySlides = [
        {
          title: "Before care: Confinement and chains",
          subtitle: "Asylum conditions under the Ancien Régime",
          period: "18th century",
          location: "Bicêtre & La Salpêtrière, Paris",
          tag: "THE PROBLEM",
          description: "Historical accounts describe 18th-century asylums as cruel places of detention. People with mental illness were chained in damp dungeons, beaten, displayed in paid public spectacles, and considered possessed or incurable.",
          image: "assets/images/pinel-portrait.jpg",
          historicalNote: "Dr. Philippe Pinel was appointed to Bicêtre in 1793 and then to the Salpêtrière in 1795, beginning a humanist medical revolution."
        },
        {
          title: "1793–1795: Unchaining & Moral Treatment",
          subtitle: "Pinel at the Salpêtrière (Tony Robert-Fleury 1876)",
          period: "1793–1795",
          location: "Paris, France",
          tag: "THE REFORM",
          description: "Pinel advocated removing the iron restraints and introduced 'moral treatment': therapeutic listening, regular care, fresh air, and respect for human dignity. Head attendant Jean-Baptiste Pussin had begun unchaining patients at Bicêtre in 1797; Pinel gave the reform broader medical and philosophical authority.",
          image: "assets/images/pinel-salpetriere.jpg",
          historicalNote: "Tony Robert-Fleury's 1876 painting is a later historical representation celebrating the memory of this foundational reform."
        },
        {
          title: "He changed the medical question",
          subtitle: "Clinical observation, nosography & psychiatry",
          period: "1801",
          location: "Hospice de la Salpêtrière, Paris",
          tag: "NOSOGRAPHIE",
          description: "Pinel systematically recorded and classified mental disorders (melancholy, mania, dementia, idiotism) in his 'Medico-Philosophical Treatise on Mental Alienation'. He replaced the question 'What has this criminal done?' with 'What condition is this patient suffering from, and how can it be treated?'.",
          image: "assets/images/pinel-salpetriere.jpg",
          historicalNote: "Pinel did not create modern psychiatry alone, but he established clinical observation as its scientific foundation."
        }
      ];'''

new_pinel_slides = '''      const pinelStorySlides = [
        {
          title: "Before Care: Confinement & Chains",
          subtitle: "Cruel asylum conditions under the Ancien Régime",
          period: "18th century",
          location: "La Salpêtrière & Bicêtre, Paris",
          tag: "THE CARCERAL CRISIS",
          description: "Before the reforms, mental affliction was treated as criminality or demonic possession. Inmates were locked in damp stone cells, shackled to walls in heavy iron chains, beaten by wardens, and displayed in cages for paid public entertainment.",
          image: "assets/images/salpetriere-18th-century.jpg",
          historicalNote: "18th-century architectural engraving of the General Infirmary at La Salpêtrière, where over 7,000 destitute and mentally ill women were detained in punitive confinement."
        },
        {
          title: "1793: Removing the Shackles at Bicêtre",
          subtitle: "Charles-Louis Müller (1849) — Revolutionary medical reform",
          period: "1793",
          location: "Hôpital de Bicêtre, Paris",
          tag: "THE BICÊTRE BREAKTHROUGH",
          description: "Appointed chief physician at Bicêtre during the French Revolution, Pinel partnered with governor Jean-Baptiste Pussin. Together they struck off the iron chains of male patients, proving that gentle, non-violent care pacified agitation that brutal confinement had caused.",
          image: "assets/images/pinel-bicetre.jpg",
          historicalNote: "Charles-Louis Müller's 1849 canvas (Académie Nationale de Médecine) depicts Dr. Pinel and Pussin removing iron bonds from inmates, marking psychiatry's foundational moment."
        },
        {
          title: "1795: Moral Treatment at La Salpêtrière",
          subtitle: "Tony Robert-Fleury (1876) — Human dignity restored",
          period: "1795",
          location: "Hospice de la Salpêtrière, Paris",
          tag: "MORAL THERAPY",
          description: "Transferred to the vast women's asylum of La Salpêtrière, Pinel eliminated coercive punishment and established 'traitement moral' (moral treatment): therapeutic listening, regular medical rounds, clean air, and compassionate conversation.",
          image: "assets/images/pinel-salpetriere.jpg",
          historicalNote: "Tony Robert-Fleury's iconic 1876 painting commemorates Pinel liberating female patients, replacing superstitious fear with humanist clinical observation."
        },
        {
          title: "1801: The Clinical Psychiatry Treatise",
          subtitle: "Foundations of modern psychiatric nosology and classification",
          period: "1801",
          location: "Paris, France (Year IX of the Republic)",
          tag: "CLINICAL SCIENCE",
          description: "Pinel published his groundbreaking 'Traité médico-philosophique sur l\\'aliénation mentale'. He rejected moral blame and introduced empirical nosology, classifying disorders into melancholia, mania without delirium, dementia, and idiocy.",
          image: "assets/images/pinel-treatise-1801.jpg",
          historicalNote: "Original 1801 printed title page: Pinel's treatise inaugurated modern clinical psychiatry by substituting 'What has this criminal done?' with 'What illness is this person suffering from?'."
        }
      ];'''

html = html.replace(old_pinel_slides, new_pinel_slides)

# 6. Replace Pinel's single painting exhibit with a multi-artwork comparative gallery
old_pinel_painting = '''            {/* MANDATORY PROMINENT ICONIC PINEL PAINTING EXHIBIT */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6E1F2A] block font-semibold">
                FUNDAMENTAL HISTORICAL PAINTING
              </span>
              
              <div 
                onClick={() => setActiveLightboxImage(HISTORICAL_IMAGES.pinelSalpetriere)}
                className="historical-photo-container rounded-xs shadow-md border border-[#A58A55] group"
              >
                <img
                  src={HISTORICAL_IMAGES.pinelSalpetriere.src}
                  alt={HISTORICAL_IMAGES.pinelSalpetriere.title}
                  className="w-full h-80 sm:h-[480px] object-cover object-center"
                  onError={(e) => { e.target.src = HISTORICAL_IMAGES.pinelSalpetriere.fallbackSrc; }}
                />
              </div>

              <div className="bg-[#FAF6EE] border border-[#D1C7B4] p-4 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-serif font-bold text-[#6E1F2A] text-sm block">
                    Tony Robert-Fleury, 1876. Library of the National Academy of Medicine, Paris.
                  </span>
                  <p className="text-[#171614] italic font-serif mt-0.5">
                    "Commemorative historical representation of Pinel's humanist reform at the Salpêtrière."
                  </p>
                </div>
                <button
                  onClick={() => setActiveLightboxImage(HISTORICAL_IMAGES.pinelSalpetriere)}
                  className="px-3.5 py-1.5 bg-[#6E1F2A] text-[#F2EBDD] font-mono font-bold rounded-xs text-xs flex-shrink-0 hover:bg-[#8B2635] transition-all"
                >
                  Fullscreen / Lightbox 🔍
                </button>
              </div>
            </div>'''

new_pinel_painting = '''            {/* CURATED ARCHIVAL GALLERY: THE TWO SIDES OF PINEL'S REVOLUTION */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D1C7B4] pb-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#6E1F2A] block font-semibold">
                    ARCHIVAL ARTWORK EXHIBIT · COMPARATIVE EVIDENCE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171614]">
                    The Two Historic Reformations: Bicêtre (1793) & La Salpêtrière (1795)
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#5C5851]">
                  Académie Nationale de Médecine, Paris
                </span>
              </div>
              
              {/* Dual Artwork Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Artwork 1: Bicêtre 1793 */}
                <div className="bg-[#FAF6EE] border border-[#D1C7B4] rounded-xs overflow-hidden shadow-sm flex flex-col justify-between">
                  <div 
                    onClick={() => setActiveLightboxImage(HISTORICAL_IMAGES.pinelBicetre)}
                    className="relative h-64 sm:h-72 overflow-hidden cursor-pointer group bg-[#171614]"
                  >
                    <img
                      src={HISTORICAL_IMAGES.pinelBicetre.src}
                      alt={HISTORICAL_IMAGES.pinelBicetre.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = HISTORICAL_IMAGES.pinelBicetre.fallbackSrc; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171614]/80 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs font-mono text-[#F2EBDD] bg-[#6E1F2A] px-2 py-0.5 rounded-xs font-semibold">
                        1793 · BICÊTRE HOSPITAL (MEN)
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-serif font-bold text-[#171614] text-base">
                      Pinel Ordering the Chains Removed at Bicêtre
                    </h4>
                    <p className="text-xs text-[#5C5851] font-mono">
                      Charles-Louis Müller (1849) · Académie Nationale de Médecine
                    </p>
                    <p className="text-xs text-[#5C5851] leading-relaxed">
                      Depicts Dr. Pinel and governor Jean-Baptiste Pussin unchaining violent and melancholic male patients, demonstrating that brutality provoked agitation while calm medical care cured it.
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setActiveLightboxImage(HISTORICAL_IMAGES.pinelBicetre)}
                        className="px-3 py-1 bg-[#FAF6EE] border border-[#D1C7B4] hover:border-[#6E1F2A] text-[#171614] hover:text-[#6E1F2A] font-mono text-xs rounded-xs font-semibold"
                      >
                        Enlarge Artwork 🔍
                      </button>
                    </div>
                  </div>
                </div>

                {/* Artwork 2: La Salpêtrière 1795 */}
                <div className="bg-[#FAF6EE] border border-[#D1C7B4] rounded-xs overflow-hidden shadow-sm flex flex-col justify-between">
                  <div 
                    onClick={() => setActiveLightboxImage(HISTORICAL_IMAGES.pinelSalpetriere)}
                    className="relative h-64 sm:h-72 overflow-hidden cursor-pointer group bg-[#171614]"
                  >
                    <img
                      src={HISTORICAL_IMAGES.pinelSalpetriere.src}
                      alt={HISTORICAL_IMAGES.pinelSalpetriere.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = HISTORICAL_IMAGES.pinelSalpetriere.fallbackSrc; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171614]/80 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs font-mono text-[#F2EBDD] bg-[#6E1F2A] px-2 py-0.5 rounded-xs font-semibold">
                        1795 · LA SALPÊTRIÈRE (WOMEN)
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-serif font-bold text-[#171614] text-base">
                      Pinel Freeing the Patients at La Salpêtrière
                    </h4>
                    <p className="text-xs text-[#5C5851] font-mono">
                      Tony Robert-Fleury (1876) · Library of the National Academy of Medicine
                    </p>
                    <p className="text-xs text-[#5C5851] leading-relaxed">
                      The iconic monument to humanist reform. Pinel orders the release of chained female patients, replacing medieval punishment with medical asylum and therapeutic dialogue.
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setActiveLightboxImage(HISTORICAL_IMAGES.pinelSalpetriere)}
                        className="px-3 py-1 bg-[#FAF6EE] border border-[#D1C7B4] hover:border-[#6E1F2A] text-[#171614] hover:text-[#6E1F2A] font-mono text-xs rounded-xs font-semibold"
                      >
                        Enlarge Artwork 🔍
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Supplementary Archive Evidence: The 1801 Treatise & Historical Portrait */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div 
                  onClick={() => setActiveLightboxImage(HISTORICAL_IMAGES.pinelTreatise)}
                  className="bg-[#FAF6EE] border border-[#D1C7B4] p-4 rounded-xs flex items-center gap-4 cursor-pointer hover:border-[#6E1F2A] transition-colors group"
                >
                  <img
                    src={HISTORICAL_IMAGES.pinelTreatise.src}
                    alt="1801 Treatise Frontispiece"
                    className="w-16 h-20 object-cover border border-[#D1C7B4] rounded-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1">
                    <span className="text-[#6E1F2A] font-mono font-bold block text-[11px] uppercase">
                      ORIGINAL TREATISE (PARIS, 1801)
                    </span>
                    <strong className="font-serif text-[#171614] text-sm block">
                      Traité médico-philosophique sur l'aliénation mentale
                    </strong>
                    <p className="text-[#5C5851] text-[11px]">
                      Click to examine the authentic 1801 first-edition title page establishing scientific psychiatric classification.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveLightboxImage(HISTORICAL_IMAGES.pinelPortrait)}
                  className="bg-[#FAF6EE] border border-[#D1C7B4] p-4 rounded-xs flex items-center gap-4 cursor-pointer hover:border-[#6E1F2A] transition-colors group"
                >
                  <img
                    src={HISTORICAL_IMAGES.pinelPortrait.src}
                    alt="Dr. Philippe Pinel Portrait"
                    className="w-16 h-20 object-cover border border-[#D1C7B4] rounded-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1">
                    <span className="text-[#6E1F2A] font-mono font-bold block text-[11px] uppercase">
                      ARCHIVAL PORTRAIT
                    </span>
                    <strong className="font-serif text-[#171614] text-sm block">
                      Dr. Philippe Pinel (1745–1826)
                    </strong>
                    <p className="text-[#5C5851] text-[11px]">
                      Member of the Institut de France and physician-in-chief whose clinical observation method transformed world medicine.
                    </p>
                  </div>
                </div>
              </div>
            </div>'''

html = html.replace(old_pinel_painting, new_pinel_painting)

# 7. Clean up remaining French text in UI and labels
html = html.replace('<span>Retour en haut ↑</span>', '<span>Back to top ↑</span>')
html = html.replace('>RAYONNEMENT<', '>RADIATION<')
html = html.replace('>SOIGNER (TRAITEMENT MORAL)<', '>TREAT (MORAL TREATMENT)<')
html = html.replace('<span>OBSERVER</span>', '<span>OBSERVE</span>')
html = html.replace('<span>CONSIGNER</span>', '<span>RECORD</span>')
html = html.replace('<span>CLASSIFIER</span>', '<span>CLASSIFY</span>')
html = html.replace('<span>COMPARER</span>', '<span>COMPARE</span>')
html = html.replace('tag: "TRAJECTOIRE"', 'tag: "TRAJECTORY"')
html = html.replace('location: "Varsovie (1867) → Paris (1891)"', 'location: "Warsaw (1867) → Paris (1891)"')
html = html.replace('VARSOVIE (1867) → PARIS (1891)', 'WARSAW (1867) → PARIS (1891)')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Successfully updated index.html')
