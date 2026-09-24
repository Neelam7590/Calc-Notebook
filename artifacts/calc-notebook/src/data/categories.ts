import type { CalculatorId } from '@/components/top-bar';

export type CategoryLayout = 'finance' | 'tax' | 'property' | 'health' | 'student' | 'math';

export type CalculatorCategory = {
  slug: string;
  name: string;
  eyebrow: string;
  theme: string;
  layout: CategoryLayout;
  title: string;
  metaDescription: string;
  lead: string;
  intro: string;
  tools: CalculatorId[];
  tips: string[];
  note: string;
  steps?: string[];
  chips?: string[];
  facts?: { label: string; value: string }[];
  questions?: { q: string; a: string }[];
  examples?: { q: string; a: string }[];
  timeline?: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

export const calculatorCategories: CalculatorCategory[] = [
  {
    slug: 'finance-loans',
    name: 'Finance & Loans',
    eyebrow: 'MONEY MONTHLY · FINANCE & LOANS',
    theme: 'gold',
    layout: 'finance',
    title: 'Finance & Loans Calculators – EMI & Interest Tools | Calc Notebook',
    metaDescription: 'Loan calculators for finance: home loan EMI with total interest, Haryana stamp duty, and down-payment percentages. Free, private, on-device.',
    lead: 'For putting a price on borrowing — before you sign.',
    intro:
      "Behind every loan sits one honest question: what will this actually cost each month? The tools here put the monthly payment, the interest total, and the one-time charges on paper before any promise is signed.",
    tools: ['emi', 'stamp-duty', 'percentage'],
    steps: [
      'Start with the loan amount you plan to borrow, not the price of the thing you are buying.',
      'Fix the interest rate and tenure before you compare offers — changing one swings the total.',
      'Read the EMI as a monthly number plus the total-interest line, because that is the real cost of the loan.',
      'For property, add Haryana stamp duty and registration before you set the final budget.',
      'Size the down payment as a percentage so your savings target is clear and reachable.',
    ],
    sections: [
      {
        heading: 'EMI before the pitch',
        paragraphs: [
          'Lenders quote a rate, but the number that enters your budget is the monthly instalment. The EMI tool uses the standard reducing-balance formula and shows the total interest across the full tenure, so a comparison between two offers uses the same ground.',
          'Your sanction letter remains the final word — banks add processing fees and their own rounding to the arithmetic.',
        ],
      },
      {
        heading: 'The interest nobody reads',
        paragraphs: [
          'A lower EMI can feel like a win until you notice the total interest line. Run the same amount at two tenures and an extra year can quietly add a meaningful total. The tool’s result panel puts interest and total payment right next to the monthly figure on purpose.',
        ],
      },
      {
        heading: 'Charges beyond the rate',
        paragraphs: [
          'Interest is not the only cost. For property loans in Haryana, stamp duty and registration arrive as a single unavoidable bill on registration day, and the down payment is its own savings target. The percentage tool sizes that target; the stamp duty tool prices the registry day.',
        ],
      },
    ],
    tips: [
      'Compare lenders using the same amount, rate, and tenure so the only variable left is the actual price.',
      'A slightly longer tenure lowers the EMI but raises total interest — run both before deciding.',
      'Keep the registry money separate from the down payment in your budget plan.',
      'Ask about processing fees and prepayment charges once, then write the answer down.',
    ],
    note: 'EMI figures are standard reducing-balance estimates. Your lender’s sanction letter, including fees and rounding, is the final word.',
  },
  {
    slug: 'tax-gst',
    name: 'Tax & GST',
    eyebrow: 'TAX BASICS · TAX & GST',
    theme: 'sky',
    layout: 'tax',
    title: 'Tax & GST Calculators – Add or Remove GST | Calc Notebook',
    metaDescription: 'GST calculators: add GST to a base amount, remove it to find the base price, and check percentages for pricing and margins. Free and private.',
    lead: 'For quoting prices that survive an audit.',
    intro:
      "Every invoice is two numbers wearing one: the base price and the tax on top. The GST tool separates them cleanly in either direction — add tax for a quote, or remove it to recover your actual margin and cost basis.",
    tools: ['gst', 'percentage', 'stamp-duty'],
    chips: ['5% essentials', '12% most goods', '18% services & more', '28% luxuries', 'IGST for inter-state'],
    sections: [
      {
        heading: 'The two directions',
        paragraphs: [
          'Adding GST starts from the base amount and lands on the total the customer pays. Removing GST starts from the total and lands on the base — the number you need when a bill arrives with tax already bundled in. Both directions run on the same rate, so switching modes never changes the math.',
        ],
      },
      {
        heading: 'Reading your margin',
        paragraphs: [
          'A shopkeeper quoting 18% on a price is adding tax; a buyer inspecting a GST-inclusive receipt is removing it. The percentage tool finishes the loop — the actual margin on a sale, or the discount on a purchase, is a percentage question wearing a price tag.',
        ],
      },
      {
        heading: 'Rates change by notification',
        paragraphs: [
          'GST classes move by government notification, and service versus goods can sit at different rates. Treat the preset rate buttons as convenient starting points and confirm the class for your item once the invoice becomes official.',
        ],
      },
    ],
    tips: [
      'Quote with tax included to avoid a pricing surprise at the counter.',
      'Remove GST from any GST-inclusive receipt when you need your real margin or cost basis.',
      'Inter-state sales use IGST — confirm the goods or service class before finalising.',
      'Rates change by notification; the preset buttons are a starting point, not a guarantee.',
    ],
    note: 'GST rates change by official notification. Confirm the rate class for your goods or service before finalising a supplier invoice.',
  },
  {
    slug: 'property-real-estate',
    name: 'Property & Real Estate',
    eyebrow: 'BRICK BY BRICK · PROPERTY & ESTATE',
    theme: 'coral',
    layout: 'property',
    title: 'Property Calculators – Stamp Duty, Loan EMI & Down Payment | Calc Notebook',
    metaDescription: 'Property calculators for Haryana home buyers: stamp duty and registration cost, loan EMI, and down-payment percentages. Free, private, on-device.',
    lead: 'For the numbers between the site tour and the title deed.',
    intro:
      "Property is bought on two budgets: the price you negotiate and the costs that arrive around it. The tools here cover the registry charge, the loan instalment, and the down-payment target — before any of them can surprise you.",
    tools: ['stamp-duty', 'emi', 'percentage'],
    facts: [
      { label: 'Tax base', value: 'Higher of agreement value & circle rate' },
      { label: 'Urban rate', value: '7% standard for individual male buyer' },
      { label: 'Rural rate', value: '5% standard for individual male buyer' },
      { label: 'Discounts', value: 'Female & joint buyers pay lower duty' },
      { label: 'Registration', value: 'Slab-based fee with an upper cap' },
    ],
    sections: [
      {
        heading: 'The price and the base',
        paragraphs: [
          'Stamp duty is paid on the higher of the agreement value and the notified circle rate for the locality. When a plot size is entered, the tool compares the implied circle-rate base against the entered value and charges duty on the larger one — the way the registrar will.',
        ],
      },
      {
        heading: 'Budgets beyond the price',
        paragraphs: [
          'The registry produces two bills: stamp duty and a slab-based registration fee. Neither is small and both are due in one go on registration day. The result panel shows them separately and then as a total, so the complete cost is inside the budget before the counter rings.',
        ],
      },
      {
        heading: 'Deed names matter',
        paragraphs: [
          'Haryana applies reduced duty to female and joint ownership, and the rate differs between municipal and rural zones. Choose the option that matches the real ownership of the deed — the discount is a rule, not a loophole to chase.',
        ],
      },
    ],
    tips: [
      'Ask the seller for the locality circle rate, then check the notified list yourself before quoting duty.',
      'Keep registry money liquid — it is due in one payment, not spread across months.',
      'Where the plot size is known, enter it so the tool compares agreement value against the circle-rate base.',
      'Name the deed to match real ownership; never alter it just to lower duty.',
    ],
    note: 'The estimate follows Haryana category rates and the district reference circle rate. The notified list at the sub-registrar is final.',
  },
  {
    slug: 'health-fitness',
    name: 'Health & Fitness',
    eyebrow: 'BODYWORK · HEALTH & FITNESS',
    theme: 'sage',
    layout: 'health',
    title: 'Health Calculators – BMI & Exact Age for Fitness Plans | Calc Notebook',
    metaDescription: 'Health calculators: BMI category check and exact age in years, months and days — handy for fitness plans, medical forms and check-ups. Free, private.',
    lead: 'For tracking the quiet numbers behind a fitter year.',
    intro:
      "Health routines run on signals, not verdicts: a BMI snapshot, an age recorded exactly for a check-up or medical form, and honest percentages for goals. Each tool gives a fast reference while a real check-up stays the final word.",
    tools: ['bmi', 'age', 'percentage'],
    sections: [
      {
        heading: 'BMI is a hint, not a diagnosis',
        paragraphs: [
          'The BMI tool converts height and weight into a four-band scale — underweight, normal, overweight, obese — in a glance. It is a screening signal built for trends, not a clinical verdict, and it should never replace a proper health check.',
        ],
      },
      {
        heading: 'Age, down to the day',
        paragraphs: [
          'Medical forms, insurance quotes, and eligibility checks all want your age in a specific format. The age tool reads the calendar once and gives years, months, days, and total days lived — enough to fill any slot without a second thought.',
        ],
      },
      {
        heading: 'Percentages for goals',
        paragraphs: [
          'Fitness targets are percentage questions: the share of a goal reached, the reduction aimed for, the progress made against a plan. The percentage tool answers either direction in a single form.',
        ],
      },
    ],
    tips: [
      'Measure height without shoes and weigh at the same time of day for a fair comparison.',
      'Recheck monthly — a trend matters more than any single number.',
      'Run your exact age for medical forms before you arrive at the clinic.',
      'Pair any percentage-based goal with a doctor’s advice, not the other way round.',
    ],
    note: 'BMI is a general screening measure. Use it as one signal alongside a proper health check, not as a diagnosis.',
  },
  {
    slug: 'student-tools',
    name: 'Student Tools',
    eyebrow: 'EXAM MATH · STUDENT TOOLS',
    theme: 'indigo',
    layout: 'student',
    title: 'Student Calculators – CGPA, Percentage & Age | Calc Notebook',
    metaDescription: 'Tools for students: CGPA to percentage estimates, exact age for admission forms, and percentage questions solved instantly. Free, private, no signup.',
    lead: 'For the marks, the dates, and the conversions that wait until 11 pm.',
    intro:
      "Student life is a running list of small numbers: the CGPA a form wants converted, the exact date of birth an admission portal demands, and the percentage a cut-off asks for. Each tool turns one of those into a two-second answer instead of a ten-minute double-check.",
    tools: ['cgpa', 'percentage', 'age'],
    timeline: [
      'Collect the semester grade points and credit values.',
      'Find the weighted CGPA, then estimate the percentage equivalent for forms.',
      'Confirm the exact age from the date of birth on your documents.',
      'Solve the cut-off percentage question in whichever direction the form asks.',
    ],
    sections: [
      {
        heading: 'CGPA first, questions later',
        paragraphs: [
          'Most colleges and scholarships quote a percentage when it matters, and the CGPA tool estimates one from the standard weighted formula. Subject names stay optional, so a quick pass works even at midnight before a deadline.',
        ],
      },
      {
        heading: 'The date that appears everywhere',
        paragraphs: [
          'Admission portals ask for a date of birth in a dozen formats. The age tool reads the calendar once and returns years, months, days, and total days lived — enough to fill any slot without a pause that invites a typo.',
        ],
      },
      {
        heading: 'Percentage questions wear disguises',
        paragraphs: [
          'Scholarship thresholds and cut-offs are the same two percentage shapes repeated: a part of a whole, or one number as a share of another. Having both modes means any phrasing of the question lands in seconds.',
        ],
      },
    ],
    questions: [
      {
        q: 'How is CGPA converted to percentage?',
        a: 'The tool uses the standard 10-point weighted average — summing grade point × credits and dividing by total credits. The percentage equivalent is an estimate; the institution’s published conversion scale is the official rule for documents.',
      },
      {
        q: 'Why can a one-day age error matter?',
        a: 'Eligibility cut-offs for exams, schemes, and admissions are often date-specific. One day can flip a birth date across a threshold, so the age tool reads the calendar to the day before any form is filled.',
      },
      {
        q: 'X% of Y versus X is what % of Y — when do I use each?',
        a: 'The first finds a part of a whole (15% of 240), the second finds the share in percentage terms (30 is what % of 120). Admission and scholarship questions appear in both shapes, so the tool has both modes.',
      },
    ],
    tips: [
      'Keep grade points to one decimal so the weighted average stays clean.',
      'Run the age check the day before the deadline, not the night of.',
      'Estimate first, then verify against your institute’s official conversion scale.',
      'Answer percentage cut-off questions in both modes to match how the form phrases it.',
    ],
    note: 'The CGPA tool uses the standard 10-point weighted formula; your institution’s conversion scale is the official rule for official documents.',
  },
  {
    slug: 'everyday-math',
    name: 'Everyday Math',
    eyebrow: 'TINY SUMS, EVERY DAY · EVERYDAY MATH',
    theme: 'amber',
    layout: 'math',
    title: 'Everyday Math Calculators – Percentage & GST Quick Tools | Calc Notebook',
    metaDescription: 'Quick everyday math: percentages, discounts, GST on bills, and simple arithmetic for shopping, splitting costs, and daily life. Free, private, instant.',
    lead: 'For the small sums that happen ten times a day.',
    intro:
      "Daily life is made of quiet math: the 12% discount at the store, the GST inside a bill, the share of a shared expense. The everyday tools answer them in a moment on your own device — no signup, no data leaving your phone.",
    tools: ['percentage', 'gst'],
    examples: [
      {
        q: 'A ₹800 jacket at 15% off — what do you pay?',
        a: '15% of 800 is 120, so the jacket comes to 680. The percentage calculator does this in one line: 15% of 800 = 120, then subtract from the price.',
      },
      {
        q: 'Dinner bill shows ₹2,360 GST-inclusive at 18% — what is the base?',
        a: 'Removing 18% from 2,360 gives a base of 2,000 and GST of 360. The GST tool runs this in the remove direction and returns both numbers.',
      },
      {
        q: 'The shop says “15% off” but also “GST extra” — does it stack?',
        a: 'Apply the discount to the base first, then add GST on the discounted amount. A single percentage plus a GST pass gives the final payable.',
      },
    ],
    sections: [
      {
        heading: 'Shop receipts read differently',
        paragraphs: [
          'A bill can show a discount and a tax in the same line. Breaking them apart — percentage for the discount, GST for the tax on top — shows exactly what the purchase cost, one step at a time.',
        ],
      },
      {
        heading: 'Quoting with tax on top',
        paragraphs: [
          'Anyone selling goods or services quotes a base and adds tax to it. Doing that in reverse — removing tax from a total — recovers the true base and margin, which is the number a business actually keeps.',
        ],
      },
      {
        heading: 'When percentages reverse',
        paragraphs: [
          '“What is 15% of a number?” and “this number is what % of that?” are the same family of math in opposite directions. Keeping both modes handy covers almost every everyday percentage question that appears in a shop, a kitchen, or a shared bill.',
        ],
      },
    ],
    tips: [
      'On the spot, anchor on 10% and scale — 15% is 10% plus half again.',
      'Remove GST whenever a bill bundles tax, to reach the real base price.',
      'Round once at the end, not at every step — the answer stays closer to the truth.',
    ],
    note: 'Percentage and GST tools are pure arithmetic and stay on your device. Confirm the GST rate class once for anything official.',
  },
];