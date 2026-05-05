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
  { id: "libido", label: "Libido Preservation", description: "Maintain sexual desire and drive", category: "Sexual & Reproductive" },
  { id: "orgasmFunction", label: "Orgasm Function", description: "Minimize difficulty reaching orgasm", category: "Sexual & Reproductive" },
  { id: "erectileFunction", label: "Arousal Function", description: "Maintain physical arousal response", category: "Sexual & Reproductive" },
  { id: "autonomicStability", label: "Autonomic Stability", description: "Minimize effects on nervous system regulation", category: "Autonomic & Cardiovascular" },
  { id: "heartRateStability", label: "Heart Rate Stability", description: "Avoid elevated or irregular heart rate", category: "Autonomic & Cardiovascular" },
  { id: "bloodPressureNeutrality", label: "Blood Pressure Neutrality", description: "No increase in blood pressure", category: "Autonomic & Cardiovascular" },
  { id: "lowSweating", label: "Low Sweating", description: "Minimize excessive perspiration", category: "Autonomic & Cardiovascular" },
  { id: "weightNeutrality", label: "Weight Neutrality", description: "Minimize weight gain or loss", category: "Metabolic & Physical" },
  { id: "appetiteStability", label: "Appetite Stability", description: "No major changes in hunger or cravings", category: "Metabolic & Physical" },
  { id: "sleepQuality", label: "Sleep Quality", description: "Maintain restful, uninterrupted sleep", category: "Sleep & Energy" },
  { id: "lowSedation", label: "Low Sedation", description: "Stay alert during the day", category: "Sleep & Energy" },
  { id: "lowInsomnia", label: "Low Insomnia Risk", description: "Avoid difficulty falling or staying asleep", category: "Sleep & Energy" },
  { id: "energyStability", label: "Energy Stability", description: "No wired or crashed feeling", category: "Sleep & Energy" },
  { id: "mentalClarity", label: "Mental Clarity", description: "Minimize brain fog and cognitive dulling", category: "Cognitive" },
  { id: "emotionalRange", label: "Emotional Range", description: "Avoid feeling flat or emotionally blunted", category: "Cognitive" },
  { id: "motivationPreservation", label: "Motivation Preservation", description: "Maintain drive and initiative", category: "Cognitive" },
  { id: "lowNausea", label: "Low Nausea", description: "Minimize stomach upset", category: "GI & Comfort" },
  { id: "giStability", label: "GI Stability", description: "Avoid diarrhea or constipation", category: "GI & Comfort" },
  { id: "lowDryMouth", label: "Low Dry Mouth", description: "Minimize oral dryness", category: "GI & Comfort" },
  { id: "easyToStop", label: "Easy to Discontinue", description: "Low withdrawal or discontinuation symptoms", category: "Practical & Lifestyle" },
  { id: "forgivingIfMissed", label: "Forgiving if Missed", description: "Long half-life means less impact from missed doses", category: "Practical & Lifestyle" },
  { id: "lowDrugInteractions", label: "Low Drug Interactions", description: "Fewer conflicts with other medications", category: "Practical & Lifestyle" },
  { id: "alcoholCompatibility", label: "Alcohol Compatibility", description: "Lower risk when combined with occasional alcohol", category: "Practical & Lifestyle" },
  { id: "genericAvailability", label: "Generic Available", description: "Available as affordable generic", category: "Practical & Lifestyle" },
  { id: "anxietyReduction", label: "Anxiety Reduction", description: "Effective for generalized anxiety", category: "Psychiatric" },
  { id: "panicPrevention", label: "Panic Prevention", description: "Effective for panic attacks", category: "Psychiatric" },
  { id: "lowStartupAgitation", label: "Low Startup Agitation", description: "Minimal worsening of anxiety when starting", category: "Psychiatric" },
]

export interface Medication {
  id: string
  name: string
  genericName: string
  brand: string
  class: "SSRI" | "SNRI" | "NDRI" | "NaSSA"
  halfLife: string
  halfLifeHours: number
  primaryReceptorAction: string
  doseRange: string
  availableDoses: string
  timeToEffect: string
  fdaIndications: string[]
  pregnancyRisk: string
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
    doseRange: "50–200 mg/day",
    availableDoses: "25, 50, 100 mg tablets; 20 mg/mL oral solution",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder", "Panic Disorder", "PTSD", "OCD", "Social Anxiety Disorder", "Premenstrual Dysphoric Disorder"],
    pregnancyRisk: "Category C — use if benefit outweighs risk",
    scores: {
      libido: 40, orgasmFunction: 38, erectileFunction: 42,
      autonomicStability: 75, heartRateStability: 80, bloodPressureNeutrality: 80, lowSweating: 58,
      weightNeutrality: 70, appetiteStability: 65,
      sleepQuality: 60, lowSedation: 70, lowInsomnia: 55, energyStability: 70,
      mentalClarity: 70, emotionalRange: 60, motivationPreservation: 70,
      lowNausea: 50, giStability: 38, lowDryMouth: 70,
      easyToStop: 65, forgivingIfMissed: 55, lowDrugInteractions: 70, alcoholCompatibility: 55, genericAvailability: 95,
      anxietyReduction: 75, panicPrevention: 78, lowStartupAgitation: 55,
    },
    sideEffects: ["Nausea", "Diarrhea", "Sexual dysfunction", "Insomnia", "Drowsiness", "Tremor"],
    clinicalNotes: "Well-tolerated SSRI with minimal noradrenergic activity. Generally weight-neutral. Mild dopamine reuptake inhibition may help with motivation and energy. Only SSRI FDA-approved for PTSD. GI side effects (especially diarrhea) are more common than with other SSRIs.",
  },
  {
    id: "escitalopram",
    name: "Escitalopram",
    genericName: "escitalopram",
    brand: "Lexapro",
    class: "SSRI",
    halfLife: "27–32 hours",
    halfLifeHours: 30,
    primaryReceptorAction: "Highly selective SERT inhibition",
    doseRange: "10–20 mg/day",
    availableDoses: "5, 10, 20 mg tablets; 1 mg/mL oral solution",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder", "Generalized Anxiety Disorder"],
    pregnancyRisk: "Category C — use if benefit outweighs risk",
    scores: {
      libido: 38, orgasmFunction: 38, erectileFunction: 42,
      autonomicStability: 85, heartRateStability: 85, bloodPressureNeutrality: 85, lowSweating: 70,
      weightNeutrality: 75, appetiteStability: 75,
      sleepQuality: 65, lowSedation: 75, lowInsomnia: 60, energyStability: 75,
      mentalClarity: 72, emotionalRange: 45, motivationPreservation: 55,
      lowNausea: 65, giStability: 70, lowDryMouth: 60,
      easyToStop: 58, forgivingIfMissed: 60, lowDrugInteractions: 80, alcoholCompatibility: 55, genericAvailability: 90,
      anxietyReduction: 85, panicPrevention: 80, lowStartupAgitation: 65,
    },
    sideEffects: ["Nausea", "Sexual dysfunction", "Insomnia", "Fatigue", "Dry mouth", "Emotional blunting"],
    clinicalNotes: "Most selective SSRI available. Excellent autonomic profile with minimal off-target effects. QTc prolongation at higher doses should be monitored. Clean pharmacology makes it predictable. Emotional blunting is a common patient complaint despite good efficacy.",
  },
  {
    id: "fluoxetine",
    name: "Fluoxetine",
    genericName: "fluoxetine",
    brand: "Prozac",
    class: "SSRI",
    halfLife: "1–6 days (norfluoxetine: 4–16 days)",
    halfLifeHours: 96,
    primaryReceptorAction: "SERT inhibition, 5-HT2C antagonism",
    doseRange: "20–80 mg/day",
    availableDoses: "10, 20, 40 mg capsules; 20 mg/5 mL oral solution; 90 mg weekly capsule",
    timeToEffect: "2–6 weeks",
    fdaIndications: ["Major Depressive Disorder", "OCD", "Panic Disorder", "Bulimia Nervosa", "Bipolar Depression (with olanzapine)", "Treatment-Resistant Depression (with olanzapine)"],
    pregnancyRisk: "Category C — most studied SSRI in pregnancy",
    scores: {
      libido: 35, orgasmFunction: 35, erectileFunction: 40,
      autonomicStability: 70, heartRateStability: 75, bloodPressureNeutrality: 75, lowSweating: 60,
      weightNeutrality: 68, appetiteStability: 60,
      sleepQuality: 50, lowSedation: 75, lowInsomnia: 40, energyStability: 55,
      mentalClarity: 65, emotionalRange: 50, motivationPreservation: 70,
      lowNausea: 55, giStability: 60, lowDryMouth: 65,
      easyToStop: 90, forgivingIfMissed: 95, lowDrugInteractions: 40, alcoholCompatibility: 50, genericAvailability: 95,
      anxietyReduction: 65, panicPrevention: 70, lowStartupAgitation: 35,
    },
    sideEffects: ["Insomnia", "Activation/anxiety", "Nausea", "Sexual dysfunction", "Headache", "Appetite changes"],
    clinicalNotes: "Long half-life virtually eliminates withdrawal symptoms and makes missed doses inconsequential. Most activating SSRI — frequently worsens anxiety in weeks 1–2. Significant CYP2D6 inhibition creates drug interaction concerns. Only SSRI approved for children/adolescents with depression. Most studied SSRI in pregnancy. Weekly dosing formulation available.",
  },
  {
    id: "paroxetine",
    name: "Paroxetine",
    genericName: "paroxetine",
    brand: "Paxil",
    class: "SSRI",
    halfLife: "21 hours",
    halfLifeHours: 21,
    primaryReceptorAction: "SERT inhibition, muscarinic antagonism (anticholinergic), mild NET inhibition",
    doseRange: "20–60 mg/day",
    availableDoses: "10, 20, 30, 40 mg tablets; 12.5, 25, 37.5 mg CR tablets; 10 mg/5 mL suspension",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder", "Panic Disorder", "OCD", "Social Anxiety Disorder", "GAD", "PTSD"],
    pregnancyRisk: "Category D — evidence of fetal cardiac malformations; avoid in pregnancy",
    scores: {
      libido: 22, orgasmFunction: 20, erectileFunction: 25,
      autonomicStability: 55, heartRateStability: 60, bloodPressureNeutrality: 65, lowSweating: 45,
      weightNeutrality: 30, appetiteStability: 30,
      sleepQuality: 72, lowSedation: 42, lowInsomnia: 78, energyStability: 45,
      mentalClarity: 48, emotionalRange: 35, motivationPreservation: 35,
      lowNausea: 60, giStability: 55, lowDryMouth: 30,
      easyToStop: 15, forgivingIfMissed: 38, lowDrugInteractions: 35, alcoholCompatibility: 40, genericAvailability: 90,
      anxietyReduction: 88, panicPrevention: 92, lowStartupAgitation: 72,
    },
    sideEffects: ["Weight gain", "Sedation", "Sexual dysfunction", "Severe withdrawal", "Dry mouth", "Constipation"],
    clinicalNotes: "Anticholinergic properties cause sedation, weight gain, dry mouth, and constipation. Most severe discontinuation syndrome of any SSRI — requires very slow taper. Highest rates of sexual dysfunction in class. Excellent for panic disorder and social anxiety. Category D in pregnancy — associated with cardiac defects; generally avoided in women of childbearing age. CR formulation may reduce GI side effects.",
  },
  {
    id: "citalopram",
    name: "Citalopram",
    genericName: "citalopram",
    brand: "Celexa",
    class: "SSRI",
    halfLife: "35 hours",
    halfLifeHours: 35,
    primaryReceptorAction: "SERT inhibition (racemic mixture)",
    doseRange: "20–40 mg/day",
    availableDoses: "10, 20, 40 mg tablets; 10 mg/5 mL oral solution",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder"],
    pregnancyRisk: "Category C — use if benefit outweighs risk",
    scores: {
      libido: 40, orgasmFunction: 40, erectileFunction: 42,
      autonomicStability: 78, heartRateStability: 72, bloodPressureNeutrality: 78, lowSweating: 58,
      weightNeutrality: 68, appetiteStability: 68,
      sleepQuality: 62, lowSedation: 65, lowInsomnia: 58, energyStability: 68,
      mentalClarity: 68, emotionalRange: 48, motivationPreservation: 55,
      lowNausea: 60, giStability: 65, lowDryMouth: 55,
      easyToStop: 58, forgivingIfMissed: 65, lowDrugInteractions: 75, alcoholCompatibility: 50, genericAvailability: 95,
      anxietyReduction: 72, panicPrevention: 68, lowStartupAgitation: 60,
    },
    sideEffects: ["Nausea", "Dry mouth", "Sexual dysfunction", "Drowsiness", "Sweating", "QTc prolongation"],
    clinicalNotes: "Similar to escitalopram but less potent (racemic mixture). Dose-dependent QTc prolongation limits maximum dose to 40mg (20mg in elderly). Well-tolerated overall. Emotional blunting reported similarly to escitalopram. Fewer drug interactions than fluoxetine or paroxetine.",
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
    doseRange: "20–40 mg/day",
    availableDoses: "10, 20, 40 mg tablets (titration pack available)",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder"],
    pregnancyRisk: "Category C — limited data",
    scores: {
      libido: 72, orgasmFunction: 70, erectileFunction: 72,
      autonomicStability: 80, heartRateStability: 80, bloodPressureNeutrality: 80, lowSweating: 70,
      weightNeutrality: 80, appetiteStability: 75,
      sleepQuality: 58, lowSedation: 70, lowInsomnia: 55, energyStability: 68,
      mentalClarity: 68, emotionalRange: 72, motivationPreservation: 65,
      lowNausea: 38, giStability: 32, lowDryMouth: 70,
      easyToStop: 58, forgivingIfMissed: 52, lowDrugInteractions: 65, alcoholCompatibility: 50, genericAvailability: 78,
      anxietyReduction: 70, panicPrevention: 58, lowStartupAgitation: 55,
    },
    sideEffects: ["Diarrhea", "Nausea", "Headache", "Dizziness", "Insomnia", "Vomiting"],
    clinicalNotes: "5-HT1A partial agonism reduces sexual side effects to roughly half the rate of traditional SSRIs. Must be taken with food for proper absorption. GI side effects (diarrhea, nausea) are the main tolerability issue but often transient. Good emotional range preservation. Generic available since 2022.",
  },
  {
    id: "vortioxetine",
    name: "Vortioxetine",
    genericName: "vortioxetine",
    brand: "Trintellix",
    class: "SSRI",
    halfLife: "66 hours",
    halfLifeHours: 66,
    primaryReceptorAction: "Multimodal: SERT inhibition + 5-HT3/7 antagonism + 5-HT1A agonism + 5-HT1B partial agonism",
    doseRange: "5–20 mg/day",
    availableDoses: "5, 10, 20 mg tablets",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder"],
    pregnancyRisk: "Category C — limited data",
    scores: {
      libido: 70, orgasmFunction: 72, erectileFunction: 70,
      autonomicStability: 85, heartRateStability: 85, bloodPressureNeutrality: 85, lowSweating: 75,
      weightNeutrality: 85, appetiteStability: 80,
      sleepQuality: 68, lowSedation: 75, lowInsomnia: 65, energyStability: 75,
      mentalClarity: 90, emotionalRange: 78, motivationPreservation: 72,
      lowNausea: 38, giStability: 52, lowDryMouth: 70,
      easyToStop: 72, forgivingIfMissed: 82, lowDrugInteractions: 70, alcoholCompatibility: 55, genericAvailability: 15,
      anxietyReduction: 65, panicPrevention: 55, lowStartupAgitation: 60,
    },
    sideEffects: ["Nausea (dose-dependent)", "Headache", "Dizziness", "Constipation", "Vomiting"],
    clinicalNotes: "Multimodal mechanism provides unique pro-cognitive benefits (supported by CONNECT and FOCUS trials). Lower sexual dysfunction than traditional SSRIs but advantage is more modest than vilazodone. Minimal impact on weight and autonomic function. Not primarily an anxiolytic — better for depression with cognitive complaints. Brand-only; expensive.",
  },
  {
    id: "fluvoxamine",
    name: "Fluvoxamine",
    genericName: "fluvoxamine",
    brand: "Luvox",
    class: "SSRI",
    halfLife: "15–22 hours",
    halfLifeHours: 18,
    primaryReceptorAction: "SERT inhibition, sigma-1 receptor agonism",
    doseRange: "50–300 mg/day",
    availableDoses: "25, 50, 100 mg tablets; 100, 150 mg CR capsules",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["OCD"],
    pregnancyRisk: "Category C — use if benefit outweighs risk",
    scores: {
      libido: 50, orgasmFunction: 50, erectileFunction: 52,
      autonomicStability: 65, heartRateStability: 70, bloodPressureNeutrality: 70, lowSweating: 55,
      weightNeutrality: 65, appetiteStability: 60,
      sleepQuality: 65, lowSedation: 52, lowInsomnia: 62, energyStability: 58,
      mentalClarity: 58, emotionalRange: 55, motivationPreservation: 52,
      lowNausea: 38, giStability: 48, lowDryMouth: 60,
      easyToStop: 48, forgivingIfMissed: 32, lowDrugInteractions: 22, alcoholCompatibility: 38, genericAvailability: 85,
      anxietyReduction: 80, panicPrevention: 72, lowStartupAgitation: 52,
    },
    sideEffects: ["Nausea", "Drowsiness", "Insomnia", "Nervousness", "GI upset", "Drug interactions"],
    clinicalNotes: "Primary use in OCD; often dosed BID due to short half-life (CR formulation allows once-daily). Most significant drug interactions of any SSRI via CYP1A2 and CYP2C19 inhibition (affects caffeine, theophylline, warfarin, tizanidine). Sigma-1 receptor activity may provide unique anxiolytic and neuroprotective benefits. Lower sexual side effects than paroxetine or sertraline.",
  },
  {
    id: "venlafaxine",
    name: "Venlafaxine",
    genericName: "venlafaxine",
    brand: "Effexor XR",
    class: "SNRI",
    halfLife: "5 hours (11h active metabolite ODV)",
    halfLifeHours: 11,
    primaryReceptorAction: "SERT + NET inhibition (dose-dependent: serotonergic at low doses, noradrenergic added >150mg)",
    doseRange: "75–375 mg/day",
    availableDoses: "37.5, 75, 150 mg XR capsules; 25, 37.5, 50, 75, 100 mg IR tablets",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder", "Generalized Anxiety Disorder", "Social Anxiety Disorder", "Panic Disorder"],
    pregnancyRisk: "Category C — neonatal withdrawal syndrome reported",
    scores: {
      libido: 32, orgasmFunction: 28, erectileFunction: 32,
      autonomicStability: 38, heartRateStability: 38, bloodPressureNeutrality: 32, lowSweating: 25,
      weightNeutrality: 55, appetiteStability: 50,
      sleepQuality: 42, lowSedation: 65, lowInsomnia: 38, energyStability: 45,
      mentalClarity: 65, emotionalRange: 48, motivationPreservation: 72,
      lowNausea: 38, giStability: 48, lowDryMouth: 52,
      easyToStop: 12, forgivingIfMissed: 15, lowDrugInteractions: 65, alcoholCompatibility: 38, genericAvailability: 90,
      anxietyReduction: 82, panicPrevention: 88, lowStartupAgitation: 32,
    },
    sideEffects: ["Nausea", "Hypertension", "Hyperhidrosis", "Sexual dysfunction", "Severe withdrawal", "Insomnia"],
    clinicalNotes: "Norepinephrine effects increase with dose (>150mg). Dose-dependent blood pressure elevation requires monitoring. Most notorious discontinuation syndrome — even a few hours late can trigger 'brain zaps.' Effective for GAD and panic at higher doses. Not ideal for adrenaline-sensitive patients. XR formulation preferred for tolerability. IR tablets allow very granular dose adjustments for tapering.",
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
    doseRange: "30–120 mg/day",
    availableDoses: "20, 30, 60 mg delayed-release capsules",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder", "Generalized Anxiety Disorder", "Diabetic Neuropathy", "Fibromyalgia", "Chronic Musculoskeletal Pain"],
    pregnancyRisk: "Category C — neonatal complications reported in third trimester",
    scores: {
      libido: 35, orgasmFunction: 32, erectileFunction: 35,
      autonomicStability: 48, heartRateStability: 48, bloodPressureNeutrality: 48, lowSweating: 38,
      weightNeutrality: 58, appetiteStability: 52,
      sleepQuality: 52, lowSedation: 55, lowInsomnia: 48, energyStability: 55,
      mentalClarity: 62, emotionalRange: 48, motivationPreservation: 65,
      lowNausea: 35, giStability: 42, lowDryMouth: 42,
      easyToStop: 22, forgivingIfMissed: 28, lowDrugInteractions: 48, alcoholCompatibility: 25, genericAvailability: 85,
      anxietyReduction: 82, panicPrevention: 75, lowStartupAgitation: 42,
    },
    sideEffects: ["Nausea", "Dry mouth", "Fatigue", "Constipation", "Decreased appetite", "Hyperhidrosis"],
    clinicalNotes: "Useful for comorbid pain conditions (neuropathy, fibromyalgia). More balanced NE activity than venlafaxine. Hepatotoxicity risk — avoid in liver disease or heavy alcohol use. Capsule cannot be opened/split, making tapering very difficult. Discontinuation syndrome is severe; often requires cross-taper to fluoxetine.",
  },
  {
    id: "desvenlafaxine",
    name: "Desvenlafaxine",
    genericName: "desvenlafaxine",
    brand: "Pristiq",
    class: "SNRI",
    halfLife: "11 hours",
    halfLifeHours: 11,
    primaryReceptorAction: "SERT + NET inhibition (active metabolite of venlafaxine)",
    doseRange: "50–100 mg/day",
    availableDoses: "25, 50, 100 mg extended-release tablets",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder"],
    pregnancyRisk: "Category C — neonatal withdrawal syndrome reported",
    scores: {
      libido: 35, orgasmFunction: 32, erectileFunction: 38,
      autonomicStability: 48, heartRateStability: 48, bloodPressureNeutrality: 45, lowSweating: 32,
      weightNeutrality: 58, appetiteStability: 55,
      sleepQuality: 48, lowSedation: 60, lowInsomnia: 42, energyStability: 55,
      mentalClarity: 65, emotionalRange: 48, motivationPreservation: 65,
      lowNausea: 42, giStability: 48, lowDryMouth: 48,
      easyToStop: 28, forgivingIfMissed: 22, lowDrugInteractions: 78, alcoholCompatibility: 40, genericAvailability: 80,
      anxietyReduction: 75, panicPrevention: 70, lowStartupAgitation: 42,
    },
    sideEffects: ["Nausea", "Dizziness", "Insomnia", "Hyperhidrosis", "Constipation", "Fatigue"],
    clinicalNotes: "Active metabolite of venlafaxine with more predictable pharmacokinetics. Main advantage: minimal CYP inhibition means fewer drug interactions. 50mg is the therapeutic dose — simple dosing. Still has noradrenergic effects and discontinuation issues similar to venlafaxine. 25mg tablet available for tapering.",
  },
  {
    id: "levomilnacipran",
    name: "Levomilnacipran",
    genericName: "levomilnacipran",
    brand: "Fetzima",
    class: "SNRI",
    halfLife: "12 hours",
    halfLifeHours: 12,
    primaryReceptorAction: "NET > SERT inhibition (norepinephrine preferring, ~2:1 NE:5-HT ratio)",
    doseRange: "40–120 mg/day",
    availableDoses: "20, 40, 80, 120 mg extended-release capsules (titration pack available)",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder"],
    pregnancyRisk: "Category C — limited data",
    scores: {
      libido: 42, orgasmFunction: 40, erectileFunction: 42,
      autonomicStability: 32, heartRateStability: 28, bloodPressureNeutrality: 32, lowSweating: 28,
      weightNeutrality: 65, appetiteStability: 60,
      sleepQuality: 42, lowSedation: 72, lowInsomnia: 32, energyStability: 42,
      mentalClarity: 70, emotionalRange: 55, motivationPreservation: 82,
      lowNausea: 48, giStability: 42, lowDryMouth: 55,
      easyToStop: 38, forgivingIfMissed: 28, lowDrugInteractions: 72, alcoholCompatibility: 40, genericAvailability: 68,
      anxietyReduction: 55, panicPrevention: 50, lowStartupAgitation: 28,
    },
    sideEffects: ["Nausea", "Constipation", "Hyperhidrosis", "Tachycardia", "Urinary hesitancy", "Erectile dysfunction"],
    clinicalNotes: "Most potent norepinephrine reuptake inhibition of any SNRI (~2:1 NE:5-HT selectivity). Can increase heart rate and blood pressure significantly. Not recommended for patients sensitive to adrenergic stimulation. Uniquely activating — best for depression with prominent fatigue, low motivation, and psychomotor retardation. Not a good anxiolytic.",
  },
  {
    id: "bupropion",
    name: "Bupropion",
    genericName: "bupropion",
    brand: "Wellbutrin",
    class: "NDRI",
    halfLife: "21 hours (active metabolites: 33–37 hours)",
    halfLifeHours: 21,
    primaryReceptorAction: "Norepinephrine-dopamine reuptake inhibition (NDRI), nicotinic receptor antagonism",
    doseRange: "150–450 mg/day",
    availableDoses: "75, 100 mg IR tablets; 100, 150, 200 mg SR tablets; 150, 300, 450 mg XL tablets",
    timeToEffect: "2–4 weeks",
    fdaIndications: ["Major Depressive Disorder", "Seasonal Affective Disorder", "Smoking Cessation (as Zyban)"],
    pregnancyRisk: "Category C — no evidence of teratogenicity in animal studies",
    scores: {
      libido: 92, orgasmFunction: 90, erectileFunction: 90,
      autonomicStability: 60, heartRateStability: 58, bloodPressureNeutrality: 60, lowSweating: 65,
      weightNeutrality: 88, appetiteStability: 72,
      sleepQuality: 42, lowSedation: 90, lowInsomnia: 30, energyStability: 55,
      mentalClarity: 80, emotionalRange: 82, motivationPreservation: 90,
      lowNausea: 72, giStability: 75, lowDryMouth: 50,
      easyToStop: 70, forgivingIfMissed: 55, lowDrugInteractions: 55, alcoholCompatibility: 35, genericAvailability: 95,
      anxietyReduction: 30, panicPrevention: 20, lowStartupAgitation: 25,
    },
    sideEffects: ["Insomnia", "Agitation/anxiety", "Dry mouth", "Headache", "Seizure risk (dose-dependent)", "Tachycardia"],
    clinicalNotes: "Unique mechanism — no serotonergic activity. Virtually no sexual dysfunction; often used as augmentation to counteract SSRI sexual side effects. Weight-neutral to mildly anorexigenic. Highly activating — can significantly worsen anxiety, panic, and insomnia. Contraindicated in seizure disorders, eating disorders, and abrupt alcohol/benzo withdrawal. Lowers seizure threshold dose-dependently (>450mg). Excellent for depression with fatigue, low motivation, or comorbid ADHD symptoms. Multiple formulations allow flexible dosing.",
  },
  {
    id: "mirtazapine",
    name: "Mirtazapine",
    genericName: "mirtazapine",
    brand: "Remeron",
    class: "NaSSA",
    halfLife: "20–40 hours",
    halfLifeHours: 30,
    primaryReceptorAction: "Alpha-2 adrenergic antagonism, 5-HT2A/2C/3 antagonism, H1 antagonism (potent antihistamine)",
    doseRange: "15–45 mg/day",
    availableDoses: "7.5, 15, 30, 45 mg tablets; 15, 30, 45 mg orally disintegrating tablets (SolTab)",
    timeToEffect: "1–2 weeks (sedation/appetite immediate; mood 2–4 weeks)",
    fdaIndications: ["Major Depressive Disorder"],
    pregnancyRisk: "Category C — limited data but no clear teratogenicity",
    scores: {
      libido: 68, orgasmFunction: 70, erectileFunction: 68,
      autonomicStability: 65, heartRateStability: 70, bloodPressureNeutrality: 72, lowSweating: 75,
      weightNeutrality: 15, appetiteStability: 15,
      sleepQuality: 92, lowSedation: 20, lowInsomnia: 95, energyStability: 40,
      mentalClarity: 50, emotionalRange: 60, motivationPreservation: 40,
      lowNausea: 92, giStability: 80, lowDryMouth: 45,
      easyToStop: 65, forgivingIfMissed: 62, lowDrugInteractions: 72, alcoholCompatibility: 30, genericAvailability: 95,
      anxietyReduction: 75, panicPrevention: 65, lowStartupAgitation: 85,
    },
    sideEffects: ["Weight gain (significant)", "Sedation/somnolence", "Increased appetite", "Dry mouth", "Elevated cholesterol", "Dizziness"],
    clinicalNotes: "Potent antihistamine (H1) causes significant sedation and appetite stimulation — paradoxically less sedating at higher doses (30–45mg) due to increased noradrenergic activity. Excellent for patients with insomnia, nausea, or poor appetite. Very low sexual dysfunction due to 5-HT2A/3 antagonism. Weight gain is the primary limiting factor (average 2–4kg). Often combined with SSRIs ('California rocket fuel' with venlafaxine). Fastest onset of sleep benefit (night 1). No startup anxiety worsening. 7.5mg tablet available for low-dose sleep use.",
  },
]
