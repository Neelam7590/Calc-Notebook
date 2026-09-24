export type AreaLayout =
  | 'spotlight'
  | 'timeline'
  | 'columns'
  | 'accordion'
  | 'goalcards'
  | 'checklist'
  | 'split'
  | 'stripes'
  | 'statcards'
  | 'pullquote'
  | 'chipgrid'
  | 'sidebar'
  | 'digest';

export type AreaFact = { label: string; value: string };
export type AreaStat = { value: string; label: string };
export type AreaQa = { q: string; a: string };

export type HaryanaArea = {
  slug: string;
  name: string;
  theme: string;
  layout: AreaLayout;
  eyebrow: string;
  title: string;
  metaDescription: string;
  lead: string;
  intro: string;
  profile: string[];
  tips: string[];
  stamp: string;
  timeline?: string[];
  goals?: { title: string; text: string }[];
  steps?: string[];
  facts?: AreaFact[];
  stats?: AreaStat[];
  questions?: AreaQa[];
  quote?: string;
  chips?: string[];
  digest?: string[];
  sections?: { title: string; body: string }[];
};

export const haryanaAreas: HaryanaArea[] = [
  {
    slug: 'sonipat',
    name: 'Sonipat',
    theme: 'coral',
    layout: 'spotlight',
    eyebrow: 'NH-44 CORRIDOR · SONIPAT',
    title: 'Calculators for People in Sonipat – Stamp Duty, EMI, Age & More | Calc Notebook',
    metaDescription: 'Local calculators for Sonipat: estimate stamp duty with circle-rate checks, home loan EMI, exact age, BMI, GST and CGPA. Free, private, no signup.',
    lead: 'The quiet middle ground of Haryana, where field and sector meet.',
    intro:
      'Sonipat stretches along the NH-44 corridor halfway between Delhi and Panipat, its farmlands slowly giving way to residential sectors and new colonies. For the people who live here, the numbers that matter cluster around land: the value on the sale deed, the circle rate fixed for the area, and the loan that turns a plot into a home.',
    profile: [
      'Old Sonipat still runs on shopfronts and daily dealing in the grain and vegetable markets, while new development gathers around Murthal, Bundu, and the HSVP sectors. Property here moves between a family plot, a first flat, and farmland converting to residential use — which makes stamp duty a question every buyer faces, rarely an expert one.',
      'Outside property, household budgets follow familiar patterns: a loan payment, school fees, a shop run, a health check-up. None of those sums is large enough to need a spreadsheet, but together they decide how comfortable the month feels. A quick calculator keeps each one straight.',
    ],
    tips: [
      'Check the agreement value in your sale deed against the circle rate notified for your Sonipat locality before you fix the stamp duty estimate.',
      'Use the EMI calculator with the exact interest rate your bank quoted — teaser rates in advertising usually rise after a year or two.',
      'Calculate GST both ways when pricing retail or service invoices: add it for quotes, remove it to find the base price you actually receive.',
      'Run the BMI check alongside an actual doctor visit; the number is a hint, not a diagnosis.',
    ],
    stamp:
      'Stamp duty in Sonipat depends on whether the property sits inside municipal limits and on who is on the deed — women and joint ownership often carry a lower rate. Circle rates vary sharply between the old town and the newer HSVP sectors, so confirm the locality rate with the sub-registrar before registering. The calculator gives you the range to plan with.',
  },
  {
    slug: 'panipat',
    name: 'Panipat',
    theme: 'gold',
    layout: 'timeline',
    eyebrow: 'WEAVING CITY · PANIPAT',
    title: 'Calculators for People in Panipat – Stamp Duty, Home Loans & More | Calc Notebook',
    metaDescription: 'Free calculators for Panipat: stamp duty and registration estimates, home loan EMI, exact age, BMI, GST and CGPA. Runs on your device, no account needed.',
    lead: 'A town known for textiles and three historic battles — where counting always mattered.',
    intro:
      'Panipat has been a place of numbers for centuries: grain weighed, textiles counted, armies measured. Today the numbers are quieter but closer to home — a flat in Sector 12 or 13, a loan for a powerloom unit, a daughter\'s admission date check, and the everyday percentage discount at the market.',
    profile: [
      'Home buyers here move between the old city, the new residential sectors, and villages around the northern bypass being absorbed into the town. The questions are practical: is the circle rate for my locality higher than what I agreed to pay, and does registering in a female buyer\'s name meaningfully cut the stamp duty?',
      'The weaving economy spreads across thousands of family units that run on thin working capital. A re-looming loan, a bigger electricity bill, a seasonal sales spike — small suppliers pencil these on paper. Our percentage and GST tools exist exactly for that kind of fast, honest math.',
    ],
    timeline: [
      'Walk the plot: note the size in square yards and the quoted rate per yard.',
      'Check the circle rate for that Panipat locality on the registrar\'s reference.',
      'Fix the stamp duty base — agreement value or circle rate, whichever is higher.',
      'Add the slab-based registration fee, then divide the total across months.',
      'Use an EMI check on the balance left after your down payment.',
      'Budget the monthly cost before you finalise the property.',
    ],
    tips: [
      'Asking prices in Sector 12/13 and the bypass colonies drift above notified circle rates — always let the calculator compare both before signing.',
      'For home loans, watch processing fees in the true cost; our EMI tool shows interest plus principal but not lender extras.',
      'Textile suppliers: use "remove GST" to know your actual base receipt when a buyer asks for a GST-inclusive price.',
      'Keep your exact date of birth handy for age checks on eligibility forms — the age tool settles it in seconds.',
    ],
    stamp:
      'Panipat applies Haryana\'s slab-based registration and category-based duty. Circle rates in the municipal area and the expanding sectors differ, so the estimate here uses a district reference and must be verified against your locality\'s notified rate at the sub-registrar before you pay.',
  },
  {
    slug: 'karnal',
    name: 'Karnal',
    theme: 'sky',
    layout: 'columns',
    eyebrow: 'GRAIN & MILK · KARNAL',
    title: 'Calculators for People in Karnal – Property, EMI, Age & More | Calc Notebook',
    metaDescription: 'Karnal calculators on Calc Notebook: stamp duty and circle-rate checks, home loan EMI, age, BMI, GST and CGPA tools — free and private.',
    lead: 'The city of the National Dairy Research Institute, where land and livestock anchor family wealth.',
    intro:
      'Karnal is agricultural headquarters country — rice and wheat that feed north India, milk science at the National Dairy Research Institute, and families who keep wealth in land more comfortably than in any bank product. Property questions therefore carry real weight here, and so does the paperwork around them.',
    profile: [
      'Land near Karnal is both livelihood and inheritance, passed down and sometimes sold to fund marriages, education, or a new house. When that sale happens — or a rural holding is converted and registered — stamp duty and circle rate become the two numbers everyone wants explained in plain language.',
      'The town also educates a growing number of young people who go on to colleges and professional courses. Their parents deal in grade-point averages and percentage conversions for eligibility, often late one evening before a deadline. Money, marks, and months of tenure — the everyday maths of a household.',
    ],
    tips: [
      'If you inherit land, confirm whether the transfer qualifies for exemption or a nominal duty before assuming the full rate applies.',
      'Compare EMI across lenders using the same amount, rate, and tenure so the difference you see is genuinely the loan cost.',
      'When schools ask for percentage from CGPA, use our tool as a first estimate, then check the institution\'s official conversion rule.',
      'A plot area in square yards with the locality\'s circle rate gives a far closer duty estimate than a guessed value.',
    ],
    stamp:
      'Karnal\'s notified circle rates vary between the urban municipal area and the surrounding rural blocks. Duty is charged by buyer category — female and joint buyers often pay less — on the higher of the agreement value and circle rate. Treat the figure as a planning range, then confirm with the registrar\'s office.',
  },
  {
    slug: 'kurukshetra',
    name: 'Kurukshetra',
    theme: 'sage',
    layout: 'accordion',
    eyebrow: 'HERITAGE TOWN · KURUKSHETRA',
    title: 'Calculators for People in Kurukshetra – Age, Stamp Duty, EMI & More | Calc Notebook',
    metaDescription: 'Free calculators for Kurukshetra: exact age from date of birth, stamp duty estimates, home loan EMI, BMI, GST and CGPA — quick, private, on-device.',
    lead: 'A sacred town where old land records and new family plans sit side by side.',
    intro:
      'Kurukshetra wears history lightly — temples and the tirtha draw pilgrims year-round, while the town itself keeps its everyday life unremarkable. Residents inherit a mix, too: land records going back generations and fresh questions about registering those plots, funding a bigger house, or counting an elderly parent\'s age correctly on applications.',
    profile: [
      'The town\'s property picture is unusual: plots often sit in families for generations, passing through mutation, gift, or partition rather than a clean market sale. When a purchase does happen, clarity on duty and registration matters because the amounts are anything but small.',
      'Pilgrimage brings its own small sums — donations in round numbers, percent splits among family, and travel budgets for the seasonal crowd. Simple calculators cover that kind of mental arithmetic in one step.',
    ],
    questions: [
      {
        q: 'Why is stamp duty lower for female and joint buyers in Kurukshetra?',
        a: 'Haryana offers reduced rates for property registered in a woman\'s name to encourage female ownership, and joint deeds follow a rate for their exact composition. Only the buyers named on the deed qualify, so decide the ownership before you estimate.',
      },
      {
        q: 'Can I rely on this age calculator for official forms?',
        a: 'It returns the exact calendar difference between two dates. Official age depends on the authority\'s rules and the date in your identity record, so use it for planning and cross-check against the document for anything legal.',
      },
      {
        q: 'How close will the stamp duty estimate be?',
        a: 'As close as the circle rate for your locality allows. Rates range across municipal and rural blocks, so the tool uses the district reference; the sub-registrar\'s office fixes the exact figure.',
      },
      {
        q: 'What should students here use most?',
        a: 'Mostly the CGPA and percentage tools before admission forms and scholarships, plus the age tool for date-of-birth checks. All of them work instantly in the browser.',
      },
    ],
    tips: [
      'For a gift or partition deed, verify the duty category with the registrar — it differs from an ordinary sale.',
      'Keep school admission checks simple: pick the date of birth, and the tool gives years, months, and days at once.',
      'Use 18% as the common GST default but confirm the rate that applies to the service or item you price.',
      'Rural buyers near Kurukshetra: check the "outside municipal limits" rate before estimating.',
    ],
    stamp:
      'Kurukshetra spans municipal and nearby rural areas, and the applicable duty rate depends on which category applies to the property. Circle rates differ by village and sector, so this estimate is a planning range. Verify the final rate and the current slab with the sub-registrar before registration.',
  },
  {
    slug: 'gurugram',
    name: 'Gurugram',
    theme: 'plum',
    layout: 'goalcards',
    eyebrow: 'MILLENNIUM CITY · GURUGRAM',
    title: 'Calculators for People in Gurugram – Property, Loans, GST & More | Calc Notebook',
    metaDescription: 'Meet the money questions of Gurugram: stamp duty on a flat, the true cost of a home loan, GST on your bill, and quick BMI and CGPA checks — all free.',
    lead: 'A city that runs on deals, deadlines, and the occasional spreadsheet sprint.',
    intro:
      'Gurugram is where Haryana\'s numbers get ambitious: property prices that outpace salaries, loans that go well past a crore, and a lifestyle budget with more line items than most. The calculators here are built for exactly those conversations — fast, plain, and honest about what they can tell you.',
    goals: [
      { title: 'Buy a flat in a new sector', text: 'Estimate stamp duty plus registration for the agreement value and the sector\'s circle rate before you put pen to paper.' },
      { title: 'Take the right home loan', text: 'Run your EMI at the quoted rate and see the total cost over the full tenure, not just the monthly number.' },
      { title: 'Price a bill or an invoice', text: 'Add or remove GST in one step so the final quote is the actual outgo, not a surprise.' },
      { title: 'Keep health a data point', text: 'A quick BMI snapshot between busy months — the number, then a real doctor conversation.' },
      { title: 'Convert CGPA before deadlines', text: 'Estimate the percentage equivalent for applications, then confirm with the institution\'s rule.' },
      { title: 'Check an exact age anywhere', text: 'One input, and you get years, months, and days — ready for forms and eligibility checks.' },
    ],
    profile: [
      'Gurugram\'s real estate is the most expensive in Haryana, and the spread of circle rates across sectors is wide. The gap between what a builder quotes and what the registrar values is often significant, which means an estimate computed on the higher base can change your entire budget plan.',
      'The workforce skews young and mobile: rented flats, a first loan, app-based everything, and health that only gets attention after a scare. Tools that take seconds and respect privacy fit that rhythm — no account, no data leaving your device.',
    ],
    tips: [
      'Always run the stamp duty check on the higher of agreement value and the notified circle rate for the exact sector — in Gurugram that gap is where budgets get rewritten.',
      'For large loans, test how a half-percent rate change moves your EMI before negotiating with lenders.',
      'For rent and utilities that attract GST, use "remove GST" to know the true base amount.',
      'BMI in high-pressure jobs is a signal, not a sentence — treat the category as a prompt for an actual health check.',
    ],
    stamp:
      'Gurugram\'s circle rates are Haryana\'s highest and vary sector by sector, so the estimate must be matched to the notified rate for the specific sector and to whether the property is residential or commercial. Duty depends on the buyer category; female and joint ownership can trim the rate. Verify at the sub-registrar before committing payments.',
  },
  {
    slug: 'faridabad',
    name: 'Faridabad',
    theme: 'teal',
    layout: 'checklist',
    eyebrow: 'NCR INDUSTRIAL · FARIDABAD',
    title: 'Calculators for People in Faridabad – Stamp Duty, EMI, BMI & More | Calc Notebook',
    metaDescription: 'Faridabad home-buyer and everyday calculators: stamp duty with circle-rate checks, home loan EMI, age, BMI, GST and CGPA. Free, fast, no signup.',
    lead: 'The oldest industrial city of Haryana — practical, direct, and full of family-owned factories.',
    intro:
      'Faridabad grew on industry and now complicates itself with new NCR housing: factories in the old town, high-rise flats along the main corridors, and families commuting to Delhi. For buyers it means property documents that mix the old and the very new, and stamp duty questions that deserve straight answers.',
    profile: [
      'The city mixes third-generation factory families with fresh migrants renting near the metro-adjacent colonies. Money habits follow: careful with big decisions, trusting of word of mouth, and quick to ask "what will it actually cost me" — the exact question these tools answer.',
      'From NIT and the Mathura Road corridor to the Huda City flats, every quarter has a different property feel and a different notified rate. An estimate that works for one sector can be off for another, so locality matters here more than in more uniform cities.',
    ],
    steps: [
      'Note the plot or flat size and the rate per square yard quoted by the seller.',
      'Look up whether the property is inside municipal limits — Faridabad duty uses the urban rate.',
      'Enter the agreement value and the circle rate reference in the calculator.',
      'Check whether the deed is in a female or joint owner\'s name for the lower rate.',
      'Add the slab-based registration fee to the duty to get the total payable.',
      'Verify the final figure with the sub-registrar before the registration day.',
    ],
    tips: [
      'Factory vendors: use the GST remove mode to know your actual base price when buyers quote inclusive amounts.',
      'Home buyers near the metro corridor should compare the EMI at a half-percent higher rate to build in a margin for revision.',
      'Run the same property value through the stamp duty tool both ways once the circle rate for the sector is checked.',
      'Students at Faridabad colleges: the CGPA tool is useful for mid-semester self-checks, not the official transcript rule.',
    ],
    stamp:
      'Faridabad sits inside the urban municipal structure, so the urban stamp duty category applies across most of the city, with circle rates varying by zone. Duty is charged on the higher of agreement value and notified rate, reduced for female and joint ownership. Confirm the exact zone rate with the registrar before registration.',
  },
  {
    slug: 'ambala',
    name: 'Ambala',
    theme: 'olive',
    layout: 'split',
    eyebrow: 'CANTONMENT & WHOLESALE · AMBALA',
    title: 'Calculators for People in Ambala – Stamp Duty, Loans & Everyday Math | Calc Notebook',
    metaDescription: 'Free calculators for Ambala: property stamp duty estimates, home loan EMI, exact age, BMI, GST and CGPA. Private and instant, no account needed.',
    lead: 'The city of two parts — cantonment and civil lines — plus a market that supplies half of north India.',
    intro:
      'Ambala is famous for its integrated market of scissors and scientific instruments and for its position at the junction of five national highways. Families here hold property in the old municipal areas and increasingly in new colonies, while the wholesale trade keeps daily money in constant motion.',
    profile: [
      'Wholesale trade means perpetual percentage math: buy at margin, sell at margin, negotiate quantity discounts, and split profits among partners at the end of the day. The percentage and GST tools were practically made for a shopkeeper\'s desk.',
      'Residential property around the cantonment and the bypass has its own rhythm, with circle rates that differ by pocket. A duty estimate is only meaningful when it is tied to the right locality rate, and the saving on a female or joint deed often surprises people pleasantly.',
    ],
    facts: [
      { label: 'Highways', value: '5 meet here' },
      { label: 'Old town', value: 'Two municipal areas' },
      { label: 'Markets', value: 'Cloth & instruments' },
      { label: 'Local rate check', value: 'Use circle rate' },
    ],
    tips: [
      'Wholesalers: when you offer a GST-inclusive price to a retailer partner, remove GST to see your true receipt before splitting profit.',
      'For a new loan, run the EMI at your actual bank rate, not the display-board rate.',
      'Use exact dates for age records on government schemes and insurance forms.',
      'A plot entered in square yards beats a guessed value for stamp duty planning every time.',
    ],
    stamp:
      'Ambala\'s duty follows the usual Haryana rule — the higher of agreement value and circle rate, adjusted for female and joint buyers — but the notified rates differ between the cantonment, civil lines, and the bypass colonies. Plan with the district reference, then confirm with the sub-registrar.',
  },
  {
    slug: 'rohtak',
    name: 'Rohtak',
    theme: 'rose',
    layout: 'stripes',
    eyebrow: 'DISTRICT HQ · ROHTAK',
    title: 'Calculators for People in Rohtak – Property, EMI, Marks & More | Calc Notebook',
    metaDescription: 'Rohtak calculators from Calc Notebook: stamp duty and registration estimates, home loan EMI, age, BMI, GST and CGPA tools — free and private.',
    lead: 'The administrative heart of Haryana — young, growing, and suddenly full of students.',
    intro:
      'As the district headquarters and a fast-growing education centre, Rohtak draws government families, private-sector commuters, and a large student population into a small footprint. The housing market is active in the university belt and the new sectors, and the demand for quick, dependable number checks is right behind it.',
    profile: [
      'Rohtak\'s property story is being written in the new residential sectors around the university and the widening bypass. First buyers here are often salaried families and retired officers, both groups that value certainty — which is why a stamp duty range, checked against the circle rate, is exactly what they ask for.',
      'The university city brings CGPA season twice a year, with students converting grades for scholarships and placements at the last minute. Parents, meanwhile, finance hostel deposits, fee payments that carry GST, and the occasional health check after hostel mess food.',
    ],
    tips: [
      'For students: estimate CGPA and percentage conversions early, but always submit the institution\'s official conversion.',
      'Salaried buyers: plan the full tenure\'s total cost, not just the comfortable monthly instalment.',
      'When a fee invoice shows an 18% top line, remove GST once to see where your money actually goes.',
      'For age checks on schemes and pension forms, use the age tool with the exact date of birth.',
    ],
    stamp:
      'Rohtak\'s rates differ between the municipal area and the outer rural blocks, and duty is category-based. The calculator\'s range helps you budget; the sub-registrar\'s notified rate for your exact locality is the figure that counts at registration.',
  },
  {
    slug: 'hisar',
    name: 'Hisar',
    theme: 'indigo',
    layout: 'statcards',
    eyebrow: 'AGRI UNIVERSITY TOWN · HISAR',
    title: 'Calculators for People in Hisar – Stamp Duty, EMI, BMI & More | Calc Notebook',
    metaDescription: 'Hisar: free calculators for stamp duty and circle-rate checks, home loan EMI, age, BMI, GST and CGPA. Instant, private, no signup.',
    lead: 'An agricultural-education town that counts its wealth in land, cattle, and careful savings.',
    intro:
      'Hisar is HAU country — the Chaudhary Charan Singh Haryana Agricultural University anchors a town where land is status, dairying is income, and the families that matter have come through its institutions. The money questions here are the honest, unhurried kind: what a plot will genuinely cost to register, and whether the loan can comfortably coexist with the rest of the month.',
    stats: [
      { value: '7', label: 'Calculators live' },
      { value: '0', label: 'Accounts needed' },
      { value: '2 min', label: 'Typical estimate' },
      { value: '13', label: 'Haryana cities' },
    ],
    profile: [
      'Around Hisar, wealth sits in agricultural land and a growing ring of residential sectors. When a family decides to sell a plot or register a new house, the duty is large enough to plan seriously around, and the female-ownership concession makes "which name goes on the deed" a real family conversation.',
      'HAU families, vet students, and the government belt all hand over thousands of form-filling entries a year — dates of birth repeated, marks converted, percentages recomputed. Our tools simply stop the repeated arithmetic so people can get on with their day.',
    ],
    tips: [
      'Land owners: verify whether your transaction qualifies for the lower duty that applies to certain transfers — the category, not just the amount, decides the rate.',
      'Dairy and input businesses: use the GST remove mode on supplier invoices to check the base cost before payment.',
      'Match your loan tenure to your real monthly comfort using the EMI tool before the bank compares your income.',
      'Farmer health numbers get missed constantly — a BMI snapshot plus a doctor visit is the responsible pair.',
    ],
    stamp:
      'Hisar\'s notified circle rates differ by sector and the surrounding blocks. Duty is the higher of agreement value and circle rate, reduced for female and joint ownership names on the deed. Use the estimate to budget, then confirm the exact locality rate at the sub-registrar.',
  },
  {
    slug: 'panchkula',
    name: 'Panchkula',
    theme: 'amber',
    layout: 'pullquote',
    eyebrow: 'PLANNED CITY · PANCHKULA',
    title: 'Calculators for People in Panchkula – Property, Loans & Everyday Math | Calc Notebook',
    metaDescription: 'Panchkula calculators: estimated stamp duty, home loan EMI, exact age, BMI, GST and CGPA — free, private, and instant in your browser.',
    lead: 'A planned city that rewards tidy numbers as much as tidy streets.',
    intro:
      'Panchkula is Haryana\'s address for order: numbered sectors, landscaped green belts, and a middle class that plans. Property here is comparatively premium and comparatively new, so the documents, circle rates, and loan sizes are the fabric of family life in a way the older towns of Haryana don\'t always reproduce.',
    quote:
      'In a planned city, the numbers stay planned too — the circle rate, the EMI, the grade point. The calculators simply keep the promises people make to themselves about those numbers.',
    profile: [
      'Panchkula property carries a premium and a particular paperwork culture: newer societies, clear titles, and sector-level circle rates that sit above the state\'s older towns. First-time buyers here sharpen their pencils early, and a duty range they can test an example against is exactly what they ask for.',
      'The lifestyle is health-conscious — the lake, the parks, the morning walks — and children\'s education costs push academic maths (percentage, CGPA) into the monthly budget beside the more obvious housing loan.',
    ],
    tips: [
      'Sector-level circle rates matter more in Panchkula than the district average — test the estimate against your specific sector before budgeting.',
      'For the newer flat societies, run the EMI at a stress rate half a point above the bank\'s quote to see your margin.',
      'Use the age tool for admission cut-offs and the BMI tool as a lightweight habit tracker between actual check-ups.',
      'When society maintenance invoices carry GST, remove it once to see the real service charge.',
    ],
    stamp:
      'Panchkula\'s duty follows the category-based Haryana rule on the higher of agreement value and circle rate, with female and joint ownership reducing the rate. Sector-level notified rates vary, so verify the exact sector figure at the sub-registrar before registration.',
  },
  {
    slug: 'kaithal',
    name: 'Kaithal',
    theme: 'fern',
    layout: 'chipgrid',
    eyebrow: 'BORDER AGRI TOWN · KAITHAL',
    title: 'Calculators for People in Kaithal – Stamp Duty, EMI, GST & More | Calc Notebook',
    metaDescription: 'Free calculators for Kaithal: stamp duty estimates, home loan EMI, age, BMI, GST and CGPA. Instant results, entirely on your device — no signup.',
    lead: 'A wheat-belt town on the Punjab border where family land is the quiet bank account.',
    intro:
      'Kaithal sits in Haryana\'s wheat country near the Punjab border, a district town where land passes through generations and a new house is big news. The everyday maths follows the calendar of grain sales, school admissions, and the occasional financing need that would otherwise go to the local credit cooperative.',
    profile: [
      'Land in and around Kaithal is often subdivided across family members, and registering a share, selling a portion, or transferring to the next generation raises stamp duty questions that genuinely affect what families can do next. The calculator gives them a figure to hold before they go to the sub-registrar.',
      'The town\'s shops and mandi interests run on margin arithmetic: sell at x, buy at y, percentage profit, GST on the export invoice. These are simple tools for the sums everyone else overcomplicates.',
    ],
    chips: ['Land share', 'New house', 'Mandi margins', 'GST on invoices', 'Admission age', 'Tractor loan', 'College CGPA', 'Health check'],
    tips: [
      'For a family share or partition, confirm the duty category with the registrar before estimating — it differs from a normal sale.',
      'Mandi purchasers: remove GST on procurement invoices to know the true cost basis.',
      'Buying a tractor or a shop fit-out? Compare the EMI with your post-harvest cash flow using the tool.',
      'Date-of-birth checks are routine for admissions and schemes — the age calculator settles them instantly.',
    ],
    stamp:
      'Kaithal\'s rural blocks largely fall outside municipal limits, so the lower rural stamp duty category often applies — but check the specific village notification. The estimate uses the district reference; the sub-registrar\'s notified rate is final.',
  },
  {
    slug: 'yamunanagar',
    name: 'Yamunanagar',
    theme: 'clay',
    layout: 'sidebar',
    eyebrow: 'PAPER & TIMBER · YAMUNANAGAR',
    title: 'Calculators for People in Yamunanagar – Property, Loans, GST & More | Calc Notebook',
    metaDescription: 'Yamunanagar calculators: stamp duty and registration estimates, home loan EMI, age, BMI, GST and CGPA — free, private, and instant.',
    lead: 'The town built on paper, plywood, and the processing gut feeding both.',
    intro:
      'Yamunanagar rises around its industrial past — paper mills, plywood, and timber yards along the Yamuna\'s channels. Its character mixes mill-town practicality with families rooted here for generations, and property questions increasingly involve both the old residential belts and the new sectors growing on the sidings.',
    sections: [
      { title: 'The mill-town money rhythm', body: 'Shift workers, suppliers, and small contractors live by invoices and margins. The percentage and GST tools cover the daily arithmetic of the paper and timber trade without a single ledger needing to open.' },
      { title: 'Property around the old town', body: 'Residential plots in the older municipal areas carry one set of notified rates, while the newer sectors and rural extensions carry another. Matching the estimate to the right one is the whole game in Yamunanagar stamp duty.' },
      { title: 'Families, loans, and health', body: 'The staples remain: a housing loan EMI, an elderly parent\'s date on a form, a weight-and-height snapshot before a real check-up. All of it, quietly, on the device in your pocket.' },
    ],
    profile: [
      'Yamunanagar\'s property scene splits cleanly down the middle: the older municipal belts reselling established houses and plots, and the newer sectors where first-time buyers are placing their first real-estate money. Either way, the duty question is the same — and the notified rate list decides the answer.',
      'The paper and plywood industry keeps a steady current of invoices, quotations, and margins moving through the town. Contractors price jobs, suppliers deduct GST, and shopkeepers round percentages nightly. The everyday tools clear that arithmetic in a moment.',
    ],
    tips: [
      'Timber and plywood traders: check your GST rate class carefully — it differs between items, and the calculator\'s presets are starting points only.',
      'For a new house in the sectors, verify the circle rate your seller quotes before fixing the duty budget.',
      'Keep exact birth dates on file for pension and scheme age checks; the tool takes seconds, redoing forms takes days.',
      'Small factory owners: run the EMI tool before signing machinery loans so the monthly outflow is planned, not discovered.',
    ],
    stamp:
      'Yamunanagar mixes municipal and rural notified rates, so the correct category depends on the exact plot\'s location. Duty is the higher of agreement value and circle rate with category reductions for female and joint owners. Confirm with the sub-registrar before the deed reaches its day.',
  },
  {
    slug: 'jind',
    name: 'Jind',
    theme: 'slate',
    layout: 'digest',
    eyebrow: 'HISTORICAL JUNCTION TOWN · JIND',
    title: 'Calculators for People in Jind – Stamp Duty, EMI, Age & More | Calc Notebook',
    metaDescription: 'Jind calculators: stamp duty and registration estimates, home loan EMI, exact age, BMI, GST and CGPA — free, private, on-device results.',
    lead: 'A town with a fort\'s worth of history and a railway junction\'s worth of daily traffic.',
    intro:
      'Jind carries centuries of Haryana\'s history, but its daily life is practical: a railway junction town, a district headquarters, and a quiet bridge between the state\'s northern markets. Families hold old land records alongside new loans, and the calculators sit naturally in that mix.',
    digest: [
      'Stamp duty runs on the higher of agreement value and circle rate.',
      'Female and joint buyers in Haryana receive reduced rates.',
      'Registration uses a slab-based fee with an upper cap.',
      'EMI is an estimate, not the bank\'s final repayment schedule.',
      'BMI is a screening signal, not a diagnosis.',
      'CGPA conversion follows a rubric; the institute\'s rule wins.',
      'GST rates change by notification — always confirm the class.',
      'Age, percentage, and GST answer instantly, on-device, private.',
    ],
    profile: [
      'Jind\'s property transfers are a healthy mix of old inheritances being formalised and a first generation buying new residential plots. The registration counter, not the real-estate agent, is where the town\'s decisions feel final — which is why people read up on duty before they go.',
      'Daily commerce runs across the junction\'s markets: railway staff, grain traders, and small retailers, each with recurring percentage and tax sums. Quick tools end the repetition.',
    ],
    tips: [
      'If your Jind property was inherited, check the duty category and any exemption for family transfers with the registrar.',
      'Before comparing home loans, fix one amount, rate, and tenure — then the difference you see is genuinely the loan cost.',
      'Offer a GST-inclusive shop price? Remove GST once to know your actual margin.',
      'Admission season: run the age and percentage checks together with exact dates on hand.',
    ],
    stamp:
      'Jind applies the standard Haryana duty rule — the higher of agreement value and circle rate, adjusted by buyer category — with municipal and rural blocks carrying different notified rates. Plan with the estimate, verify with the sub-registrar.',
  },
];