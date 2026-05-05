export interface Medication {
  id: string
  name: string
  genericName: string
  brand: string
  class: "SSRI" | "SNRI"
  halfLife: string
  halfLifeHours: number
  primaryReceptorAction: string
  scores: {
    autonomicStability: number
    sexualHealth: number
    adrenalineSensitivity: number
    metabolicNeutrality: number
  }
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
      autonomicStability: 75,
      sexualHealth: 45,
      adrenalineSensitivity: 80,
      metabolicNeutrality: 70,
    },
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Sexual dysfunction",
      "Insomnia",
      "Drowsiness",
    ],
    clinicalNotes:
      "Well-tolerated SSRI with minimal noradrenergic activity. Generally considered weight-neutral. Good choice for patients sensitive to autonomic side effects.",
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
      autonomicStability: 85,
      sexualHealth: 50,
      adrenalineSensitivity: 90,
      metabolicNeutrality: 75,
    },
    sideEffects: [
      "Nausea",
      "Sexual dysfunction",
      "Insomnia",
      "Fatigue",
      "Dry mouth",
    ],
    clinicalNotes:
      "Most selective SSRI available. Excellent autonomic profile with minimal off-target effects. QTc prolongation at higher doses should be monitored.",
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
      autonomicStability: 70,
      sexualHealth: 40,
      adrenalineSensitivity: 75,
      metabolicNeutrality: 60,
    },
    sideEffects: [
      "Insomnia",
      "Anxiety",
      "Nausea",
      "Sexual dysfunction",
      "Weight changes",
    ],
    clinicalNotes:
      "Long half-life reduces withdrawal symptoms but increases drug interaction window. Activating profile may worsen anxiety initially. Some noradrenergic effects at higher doses.",
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
      autonomicStability: 55,
      sexualHealth: 30,
      adrenalineSensitivity: 70,
      metabolicNeutrality: 40,
    },
    sideEffects: [
      "Weight gain",
      "Sedation",
      "Sexual dysfunction",
      "Withdrawal symptoms",
      "Dry mouth",
    ],
    clinicalNotes:
      "Anticholinergic properties cause more sedation and weight gain. Significant discontinuation syndrome due to short half-life. Higher rates of sexual dysfunction compared to other SSRIs.",
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
      autonomicStability: 80,
      sexualHealth: 45,
      adrenalineSensitivity: 85,
      metabolicNeutrality: 70,
    },
    sideEffects: [
      "Nausea",
      "Dry mouth",
      "Sexual dysfunction",
      "Drowsiness",
      "Sweating",
    ],
    clinicalNotes:
      "Good autonomic profile similar to escitalopram. Dose-dependent QTc prolongation limits maximum dose to 40mg. Well-tolerated overall.",
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
      autonomicStability: 80,
      sexualHealth: 75,
      adrenalineSensitivity: 85,
      metabolicNeutrality: 80,
    },
    sideEffects: [
      "Diarrhea",
      "Nausea",
      "Headache",
      "Dizziness",
      "Insomnia",
    ],
    clinicalNotes:
      "5-HT1A partial agonism may reduce sexual side effects compared to traditional SSRIs. Must be taken with food. Good choice for patients prioritizing sexual health.",
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
      autonomicStability: 85,
      sexualHealth: 80,
      adrenalineSensitivity: 90,
      metabolicNeutrality: 85,
    },
    sideEffects: [
      "Nausea",
      "Headache",
      "Dizziness",
      "Constipation",
      "Vomiting",
    ],
    clinicalNotes:
      "Multimodal mechanism provides cognitive benefits and lower sexual dysfunction rates. Minimal impact on weight and autonomic function. Often considered when sexual health is a priority.",
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
      autonomicStability: 65,
      sexualHealth: 55,
      adrenalineSensitivity: 70,
      metabolicNeutrality: 65,
    },
    sideEffects: [
      "Nausea",
      "Drowsiness",
      "Insomnia",
      "Nervousness",
      "GI upset",
    ],
    clinicalNotes:
      "Primary use in OCD. Significant drug interactions via CYP1A2 and CYP2C19 inhibition. Sigma-1 receptor activity may provide unique anxiolytic benefits.",
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
      autonomicStability: 45,
      sexualHealth: 35,
      adrenalineSensitivity: 30,
      metabolicNeutrality: 55,
    },
    sideEffects: [
      "Nausea",
      "Hypertension",
      "Sweating",
      "Sexual dysfunction",
      "Withdrawal symptoms",
    ],
    clinicalNotes:
      "Norepinephrine effects increase with dose (>150mg). May raise blood pressure. Significant discontinuation syndrome requires careful tapering. Not ideal for adrenaline-sensitive patients.",
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
      autonomicStability: 50,
      sexualHealth: 40,
      adrenalineSensitivity: 35,
      metabolicNeutrality: 60,
    },
    sideEffects: [
      "Nausea",
      "Dry mouth",
      "Fatigue",
      "Constipation",
      "Decreased appetite",
    ],
    clinicalNotes:
      "Useful for comorbid pain conditions. More balanced NE activity than venlafaxine. Hepatotoxicity risk in patients with liver disease. May cause urinary hesitancy.",
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
      autonomicStability: 50,
      sexualHealth: 40,
      adrenalineSensitivity: 40,
      metabolicNeutrality: 60,
    },
    sideEffects: [
      "Nausea",
      "Dizziness",
      "Insomnia",
      "Hyperhidrosis",
      "Constipation",
    ],
    clinicalNotes:
      "Active metabolite of venlafaxine with more predictable pharmacokinetics. Less drug interactions than parent compound. Still has noradrenergic effects affecting autonomic stability.",
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
      autonomicStability: 40,
      sexualHealth: 45,
      adrenalineSensitivity: 25,
      metabolicNeutrality: 65,
    },
    sideEffects: [
      "Nausea",
      "Constipation",
      "Hyperhidrosis",
      "Heart rate increase",
      "Urinary hesitancy",
    ],
    clinicalNotes:
      "More potent norepinephrine reuptake inhibition than other SNRIs. May increase heart rate and blood pressure. Not recommended for patients sensitive to adrenergic stimulation.",
  },
]

export type Priority = "autonomicStability" | "sexualHealth" | "adrenalineSensitivity" | "metabolicNeutrality"

export const priorityLabels: Record<Priority, string> = {
  autonomicStability: "Autonomic Stability",
  sexualHealth: "Sexual Health",
  adrenalineSensitivity: "Low Adrenaline",
  metabolicNeutrality: "Metabolic Neutrality",
}

export const priorityDescriptions: Record<Priority, string> = {
  autonomicStability: "Minimize effects on heart rate, blood pressure, and nervous system",
  sexualHealth: "Reduce sexual side effects like decreased libido or dysfunction",
  adrenalineSensitivity: "Avoid medications that increase norepinephrine/adrenaline",
  metabolicNeutrality: "Minimize weight gain and metabolic changes",
}
