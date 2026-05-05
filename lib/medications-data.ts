export type Concern = 
  // Sexual & Reproductive
  | "libido"
  | "orgasmFunction"
  | "erectileFunction"
  // Autonomic & Cardiovascular
  | "autonomicStability"
  | "heartRateStability"
  | "bloodPressureNeutrality"
  | "lowSweating"
  // Metabolic & Physical
  | "weightNeutrality"
  | "appetiteStability"
  // Sleep & Energy
  | "sleepQuality"
  | "lowSedation"
  | "lowInsomnia"
  | "energyStability"
  // Cognitive
  | "mentalClarity"
  | "emotionalRange"
  | "motivationPreservation"
  // GI & Comfort
  | "lowNausea"
  | "giStability"
  | "lowDryMouth"
  // Practical / Lifestyle
  | "easyToStop"
  | "forgivingIfMissed"
  | "lowDrugInteractions"
  | "alcoholCompatibility"
  | "genericAvailability"
  // Psychiatric
  | "anxietyReduction"
  | "panicPrevention"
  | "lowStartupAgitation"

export interface ConcernInfo {
  id: Concern
  label: string
  description: string
  category: string
}

export const concerns: ConcernInfo[] = [
  // Sexual & Reproductive
  { id: "libido", label: "Libido Preservation", description: "Maintain sexual desire and drive", category: "Sexual & Reproductive" },
  { id: "orgasmFunction", label: "Orgasm Function", description: "Minimize difficulty reaching orgasm", category: "Sexual & Reproductive" },
  { id: "erectileFunction", label: "Arousal Function", description: "Maintain physical arousal response", category: "Sexual & Reproductive" },
  // Autonomic & Cardiovascular
  { id: "autonomicStability", label: "Autonomic Stability", description: "Minimize effects on nervous system regulation", category: "Autonomic & Cardiovascular" },
  { id: "heartRateStability", label: "Heart Rate Stability", description: "Avoid elevated or irregular heart rate", category: "Autonomic & Cardiovascular" },
  { id: "bloodPressureNeutrality", label: "Blood Pressure Neutrality", description: "No increase in blood pressure", category: "Autonomic & Cardiovascular" },
  { id: "lowSweating", label: "Low Sweating", description: "Minimize excessive perspiration", category: "Autonomic & Cardiovascular" },
  // Metabolic & Physical
  { id: "weightNeutrality", label: "Weight Neutrality", description: "Minimize weight gain or loss", category: "Metabolic & Physical" },
  { id: "appetiteStability", label: "Appetite Stability", description: "No major changes in hunger or cravings", category: "Metabolic & Physical" },
  // Sleep & Energy
  { id: "sleepQuality", label: "Sleep Quality", description: "Maintain restful, uninterrupted sleep", category: "Sleep & Energy" },
  { id: "lowSedation", label: "Low Sedation", description: "Stay alert during the day", category: "Sleep & Energy" },
  { id: "lowInsomnia", label: "Low Insomnia Risk", description: "Avoid difficulty falling or staying asleep", category: "Sleep & Energy" },
  { id: "energyStability", label: "Energy Stability", description: "No wired or crashed feeling", category: "Sleep & Energy" },
  // Cognitive
  { id: "mentalClarity", label: "Mental Clarity", description: "Minimize brain fog and cognitive dulling", category: "Cognitive" },
  { id: "emotionalRange", label: "Emotional Range", description: "Avoid feeling flat or emotionally blunted", category: "Cognitive" },
  { id: "motivationPreservation", label: "Motivation Preservation", description: "Maintain drive and initiative", category: "Cognitive" },
  // GI & Comfort
  { id: "lowNausea", label: "Low Nausea", description: "Minimize stomach upset", category: "GI & Comfort" },
  { id: "giStability", label: "GI Stability", description: "Avoid diarrhea or constipation", category: "GI & Comfort" },
  { id: "lowDryMouth", label: "Low Dry Mouth", description: "Minimize oral dryness", category: "GI & Comfort" },
  // Practical / Lifestyle
  { id: "easyToStop", label: "Easy to Discontinue", description: "Low withdrawal or discontinuation symptoms", category: "Practical & Lifestyle" },
  { id: "forgivingIfMissed", label: "Forgiving if Missed", description: "Long half-life means less impact from missed doses", category: "Practical & Lifestyle" },
  { id: "lowDrugInteractions", label: "Low Drug Interactions", description: "Fewer conflicts with other medications", category: "Practical & Lifestyle" },
  { id: "alcoholCompatibility", label: "Alcohol Compatibility", description: "Lower risk when combined with occasional alcohol", category: "Practical & Lifestyle" },
  { id: "genericAvailability", label: "Generic Available", description: "Available as affordable generic", category: "Practical & Lifestyle" },
  // Psychiatric
  { id: "anxietyReduction", label: "Anxiety Reduction", description: "Effective for generalized anxiety", category: "Psychiatric" },
  { id: "panicPrevention", label: "Panic Prevention", description: "Effective for panic attacks", category: "Psychiatric" },
  { id: "lowStartupAgitation", label: "Low Startup Agitation", description: "Minimal worsening of anxiety when starting", category: "Psychiatric" },
]

export interface Medication {
  id: string
  name: string
  genericName: string
  brand: string
  class: "SSRI" | "SNRI"
  halfLife: string
  halfLifeHours: number
  primaryReceptorAction: string
  scores: Record<Concern, number>
  sideEffects: string[]
  clinicalNotes: string
}


export const medications: Medication[] = [
  {
    id: "sertraline",
    name: "Sertraline",
    genericName: "sertraline",
    brand: "Zoloft",
    class: "SSRI",
    halfLife: "26 hours",
    halfLifeHours: 26,
    primaryReceptorAction: "SERT inhibition, mild DAT inhibition",
    scores: {
      libido: 40, orgasmFunction: 40, erectileFunction: 45,
      autonomicStability: 75, heartRateStability: 80, bloodPressureNeutrality: 80, lowSweating: 60,
      weightNeutrality: 70, appetiteStability: 65,
      sleepQuality: 60, lowSedation: 70, lowInsomnia: 55, energyStability: 70,
      mentalClarity: 70, emotionalRange: 60, motivationPreservation: 65,
      lowNausea: 50, giStability: 45, lowDryMouth: 70,
      easyToStop: 65, forgivingIfMissed: 55, lowDrugInteractions: 70, alcoholCompatibility: 55, genericAvailability: 95,
      anxietyReduction: 75, panicPrevention: 75, lowStartupAgitation: 55,
    },
    sideEffects: ["Nausea", "Diarrhea", "Sexual dysfunction", "Insomnia", "Drowsiness"],
    clinicalNotes: "Well-tolerated SSRI with minimal noradrenergic activity. Generally considered weight-neutral. Good choice for patients sensitive to autonomic side effects. Mild dopamine reuptake inhibition may help with motivation.",
  },
  {
    id: "escitalopram",
    name: "Escitalopram",
    genericName: "escitalopram",
    brand: "Lexapro",
    class: "SSRI",
    halfLife: "27-32 hours",
    halfLifeHours: 30,
    primaryReceptorAction: "Highly selective SERT inhibition",
    scores: {
      libido: 45, orgasmFunction: 45, erectileFunction: 50,
      autonomicStability: 85, heartRateStability: 85, bloodPressureNeutrality: 85, lowSweating: 70,
      weightNeutrality: 75, appetiteStability: 75,
      sleepQuality: 65, lowSedation: 75, lowInsomnia: 60, energyStability: 75,
      mentalClarity: 75, emotionalRange: 55, motivationPreservation: 60,
      lowNausea: 65, giStability: 70, lowDryMouth: 60,
      easyToStop: 60, forgivingIfMissed: 60, lowDrugInteractions: 80, alcoholCompatibility: 55, genericAvailability: 90,
      anxietyReduction: 85, panicPrevention: 80, lowStartupAgitation: 65,
    },
    sideEffects: ["Nausea", "Sexual dysfunction", "Insomnia", "Fatigue", "Dry mouth"],
    clinicalNotes: "Most selective SSRI available. Excellent autonomic profile with minimal off-target effects. QTc prolongation at higher doses should be monitored. Clean pharmacology makes it predictable.",
  },
  {
    id: "fluoxetine",
    name: "Fluoxetine",
    genericName: "fluoxetine",
    brand: "Prozac",
    class: "SSRI",
    halfLife: "1-6 days",
    halfLifeHours: 96,
    primaryReceptorAction: "SERT inhibition, 5-HT2C antagonism",
    scores: {
      libido: 35, orgasmFunction: 35, erectileFunction: 40,
      autonomicStability: 70, heartRateStability: 75, bloodPressureNeutrality: 75, lowSweating: 60,
      weightNeutrality: 60, appetiteStability: 55,
      sleepQuality: 50, lowSedation: 75, lowInsomnia: 40, energyStability: 55,
      mentalClarity: 65, emotionalRange: 50, motivationPreservation: 70,
      lowNausea: 55, giStability: 60, lowDryMouth: 65,
      easyToStop: 90, forgivingIfMissed: 95, lowDrugInteractions: 40, alcoholCompatibility: 50, genericAvailability: 95,
      anxietyReduction: 65, panicPrevention: 70, lowStartupAgitation: 35,
    },
    sideEffects: ["Insomnia", "Anxiety", "Nausea", "Sexual dysfunction", "Weight changes"],
    clinicalNotes: "Long half-life virtually eliminates withdrawal symptoms and makes missed doses inconsequential. Activating profile may worsen anxiety initially. Significant CYP2D6 inhibition creates drug interaction concerns.",
  },
  {
    id: "paroxetine",
    name: "Paroxetine",
    genericName: "paroxetine",
    brand: "Paxil",
    class: "SSRI",
    halfLife: "21 hours",
    halfLifeHours: 21,
    primaryReceptorAction: "SERT inhibition, mild anticholinergic",
    scores: {
      libido: 25, orgasmFunction: 25, erectileFunction: 30,
      autonomicStability: 55, heartRateStability: 60, bloodPressureNeutrality: 65, lowSweating: 45,
      weightNeutrality: 35, appetiteStability: 35,
      sleepQuality: 70, lowSedation: 45, lowInsomnia: 75, energyStability: 50,
      mentalClarity: 50, emotionalRange: 40, motivationPreservation: 40,
      lowNausea: 60, giStability: 55, lowDryMouth: 35,
      easyToStop: 20, forgivingIfMissed: 40, lowDrugInteractions: 35, alcoholCompatibility: 40, genericAvailability: 90,
      anxietyReduction: 85, panicPrevention: 90, lowStartupAgitation: 70,
    },
    sideEffects: ["Weight gain", "Sedation", "Sexual dysfunction", "Withdrawal symptoms", "Dry mouth"],
    clinicalNotes: "Anticholinergic properties cause more sedation and weight gain. Significant discontinuation syndrome due to short half-life and potent receptor binding. Highest rates of sexual dysfunction among SSRIs. Excellent for panic disorder.",
  },
  {
    id: "citalopram",
    name: "Citalopram",
    genericName: "citalopram",
    brand: "Celexa",
    class: "SSRI",
    halfLife: "35 hours",
    halfLifeHours: 35,
    primaryReceptorAction: "SERT inhibition",
    scores: {
      libido: 42, orgasmFunction: 42, erectileFunction: 45,
      autonomicStability: 80, heartRateStability: 78, bloodPressureNeutrality: 80, lowSweating: 60,
      weightNeutrality: 70, appetiteStability: 70,
      sleepQuality: 65, lowSedation: 65, lowInsomnia: 60, energyStability: 70,
      mentalClarity: 70, emotionalRange: 55, motivationPreservation: 60,
      lowNausea: 60, giStability: 65, lowDryMouth: 55,
      easyToStop: 60, forgivingIfMissed: 65, lowDrugInteractions: 75, alcoholCompatibility: 50, genericAvailability: 95,
      anxietyReduction: 75, panicPrevention: 70, lowStartupAgitation: 60,
    },
    sideEffects: ["Nausea", "Dry mouth", "Sexual dysfunction", "Drowsiness", "Sweating"],
    clinicalNotes: "Good autonomic profile similar to escitalopram. Dose-dependent QTc prolongation limits maximum dose to 40mg. Well-tolerated overall with fewer drug interactions than many SSRIs.",
  },
  {
    id: "vilazodone",
    name: "Vilazodone",
    genericName: "vilazodone",
    brand: "Viibryd",
    class: "SSRI",
    halfLife: "25 hours",
    halfLifeHours: 25,
    primaryReceptorAction: "SERT inhibition + 5-HT1A partial agonism",
    scores: {
      libido: 72, orgasmFunction: 70, erectileFunction: 72,
      autonomicStability: 80, heartRateStability: 80, bloodPressureNeutrality: 80, lowSweating: 70,
      weightNeutrality: 80, appetiteStability: 75,
      sleepQuality: 60, lowSedation: 70, lowInsomnia: 55, energyStability: 70,
      mentalClarity: 70, emotionalRange: 70, motivationPreservation: 65,
      lowNausea: 40, giStability: 35, lowDryMouth: 70,
      easyToStop: 60, forgivingIfMissed: 55, lowDrugInteractions: 65, alcoholCompatibility: 50, genericAvailability: 40,
      anxietyReduction: 70, panicPrevention: 60, lowStartupAgitation: 55,
    },
    sideEffects: ["Diarrhea", "Nausea", "Headache", "Dizziness", "Insomnia"],
    clinicalNotes: "5-HT1A partial agonism may reduce sexual side effects compared to traditional SSRIs. Must be taken with food for proper absorption. GI side effects are common but often transient. Good choice for patients prioritizing sexual health.",
  },
  {
    id: "vortioxetine",
    name: "Vortioxetine",
    genericName: "vortioxetine",
    brand: "Trintellix",
    class: "SSRI",
    halfLife: "66 hours",
    halfLifeHours: 66,
    primaryReceptorAction: "Multimodal: SERT inhibition + multiple 5-HT receptor activity",
    scores: {
      libido: 75, orgasmFunction: 78, erectileFunction: 75,
      autonomicStability: 85, heartRateStability: 85, bloodPressureNeutrality: 85, lowSweating: 75,
      weightNeutrality: 85, appetiteStability: 80,
      sleepQuality: 70, lowSedation: 75, lowInsomnia: 65, energyStability: 75,
      mentalClarity: 90, emotionalRange: 80, motivationPreservation: 75,
      lowNausea: 40, giStability: 55, lowDryMouth: 70,
      easyToStop: 70, forgivingIfMissed: 80, lowDrugInteractions: 70, alcoholCompatibility: 55, genericAvailability: 20,
      anxietyReduction: 70, panicPrevention: 60, lowStartupAgitation: 60,
    },
    sideEffects: ["Nausea", "Headache", "Dizziness", "Constipation", "Vomiting"],
    clinicalNotes: "Multimodal mechanism provides cognitive benefits and lower sexual dysfunction rates. Minimal impact on weight and autonomic function. Pro-cognitive effects unique among antidepressants. Brand-only availability increases cost significantly.",
  },
  {
    id: "fluvoxamine",
    name: "Fluvoxamine",
    genericName: "fluvoxamine",
    brand: "Luvox",
    class: "SSRI",
    halfLife: "15-22 hours",
    halfLifeHours: 18,
    primaryReceptorAction: "SERT inhibition, sigma-1 receptor agonism",
    scores: {
      libido: 50, orgasmFunction: 50, erectileFunction: 52,
      autonomicStability: 65, heartRateStability: 70, bloodPressureNeutrality: 70, lowSweating: 55,
      weightNeutrality: 65, appetiteStability: 60,
      sleepQuality: 65, lowSedation: 55, lowInsomnia: 60, energyStability: 60,
      mentalClarity: 60, emotionalRange: 55, motivationPreservation: 55,
      lowNausea: 40, giStability: 50, lowDryMouth: 60,
      easyToStop: 50, forgivingIfMissed: 35, lowDrugInteractions: 25, alcoholCompatibility: 40, genericAvailability: 85,
      anxietyReduction: 75, panicPrevention: 70, lowStartupAgitation: 55,
    },
    sideEffects: ["Nausea", "Drowsiness", "Insomnia", "Nervousness", "GI upset"],
    clinicalNotes: "Primary use in OCD. Significant drug interactions via CYP1A2 and CYP2C19 inhibition. Sigma-1 receptor activity may provide unique anxiolytic benefits. Lower sexual side effects than paroxetine.",
  },
  {
    id: "venlafaxine",
    name: "Venlafaxine",
    genericName: "venlafaxine",
    brand: "Effexor",
    class: "SNRI",
    halfLife: "5 hours (11h active metabolite)",
    halfLifeHours: 11,
    primaryReceptorAction: "SERT + NET inhibition (dose-dependent)",
    scores: {
      libido: 35, orgasmFunction: 30, erectileFunction: 35,
      autonomicStability: 40, heartRateStability: 40, bloodPressureNeutrality: 35, lowSweating: 30,
      weightNeutrality: 55, appetiteStability: 50,
      sleepQuality: 45, lowSedation: 65, lowInsomnia: 40, energyStability: 45,
      mentalClarity: 65, emotionalRange: 50, motivationPreservation: 70,
      lowNausea: 40, giStability: 50, lowDryMouth: 55,
      easyToStop: 15, forgivingIfMissed: 20, lowDrugInteractions: 65, alcoholCompatibility: 40, genericAvailability: 90,
      anxietyReduction: 80, panicPrevention: 85, lowStartupAgitation: 35,
    },
    sideEffects: ["Nausea", "Hypertension", "Sweating", "Sexual dysfunction", "Withdrawal symptoms"],
    clinicalNotes: "Norepinephrine effects increase with dose (>150mg). May raise blood pressure. Significant discontinuation syndrome requires careful tapering. Effective for anxiety and panic but not ideal for adrenaline-sensitive patients.",
  },
  {
    id: "duloxetine",
    name: "Duloxetine",
    genericName: "duloxetine",
    brand: "Cymbalta",
    class: "SNRI",
    halfLife: "12 hours",
    halfLifeHours: 12,
    primaryReceptorAction: "Balanced SERT + NET inhibition",
    scores: {
      libido: 38, orgasmFunction: 35, erectileFunction: 38,
      autonomicStability: 50, heartRateStability: 50, bloodPressureNeutrality: 50, lowSweating: 40,
      weightNeutrality: 60, appetiteStability: 55,
      sleepQuality: 55, lowSedation: 55, lowInsomnia: 50, energyStability: 55,
      mentalClarity: 65, emotionalRange: 50, motivationPreservation: 65,
      lowNausea: 40, giStability: 45, lowDryMouth: 45,
      easyToStop: 30, forgivingIfMissed: 30, lowDrugInteractions: 50, alcoholCompatibility: 30, genericAvailability: 85,
      anxietyReduction: 80, panicPrevention: 75, lowStartupAgitation: 45,
    },
    sideEffects: ["Nausea", "Dry mouth", "Fatigue", "Constipation", "Decreased appetite"],
    clinicalNotes: "Useful for comorbid pain conditions. More balanced NE activity than venlafaxine. Hepatotoxicity risk in patients with liver disease. May cause urinary hesitancy. Avoid with heavy alcohol use.",
  },
  {
    id: "desvenlafaxine",
    name: "Desvenlafaxine",
    genericName: "desvenlafaxine",
    brand: "Pristiq",
    class: "SNRI",
    halfLife: "11 hours",
    halfLifeHours: 11,
    primaryReceptorAction: "SERT + NET inhibition",
    scores: {
      libido: 38, orgasmFunction: 35, erectileFunction: 40,
      autonomicStability: 50, heartRateStability: 50, bloodPressureNeutrality: 48, lowSweating: 35,
      weightNeutrality: 60, appetiteStability: 55,
      sleepQuality: 50, lowSedation: 60, lowInsomnia: 45, energyStability: 55,
      mentalClarity: 65, emotionalRange: 50, motivationPreservation: 65,
      lowNausea: 45, giStability: 50, lowDryMouth: 50,
      easyToStop: 30, forgivingIfMissed: 25, lowDrugInteractions: 75, alcoholCompatibility: 40, genericAvailability: 80,
      anxietyReduction: 75, panicPrevention: 70, lowStartupAgitation: 45,
    },
    sideEffects: ["Nausea", "Dizziness", "Insomnia", "Hyperhidrosis", "Constipation"],
    clinicalNotes: "Active metabolite of venlafaxine with more predictable pharmacokinetics. Fewer drug interactions than parent compound. Still has noradrenergic effects affecting autonomic stability. Simpler dosing.",
  },
  {
    id: "levomilnacipran",
    name: "Levomilnacipran",
    genericName: "levomilnacipran",
    brand: "Fetzima",
    class: "SNRI",
    halfLife: "12 hours",
    halfLifeHours: 12,
    primaryReceptorAction: "NET > SERT inhibition (norepinephrine preferring)",
    scores: {
      libido: 42, orgasmFunction: 40, erectileFunction: 42,
      autonomicStability: 35, heartRateStability: 30, bloodPressureNeutrality: 35, lowSweating: 30,
      weightNeutrality: 65, appetiteStability: 60,
      sleepQuality: 45, lowSedation: 70, lowInsomnia: 35, energyStability: 45,
      mentalClarity: 70, emotionalRange: 55, motivationPreservation: 80,
      lowNausea: 50, giStability: 45, lowDryMouth: 55,
      easyToStop: 40, forgivingIfMissed: 30, lowDrugInteractions: 70, alcoholCompatibility: 40, genericAvailability: 50,
      anxietyReduction: 60, panicPrevention: 55, lowStartupAgitation: 30,
    },
    sideEffects: ["Nausea", "Constipation", "Hyperhidrosis", "Heart rate increase", "Urinary hesitancy"],
    clinicalNotes: "More potent norepinephrine reuptake inhibition than other SNRIs. May increase heart rate and blood pressure. Not recommended for patients sensitive to adrenergic stimulation. Can be activating and help with fatigue/motivation.",
  },
]
