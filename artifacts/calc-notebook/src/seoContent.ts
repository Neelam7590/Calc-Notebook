export type SeoSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CalculatorSeoContent = {
  title: string;
  metaDescription: string;
  intro: string;
  sections: SeoSection[];
  faqs: { question: string; answer: string }[];
};

export const calculatorSeoContent: Record<string, CalculatorSeoContent> = {
  emi: {
    title: 'EMI Calculator Online – Calculate Loan EMI Free | Calc Notebook',
    metaDescription:
      'Calculate your loan EMI instantly with our free EMI calculator. Get monthly EMI, total interest, and total payment in seconds.',
    intro:
      'Planning a loan becomes easier when the monthly commitment is clear. This EMI calculator helps you estimate the monthly installment, or loan EMI, for any regular borrowing — home loan EMI, personal loan EMI, a car loan, or an education loan. It uses the amount borrowed, the annual interest rate, and the repayment tenure. Enter your figures to see the monthly EMI, the total interest paid over the full term, and the total amount returned to the lender. The calculation is quick, transparent, and useful while comparing loan offers or checking whether a proposed payment fits your monthly budget.',
    sections: [
      {
        heading: 'What is an EMI?',
        paragraphs: [
          'EMI stands for Equated Monthly Instalment, and the monthly installment a borrower usually pays every month is a loan EMI. Each instalment contains two parts: principal repayment and interest. At the beginning of a typical amortising loan, the interest portion is larger because interest is charged on a higher outstanding balance. As the principal reduces, the interest part gradually falls and more of each instalment goes towards the principal. Although the split changes, the scheduled EMI generally stays the same when the interest rate is fixed.',
          'A monthly EMI is useful because it turns a large borrowing decision into a recurring household expense. Instead of looking only at the loan amount, you can compare a payment with rent, school fees, utilities, savings, and other commitments. The EMI number is an estimate rather than a promise from a lender. Processing fees, insurance, taxes, rate changes, prepayments, and lender-specific rounding can change the final repayment schedule, so always confirm the sanction letter and amortisation schedule before signing.',
        ],
      },
      {
        heading: 'How to use this EMI calculator',
        paragraphs: [
          'Start with the loan amount you expect to borrow, not necessarily the price of the property, car, course, or product. If you are financing a purchase with a down payment, enter only the financed portion. Next, enter the annual interest rate offered by the lender. The calculator converts that annual rate into a monthly rate for the formula. Finally, enter the tenure in months. A 5-year loan is 60 months, while a 7-year loan is 84 months. Keeping tenure in months avoids ambiguity when comparing shorter and longer offers.',
          'After selecting Calculate monthly EMI, read the result panel in three parts. Monthly EMI is the regular payment. Total interest is the estimated cost of borrowing above the principal. Total payment is the principal plus interest across all instalments. Looking at all three figures together prevents a common mistake: choosing the smallest EMI without noticing that a longer tenure can result in substantially more interest. Try different rates and tenures to understand the trade-off before making a decision.',
          'The calculator accepts a zero interest rate as a useful comparison case. When the rate is zero, the principal is divided evenly across the selected number of months. For a positive rate, the standard reducing-balance EMI formula is used. A loan amount and tenure must be greater than zero, while the interest rate can be zero or a positive number. If a value is missing or invalid, the form explains what needs to be corrected instead of presenting a misleading result.',
        ],
      },
      {
        heading: 'The EMI formula explained simply',
        paragraphs: [
          'For a reducing-balance loan, the usual formula is EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1). In this expression, P is the principal loan amount, r is the monthly interest rate written as a decimal, and n is the total number of monthly instalments. If the annual rate is 8.5%, the monthly rate used by the calculation is 8.5 divided by 12 and then divided by 100. The formula balances the repayment so that the scheduled payment is consistent over the selected term.',
          'The formula is different from simply adding annual interest to the principal and dividing by the number of months. That simple approach does not account for the outstanding balance reducing after every instalment. The EMI method recalculates the interest component on the remaining principal, which is why the total interest changes when you change the tenure. It also explains why two loans for the same amount can have different total costs even when the monthly payments appear close.',
          'Use the formula as a planning tool, not as a substitute for a lender statement. Some products use floating interest rates, daily interest calculations, irregular first instalments, or special introductory rates. The result here assumes a regular monthly schedule and a rate that remains constant for the calculation. It is best suited to early comparisons: shortlist a comfortable payment, then ask the lender for the exact amortisation schedule, fees, prepayment rules, and reset conditions.',
        ],
      },
      {
        heading: 'How loan amount, rate, and tenure change your payment',
        paragraphs: [
          'Increasing the loan amount generally increases the EMI and the total interest because more money is outstanding. A higher interest rate increases both the scheduled EMI and the total cost. Tenure behaves differently: extending the term usually reduces the monthly EMI but increases the number of months over which interest is charged. Reducing the tenure can raise the monthly payment while lowering the overall interest bill. The right choice depends on stable cash flow, emergency savings, and how long you expect to keep the loan.',
          'For example, imagine comparing a five-year and a seven-year personal loan. The seven-year option may look attractive because the monthly payment is smaller. However, the borrower makes 24 additional payments, and those extra months allow more interest to accumulate. If the shorter EMI is affordable without cutting essential savings, it may be the cheaper path. If the shorter payment would make the budget fragile, a longer tenure with occasional permitted prepayments may be safer. Compare the total payment, not only the first number you see.',
          'A practical way to use the calculator is to make a small comparison table. Keep two of the inputs fixed and change one input at a time. First compare rates at the same amount and tenure. Then compare tenures at the same rate. Finally, reduce the principal to see how a larger down payment changes the result. This approach makes the cost of each decision visible and gives you useful questions to take into a conversation with a bank, housing finance company, or other lender.',
        ],
      },
      {
        heading: 'Tips before taking a loan',
        paragraphs: [
          'Do not decide from EMI alone. Check the annual percentage rate or equivalent cost, processing fee, documentation charges, insurance, late-payment charges, and prepayment rules. Confirm whether the quoted rate is fixed, floating, or fixed for only an initial period. A floating rate can cause the tenure or EMI to change later. Ask for an amortisation schedule so you can see how much principal is paid in the early months and whether the offer matches the calculator assumptions.',
          'A healthy borrowing decision leaves room for unexpected costs. Keep an emergency fund, account for income changes, and avoid stacking several large EMIs without a clear repayment plan. If you are comparing a home loan, remember that the EMI is only one part of the monthly housing cost; maintenance, property taxes, utilities, and repairs also matter. For a car loan, include fuel, servicing, insurance, and depreciation. The calculator is most helpful when the result is placed inside a complete monthly budget.',
          'When a lender offers a lower EMI by extending tenure, ask for the total payment as well. When a lender offers a low rate with large upfront charges, add those charges to the comparison. If you plan to prepay, understand whether part-prepayments reduce the tenure, reduce the EMI, or require a minimum amount. The best loan is not automatically the one with the lowest advertised rate; it is the one whose complete cost and conditions match your plans and cash flow.',
        ],
      },
      {
        heading: 'Who can use an EMI calculator?',
        paragraphs: [
          'A home buyer can use it to estimate the payment for a property loan after considering the down payment. Someone planning a personal loan can compare a quick short-term loan with a longer, smaller monthly commitment. A car buyer can check whether the financed amount still leaves room for running costs. Students and families can use it to understand education loan scenarios, while business owners can use it as a first estimate for equipment or working-capital borrowing. The inputs are simple enough for a first conversation and detailed enough for meaningful comparisons.',
          'It is also useful after a loan has started. Enter the remaining principal, current rate, and remaining months to create a rough picture of future payments. If your rate has changed, compare the new result with the original schedule and ask the lender how the change will be handled. Remember that an existing loan may include accrued interest, part-payment adjustments, or charges that are not captured by a basic principal-rate-tenure calculation.',
        ],
      },
      {
        heading: 'Common EMI calculation mistakes',
        bullets: [
          'Entering the purchase price instead of the actual financed loan amount after the down payment.',
          'Using a monthly interest rate in the annual interest rate field, which can dramatically overstate the cost.',
          'Entering years in the tenure field when the calculator expects months; five years should be entered as 60.',
          'Comparing one offer by EMI and another offer by total interest without using the same inputs.',
          'Forgetting that floating-rate loans can change after the first calculation.',
          'Treating the estimate as the final lender statement when fees, insurance, or irregular instalments apply.',
        ],
      },
      {
        heading: 'Frequently asked questions about EMI',
        paragraphs: [
          'The EMI shown by this tool is a monthly estimate for a regular reducing-balance loan. It includes the principal and interest implied by the three values you enter, but it does not add lender fees or optional insurance. For an exact figure, compare it with the lender’s official repayment schedule. The calculator is designed to make that schedule easier to understand, not to replace the legal loan documents.',
          'If you want a lower EMI, you can reduce the amount borrowed, negotiate a lower rate, or select a longer tenure. Each option has a different cost. A lower principal and lower rate usually reduce both EMI and total interest. A longer tenure commonly reduces EMI but raises total interest. Use the calculator with several combinations so you can choose a payment that is comfortable without ignoring the final amount repaid.',
          'Prepayment can reduce the interest you would otherwise pay because the principal falls earlier. The exact benefit depends on the lender’s rules, the timing of the prepayment, and whether you choose to reduce tenure or EMI. Entering a new smaller principal can give you a quick estimate after a prepayment, but request a revised amortisation schedule for the exact result.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this EMI calculator suitable for home loans and personal loans?',
        answer:
          'Yes. It is useful for any regular monthly loan where you know the principal, annual rate, and tenure in months. Compare the estimate with the lender schedule because fees, floating rates, and special repayment terms can change the final amount.',
      },
      {
        question: 'Does a longer tenure always mean a cheaper loan?',
        answer:
          'No. A longer tenure often lowers the monthly EMI, but it can increase total interest because the balance remains outstanding for more months. Compare monthly affordability with the total payment before choosing.',
      },
      {
        question: 'What should I enter for interest rate?',
        answer:
          'Enter the annual percentage rate quoted for the loan, such as 8.5 for 8.5% per year. Do not enter the monthly rate unless the lender has specifically converted it for you.',
      },
      {
        question: 'Why can my lender’s EMI be slightly different?',
        answer:
          'Lenders may include processing charges, insurance, rounding, a different day-count method, a floating-rate reset, or an irregular first instalment. The calculator assumes a consistent monthly schedule.',
      },
    ],
  },
  age: {
    title: 'Age Calculator Online – Find Your Exact Age Free | Calc Notebook',
    metaDescription:
      'Find your exact age in years, months, and days with our free age calculator. Simple, fast, and accurate.',
    intro:
      'Want to know your exact age today rather than a rounded number of years? This date of birth calculator compares your date of birth with today’s date and shows your exact age in years, months, and days. It also calculates the total number of calendar days lived. The age calculator is helpful for birthdays, forms, eligibility checks, personal milestones, and any moment when “almost thirty” is not precise enough.',
    sections: [
      {
        heading: 'What does exact age mean?',
        paragraphs: [
          'Exact age describes the time between a date of birth and a chosen comparison date using calendar units. This calculator uses today as the comparison date. It first counts complete years, then complete months after those years, and finally the remaining days. The result is easier to read than a long decimal number because calendars do not give every month the same number of days. A person can be 28 years, 4 months, and 12 days old even though the same age expressed in years would be a changing decimal.',
          'The total days lived is a separate count. It tells you how many whole calendar days have passed between the two dates, without converting that number into months or years. Because months have different lengths, total days cannot be found reliably by multiplying years by 365. Leap years also add an extra day. For that reason, this calculator compares calendar dates directly and keeps the two forms of the answer separate.',
        ],
      },
      {
        heading: 'How to use the age calculator',
        paragraphs: [
          'Select your date of birth from the date field and choose Calculate my age. The date must be in the past or today. The result shows the exact age as three clear values: years, months, and days. Below that, total days lived provides the complete-day count. If you are checking a future birthday or an eligibility date, you can use the same idea by comparing the official date with the required cutoff date, while remembering that this page is set up to calculate age up to today.',
          'The date picker reduces typing mistakes, but check the selected day, month, and year before calculating. A one-day error can matter for legal age requirements, applications, contest eligibility, school admission, or an insurance record. If the date is missing or in the future, the calculator keeps the answer area empty and explains the correction. It does not invent an age from incomplete information.',
          'For privacy, the calculation is performed in the browser. Your date is used to produce the result on this page and is not submitted as a form to a server. That makes the tool convenient for a quick check on a phone or laptop. You can clear the date after reading the result, especially when using a shared device.',
        ],
      },
      {
        heading: 'How years, months, and days are counted',
        paragraphs: [
          'The calculation starts by subtracting the birth year from the current year. It then checks whether the current month and day have reached the birthday this year. If the birthday has not arrived, one year is borrowed and the month count is adjusted. When the current day is earlier than the birth day, the calculator borrows days from the previous calendar month. The number of days borrowed depends on that month, which is why calendar-aware subtraction is more accurate than fixed-length shortcuts.',
          'This method gives the familiar human answer used for birthdays: complete years, followed by complete months, followed by remaining days. It does not count the hour and minute of birth because a date input contains no birth time. If you were born at 11:30 PM, the result still treats your date of birth as a calendar date. For most everyday uses, forms, and birthday planning, that is the appropriate level of precision.',
          'Leap days are handled as part of the calendar difference. Someone born on February 29 may see different birthday conventions depending on the country, organisation, or legal rule being applied. The calculator can still compare the entered dates and show the calendar interval. For official eligibility decisions, use the exact policy or authority’s definition rather than relying only on a general online calculation.',
        ],
      },
      {
        heading: 'Understanding total days lived',
        paragraphs: [
          'Total days lived is the count of full date boundaries between your birth date and today. It is especially interesting for personal milestones, journaling, and planning a celebration. It can also help when a form asks for a date difference rather than a traditional age. The number will increase by one when the calendar moves to the next day. It will not necessarily equal age in years multiplied by 365 because leap years and different month lengths are included.',
          'Use total days as a calendar count, not as a measure of total hours alive. A date-only calculator does not know your time zone of birth, birth time, daylight-saving transitions, or the exact instant you arrived. The result is therefore intentionally expressed in whole days. If you need hours, minutes, or seconds, you would need both date-time values and a defined time zone.',
          'The count is also useful for comparing two events. You can note the number on a birthday, a wedding anniversary, a project milestone, or the day a habit began. For two arbitrary dates, this page is primarily designed around date of birth, so use the wording in the result as a personal age reference rather than a formal date-difference certificate.',
        ],
      },
      {
        heading: 'Practical reasons to calculate your age',
        paragraphs: [
          'Age calculators are common during birthday planning because they answer the exact question guests ask: how many years, months, and days? They are also helpful for filling forms, checking age-based memberships, planning retirement timelines, understanding school or exam eligibility, and preparing documents. A quick calculation gives you a starting point before you verify a date against official identification.',
          'Parents can use an age calculator to track a child’s age for appointments, developmental notes, travel documents, and school forms. Adults may use it to compare milestone dates, calculate a time span since a career change, or prepare a personal record. Older family members may use total days lived as a meaningful number for a birthday card or celebration. The simple interface is designed so you can get the answer without learning a formula.',
        ],
      },
      {
        heading: 'Common age calculation mistakes',
        bullets: [
          'Reading the current year minus birth year without checking whether the birthday has happened yet.',
          'Treating every month as 30 days, which gives incorrect results around long and short months.',
          'Ignoring leap years when calculating total days between dates.',
          'Entering the document issue date instead of the actual date of birth.',
          'Assuming the result includes the time of day when only calendar dates were entered.',
          'Using a general calculator for a legal cutoff without checking the rule used by the relevant authority.',
        ],
      },
      {
        heading: 'Frequently asked questions about age calculation',
        paragraphs: [
          'The years, months, and days result is a calendar age. It is the same style of answer people use when saying “I am 25 years, 3 months, and 10 days old.” Total days lived is the number of complete calendar days between the selected birth date and today. Both are valid views of the same interval, but they answer different questions.',
          'If your birthday is today, the age increases by one complete year and the remaining months and days reset to zero. If your birthday is tomorrow, the calculator keeps the previous year and calculates the remaining months and days until that birthday. This is why the result can differ from a quick subtraction of the two years.',
          'For official forms, always use the date printed on your valid identity document. If a legal policy uses a particular reference date instead of today, calculate the difference separately or ask the organisation how it defines age. An online calculator is a convenient check, not a legal interpretation.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I calculate my exact age on a phone?',
        answer:
          'Yes. The page is mobile-friendly. Select the date of birth, tap Calculate my age, and the result appears in years, months, days, and total days lived.',
      },
      {
        question: 'Does the age calculator count leap years?',
        answer:
          'Yes. Calendar differences include leap days when they fall between the date of birth and today. That is why total days lived is more accurate than multiplying age by 365.',
      },
      {
        question: 'Can I use this for official age eligibility?',
        answer:
          'Use it as a helpful reference, then confirm the relevant organisation’s cutoff date and official document requirements. Policies can define age in a specific way.',
      },
      {
        question: 'Does it calculate hours or minutes lived?',
        answer:
          'No. It uses a date of birth, not a birth time, so it intentionally returns whole calendar days rather than hours, minutes, or seconds.',
      },
    ],
  },
  percentage: {
    title: 'Percentage Calculator Online – Free & Easy | Calc Notebook',
    metaDescription:
      'Calculate percentages easily — find X% of Y or what percent X is of Y. Free and instant percentage calculator.',
    intro:
      'Percentages show parts, comparisons, discounts, changes, and proportions in a form that is easy to understand. This percent calculator handles two of the most useful everyday questions: “What is X% of Y?” and “X is what percent of Y?” Enter the numbers, choose the question you want to answer, and get a clear result without doing the conversion in your head. If you need the percentage of a number, the first mode gives it to you in one step — for example, 15% of 760 is 114.',
    sections: [
      {
        heading: 'What is a percentage?',
        paragraphs: [
          'A percentage is a number expressed out of one hundred. The word comes from “per cent,” meaning per hundred. If 25 out of 100 students choose one option, that is 25%. If 25 out of 200 choose it, the percentage is 12.5%, because 25 is one eighth of 200. Percentages make different-sized groups easier to compare, which is why they appear in marks, prices, taxes, interest rates, surveys, business reports, and everyday conversations.',
          'The percent sign is shorthand for division by 100. Therefore 15% can be written as 15 divided by 100, or 0.15. To find a percentage of a number, multiply the decimal form by the number. To find what percentage one number is of another, divide the first number by the second and multiply by 100. The two calculator modes keep these two directions separate so it is harder to accidentally answer the wrong question.',
        ],
      },
      {
        heading: 'How to calculate X% of Y',
        paragraphs: [
          'Choose the “X% of Y” mode when you need a percentage of a number and you already know the percentage and the whole number. Enter the percentage as X and the whole as Y. The calculation is X divided by 100, multiplied by Y. For example, 15% of 240 is 0.15 multiplied by 240, which equals 36. This is the mode to use for a discount amount, a tip, a portion of a budget, a target percentage of marks, or a tax amount when the rate and base are known.',
          'The result is the part, not automatically the final total after adding or subtracting it. If a shirt costs 2,000 and the discount is 15%, the calculator gives the discount amount of 300. The sale price is found by subtracting 300 from 2,000. If a service fee is 15%, you would add the result to the base amount. Keeping the percentage amount separate makes the next money decision more visible.',
          'The percentage can be less than one, greater than one hundred, or zero, depending on the question. A rate such as 0.5% is valid and means half of one percent. A result greater than the original number can also be valid when X is above 100%. The tool accepts zero or positive values and explains when the whole number is missing or not greater than zero.',
        ],
      },
      {
        heading: 'How to find what percent X is of Y',
        paragraphs: [
          'Choose the “X is what % of Y?” mode when you know a part and the whole and want the comparison. The formula is X divided by Y, multiplied by 100. If a student scores 72 out of 90, the percentage is 72 ÷ 90 × 100, which is 80%. If a shop sells 30 of 120 units, the sold quantity represents 25% of the stock. The order of the numbers matters: the first value is the part being compared with the second value.',
          'The second number cannot be zero because division by zero has no meaningful percentage result. A part can be greater than the whole, and in that case the result will be above 100%. That may be surprising, but it is mathematically valid. For example, 150 is 150% of 100. Whether that result makes sense in a real situation depends on how the numbers were collected and what “whole” is intended to mean.',
          'The calculator displays the result with a readable number of decimal places. Rounding is useful for communication, but keep the unrounded figures in mind when accuracy matters. A school report, invoice, or financial statement may require a specific rounding rule. For a quick estimate, a clean result such as 18.75% is usually more helpful than a long string of digits.',
        ],
      },
      {
        heading: 'Percentage examples from real life',
        paragraphs: [
          'Shopping is full of percentage questions. A discount asks for a percentage of the original price. A price increase asks for the increase amount before it is added to the original. A cashback offer may be a percentage of an eligible spend, while a service charge may be a percentage of a subtotal. Use the “X% of Y” mode to calculate the amount, then decide whether the amount is added, removed, capped, or subject to another condition in the offer.',
          'Students use percentages to convert marks into a score out of 100. Enter marks obtained as X and maximum marks as Y in the “X is what % of Y?” mode. Businesses use the same mode for conversion rates, sales growth, attendance, completion rates, and stock movement. If the metric is a change from an old value to a new value, calculate the difference first, then compare that difference with the original value so the denominator is clear.',
          'Personal budgeting also benefits from simple percentages. You can calculate how much of monthly income goes to rent, savings, food, or debt repayments. The percentage result helps you compare months with different income levels. It does not decide whether a category is affordable; it simply gives the proportion. Combine the result with actual rupee amounts and your goals for a more complete view.',
        ],
      },
      {
        heading: 'Percentage increase and decrease',
        paragraphs: [
          'A percentage increase compares the change with the original value. The basic formula is new value minus old value, divided by old value, multiplied by 100. A percentage decrease uses the same structure, with the direction of the change understood as a reduction. This matters because comparing the change with the new value instead of the original value produces a different answer. The calculator does not have a separate change mode, but its two modes help with the building blocks.',
          'Suppose a monthly bill rises from 1,000 to 1,200. The change is 200, and 200 is 20% of the original 1,000. If the bill then drops from 1,200 to 1,000, the reduction is 200, but 200 is 16.67% of 1,200. The same rupee movement does not create the same percentage because the base changed. This is a common reason why a 20% fall does not return an item exactly to its old price after a 20% rise.',
          'When communicating a percentage change, state the base value and the period. “Sales grew 12% compared with last month” is more informative than “sales grew 12%.” Clear wording prevents the audience from guessing which number was used as Y and makes the calculation easier to audit.',
        ],
      },
      {
        heading: 'Common percentage mistakes',
        bullets: [
          'Confusing “X% of Y” with “X is what percent of Y”; the inputs look similar but the question is reversed.',
          'Using the new value as the denominator when the calculation should use the original value.',
          'Treating 5% as 5 instead of 0.05 when doing the calculation manually.',
          'Forgetting that a discount percentage gives the discount amount, not automatically the sale price.',
          'Rounding too early in a multi-step calculation and carrying a small error forward.',
          'Dividing by zero or treating a result above 100% as automatically wrong.',
        ],
      },
      {
        heading: 'Frequently asked questions about percentages',
        paragraphs: [
          'To find 10% of a number, move the decimal one place to the left, but the calculator is safer for less familiar rates such as 7.5%, 12.5%, or 18%. Enter the percentage as the first value and the full number as the second value in the “X% of Y” mode. The result is the amount represented by that rate.',
          'To find what percentage a score represents, put the score first and the maximum or total second in the “X is what % of Y?” mode. A score of 45 out of 60 is 75%. If the total is not actually the relevant whole, the arithmetic may be correct while the interpretation is wrong, so define the base before entering numbers.',
          'A percentage can be negative in some statistical or financial contexts, but this simple calculator is designed for positive everyday inputs. For a negative change, calculate the absolute difference and describe the direction separately, or use a specialist financial tool when the sign itself is important.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is 20% of 500?',
        answer:
          'Choose “X% of Y,” enter 20 as X and 500 as Y. The result is 100, because 20 divided by 100 multiplied by 500 equals 100.',
      },
      {
        question: 'How do I calculate what percentage 30 is of 120?',
        answer:
          'Choose “X is what % of Y?”, enter 30 as X and 120 as Y. The result is 25%.',
      },
      {
        question: 'Can the result be more than 100%?',
        answer:
          'Yes. If the first number is larger than the second number, the result in comparison mode is above 100%. That is mathematically valid when the comparison is defined that way.',
      },
      {
        question: 'Does the calculator include discounts and tax?',
        answer:
          'It calculates the percentage amount. For a complete tax or discount total, use the GST calculator or add/subtract the result from the original amount as appropriate.',
      },
    ],
  },
  bmi: {
    title: 'BMI Calculator Online – Check Your Body Mass Index | Calc Notebook',
    metaDescription:
      'Check your Body Mass Index (BMI) for free. Enter your height and weight to see your BMI category instantly.',
    intro:
      'This body mass index calculator gives a quick BMI estimate from height in centimetres and weight in kilograms. Enter both values to see your BMI and the standard adult category associated with that range: Underweight, Normal, Overweight, or Obese. Because it sorts results into weight ranges, many people use it as a healthy weight calculator for a first screening. BMI is a screening measure that can help start a health conversation; it is not a diagnosis and should be interpreted with context.',
    sections: [
      {
        heading: 'What is BMI?',
        paragraphs: [
          'Body mass index, commonly called BMI, is a ratio of body weight to height. It is calculated by dividing weight in kilograms by height in metres squared. Because height is squared, the measure adjusts for the fact that taller people generally weigh more than shorter people. BMI is popular because it requires only two easy-to-measure inputs and can be used to screen large groups, track broad trends, or begin a conversation about health.',
          'BMI does not directly measure body fat, muscle, bone density, fitness, diet quality, or overall health. Two people with the same BMI can have very different body compositions. A muscular athlete may be placed in a higher range because muscle is dense, while an older adult may have a different fat distribution at the same BMI. Treat the result as one piece of information, not a judgement about your body or a complete medical assessment.',
        ],
      },
      {
        heading: 'How to use this BMI calculator',
        paragraphs: [
          'Measure height in centimetres without shoes if possible. Stand upright on a flat surface, keep your head level, and use a consistent measuring method. Enter weight in kilograms, ideally using the same scale and similar conditions when tracking change. Then choose Calculate my BMI. The result panel shows the numerical BMI to one decimal place and the corresponding category. If a value is missing or zero, the calculator asks for a valid positive number instead of showing an empty or misleading category.',
          'A single measurement can be affected by clothing, food, hydration, time of day, and scale differences. If you are monitoring a trend, measure under similar conditions and focus on changes over time rather than reacting to one reading. For children and teenagers, BMI is normally interpreted using age- and sex-specific growth charts, so an adult category on this page should not be used as a paediatric diagnosis.',
          'The calculation happens in the browser using the values you enter. You can clear the fields or leave the page after viewing the result. The page does not need a health account or personal profile, which makes it convenient for a quick private estimate while still encouraging you to discuss concerns with a qualified professional.',
        ],
      },
      {
        heading: 'BMI formula explained',
        paragraphs: [
          'The formula is BMI = weight in kilograms ÷ height in metres squared. If a person weighs 68 kilograms and is 172 centimetres tall, the height becomes 1.72 metres. The calculation is 68 ÷ (1.72 × 1.72), which is approximately 23.0. The calculator converts centimetres to metres before applying the formula, so you only need to enter the measurements in the units shown on the form.',
          'The result is a number rather than a percentage. A small difference in height can affect the result because height is squared. That is why it is worth entering the best measurement you have rather than estimating casually. The number is rounded for readability, while the category follows the standard adult cutoffs used by this tool.',
          'Standard adult ranges commonly classify a BMI below 18.5 as Underweight, 18.5 to below 25 as Normal, 25 to below 30 as Overweight, and 30 or above as Obese. These labels are population-level screening categories. They are not a statement about character, appearance, or individual health, and they may not be the only ranges used for every population or clinical purpose.',
        ],
      },
      {
        heading: 'Understanding the BMI categories',
        paragraphs: [
          'The Underweight range can be a prompt to consider nutrition, recent illness, unintentional weight loss, digestive issues, or other factors with a clinician or dietitian. It does not automatically mean that a person is unhealthy. Some people naturally have a smaller build, while others may need support because their weight changed unexpectedly. Context, symptoms, energy levels, and medical history matter.',
          'The Normal range is associated with lower health risks for many adults at a population level, but it does not guarantee good health. Sleep, movement, blood pressure, blood sugar, mental wellbeing, nutrition, and habits all contribute to health. A person in this range can still benefit from regular check-ups and a balanced lifestyle, while a person outside it can be healthy in many other ways.',
          'The Overweight and Obese ranges indicate that weight relative to height is above the standard screening range. They can be associated with higher risks for some conditions, but BMI alone cannot tell you which risks apply. A supportive next step may be to speak with a healthcare professional about waist measurement, blood pressure, family history, activity, nutrition, medication, and realistic goals. Avoid extreme changes based on a single online result.',
        ],
      },
      {
        heading: 'What BMI cannot tell you',
        paragraphs: [
          'BMI cannot distinguish muscle from fat or show where fat is stored. It cannot measure fitness, flexibility, strength, cardiovascular health, or metabolic markers. It also cannot account fully for pregnancy, swelling, medical conditions, or medicines that affect weight. For that reason, a BMI number should never be used on its own to diagnose a disease or to decide that a person needs a particular treatment.',
          'For a fuller picture, health professionals may consider waist circumference, body composition, blood pressure, blood tests, nutrition, sleep, physical activity, family history, and mental wellbeing. The right measures depend on the person and the question being asked. If the result worries you, if weight changed quickly without a clear reason, or if you have symptoms, seek qualified medical guidance.',
          'The category labels on this page are written to match the requested standard adult ranges. Some clinicians may use different thresholds for specific populations or risk profiles. That is not a contradiction; it reflects the limits of a broad screening tool and the value of personalised interpretation.',
        ],
      },
      {
        heading: 'Healthy ways to use a BMI result',
        paragraphs: [
          'Use the result as a starting point for curiosity rather than a score to chase. If you want to improve health, focus on repeatable habits such as regular movement, enough sleep, a varied diet, hydration, and stress support. Small changes that fit your routine tend to be more sustainable than sudden restrictions. If you are setting a weight goal, a clinician or registered dietitian can help make it safe and realistic.',
          'Avoid comparing your BMI with a friend’s or using it to judge appearance. A number does not capture your full story. Track how you feel, how you move, how you recover, and any health markers that matter to you. If you exercise heavily or have a history of disordered eating, be particularly careful about treating a simple weight-to-height ratio as a target.',
        ],
      },
      {
        heading: 'Common BMI calculation mistakes',
        bullets: [
          'Entering height in metres when the field asks for centimetres, or entering weight in pounds when it asks for kilograms.',
          'Using a child’s result with adult cutoffs without age- and sex-specific growth-chart guidance.',
          'Treating BMI as a diagnosis or as a complete measure of fitness and health.',
          'Comparing readings taken on different scales or under very different conditions.',
          'Reacting to one number instead of looking at a trend and the wider health context.',
          'Starting an extreme diet or exercise plan without professional guidance.',
        ],
      },
      {
        heading: 'Frequently asked questions about BMI',
        paragraphs: [
          'The BMI value is a ratio, and the category is a broad adult screening range. A Normal result does not guarantee health, while an Underweight, Overweight, or Obese result does not explain the reason behind the number. Use the result to decide whether a conversation or more context would be useful.',
          'To improve accuracy, measure height without shoes and enter weight in kilograms. If you are tracking progress, measure at a similar time of day and use the same method. Do not expect daily changes to represent changes in body fat; hydration and food can move scale weight temporarily.',
          'BMI is not generally interpreted in the same way for children, pregnancy, or highly muscular athletes. Ask a qualified professional which measure is appropriate for your situation. This calculator includes a reminder because health information should be useful without pretending to be personalised medical care.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What BMI range is considered normal for adults?',
        answer:
          'This calculator uses the common adult screening range of 18.5 to below 25 for Normal. Interpretation can vary by person and population, so treat it as a starting point.',
      },
      {
        question: 'Is BMI a diagnosis?',
        answer:
          'No. BMI is a screening measure based only on height and weight. It does not measure body composition or diagnose a health condition.',
      },
      {
        question: 'Which units should I enter?',
        answer:
          'Enter height in centimetres and weight in kilograms. The calculator converts the height to metres internally before applying the formula.',
      },
      {
        question: 'Can children use this BMI calculator?',
        answer:
          'The form accepts the measurements, but adult categories should not be used to interpret a child’s health. Children need age- and sex-specific growth-chart guidance.',
      },
    ],
  },
  gst: {
    title: 'GST Calculator India – Add or Remove GST Online | Calc Notebook',
    metaDescription:
      'Calculate GST online — add or remove GST from any amount at 5%, 12%, 18%, or 28% rates. Free GST calculator for India.',
    intro:
      'GST can be simple when the base price and rate are clear, but it is easy to make mistakes when a price already includes tax. This free GST calculator for India supports both directions: add GST to an amount before tax, or remove GST from an amount that already includes GST. Choose a rate of 5%, 12%, 18%, or 28% and see the GST amount, original amount, and final amount in one place.',
    sections: [
      {
        heading: 'What is GST?',
        paragraphs: [
          'GST, or Goods and Services Tax, is an indirect tax charged on the supply of many goods and services. In a price calculation, the tax is commonly expressed as a percentage of a taxable base amount. The base amount plus GST becomes the tax-inclusive price. In India, tax rates can vary by item, service, classification, and applicable rules, so the correct rate should come from the invoice, product classification, or a qualified tax professional.',
          'The most important question for a quick calculation is whether the amount you have is before GST or already includes GST. When the amount is before tax, GST is calculated by multiplying the base by the rate and then added to the base. When the amount includes tax, GST must be separated from the total using the rate, rather than simply subtracting the percentage from the inclusive amount. This page keeps those two directions as separate Add GST and Remove GST modes.',
        ],
      },
      {
        heading: 'How to add GST to an amount',
        paragraphs: [
          'Choose Add GST when the amount is the taxable base price before tax. Select the rate that applies, enter the amount, and choose Add GST to amount. The calculator finds GST by multiplying the base amount by the rate divided by 100. It then adds that tax to the base to show the final amount payable. For example, at 18%, a base of 1,000 creates GST of 180 and a final amount of 1,180.',
          'This mode is useful for preparing a quick quote, checking an invoice line, estimating the final price of a service, or understanding what a tax-exclusive catalogue price will cost after GST. It assumes the entered amount is fully taxable at the chosen rate. If only part of a bill is taxable, calculate each applicable line separately rather than applying one rate to the entire invoice.',
          'The final amount is the number a customer may pay when the base and GST are presented together. In a real invoice, the tax may be split into components such as CGST and SGST or IGST depending on the transaction. This simple calculator shows the combined GST amount; it does not decide the tax type, place of supply, registration status, exemptions, or invoice format.',
        ],
      },
      {
        heading: 'How to remove GST from an inclusive amount',
        paragraphs: [
          'Choose Remove GST when the amount you have already includes GST. Enter the inclusive amount and select the rate. The original amount before GST is calculated as inclusive amount divided by 1 plus the rate divided by 100. The GST portion is the difference between the inclusive amount and that original amount. At 18%, an inclusive price of 1,180 contains a base of 1,000 and GST of 180.',
          'A common mistake is to subtract 18% of 1,180 when removing 18% GST. That gives a number that is too low because the tax was originally calculated on the base, not on the tax-inclusive total. Dividing by 1.18 correctly reverses the addition. This is why the Add GST and Remove GST operations are not simple opposites using the same multiplication step.',
          'Remove mode is helpful when a retail price, receipt, or contract gives a GST-inclusive total and you need to understand the underlying value. It can help with bookkeeping checks, margin calculations, price comparisons, and separating tax from revenue in a rough review. For official accounting, use the invoice and applicable rules, especially when discounts, cess, mixed rates, credit notes, or rounding are involved.',
        ],
      },
      {
        heading: 'GST rates and choosing the right one',
        paragraphs: [
          'This calculator offers 5%, 12%, 18%, and 28% because those are common GST rate choices for a simple estimate. The correct rate is not chosen based on the price alone. It depends on the goods or services, classification, current law, and sometimes a specific exemption or notification. Choose the rate printed on the relevant invoice or confirmed by your business tax process. If you are unsure, do not use a guess to prepare a final tax document.',
          'The tool uses the selected rate as one combined GST rate. If you are checking an intra-state supply, the combined amount may later be represented as CGST and SGST in equal parts, subject to the applicable rate and rules. For an inter-state supply, the tax may be represented as IGST. The calculator does not replace that classification; it simply answers the arithmetic question of how much the selected percentage changes the amount.',
          'Rates can change and some supplies can be nil-rated, exempt, or subject to special treatment. A result from an online calculator remains an estimate until the rate and taxability are confirmed. Keep the selected rate visible when sharing a price so another person can understand how the number was produced.',
        ],
      },
      {
        heading: 'GST examples for everyday use',
        paragraphs: [
          'A freelancer may quote a service fee before GST and want to show a customer the final invoice value. Add GST mode makes the tax line and final value easy to estimate. A shop may advertise a price including GST and want to understand the pre-tax value for a margin check. Remove GST mode separates the original amount and tax component. A buyer comparing two vendors can also check whether one quote is exclusive and the other inclusive before deciding which is cheaper.',
          'For a small business, the calculator can be a quick reasonableness check before entering figures into accounting software. Enter a known base and rate, compare the result with the software, and investigate any difference. Differences may come from line-level rounding, discounts applied before tax, shipping, or a different tax rate for part of the invoice. The calculator is most reliable when each tax treatment is isolated.',
          'When a price includes multiple items, do not assume the total can always be reversed with one rate. A basket can contain products at different rates or include non-taxable amounts. Split the calculation by line or category, then add the resulting totals. The more complex the invoice, the more important it is to retain the source invoice and use professional accounting guidance.',
        ],
      },
      {
        heading: 'Rounding, invoices, and GST records',
        paragraphs: [
          'The calculator shows up to two decimal places because currency amounts are normally communicated in rupees and paise. Actual invoices may round at the line level, tax-component level, or invoice total level depending on the accounting process. A difference of a few paise can therefore appear even when the underlying percentage is correct. Use the invoice’s rounding policy consistently and avoid manually changing a tax figure just to force two independent calculations to match.',
          'Keep the base amount, selected rate, GST amount, and final amount together when you record a calculation. This makes it easier to explain a quote or reconcile a payment later. For registered businesses, the official tax invoice and books of account remain the source of truth. This page is a quick calculator, not a return-filing system or compliance checker.',
          'If you remove GST from an inclusive amount, the result can contain paise even when the inclusive amount is a whole number. That is expected because the tax-inclusive total is being divided by a factor such as 1.05, 1.12, 1.18, or 1.28. Round only at the stage your accounting process requires.',
        ],
      },
      {
        heading: 'Common GST calculation mistakes',
        bullets: [
          'Adding GST to a price that already includes GST, which taxes the tax-inclusive amount twice.',
          'Removing GST by subtracting the rate percentage from an inclusive price instead of dividing by 1 plus the rate.',
          'Choosing a rate based on memory without checking the item classification or invoice.',
          'Applying one rate to a mixed invoice that contains several tax treatments.',
          'Ignoring discounts, shipping, or other amounts that may change the taxable base.',
          'Rounding every intermediate figure and creating avoidable paise differences.',
        ],
      },
      {
        heading: 'Frequently asked questions about GST',
        paragraphs: [
          'To add 18% GST to 1,000, the GST amount is 180 and the final amount is 1,180. To remove 18% GST from 1,180, the original amount is 1,000 and the GST amount is 180. The two examples look like opposites because the inclusive amount was created from the base using the same rate.',
          'The calculator offers common rates but cannot tell you which rate legally applies. Confirm the rate from the invoice, product or service classification, or your tax adviser. Tax rules are more detailed than a percentage button and can change over time.',
          'If an invoice contains CGST and SGST, the combined GST amount is still the total tax for the selected rate, subject to the applicable transaction rules. The calculator does not split the amount into tax components because that requires knowing the supply type and jurisdiction.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I add 18% GST to a price?',
        answer:
          'Choose Add GST, select 18%, enter the price before tax, and calculate. The result shows the GST amount and final amount including GST.',
      },
      {
        question: 'How do I remove GST from an inclusive price?',
        answer:
          'Choose Remove GST, select the rate, and enter the amount including tax. The calculator divides by 1 plus the rate to find the original amount and shows the GST portion.',
      },
      {
        question: 'Can I use any GST rate for any product?',
        answer:
          'No. The applicable rate depends on the goods or service and current tax rules. Use the rate confirmed on the invoice or by your tax process.',
      },
      {
        question: 'Does this split CGST, SGST, and IGST?',
        answer:
          'No. It shows the combined GST amount. Splitting tax components depends on the transaction and place of supply.',
      },
    ],
  },
  cgpa: {
    title: 'CGPA Calculator Online – Calculate Your CGPA Free | Calc Notebook',
    metaDescription:
      'Calculate your CGPA on a 10-point scale using subject grade points and credits. The Calc Notebook CGPA calculator is clear, flexible, and easy to use.',
    intro:
      'A CGPA is more useful when every subject is counted with the right academic weight. This CGPA calculator combines your subject grade points and credit values using the standard credit-weighted average: multiply each grade point by its credits, add those weighted points, and divide by total credits. Add as many subjects as you need, leave unused rows empty, and see the CGPA along with the subjects and credits included in the result.',
    sections: [
      {
        heading: 'What is CGPA?',
        paragraphs: [
          'CGPA means Cumulative Grade Point Average. It is a summary of academic performance expressed as a grade-point average rather than as marks out of 100. A CGPA can describe one semester, a year, a term, or a complete programme depending on the subjects and results included. Many institutions use a 10-point scale, although some universities use a 4-point scale or another local system. This calculator is designed for grade points on a 0-to-10 scale, so confirm the scale on your marksheet before entering values.',
          'The word cumulative does not always mean that every subject has identical importance. In a credit-based programme, a three-credit course should generally contribute less than a six-credit course because the larger course represents more academic workload. That is why the calculator asks for credits as well as grade points. If all subjects have exactly the same credits, the weighted result becomes the ordinary average of the grade points. When credits differ, the weighted calculation gives the larger courses their proper influence.',
        ],
      },
      {
        heading: 'How to use this CGPA calculator',
        paragraphs: [
          'Enter one row for each subject you want to include. You can type a short subject name for your own reference, but the name is optional. Enter the grade point awarded for the subject in the Grade point field, and enter the subject credit value in Credits. For example, a subject with grade point 8.5 and four credits contributes 34 weighted points. Add the remaining subjects in the same way and choose Calculate my CGPA when the rows are ready.',
          'The first five rows are ready when the page opens, and you can add another subject whenever your semester has more courses. Blank rows are ignored, so you do not need to fill every visible row. A row that has only a grade point or only credits is treated as incomplete and will be highlighted. The calculator also prevents grade points below 0 or above 10 and requires every used credit value to be greater than zero.',
          'After calculation, the result shows the CGPA rounded to two decimal places, the number of subjects counted, and the total credits used. The underlying calculation keeps the full decimal precision before the displayed answer is rounded. This avoids changing the weighted average too early. If your institution rounds only at the end of a semester or follows a particular transcript rule, use the displayed result as a clear estimate and compare it with the official academic record.',
        ],
      },
      {
        heading: 'The CGPA formula explained',
        paragraphs: [
          'The standard credit-weighted formula is CGPA = Σ(grade point × credit) ÷ Σcredits. The Greek letter sigma means “add all of the values.” For every subject, multiply its grade point by its credit value. Then add those products together. Separately add all credit values. Finally divide the total weighted points by the total credits. The result remains on the same grade-point scale as the inputs, so grade points out of 10 produce a CGPA out of 10.',
          'Imagine three subjects with grade points 8, 7, and 9 and credits 4, 3, and 2. The weighted points are 32, 21, and 18, for a total of 71. The total credits are 9, so the CGPA is 71 ÷ 9, or 7.89 when rounded to two decimals. A simple average would be 8.00, which is slightly different because it treats the three subjects as equally large. The credit-weighted result reflects the course structure.',
          'The order of the subjects does not change the result. You can enter them in marksheet order, alphabetically, or in any order that is easiest to check. What matters is that each grade point stays paired with the correct credit value. If a subject has a zero grade point and positive credits, it is a valid input and contributes zero weighted points. If it has no credits, it cannot be included in a weighted average and the calculator asks you to correct the row.',
        ],
      },
      {
        heading: 'Why credits matter in a CGPA',
        paragraphs: [
          'Credits represent the relative weight of a course in many academic systems. A lab, project, lecture course, elective, and seminar may not all carry the same number of credits. Giving every subject equal weight can make the final average look different from the institution’s official CGPA. The calculator therefore does not assume that every row has four credits or that every course contributes equally. Enter the credit value printed in your syllabus, grade report, or student information system.',
          'Credits also help you plan future results. If you know your current total credits and CGPA, you can use the same weighted-average idea to estimate how a future semester may affect the cumulative number. That estimate requires your current weighted points, not just the displayed rounded CGPA. When accuracy matters, use the unrounded official values or ask your institution for the exact record. A two-decimal CGPA can be useful for planning, but rounding too early can create a small difference over many semesters.',
          'Some programmes include courses that do not affect the GPA, such as pass/fail modules, audit courses, internships, or non-credit activities. Do not enter those as normal grade-point rows unless your institution includes them in the CGPA calculation. The correct inclusion rule belongs to the academic policy. This calculator performs the arithmetic on the rows you provide; it cannot identify whether a particular course is counted, excluded, repeated, or replaced under your university’s rules.',
        ],
      },
      {
        heading: 'CGPA, GPA, SGPA, and percentage',
        paragraphs: [
          'GPA usually refers to a grade-point average for a defined set of courses, while SGPA commonly refers to a semester grade point average. CGPA normally combines results across multiple semesters or a larger academic period. Terminology differs between institutions, so read the label on your official report. The arithmetic may be similar, but the courses, credits, scale, and repeat rules included in each number can be different. This page can calculate a weighted average for the rows you enter, regardless of which label your college uses.',
          'There is no universal formula for converting CGPA to percentage. Some institutions use a published multiplier, some use a formula tied to a specific grading scheme, and some do not provide a direct conversion at all. A commonly quoted formula may be correct for one board or university and wrong for another. Use the conversion rule printed by your institution when an application asks for a percentage. Do not automatically multiply a 10-point CGPA by 10 unless your official policy explicitly says to do so.',
          'Likewise, a 10-point CGPA cannot be compared directly with a 4-point GPA without a recognised conversion method. Grade boundaries, course difficulty, credit policies, and institutional scales vary. If you are applying for a job, scholarship, exchange programme, or graduate course, submit the official transcript and conversion note when requested. The calculator is excellent for understanding the weighted number, but official academic documents should decide how it is reported.',
        ],
      },
      {
        heading: 'Checking your inputs before calculating',
        paragraphs: [
          'Start by checking the grading scale. This calculator accepts grade points from 0 through 10, including decimal values such as 7.5 or 8.25. If your result is a letter grade, convert it to the numeric grade point using your institution’s own table before entering it. Do not treat a raw mark such as 86 as a grade point of 86; raw marks and grade points are different measures. If your university gives a four-point grade, use a four-point tool or an approved conversion first.',
          'Next confirm credits and course status. Look for the credit column on the official grade report, and check whether an audit, failed, repeated, withdrawn, or transfer course is included. If a course has been repeated, the institution may replace the old grade, average attempts, or count both attempts. The calculator can model whichever rows you choose, but you should choose them according to the academic regulation rather than simply entering every line on a transcript.',
          'Finally, keep a note of the source for each number. A quick screenshot or saved result can be helpful for your own planning, but personal academic records should not be shared unnecessarily. If the official CGPA differs by a small amount, first check whether the institution used more decimal places, excluded a course, applied a repeat policy, or rounded only after combining semesters. Those explanations are common and do not necessarily mean the arithmetic is wrong.',
        ],
      },
      {
        heading: 'Using CGPA for academic planning',
        paragraphs: [
          'A CGPA can help you set a target for the next semester. You can compare your current number with a scholarship threshold, eligibility requirement, or personal goal. Treat the threshold as a planning reference, not as a statement about your ability. A target is most useful when paired with specific actions: reviewing difficult topics early, attending support sessions, creating a realistic study schedule, and checking assessment weightings before exams. The calculator shows the number that a plan is trying to influence.',
          'If you want to understand how much one subject can change the average, enter your known results and then add a separate row for a possible grade point and credit value. Compare scenarios with the same total credits and change one assumption at a time. This keeps the result understandable. Remember that a high-credit subject usually changes the average more than a low-credit subject, while a subject with a grade point close to your current average has a smaller effect.',
          'Academic outcomes are more than one number. A transcript may show individual grades, projects, internships, publications, skills, attendance, and improvement over time. A CGPA can be useful for an application or eligibility check, but it should not become the only measure of progress. Use it alongside feedback from instructors, your own learning goals, and the requirements of the programme or opportunity you are considering.',
        ],
      },
      {
        heading: 'Common CGPA calculation mistakes',
        bullets: [
          'Taking a simple average of subject grade points when the subjects have different credit values.',
          'Entering raw marks, such as 82, in a field that expects a grade point on a 0-to-10 scale.',
          'Pairing a grade point with the wrong subject’s credits after copying values from a marksheet.',
          'Including audit, pass/fail, withdrawn, or non-credit courses when the institution excludes them.',
          'Using a percentage conversion formula from another university without checking the official policy.',
          'Rounding every semester before combining the values instead of using the most precise official data available.',
          'Assuming repeated courses are handled the same way by every college or examination board.',
        ],
      },
      {
        heading: 'Frequently asked questions about CGPA',
        paragraphs: [
          'This calculator is intentionally transparent: every counted subject contributes a grade point multiplied by its credits, and the sum is divided by total credits. That makes it easy to compare the result with your own spreadsheet or academic record. If the numbers do not match, inspect the subject list and inclusion rules before changing the formula. Different institutions can use the same words while applying different policies to repeats, exclusions, and rounding.',
          'For a semester result, enter only the subjects that belong to that semester. For a cumulative result, enter all counted subjects across the relevant semesters, or use the institution’s semester-level weighted totals if those are provided. Do not average semester CGPAs directly unless every semester has the same total credits. A semester with 20 credits should have more influence than one with 12 credits when calculating a combined academic average.',
          'The result is rounded for readability, while the calculation uses the entered decimal values. If you need a document for an employer or university, use your official transcript. The calculator is a planning and checking tool that helps you understand how grade points and credits work together.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the formula for calculating CGPA?',
        answer:
          'CGPA is calculated as the sum of each grade point multiplied by its credits, divided by the sum of all credits: Σ(grade point × credits) ÷ Σcredits.',
      },
      {
        question: 'Does this calculator support different subject credits?',
        answer:
          'Yes. Enter the grade point and credit value for every subject. Subjects with more credits have a proportionally larger effect on the weighted CGPA.',
      },
      {
        question: 'Can I convert my CGPA to percentage here?',
        answer:
          'The calculator reports CGPA on a 10-point scale. Percentage conversion rules vary by institution, so use the official conversion formula from your university or board.',
      },
      {
        question: 'What if all my subjects have the same credits?',
        answer:
          'When every subject has the same credit value, the credit-weighted CGPA is the same as the simple average of the subject grade points.',
      },
      {
        question: 'Why does my calculated CGPA differ from my transcript?',
        answer:
          'Your institution may exclude certain courses, apply repeat-grade rules, use more precise values, or round at a different stage. Check the official academic policy and transcript.',
      },
    ],
  },
  'stamp-duty': {
    title: 'Stamp Duty Calculator Haryana – Property Registration Cost | Calc Notebook',
    metaDescription:
      'Calculate Haryana stamp duty and registration charges for property in Sonipat, Panipat, Gurugram and more. Free, instant, and easy to use.',
    intro:
      'Buying property in Haryana means paying stamp duty and registration on the transaction. This Haryana stamp duty calculator estimates those charges using the applicable rates and your city’s reference circle rate. Enter the property value, choose a Haryana city, select the area type as urban or rural, and pick the buyer category to see the stamp duty amount, the registration fee, and the total cost. The result is meant for budgeting and quick planning before you finalise a deal.',
    sections: [
      {
        heading: 'What is stamp duty on property in Haryana?',
        paragraphs: [
          'Stamp duty is a legal tax paid on documents that transfer property. In Haryana, the stamp duty rate varies by the category of the buyer and the area where the property is located. Inside municipal limits, the commonly applied rates are 7% for a male buyer, 5% for a female buyer, 6% for joint ownership of a man and a woman, 7% for joint ownership with two male buyers, and 5% for joint ownership with two female buyers. Outside municipal limits, the rates are 5% for a male buyer, 3% for a female buyer, and 4% for joint ownership of a man and a woman. Because rates change through state budgets and local notifications, always confirm the current slab from the Haryana Stamp and Registration Department before relying on any estimate.',
          'The duty is normally calculated on the higher of two values: the consideration mentioned in the sale deed or the circle rate fixed by the government for that area. Circle rates, also known as collector rates, differ by city and often by colony within a city. That is why the same property value can produce very different charges in Gurugram and Panipat. This calculator uses the higher of the entered value and the reference circle rate when a plot area is provided. In addition to stamp duty, a slab-based registration fee applies, starting from ₹100 and rising up to a maximum cap of ₹50,000.',
        ],
      },
      {
        heading: 'What are circle rates and why do they matter?',
        paragraphs: [
          'Circle rates are minimum property values notified by the state for registration purposes. They act as a floor so that very low sale prices cannot artificially reduce stamp duty. Each Haryana city publishes rates for residential, commercial, and agricultural land, usually expressed per square yard. Sonipat, Panipat, Rohtak, Karnal, Hisar, Ambala, Gurugram, and Faridabad all publish their own rates, and larger cities often have multiple circles inside them.',
          'When the sale consideration is below the circle rate, the legal minimum value becomes the circle rate for the district, and stamp duty is payable on that higher figure. When the sale price is above the circle rate, the consideration applies. This calculator takes the higher of the two when you enter a plot area. If you only enter the property value, it estimates the duty on the value you provide and reminds you to check the applicable circle rate.',
        ],
      },
      {
        heading: 'How to use this stamp duty calculator',
        paragraphs: [
          'Start with the property value you expect to pay or the value mentioned in the agreement. Choose the Haryana city where the property is located from the dropdown, then select the area type: Urban for property within the municipal committee or corporation limits, and Rural for property outside those limits. Select the buyer category from the available options — male, female, or joint ownership — because Haryana applies different rates for each. The correct combination of area type and buyer category changes the result.',
          'If you know the plot area in square yards, enter it as well. The calculator compares the agreement value with your city’s typical circle rate multiplied by the area and uses the higher figure as the taxable base. For flats and apartments, where registration is often linked to a different valuation, the plot-area estimate is approximate. The result panel then shows the stamp duty amount, the slab-based registration fee, and the total amount to budget for.',
          'Use the entered city only as a reference for the circle-rate band and duty context. Rural and urban areas within the same district can follow different slabs, and specific colonies may carry different notified rates. For an exact figure, verify the circle rate for the exact locality and judicial area on the official Haryana revenue portal or with a local sub-registrar before signing.',
        ],
      },
      {
        heading: 'Stamp duty rates and buyer types',
        paragraphs: [
          'Haryana applies different stamp duty rates depending on whether the property sits inside or outside municipal limits. Within municipal limits, a male buyer pays 7%, a female buyer pays 5%, joint ownership with one male and one female buyer pays 6%, joint ownership with two male buyers pays 7%, and joint ownership with two female buyers pays 5%. Outside municipal limits, the rates are lower: 5% for a male buyer, 3% for a female buyer, and 4% for a joint purchase by a man and a woman.',
          'Beyond stamp duty, Haryana charges a slab-based registration fee that starts at ₹100 for lower-value properties and rises with the property value up to a maximum cap of ₹50,000. The fee is charged in addition to the stamp duty, so it must be included when budgeting for the total registration cost. Both the duty rates and the fee slabs are editable constants in the tool so future budget changes can be reflected quickly.',
          'The buyer category and the ownership structure both matter. Transactions where a company or business entity is the buyer, or cases involving HUF, specific schemes, or multiple buyers in other combinations, can follow rules outside this table. The calculator models the individual and joint options listed above. If your case involves a business entity or a special scheme, compare the estimate with the sub-registrar’s figure before relying on it.',
          'Stamp duty is separate from taxes such as GST on services, property tax levied later by a municipality, or the charges paid to a builder or society. Use this tool for the dutiable document cost only, and remember that penalties, delayed payment interest, and additional charges can apply when duty is not paid on time.',
        ],
      },
      {
        heading: 'Example property purchase calculations',
        paragraphs: [
          'Consider a property inside municipal limits in Sonipat with an agreement value of 30 lakh rupees. With a joint purchase by one male and one female buyer at the urban rate of 6%, stamp duty comes to 1.8 lakh. The registration fee for a value above 20 lakh is 20 thousand, giving a total of 2 lakh. If the same property is bought by a single male buyer, the duty rises to 2.1 lakh at 7%, and a single female buyer pays 1.5 lakh at 5%.',
          'Outside municipal limits the picture changes. For a rural property of the same value in Sonipat, a joint male and female purchase at 4% gives a duty of 1.2 lakh, a female buyer at 3% pays 90 thousand, and a male buyer at 5% pays 1.5 lakh. The rural concessions make a visible difference for buyers registering agricultural or village properties.',
          'Now suppose a plot of 200 square yards in Panipat where the typical circle rate is 21,000 rupees per square yard. The circle-rate value is 42 lakh. If the agreement value is only 35 lakh, the taxable base becomes 42 lakh because the duty is charged on the higher figure. The difference matters, which is why entering the plot area along with the city gives a more realistic estimate than a bare agreement value.',
          'These examples use the constants in the tool and are meant to show how the calculation works. Actual numbers vary with the notified circle rate for the exact colony and the duty slab current on the date of registration. Use the calculator as a rapid estimate, then confirm with an official source.',
        ],
      },
      {
        heading: 'Common stamp duty calculation mistakes',
        bullets: [
          'Calculating duty on the agreement value when the circle rate for the area is higher.',
          'Forgetting the separate registration fee and quoting only the stamp duty.',
          'Using a male rate when a concession for a woman buyer applies, or vice versa.',
          'Choosing a city without the rural or urban context, since slabs can differ inside a district.',
          'Applying an outdated rate after a state budget or Haryana notification changes the slab.',
          'Assuming the total on an estimate equals the final charge payable at the sub-registrar office.',
        ],
      },
      {
        heading: 'Frequently asked questions about Haryana stamp duty',
        paragraphs: [
          'The stamp duty payable is based on the higher of the agreement value and the applicable circle rate, using the rate slab for your buyer category and area type. Registration is charged in addition to the duty through a slab-based fee that starts at ₹100 and caps at ₹50,000 for higher-value properties. The calculator applies these constants and shows the breakdown so you can inspect every number.',
          'Yes, women buyers and joint purchasers that include a woman often pay a lower stamp duty rate in Haryana. The tool includes male, female, and joint buyer options so you can compare costs before deciding how the property deed should be structured. Confirm the current concession requirements, including joint-ownership conditions, with the registration office.',
          'If the agreement value is below the circle rate for the area, the circle rate becomes the taxable base and the duty is calculated on that higher value. Entering the plot area helps the calculator apply this correctly for a residential plot. For flats and commercial property, confirm the applicable valuation with the sub-registrar.',
          'The result is an estimate for budgeting. Stamp duty and registration rates in Haryana change through budgets and official notifications, and the exact circle rate depends on the specific locality and colony. Always verify the current rates on the official Haryana revenue department documents before the registration date.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the stamp duty rate in Haryana?',
        answer:
          'Inside municipal limits the urban rate is 7% for a male buyer, 5% for a female buyer, 6% for a joint male and female purchase, 7% for two male buyers, and 5% for two female buyers. Outside municipal limits the rural rate is 5% for a male buyer, 3% for a female buyer, and 4% for a joint male and female purchase. Registration fee is charged separately through a slab-based structure. Verify the current slab on the official portal.',
      },
      {
        question: 'Is stamp duty calculated on agreement value or circle rate?',
        answer:
          'It is calculated on the higher of the agreement value and the applicable circle rate for the area. When the agreement value is below the circle rate, stamp duty is payable on the circle-rate value.',
      },
      {
        question: 'Does the buyer category affect stamp duty in Haryana?',
        answer:
          'Yes. Male, female, and joint buyer categories each carry different rates, and women buyers or joint buyers that include a woman generally pay less. Select the correct category in the calculator to see the right estimate.',
      },
      {
        question: 'How is the registration fee in Haryana calculated?',
        answer:
          'Registration is charged through a slab-based fee that starts at ₹100 for lower-value properties and rises with the transaction value, up to a maximum cap of ₹50,000 for properties valued above ₹90,000.',
      },
      {
        question: 'Which Haryana cities are covered by this calculator?',
        answer:
          'The tool includes Sonipat, Panipat, Rohtak, Karnal, Hisar, Ambala, Gurugram, and Faridabad. Each city shows a reference circle-rate band for comparison with your entered value.',
      },
      {
        question: 'Is this stamp duty calculator the final registration charge?',
        answer:
          'No. It is an estimate based on the entered value, buyer category, area type, and reference circle rate. Exact charges depend on the notified circle rate for the locality, the current duty and fee slabs, and any special schemes or penalties.',
      },
    ],
  },
};

export const homeSeoSections: SeoSection[] = [
  {
    heading: 'Stamp duty calculator for Haryana property buyers',
    paragraphs: [
      'The Haryana stamp duty calculator estimates the charges you pay when registering a property in the state. Enter the property value, choose a city such as Sonipat, Panipat, or Gurugram, select the area type as urban or rural, and pick the buyer category. The result shows stamp duty, the slab-based registration fee, and the total amount to budget, including the effect of circle rates where the agreement value is too low.',
    ],
  },
  {
    heading: 'Everyday calculators in one calm place',
    paragraphs: [
      'Calc Notebook is a simple collection of practical calculators for the small questions that appear throughout a normal day. You may be comparing a loan, checking a birthday, working out a discount, understanding a BMI estimate, or adding GST to a price. Instead of opening a different tool for every question, choose the page that matches the number in front of you. Each calculator keeps the inputs visible, explains the result, and avoids unnecessary steps.',
      'The calculators are designed for quick estimates and clear thinking. They do not require an account, a spreadsheet, or a complicated setup. Start with the smallest set of information you know, read the result, and then try another scenario if you are comparing options. For financial, tax, and health decisions, use the result as a helpful starting point and confirm important details with the relevant professional or official document.',
    ],
  },
  {
    heading: 'EMI calculator for loan planning',
    paragraphs: [
      'The EMI calculator helps you understand the cost of borrowing before you accept a loan. Enter the loan amount, annual interest rate, and tenure in months to see your loan EMI, total interest, and total payment. Those three numbers tell a fuller story than a low monthly payment alone. Try a shorter tenure, a different rate, or a larger down payment to see how the total cost changes.',
    ],
  },
  {
    heading: 'Age calculator for exact dates',
    paragraphs: [
      'This date of birth calculator turns a date of birth into an exact calendar age in years, months, and days. It also counts total days lived, including the effect of leap years and different month lengths. It is handy for birthdays, forms, milestone planning, and any situation where a rounded age is not precise enough. For official eligibility, always compare the answer with the organisation’s required cutoff date and documents.',
    ],
  },
  {
    heading: 'Percentage calculator for quick comparisons',
    paragraphs: [
      'This percent calculator answers two common questions: what is X% of Y, and X is what percent of Y? Whether you need a percentage of a number or the percent behind a score, both take two quick inputs. Use it for marks, discounts, tips, budgets, business metrics, and everyday comparisons. The two modes make the direction of the question explicit, which helps avoid the common mistake of putting the part and the whole in reverse order.',
    ],
  },
  {
    heading: 'BMI calculator for a quick screening estimate',
    paragraphs: [
      'The BMI calculator uses height in centimetres and weight in kilograms to estimate body mass index. It displays a value and a standard adult category, which is why many visitors treat it as a healthy weight calculator. BMI is only a screening measure and cannot describe body composition, fitness, medical history, or individual health on its own. Use it as a prompt for a supportive conversation, not as a diagnosis or a reason to make extreme changes.',
    ],
  },
  {
    heading: 'GST calculator for inclusive and exclusive prices',
    paragraphs: [
      'The GST calculator for India makes it easier to move between a base amount and a tax-inclusive amount. Select 5%, 12%, 18%, or 28%, then choose Add GST or Remove GST. The result shows the GST amount and the relevant original or final value. Always confirm the correct rate and tax treatment from the invoice or current rules before using a result for formal accounting or compliance.',
    ],
  },
  {
    heading: 'CGPA calculator for credit-weighted marks',
    paragraphs: [
      'The CGPA calculator helps students combine subject grade points into one credit-weighted academic average. Enter the grade point and credit value for each subject, then calculate to see the CGPA on a 10-point scale. Subjects with more credits have a proportionally larger effect because they represent more coursework. The page is useful for semester checks, academic planning, and understanding how one subject may change an overall average.',
    ],
  },
];