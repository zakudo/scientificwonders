import { StorySlide } from "../components/ui/animated-testimonials";

export interface ScientistProfile {
  id: string;
  name: string;
  subtitle: string;
  years: string;
  birthLocation: string;
  franceConnection: string;
  tagline: string;
  wikipediaUrl: string;
  heroImage: string;
  slides: StorySlide[];
}

export const PASTEUR_DATA: ScientistProfile = {
  id: "pasteur",
  name: "Louis Pasteur",
  subtitle: "Les microbes et les vaccins",
  years: "1822–1895",
  birthLocation: "Dole, France (1822)",
  franceConnection: "École Normale Supérieure, Paris; founded Institut Pasteur (1888).",
  tagline: "The Invisible World: Microorganisms, Fermentation & Vaccines",
  wikipediaUrl: "https://en.wikipedia.org/wiki/Louis_Pasteur",
  heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg/1024px-Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg",
  slides: [
    {
      title: "Why does French wine spoil?",
      subtitle: "The French agricultural crisis investigated",
      period: "1850s–1860s",
      location: "Dole & Paris, France",
      tag: "THE PROBLEM",
      description: "Wine was vital to France's economy and culture. French wine producers faced a practical crisis: wine spoiled unpredictably into vinegar. Commissioned to investigate, Pasteur placed fermented liquids under high-magnification microscopy rather than assuming spontaneous chemical decay.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg/1024px-Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg",
      historicalNote: "Pasteur proved that healthy fermentation is caused by living yeast cells, while souring is driven by unwanted bacterial microorganisms."
    },
    {
      title: "Heat without destroying the product",
      subtitle: "The invention of pasteurization",
      period: "1864",
      location: "Arbois / Paris",
      tag: "PASTEURIZATION",
      description: "Pasteur demonstrated that heating liquids to between 50°C and 60°C for a short time eliminated spoilage microbes without compromising flavor. Pasteurization reduces harmful microorganisms; it does not eliminate every microorganism, but revolutionized food safety globally.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Louis_Pasteur%2C_foto_crop.jpg/800px-Louis_Pasteur%2C_foto_crop.jpg",
      historicalNote: "First applied to wine and beer, then adapted internationally to dairy milk, drastically reducing childhood mortality."
    },
    {
      title: "What if disease had an invisible cause?",
      subtitle: "Germ theory & hospital sterilization",
      period: "1870s",
      location: "École Normale Supérieure, Paris",
      tag: "GERM THEORY",
      description: "Using his iconic swan-neck flask experiments, Pasteur definitively disproved the ancient belief in spontaneous generation. He established that microorganisms are external biological agents responsible for contagion, prompting a revolution in hospital hygiene, surgical antisepsis, and public health.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Louis_Pasteur_vaccinating_a_child_against_rabies._Wood_engra_Wellcome_V0010574.jpg/1024px-Louis_Pasteur_vaccinating_a_child_against_rabies._Wood_engra_Wellcome_V0010574.jpg",
      historicalNote: "Pasteur showed that diseases were caused by specific pathogens that could be identified, isolated, and destroyed."
    },
    {
      title: "6 July 1885: Joseph Meister",
      subtitle: "The landmark rabies post-exposure treatment",
      period: "1885",
      location: "Paris, France",
      tag: "VACCINATION",
      description: "Nine-year-old Joseph Meister, an Alsatian boy bitten 14 times by a rabid dog, faced certain death. Pasteur and Dr. Jacques-Joseph Grancher administered 13 progressive inoculations of attenuated desiccated rabbit spinal cord. The boy survived, proving that systematic laboratory immunization could defeat fatal human infections.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Joseph_Meister.jpg/800px-Joseph_Meister.jpg",
      historicalNote: "Edward Jenner had developed the smallpox vaccine in 1796; Pasteur transformed vaccination into a universal laboratory method."
    }
  ]
};

export const CURIE_DATA: ScientistProfile = {
  id: "curie",
  name: "Marie Curie",
  subtitle: "La radioactivité et la médecine",
  years: "1867–1934",
  birthLocation: "Warsaw, Poland (1867)",
  franceConnection: "Moved to Paris in 1891; studied at the Sorbonne; naturalised French; buried at the Panthéon.",
  tagline: "The Invisible Made Measurable: Radioactivity, Radium & Mobile Wartime Radiology",
  wikipediaUrl: "https://en.wikipedia.org/wiki/Marie_Curie",
  heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/800px-Marie_Curie_c._1920s.jpg",
  slides: [
    {
      title: "Warsaw → Paris",
      subtitle: "From Poland to the Sorbonne",
      period: "1891",
      location: "Warsaw (1867) → Paris (1891)",
      tag: "JOURNEY",
      description: "Born Maria Salomea Skłodowska in Warsaw, Poland, in 1867, she moved to Paris in 1891 to study physics and mathematics at the Sorbonne. She naturalised French, married French physicist Pierre Curie, and became one of the foremost leaders of French and world science.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/800px-Marie_Curie_c._1920s.jpg",
      historicalNote: "Marie Curie was born in Poland and became deeply connected to French academic life and national heritage."
    },
    {
      title: "What is Radioactivity?",
      subtitle: "Investigating pitchblende in a Parisian shed",
      period: "1898",
      location: "EPCI, Rue Lhomond, Paris",
      tag: "DISCOVERY",
      description: "Investigating mysterious rays emitted by uranium salts (first observed by Henri Becquerel), Marie and Pierre Curie discovered that radiation was an atomic property. Through grueling chemical fractionation of tons of pitchblende, they isolated two new radioactive elements: Polonium (named after Poland) and Radium.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Pierre_and_Marie_Curie.jpg/1024px-Pierre_and_Marie_Curie.jpg",
      historicalNote: "Marie coined the term 'radioactivity' to describe the spontaneous emission of ionizing subatomic radiation."
    },
    {
      title: "Two Historic Nobel Prizes",
      subtitle: "Physics (1903) & Chemistry (1911)",
      period: "1903 & 1911",
      location: "Stockholm / Paris",
      tag: "NOBEL",
      description: "In 1903, Marie Curie won the Nobel Prize in Physics alongside Pierre Curie and Henri Becquerel. In 1911, she received the Nobel Prize in Chemistry for the isolation of pure metallic radium. She remains the first woman to win a Nobel and the only person to win in two distinct scientific disciplines.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pierre_Curie_by_Dujardin_c1906.jpg/800px-Pierre_Curie_by_Dujardin_c1906.jpg",
      historicalNote: "Curie deliberately refused to patent the radium extraction method so that medical and scientific research could proceed freely."
    },
    {
      title: "The Little Curies on the Frontline",
      subtitle: "Mobile battlefield radiology during World War I",
      period: "1914–1918",
      location: "WWI French Frontlines",
      tag: "MEDICINE",
      description: "During WWI, Marie Curie realized battlefield surgeons were operating blindly. She equipped 20 mobile radiological vehicles ('Petites Curies') and 200 field stations, personally driving to the front to locate shrapnel and bone fractures in over one million wounded Allied soldiers.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Marie_Curie_in_a_mobile_x-ray_vehicle_during_WWI.jpg/1024px-Marie_Curie_in_a_mobile_x-ray_vehicle_during_WWI.jpg",
      historicalNote: "Directly connected fundamental radiation physics to diagnostic medical imaging and curietherapy (cancer radiation treatment)."
    }
  ]
};

export const PINEL_DATA: ScientistProfile = {
  id: "pinel",
  name: "Philippe Pinel",
  subtitle: "La naissance de la psychiatrie moderne",
  years: "1745–1826",
  birthLocation: "Jonquières, France (1745)",
  franceConnection: "Chief physician at Bicêtre (1793) and Hospice de la Salpêtrière (1795), Paris.",
  tagline: "A Different Way to See the Mind: From Punitive Chains to Humane Clinical Psychiatry",
  wikipediaUrl: "https://en.wikipedia.org/wiki/Philippe_Pinel",
  heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pinel_delivrant_les_alienes.jpg/1280px-Pinel_delivrant_les_alienes.jpg",
  slides: [
    {
      title: "Before Care, There Was Confinement",
      subtitle: "The brutal asylum conditions of the Ancien Régime",
      period: "18th Century",
      location: "Bicêtre & La Salpêtrière, Paris",
      tag: "THE PROBLEM",
      description: "Historical accounts describe 18th-century French asylums as places of severe confinement. People with mental illness were chained in dark dungeons, subjected to harsh corporal punishments, and exhibited as paid public spectacles, viewed through the lens of moral failure or demonic affliction.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Philippe_Pinel.jpg/800px-Philippe_Pinel.jpg",
      historicalNote: "Dr. Philippe Pinel was appointed to Bicêtre in 1793 and the Salpêtrière in 1795, initiating a medical paradigm shift."
    },
    {
      title: "1793: The Unchaining & Moral Treatment",
      subtitle: "Pinel at the Salpêtrière (Tony Robert-Fleury 1876)",
      period: "1793–1795",
      location: "Paris, France",
      tag: "THE REFORM",
      description: "Pinel advocated the physical unchaining of patients and introduced 'traitement moral' (moral treatment): structured daily routines, compassionate dialogue, fresh air, and humane dignity. Superintendent Jean-Baptiste Pussin had begun unchaining patients at Bicêtre in 1797; Pinel gave the reform theoretical and medical authority.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pinel_delivrant_les_alienes.jpg/1280px-Pinel_delivrant_les_alienes.jpg",
      historicalNote: "Tony Robert-Fleury's 1876 painting is a later historical representation celebrating Pinel's reform narrative."
    },
    {
      title: "He Changed the Question",
      subtitle: "Clinical observation, nosography & medical psychiatry",
      period: "1801",
      location: "Hospice de la Salpêtrière, Paris",
      tag: "NOSOGRAPHY",
      description: "Pinel systematically recorded and categorized mental disorders (melancholy, mania, dementia, idiotism) in his 'Traité médico-philosophique sur l'aliénation mentale'. He shifted the fundamental question from 'What is wrong with this person?' to 'What medical condition is this, and how can it be treated?'",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pinel_delivrant_les_alienes.jpg/1280px-Pinel_delivrant_les_alienes.jpg",
      historicalNote: "Pinel did not single-handedly create modern psychiatry, but established clinical observation as its medical cornerstone."
    }
  ]
};
