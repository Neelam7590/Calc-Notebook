import type { CalculatorId } from '@/components/top-bar';

export type BestForLayout = 'syllabus' | 'homebuyer' | 'invoice' | 'health' | 'applications' | 'counter';

export type BestForSection = { heading: string; paragraphs: string[] };

export type BestForCategory = {
  slug: string;
  name: string;
  eyebrow: string;
  theme: string;
  layout: BestForLayout;
  title: string;
  metaDescription: string;
  lead: string;
  intro: string;
  tools: CalculatorId[];
  steps?: string[];
  checks?: string[];
  examples?: { q: string; a: string }[];
  sections: BestForSection[];
  tips: string[];
  note: string;
};

export const bestForCategories: BestForCategory[] = [
  {
    slug: 'students',
    name: 'Students',
    eyebrow: 'EXAM SEASON · STUDENTS',
    theme: 'indigo',
    layout: 'syllabus',
    title: 'Calculators for Students – CGPA, Percentage & Age Tools | Calc Notebook',
    metaDescription: 'Student calculators: convert CGPA to percentage, check exact age for admission forms, and work out marks and percentages instantly. Free, private, no signup.',
    lead: 'For the marks, the dates, and the late-night conversion nobody taught you.',
    intro:
      'A student\u2019s life is one running list of numbers: the CGPA to convert for an application, the percentage needed for eligibility, the date of birth that keeps appearing on every form. Our tools turn each one into a two-second answer instead of a ten-minute double-check.',
    tools: ['cgpa', 'percentage', 'age'],
    steps: [
      'Gather your grade points and credits for the semester.',
      'Add each subject\u2019s grade point and credit value into the CGPA tool.',
      'Get the weighted average, then estimate the percentage equivalent for forms.',
      'Before admission cut-offs, check your exact age from your date of birth.',
      'Solve the scholarship percentage question both ways \u2014 "X% of Y" and "X is what % of Y".',
    ],
    checks: [
      'Grade points entered for every subject',
      'Credits filled, not left blank',
      'CGPA estimated against the institute rule',
      'Age converted for the admission form',
      'One percentage question solved each way',
    ],
    sections: [
      {
        heading: 'Why CGPA first',
        paragraphs: [
          'Most Indian colleges and scholarships quote a percentage when it matters. The CGPA calculator uses the standard weighted formula and lets you add as many subjects as you need, so the number you carry into a form at least matches your own record.',
          'The official conversion is ultimately the institution\u2019s rule, so treat the tool as your quick estimate and submit whatever the registrar\u2019s note says when documents are official.',
        ],
      },
      {
        heading: 'The date nobody lets you type twice',
        paragraphs: [
          'Admission portals ask for your date of birth in a dozen different formats. The age calculator reads the calendar once and gives years, months, days, and total days lived \u2014 enough to fill any slot without a pause.',
        ],
      },
      {
        heading: 'Percentages under pressure',
        paragraphs: [
          'Scholarship thresholds, cut-offs, and internal assessments are percentage questions wearing different clothes. Two modes \u2014 finding a part of a whole, or finding what percentage one number is of another \u2014 cover almost every version of the question.',
        ],
      },
    ],
    tips: [
      'Estimate CGPA before results day, not the night before the deadline.',
      'Keep grade points to one decimal so the weighted average stays clean.',
      'A one-day error in a birth date can change your eligibility \u2014 check the age twice.',
      'Verify your conversion against the institute\u2019s published scale before official forms.',
    ],
    note: 'The CGPA tool uses the standard 10-point weighted formula. Institutions define their own conversion scales, so confirm before submitting official documents.',
  },
  {
    slug: 'homebuyers',
    name: 'Homebuyers',
    eyebrow: 'FIRST HOME · HOMEBUYERS',
    theme: 'gold',
    layout: 'homebuyer',
    title: 'Calculators for Homebuyers – Stamp Duty, EMI & Down Payment Tools | Calc Notebook',
    metaDescription: 'Homebuyer calculators: estimate Haryana stamp duty and registration, compare home loan EMI, and size a down payment. Free, private, on-device.',
    lead: 'For the biggest numbers you will sign in years.',
    intro:
      'Buying a home in Haryana means holding three different numbers in your head at once: the down payment, the monthly EMI, and the stamp duty plus registration you will pay at the registry office. Our tools put all three on paper before you commit.',
    tools: ['stamp-duty', 'emi', 'percentage'],
    steps: [
      'Work out your down payment as a percentage of the sale price.',
      'Enter the loan amount, rate, and tenure in the EMI tool to see the real monthly cost.',
      'Check the circle rate for the exact locality \u2014 duty is paid on the higher of agreement value and circle rate.',
      'Add the slab-based registration fee in the stamp duty tool.',
      'Decide the deed name: female and joint ownership carry a lower duty rate.',
      'Budget the sum of all three before you finalise.',
    ],
    sections: [
      {
        heading: 'The down payment question',
        paragraphs: [
          'The percentage calculator handles the quiet 20% question \u2014 how much of the price you need before a bank looks at you seriously. Put your sale price in the first slot and 20 in the second, and you have your savings target.',
        ],
      },
      {
        heading: 'EMI is a plan, not a promise',
        paragraphs: [
          'Our EMI figure uses a standard reducing-balance formula and shows the total interest and total repayment over the full tenure \u2014 the number most buyers discover too late. Lenders add processing fees and their own rounding, so compare the tool against your sanction letter rather than against your hopes.',
        ],
      },
      {
        heading: 'The registry day you cannot skip',
        paragraphs: [
          'Stamp duty and registration are paid once, but they are not small. The stamp duty tool combines the category rate with the slab-based registration fee and reminds you when the circle rate pushes the base higher, so the total is on your budget before the registrar\u2019s counter rings.',
        ],
      },
    ],
    tips: [
      'Always estimate duty on the higher of agreement value and the notified circle rate for the exact sector.',
      'Test your EMI at a rate half a point higher to build a buffer for revisions.',
      'Keep the registration fee separate in the budget \u2014 it is slab-based and often overlooked.',
      'Confirm the current Haryana rates with the sub-registrar before registration day.',
    ],
    note: 'The stamp duty estimate is a planning range. The exact figure is fixed by the sub-registrar under current Haryana rules and the notified circle rate for your locality.',
  },
  {
    slug: 'business-owners',
    name: 'Business Owners',
    eyebrow: 'INVOICE MATH · BUSINESS OWNERS',
    theme: 'plum',
    layout: 'invoice',
    title: 'Calculators for Business Owners – GST, Margin & Loan Tools | Calc Notebook',
    metaDescription: 'Business calculators: add or remove GST on invoices, check margins with the percentage tool, and size a working-capital loan with the EMI calculator. Free and private.',
    lead: 'For invoices, margins, and the loan that keeps the lights on.',
    intro:
      'A business runs on three recurring sums: how much GST sits on an invoice, what the margin really is after the discounts, and whether the monthly instalment on that machine or warehouse is affordable. Each one is a two-input calculation, and each one is risky to guess.',
    tools: ['gst', 'percentage', 'emi'],
    sections: [
      {
        heading: 'The GST question on every invoice',
        paragraphs: [
          '"Add GST" tells you what a customer actually pays when you quote a base price. "Remove GST" tells you your true receipt when a customer insists on an inclusive figure. Both matter more than the rate itself, because they protect your margin from eroding one line item at a time.',
        ],
      },
      {
        heading: 'Margin, honestly',
        paragraphs: [
          'Discounts and quantity deals hide in percentage form: "10% off" after "5% up" is not 15%. The percentage tool resolves the multi-step correctly, so the end-of-day profit figure matches reality at reconciliation.',
        ],
      },
      {
        heading: 'Asset and working-capital loans',
        paragraphs: [
          'The EMI calculator sizes a machine purchase or warehouse loan honestly \u2014 monthly amount, total interest, full repayment \u2014 so the cash-flow decision is made on the total, not the monthly teaser figure.',
        ],
      },
    ],
    tips: [
      'Quote base price with GST added; reconcile inclusive bills by removing GST.',
      'Test the loan EMI against two slow months of revenue before signing.',
      'Confirm your GST rate class per item \u2014 presets are starting points, the class is legal.',
      'Use the percentage tool for quantity discounts and buy-one-get-one equivalents.',
    ],
    note: 'GST rates change through government notifications. Always confirm the applicable rate class for the goods or services before pricing an invoice.',
  },
  {
    slug: 'health',
    name: 'Health-Conscious Users',
    eyebrow: 'WELLBEING HABIT · HEALTH-CONSCIOUS USERS',
    theme: 'sage',
    layout: 'health',
    title: 'Calculators for Health-Conscious Users – BMI & Age Tools | Calc Notebook',
    metaDescription: 'Quick health calculators: a BMI snapshot from height and weight, exact age from a date of birth, and percentage math for nutrition \u2014 free, private, no account.',
    lead: 'For a small habit that keeps the bigger picture honest.',
    intro:
      'Being health-conscious rarely needs a medical device \u2014 it needs a few honest numbers taken regularly. Height and weight into a BMI snapshot, an exact age from a date of birth, and the occasional percentage for nutrition math. Small, private, repeatable.',
    tools: ['bmi', 'age', 'percentage'],
    sections: [
      {
        heading: 'The snapshot, not the diagnosis',
        paragraphs: [
          'BMI is a screening classification \u2014 a number for tracking direction, not a verdict. It cannot tell muscle from fat or account for age, ethnicity, or existing conditions. Use it as a prompt to check in with a doctor, and let the trend, not any single reading, guide you.',
        ],
      },
      {
        heading: 'Age, quietly useful',
        paragraphs: [
          'From vaccination schedules and reduced-dosage guidance to insurance reviews, an exact age from a date of birth resolves most questions in seconds. Keep your birth date at hand and let the tool do the calendar work.',
        ],
      },
      {
        heading: 'Nutrition percentages',
        paragraphs: [
          'Portion math, macro splits, and label reading are all percentage questions. Solve "what is X% of Y" without a label\u2019s fine print getting the better of you.',
        ],
      },
    ],
    tips: [
      'Weigh and measure at the same time of day for a comparable trend.',
      'Log every BMI with the same inputs \u2014 same morning, honest record.',
      'Pair the BMI number with a real check-up, never in place of one.',
      'Use "X is what % of Y" when splitting an allowance across servings.',
    ],
    note: 'BMI is a general screening measure. It is not a medical diagnosis and does not replace advice from a qualified doctor.',
  },
  {
    slug: 'job-seekers',
    name: 'Job Seekers',
    eyebrow: 'APPLICATIONS · JOB SEEKERS',
    theme: 'clay',
    layout: 'applications',
    title: 'Calculators for Job Seekers – Age, Percentage & CGPA Tools | Calc Notebook',
    metaDescription: 'Job-seeker calculators: check exact age against eligibility cut-offs, convert CGPA to percentage for applications, and verify marks calculations. Free and private.',
    lead: 'For the eligibility columns every application hides.',
    intro:
      'Job applications in India are full of gates: a minimum age on a given date, a percentage in qualifying exams, a CGPA for the fresher shortlist. One wrongly entered date or a bad conversion can quietly end your application. Our tools cover the three checks that decide most forms.',
    tools: ['age', 'percentage', 'cgpa'],
    sections: [
      {
        heading: 'The age gate',
        paragraphs: [
          'Vacancies state age limits "as on" a reference date. The age calculator computes the difference exactly from your date of birth, so you can verify your candidate status before investing hours in a form.',
        ],
      },
      {
        heading: 'Percentage proof',
        paragraphs: [
          'Many boards ask for a percentage even when your degree lists CGPA. Estimate the equivalent with the CGPA tool, then recompute with your actual marks whenever the document demands a direct percentage.',
        ],
      },
      {
        heading: 'The document habit',
        paragraphs: [
          'Keep a small digital note of your date of birth, CGPA, and final percentage in one place. When the application window opens at 11 PM, you will be filling it out, not hunting for old mark sheets.',
        ],
      },
    ],
    tips: [
      'Compute age against the vacancy\u2019s reference date, not today, when the notification specifies one.',
      'Convert CGPA with the institution\u2019s published scale when it states one.',
      'Run the percentage check on the exact qualifying exam, not the aggregate of all years.',
      'Shortlist yourself with these numbers, then read the notification carefully before submitting.',
    ],
    note: 'Official eligibility is decided by the recruiting authority under its published rules. Use these numbers to shortlist yourself, then read the notification carefully.',
  },
  {
    slug: 'shoppers',
    name: 'Everyday Shoppers',
    eyebrow: 'AT THE COUNTER · EVERYDAY SHOPPERS',
    theme: 'teal',
    layout: 'counter',
    title: 'Calculators for Everyday Shoppers – Discount & GST Tools | Calc Notebook',
    metaDescription: 'Shopping calculators: work out "X% off", find the final GST-inclusive price, and see what a discount really saves. Free, instant, private.',
    lead: 'For the tags, the offers, and the "is this actually a deal?" moment.',
    intro:
      'Shopping these days is a percentage story: "flat 30% off", "up to 20% plus GST", "extra 5% on first order". Each offer hides its real number. Two tools \u2014 the percentage calculator and the GST calculator \u2014 strip the tag down to what you will actually pay.',
    tools: ['percentage', 'gst'],
    examples: [
      { q: '30% off \u20b9800 — the real saving.', a: '30% of 800 is \u20b9240, so you pay \u20b9560. The moment stores stack offers or switch to inclusive pricing, the math stops being off-the-top-of-your-head.' },
      { q: '\u20b91,200 at 18% GST.', a: 'Adding 18% gives \u20b91,416. Removing GST backwards reveals the base \u20b91,016.95 when a price is bundled. That one check stops the most common "came to more than the tag" surprise.' },
      { q: 'Two shops, two offers — which is cheaper?', a: 'Convert both offers into a single final amount with the GST tool, or a single percentage with the percentage tool, and the comparison is honest.' },
      { q: 'Cashback that is not what it looks like.', a: '"100% cashback" on points is rarely a rupee-for-rupee capture. Check "X is what % of Y" to see the true capture rate before you chase it.' },
    ],
    sections: [
      {
        heading: 'Discount math',
        paragraphs: [
          '30% off \u20b9800 is a clean \u20b9240 saving — when it is simple. The moment stores stack offers or switch to inclusive pricing, the arithmetic stops being off-the-top-of-your-head. "X% of Y" settles it in one line.',
        ],
      },
      {
        heading: 'GST in the final price',
        paragraphs: [
          'A \u20b91,200 item at 18% GST is not \u20b91,200. "Add GST" shows the real outgo, and "Remove GST" reveals the base when a price is bundled. That single check stops the most common "the bill was more than the tag" surprise.',
        ],
      },
      {
        heading: 'The easy compare',
        paragraphs: [
          'Unit prices and effective discounts across two shops only become comparable once you convert both into a single percentage or a single final amount — which is exactly what these tools produce.',
        ],
      },
    ],
    tips: [
      'Convert every offer to a final amount, then compare across shops.',
      'Check "what % of" for loyalty points and cashback — the capture rate is rarely the headline rate.',
      'Add GST to the tag before comparing with an online price that says "inclusive".',
      'Use the same inputs on both tools to see the difference between list price and true outgo.',
    ],
    note: 'Every offer has fine print. Use the tools to get to the true number, then let the small print decide whether it was worth it.',
  },
];