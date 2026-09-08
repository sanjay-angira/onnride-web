/** Popular city slugs grouped by region — matched against active locations from API. */
export const POPULAR_CITY_REGIONS = [
  {
    region: 'North India',
    slugs: [
      'delhi',
      'leh',
      'gurugram',
      'noida',
      'manali',
      'chandigarh',
      'dehradun',
      'mussoorie',
      'rishikesh',
      'shimla',
      'srinagar',
    ],
  },
  {
    region: 'West India',
    slugs: ['mumbai', 'pune', 'goa', 'jaipur', 'udaipur', 'gokarna', 'ahmedabad'],
  },
  {
    region: 'South India',
    slugs: ['bengaluru', 'coimbatore', 'kochi', 'hyderabad', 'chennai', 'ooty'],
  },
  {
    region: 'East India',
    slugs: ['kolkata', 'bhubaneswar', 'guwahati'],
  },
] as const;
