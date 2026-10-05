/**
 * ROYAL BEST PHARMACEUTICALS PVT. LTD.
 * Comprehensive B2B Product Database & Chemical Structures
 * Vapi, Gujarat, India
 */

const FEATURED_PRODUCTS = [
  // ==========================================
  // 1. ACTIVE PHARMACEUTICAL INGREDIENTS (APIs)
  // ==========================================
  {
    id: "prod-paracetamol",
    name: "Paracetamol (Acetaminophen)",
    cas: "103-90-2",
    category: "apis",
    categoryLabel: "Active API",
    therapeutic: "Analgesic / Antipyretic",
    grade: "USP / BP / EP / IP",
    purity: "≥ 99.8%",
    standardPack: "25 Kg Drum",
    description: "High-purity active ingredient for analgesic and antipyretic formulations with low p-aminophenol impurity profile.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <polygon points="70,35 90,46 90,70 70,81 50,70 50,46" fill="none" stroke="#263746" stroke-width="1.8"/>
        <line x1="68" y1="42" x2="84" y2="51" stroke="#263746" stroke-width="1.2"/>
        <line x1="84" y1="67" x2="68" y2="76" stroke="#263746" stroke-width="1.2"/>
        <line x1="54" y1="67" x2="54" y2="49" stroke="#263746" stroke-width="1.2"/>
        <line x1="70" y1="35" x2="70" y2="18" stroke="#263746" stroke-width="1.8"/>
        <text x="63" y="14" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="#0B2942">OH</text>
        <line x1="70" y1="81" x2="70" y2="94" stroke="#263746" stroke-width="1.8"/>
        <text x="73" y="103" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">NH</text>
        <line x1="90" y1="99" x2="105" y2="91" stroke="#263746" stroke-width="1.8"/>
        <line x1="105" y1="91" x2="120" y2="99" stroke="#263746" stroke-width="1.8"/>
        <line x1="103" y1="91" x2="103" y2="76" stroke="#263746" stroke-width="1.8"/>
        <line x1="107" y1="91" x2="107" y2="76" stroke="#263746" stroke-width="1.8"/>
        <text x="100" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">O</text>
      </svg>
    `
  },
  {
    id: "prod-metformin",
    name: "Metformin Hydrochloride",
    cas: "1115-70-4",
    category: "apis",
    categoryLabel: "Active API",
    therapeutic: "Antidiabetic (Biguanide)",
    grade: "USP / BP / EP / IP",
    purity: "≥ 99.5%",
    standardPack: "25 Kg HDPE Drum",
    description: "First-line oral antihyperglycemic active ingredient for type 2 diabetes management with certified low nitrosamine levels.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <text x="16" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">H3C</text>
        <line x1="38" y1="46" x2="52" y2="55" stroke="#263746" stroke-width="1.8"/>
        <text x="16" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">H3C</text>
        <line x1="38" y1="67" x2="52" y2="58" stroke="#263746" stroke-width="1.8"/>
        <text x="54" y="59" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#0B2942">N</text>
        <line x1="64" y1="55" x2="80" y2="55" stroke="#263746" stroke-width="1.8"/>
        <text x="74" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">NH</text>
        <line x1="78" y1="36" x2="78" y2="53" stroke="#263746" stroke-width="1.8"/>
        <line x1="82" y1="36" x2="82" y2="53" stroke="#263746" stroke-width="1.8"/>
        <line x1="82" y1="55" x2="98" y2="55" stroke="#263746" stroke-width="1.8"/>
        <text x="99" y="59" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">NH</text>
        <line x1="118" y1="55" x2="130" y2="55" stroke="#263746" stroke-width="1.8"/>
        <text x="132" y="59" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">NH2</text>
        <text x="105" y="90" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#B58A43">• HCl</text>
      </svg>
    `
  },
  {
    id: "prod-amoxicillin",
    name: "Amoxicillin Trihydrate",
    cas: "61336-70-7",
    category: "apis",
    categoryLabel: "Active API",
    therapeutic: "Broad-Spectrum Antibiotic",
    grade: "USP / BP / IP",
    purity: "≥ 98.5%",
    standardPack: "25 Kg Poly Drum",
    description: "Broad-spectrum semi-synthetic aminopenicillin antibiotic active substance for oral capsules, tablets, and dry syrups.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="75" y="45" width="22" height="22" fill="none" stroke="#263746" stroke-width="1.8"/>
        <line x1="75" y1="55" x2="62" y2="40" stroke="#263746" stroke-width="1.8"/>
        <polygon points="97,45 118,52 118,68 97,67" fill="none" stroke="#263746" stroke-width="1.8"/>
        <text x="105" y="63" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#0B2942">S</text>
        <text x="80" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#0B2942">=O</text>
        <line x1="62" y1="40" x2="45" y2="40" stroke="#263746" stroke-width="1.8"/>
        <polygon points="45,40 33,26 20,26 15,40 25,54 38,54" fill="none" stroke="#263746" stroke-width="1.6"/>
        <text x="5" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#0B2942">HO</text>
        <text x="52" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#0B2942">NH2</text>
      </svg>
    `
  },
  {
    id: "prod-ciprofloxacin",
    name: "Ciprofloxacin Hydrochloride",
    cas: "86393-32-0",
    category: "apis",
    categoryLabel: "Active API",
    therapeutic: "Fluoroquinolone Antibacterial",
    grade: "USP / EP / IP",
    purity: "≥ 99.0%",
    standardPack: "25 Kg Fibre Drum",
    description: "High-potency second-generation fluoroquinolone broad-spectrum active substance for systemic and ophthalmic formulations.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,40 70,40 80,57 70,75 50,75 40,57" fill="none" stroke="#263746" stroke-width="1.8"/>
        <polygon points="80,57 100,57 110,75 100,92 80,92 70,75" fill="none" stroke="#263746" stroke-width="1.8"/>
        <text x="77" y="87" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#0B2942">N</text>
        <polygon points="80,95 72,106 88,106" fill="none" stroke="#263746" stroke-width="1.6"/>
        <text x="30" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">F</text>
        <line x1="40" y1="40" x2="33" y2="40" stroke="#263746" stroke-width="1.8"/>
        <text x="112" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#0B2942">COOH</text>
        <polygon points="40,57 28,50 16,57 16,73 28,80 40,73" fill="none" stroke="#263746" stroke-width="1.6"/>
        <text x="8" y="69" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#0B2942">HN</text>
      </svg>
    `
  },
  {
    id: "prod-azithromycin",
    name: "Azithromycin Dihydrate",
    cas: "117772-70-0",
    category: "apis",
    categoryLabel: "Active API",
    therapeutic: "Macrolide Antibiotic",
    grade: "USP / EP / IP",
    purity: "≥ 98.0%",
    standardPack: "25 Kg Fibre Drum",
    description: "Second-generation semi-synthetic azalide subclass of macrolides for respiratory and dermatological bacterial infections.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="55" rx="42" ry="28" fill="none" stroke="#263746" stroke-width="1.8"/>
        <text x="68" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#0B2942">15-Ring</text>
        <text x="115" y="35" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#B58A43">Desosamine</text>
      </svg>
    `
  },
  {
    id: "prod-omeprazole",
    name: "Omeprazole / Pantoprazole",
    cas: "73590-58-6",
    category: "apis",
    categoryLabel: "Active API",
    therapeutic: "Proton Pump Inhibitor (PPI)",
    grade: "USP / BP / IP",
    purity: "≥ 99.2%",
    standardPack: "20 Kg Cold Pack Drum",
    description: "Selective proton pump inhibitor for gastric acid reduction, GERD, and peptic ulcer disease formulations.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <polygon points="35,45 50,35 65,45 65,65 50,75 35,65" fill="none" stroke="#263746" stroke-width="1.8"/>
        <polygon points="65,45 80,55 65,65" fill="none" stroke="#263746" stroke-width="1.8"/>
        <text x="68" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#0B2942">N</text>
        <line x1="80" y1="55" x2="100" y2="55" stroke="#263746" stroke-width="1.8"/>
        <text x="86" y="48" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#0B2942">SO</text>
        <polygon points="100,55 115,40 135,40 145,55 135,70 115,70" fill="none" stroke="#263746" stroke-width="1.8"/>
      </svg>
    `
  },

  // ==========================================
  // 2. PHARMACEUTICAL INTERMEDIATES & KSMs
  // ==========================================
  {
    id: "prod-7aca",
    name: "7-ACA (Cephalosporanic Precursor)",
    cas: "957-68-6",
    category: "intermediates",
    categoryLabel: "Key Intermediate",
    therapeutic: "Cephalosporin Precursor",
    grade: "Synthesis Grade (≥99%)",
    purity: "≥ 99.0%",
    standardPack: "25 Kg Fibre Drum",
    description: "Fundamental crystalline key starting material for semi-synthetic cephalosporin synthesis (Ceftriaxone, Cefotaxime, Cefuroxime).",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="45" width="24" height="24" fill="none" stroke="#263746" stroke-width="1.8"/>
        <polygon points="84,45 106,53 106,71 84,69" fill="none" stroke="#263746" stroke-width="1.8"/>
        <text x="92" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#0B2942">S</text>
        <text x="35" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">H2N</text>
        <line x1="58" y1="52" x2="48" y2="52" stroke="#263746" stroke-width="1.8"/>
        <text x="110" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#0B2942">OAc</text>
      </svg>
    `
  },
  {
    id: "prod-7adca",
    name: "7-ADCA (Oral Precursor)",
    cas: "22252-43-3",
    category: "intermediates",
    categoryLabel: "Key Intermediate",
    therapeutic: "Oral Cephalosporins Intermediate",
    grade: "Synthesis Grade",
    purity: "≥ 98.5%",
    standardPack: "25 Kg Fibre Drum",
    description: "Essential starting building block for synthesis of oral cephalosporin APIs such as Cephalexin and Cefadroxil.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="58" y="45" width="24" height="24" fill="none" stroke="#263746" stroke-width="1.8"/>
        <polygon points="82,45 104,53 104,71 82,69" fill="none" stroke="#263746" stroke-width="1.8"/>
        <text x="90" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#0B2942">S</text>
        <text x="30" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">H2N</text>
        <text x="110" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#0B2942">CH3</text>
      </svg>
    `
  },
  {
    id: "prod-pap",
    name: "Para-Aminophenol (PAP)",
    cas: "123-30-8",
    category: "intermediates",
    categoryLabel: "Pharma Intermediate",
    therapeutic: "Paracetamol Key Intermediate",
    grade: "Pharma Grade (≥99.5%)",
    purity: "≥ 99.5%",
    standardPack: "25 Kg Paper Bag",
    description: "Premium refined organic compound critical for the synthesis of Acetaminophen with extremely low iron and residual volatiles.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <polygon points="80,30 98,42 98,68 80,80 62,68 62,42" fill="none" stroke="#263746" stroke-width="1.8"/>
        <line x1="80" y1="30" x2="80" y2="15" stroke="#263746" stroke-width="1.8"/>
        <text x="73" y="12" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">OH</text>
        <line x1="80" y1="80" x2="80" y2="95" stroke="#263746" stroke-width="1.8"/>
        <text x="70" y="105" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#0B2942">NH2</text>
      </svg>
    `
  },

  // ==========================================
  // 3. STERILE COMPOUNDS & INJECTABLES
  // ==========================================
  {
    id: "prod-ceftriaxone",
    name: "Ceftriaxone Sodium Sterile (USP/BP)",
    cas: "104376-79-6",
    category: "sterile",
    categoryLabel: "Sterile Compound",
    therapeutic: "Injectable 3rd Gen Cephalosporin",
    grade: "Parenteral Sterile (USP)",
    purity: "≥ 99.0%",
    standardPack: "10 Kg Sterile Canister",
    description: "Aseptic parenteral grade sterile bulk active ingredient with ultra-low bacterial endotoxin (BET < 0.05 EU/mg) for lyophilized vials.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <polygon points="35,42 48,34 58,45 48,58 35,50" fill="none" stroke="#263746" stroke-width="1.6"/>
        <text x="44" y="47" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#0B2942">N</text>
        <rect x="68" y="42" width="22" height="22" fill="none" stroke="#263746" stroke-width="1.8"/>
        <polygon points="90,42 110,50 110,66 90,64" fill="none" stroke="#263746" stroke-width="1.8"/>
        <text x="96" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#0B2942">S</text>
        <line x1="110" y1="58" x2="124" y2="58" stroke="#263746" stroke-width="1.6"/>
        <polygon points="124,50 138,50 144,58 138,68 124,68" fill="none" stroke="#263746" stroke-width="1.6"/>
        <text x="127" y="62" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="700" fill="#B58A43">Triazine</text>
      </svg>
    `
  },
  {
    id: "prod-meropenem",
    name: "Meropenem with Sodium Carbonate",
    cas: "119478-56-7",
    category: "sterile",
    categoryLabel: "Sterile Compound",
    therapeutic: "Carbapenem Antibiotic",
    grade: "Parenteral Sterile (USP)",
    purity: "≥ 99.2%",
    standardPack: "5 Kg Sterile Canister",
    description: "Sterile blended carbapenem antibiotic for intravenous formulation with certified particulate matter control and low bioburden.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="42" width="22" height="22" fill="none" stroke="#263746" stroke-width="1.8"/>
        <polygon points="72,42 90,48 94,64 72,64" fill="none" stroke="#263746" stroke-width="1.8"/>
        <text x="76" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#0B2942">N</text>
        <line x1="94" y1="56" x2="108" y2="56" stroke="#263746" stroke-width="1.6"/>
        <polygon points="108,46 122,40 134,50 128,66 112,64" fill="none" stroke="#263746" stroke-width="1.6"/>
        <text x="114" y="56" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="700" fill="#B58A43">Pyrrolidine</text>
      </svg>
    `
  },

  // ==========================================
  // 4. CULTURE MEDIA & PREPARED PLATES
  // ==========================================
  {
    id: "prod-scda",
    name: "SCDA / TSA Ready-to-Use 90mm Plates",
    cas: "Media Grade",
    category: "culture-media",
    categoryLabel: "Prepared Media Plate",
    therapeutic: "Aerobic Count (TAMC)",
    grade: "Gamma Irradiated Sterile",
    purity: "Certified Sterile",
    standardPack: "Pack of 10 Plates",
    description: "Gamma irradiated ready-to-use agar plates for pharmaceutical cleanroom environmental monitoring and sterility testing.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="55" rx="46" ry="26" fill="rgba(210,166,96,0.1)" stroke="#263746" stroke-width="1.8"/>
        <ellipse cx="80" cy="53" rx="38" ry="18" fill="rgba(56,189,248,0.18)" stroke="#38BDF8" stroke-width="1.4"/>
        <circle cx="80" cy="53" r="6" fill="#38BDF8" opacity="0.6"/>
        <text x="56" y="57" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#071B2C">90mm Agar Plate</text>
      </svg>
    `
  },
  {
    id: "prod-sda-neutralizers",
    name: "SDA with Neutralizers (55mm)",
    cas: "Media Grade",
    category: "culture-media",
    categoryLabel: "Contact Media Plate",
    therapeutic: "Yeast & Mold Surface Test",
    grade: "RODAC Triple Wrapped",
    purity: "Certified Sterile",
    standardPack: "Pack of 10 Plates",
    description: "55mm convex meniscus contact plates with Lecithin and Polysorbate 80 neutralizers for disinfectant efficacy testing.",
    structureSvg: `
      <svg viewBox="0 0 160 110" class="chem-structure-svg" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="55" rx="38" ry="22" fill="rgba(210,166,96,0.12)" stroke="#263746" stroke-width="1.8"/>
        <ellipse cx="80" cy="53" rx="30" ry="15" fill="rgba(168,85,247,0.16)" stroke="#A855F7" stroke-width="1.4"/>
        <text x="58" y="56" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#071B2C">55mm RODAC</text>
      </svg>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FEATURED_PRODUCTS };
}
