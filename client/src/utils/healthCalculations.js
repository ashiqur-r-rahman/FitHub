// Health Metric Calculations & Unit Helpers

export const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm || heightCm <= 0) {
    return { bmi: 0, category: 'Unknown', categoryCode: 'unknown' };
  }

  const heightMeters = heightCm / 100;
  const bmiVal = weightKg / (heightMeters * heightMeters);
  const bmi = Math.round(bmiVal * 10) / 10;

  let category = 'Normal weight';
  let categoryCode = 'normal';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryCode = 'underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal weight';
    categoryCode = 'normal';
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    category = 'Overweight';
    categoryCode = 'overweight';
  } else {
    category = 'Obese';
    categoryCode = 'obese';
  }

  return { bmi, category, categoryCode };
};

export const calculateBMR = (weightKg, heightCm, age, gender = 'female') => {
  if (!weightKg || !heightCm || !age) return 1600;
  const w = Number(weightKg);
  const h = Number(heightCm);
  const a = Number(age);

  let bmr = 0;
  if (gender?.toLowerCase() === 'male') {
    bmr = 10 * w + 6.25 * h - 5 * a + 5;
  } else if (gender?.toLowerCase() === 'female') {
    bmr = 10 * w + 6.25 * h - 5 * a - 161;
  } else {
    bmr = 10 * w + 6.25 * h - 5 * a - 78;
  }

  return Math.round(bmr);
};

export const calculateTDEE = (bmr, activityLevel = 'Balanced') => {
  if (!bmr) return 2000;
  const multipliers = {
    Sedentary: 1.2,
    Balanced: 1.375,
    Active: 1.55,
    'High intensity': 1.725,
  };

  const mult = multipliers[activityLevel] || 1.375;
  return Math.round(bmr * mult);
};

export const calculateIdealWeightRange = (heightCm) => {
  if (!heightCm || heightCm <= 0) return { minKg: 50, maxKg: 70 };
  const heightM = heightCm / 100;
  const minKg = Math.round(18.5 * heightM * heightM * 10) / 10;
  const maxKg = Math.round(24.9 * heightM * heightM * 10) / 10;
  return { minKg, maxKg };
};

export const calculateWaterRecommendation = (weightKg) => {
  if (!weightKg) return { liters: 2.1, glasses: 8 };
  const liters = Math.round(weightKg * 0.033 * 10) / 10;
  const glasses = Math.round(liters / 0.25);
  return { liters, glasses };
};

// Unit Conversions
export const kgToLbs = (kg) => Math.round(kg * 2.20462 * 10) / 10;
export const lbsToKg = (lbs) => Math.round((lbs / 2.20462) * 10) / 10;

export const cmToFtIn = (cm) => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches, formatted: `${feet}′${inches}″` };
};

export const ftInToCm = (feet, inches) => {
  const f = Number(feet) || 0;
  const i = Number(inches) || 0;
  return Math.round((f * 12 + i) * 2.54);
};
