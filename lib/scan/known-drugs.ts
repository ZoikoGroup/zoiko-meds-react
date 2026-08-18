import { bestSimilarity, containsName } from "./text-normalize";

export interface KnownDrug {
  name: string;
  generic: string;
  defaultStrength: string;
  aliases: string[];
}

export const KNOWN_DRUGS: KnownDrug[] = [
  { name: "Calpol", generic: "Paracetamol", defaultStrength: "250mg/5ml Syrup", aliases: ["calpol", "syp calpol", "calpol syrup", "calpol 250", "calpol 650", "calpol 500"] },
  { name: "Delcon", generic: "Phenylephrine / Chlorpheniramine", defaultStrength: "Syrup", aliases: ["delcon", "syp delcon", "delcon syrup", "delcon 5ml"] },
  { name: "Levolin", generic: "Levosalbutamol", defaultStrength: "Syrup", aliases: ["levolin", "syp levolin", "levolin syrup", "levolin 2ml"] },
  { name: "Meftal-P", generic: "Mefenamic Acid / Paracetamol", defaultStrength: "100mg/5ml Suspension", aliases: ["meftal-p", "meftal p", "meftal", "syp meftal-p", "syp meftal"] },
  { name: "Dolo 650", generic: "Paracetamol", defaultStrength: "650mg", aliases: ["dolo", "dolo 650", "dolo650", "dolo 500"] },
  { name: "Crocin", generic: "Paracetamol", defaultStrength: "500mg", aliases: ["crocin", "crocin 500", "crocin advance", "crocin 650"] },
  { name: "Augmentin 625", generic: "Amoxicillin / Clavulanate", defaultStrength: "625mg", aliases: ["augmentin", "augmentin 625", "augmentin duo", "augmentin 375"] },
  { name: "Clavam 625", generic: "Amoxicillin / Clavulanate", defaultStrength: "625mg", aliases: ["clavam", "clavam 625", "clavam forte"] },
  { name: "Combiflam", generic: "Ibuprofen / Paracetamol", defaultStrength: "400mg / 325mg", aliases: ["combiflam"] },
  { name: "Azithromycin", generic: "Azithromycin", defaultStrength: "500mg", aliases: ["azithromycin", "azithral", "aziwok", "azithral 500", "zithromax"] },
  { name: "Pantoprazole", generic: "Pantoprazole", defaultStrength: "40mg", aliases: ["pantoprazole", "panto", "pantocid", "pantodac", "pan 40", "pan-40", "protonix"] },
  { name: "Pan-D", generic: "Pantoprazole / Domperidone", defaultStrength: "40mg / 30mg", aliases: ["pan-d", "pan d", "pantocid-d", "pantodac d"] },
  { name: "Cetirizine", generic: "Cetirizine", defaultStrength: "10mg", aliases: ["cetirizine", "cetzine", "okacet", "alerid", "zyrtec"] },
  { name: "Montair-LC", generic: "Montelukast / Levocetirizine", defaultStrength: "10mg / 5mg", aliases: ["montair-lc", "montair lc", "montair", "montek-lc"] },
  { name: "Asthalin", generic: "Salbutamol", defaultStrength: "100mcg", aliases: ["asthalin", "asthalin syrup", "asthalin inhaler"] },
  { name: "Ascoril", generic: "Terbutaline / Bromhexine / Guaiphenesin", defaultStrength: "Syrup", aliases: ["ascoril", "ascoril-d", "ascoril ls"] },
  { name: "Alex Syrup", generic: "Dextromethorphan / Chlorpheniramine / Phenylephrine", defaultStrength: "Syrup", aliases: ["alex", "alex syrup"] },
  { name: "Cheston Cold", generic: "Paracetamol / Phenylephrine / Cetirizine", defaultStrength: "Tablet / Syrup", aliases: ["cheston cold", "cheston"] },
  { name: "Zerodol-SP", generic: "Aceclofenac / Paracetamol / Serratiopeptidase", defaultStrength: "100mg / 325mg / 15mg", aliases: ["zerodol-sp", "zerodol sp", "zerodol-p", "zerodol"] },
  { name: "Taxim-O", generic: "Cefixime", defaultStrength: "200mg", aliases: ["taxim-o", "taxim o", "cefixime"] },
  { name: "Sumo", generic: "Nimesulide / Paracetamol", defaultStrength: "100mg / 325mg", aliases: ["sumo"] },
  { name: "Flexon", generic: "Ibuprofen / Paracetamol", defaultStrength: "400mg / 325mg", aliases: ["flexon", "flexon mr"] },
  { name: "Sinarest", generic: "Paracetamol / Chlorpheniramine / Phenylephrine", defaultStrength: "Tablet / Syrup", aliases: ["sinarest"] },
  { name: "Allegra", generic: "Fexofenadine", defaultStrength: "120mg", aliases: ["allegra", "allegra 120", "allegra 180"] },
  { name: "Amoxicillin", generic: "Amoxicillin", defaultStrength: "500mg", aliases: ["amoxicillin", "mox", "novamox", "amoxil", "trimox"] },
  { name: "Ibuprofen", generic: "Ibuprofen", defaultStrength: "400mg", aliases: ["ibuprofen", "brufen", "advil", "motrin"] },
  { name: "Paracetamol", generic: "Paracetamol", defaultStrength: "500mg", aliases: ["paracetamol", "acetaminophen", "pcm", "paracetamol 650mg"] },
  { name: "Metformin", generic: "Metformin", defaultStrength: "500mg", aliases: ["metformin", "glycomet", "glucophage"] },
  { name: "Amlodipine", generic: "Amlodipine", defaultStrength: "5mg", aliases: ["amlodipine", "amlong", "stamlo", "norvasc"] },
  { name: "Naproxen", generic: "Naproxen Sodium", defaultStrength: "500mg", aliases: ["naproxen", "naproxen sodium", "aleve", "naprosyn"] },
  { name: "Omeprazole", generic: "Omeprazole", defaultStrength: "20mg", aliases: ["omeprazole", "ocid", "prilosec", "losec"] },
  { name: "Atorvastatin", generic: "Atorvastatin", defaultStrength: "10mg", aliases: ["atorvastatin", "atorva", "lipitor"] },
  { name: "Doxycycline", generic: "Doxycycline", defaultStrength: "100mg", aliases: ["doxycycline", "doxy"] },
  { name: "Telmisartan", generic: "Telmisartan", defaultStrength: "40mg", aliases: ["telmisartan", "telma", "telmi", "telma 40"] },
  { name: "Gabapentin", generic: "Gabapentin", defaultStrength: "300mg", aliases: ["gabapentin", "gaba", "neurontin"] },
  { name: "Pregabalin", generic: "Pregabalin", defaultStrength: "75mg", aliases: ["pregabalin", "pregab", "lyrica"] },
  { name: "Ciprofloxacin", generic: "Ciprofloxacin", defaultStrength: "500mg", aliases: ["ciprofloxacin", "cipro"] },
  { name: "Losartan", generic: "Losartan", defaultStrength: "50mg", aliases: ["losartan", "cozaar"] },
  { name: "Rosuvastatin", generic: "Rosuvastatin", defaultStrength: "10mg", aliases: ["rosuvastatin", "rosuva", "crestor"] },
  { name: "Aspirin", generic: "Aspirin", defaultStrength: "75mg", aliases: ["aspirin", "ecospirin", "disprin"] },
  { name: "Salbutamol", generic: "Salbutamol", defaultStrength: "100mcg", aliases: ["salbutamol", "ventolin"] },
  { name: "Levothyroxine", generic: "Levothyroxine", defaultStrength: "50mcg", aliases: ["levothyroxine", "thyronorm", "synthroid"] },
];

const OFFLINE_MATCH_FLOOR = 0.8;

export function matchOfflineDictionary(candidateName: string): { drug: KnownDrug; similarity: number } | null {
  const name = (candidateName ?? "").trim();
  if (name.length < 3) return null;

  let best: { drug: KnownDrug; similarity: number } | null = null;
  for (const drug of KNOWN_DRUGS) {
    const references = [drug.name, drug.generic, ...drug.aliases];

    if (references.some((reference) => containsName(name, reference))) {
      return { drug, similarity: 1 };
    }

    const { score } = bestSimilarity(name, references);
    if (score >= OFFLINE_MATCH_FLOOR && (!best || score > best.similarity)) {
      best = { drug, similarity: score };
    }
  }
  return best;
}
