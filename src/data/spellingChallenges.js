// Elementary-level spelling challenges: eat the correctly spelled word among
// common misspellings. `correct` and `incorrect` are sampled from (with
// repeats) to fill the grid, so pools don't need to exactly match the grid size.
export const challenges = [
    {
        target: 'BECAUSE',
        correct: ['because'],
        incorrect: ['becuase', 'becase', 'beacause', 'becausse', 'becaus'],
    },
    {
        target: 'FRIEND',
        correct: ['friend'],
        incorrect: ['freind', 'frend', 'friende', 'freand', 'firend'],
    },
    {
        target: 'WHICH',
        correct: ['which'],
        incorrect: ['wich', 'whitch', 'whic', 'whish'],
    },
    {
        target: 'PEOPLE',
        correct: ['people'],
        incorrect: ['poeple', 'peopel', 'peple', 'peeple'],
    },
    {
        target: 'BEAUTIFUL',
        correct: ['beautiful'],
        incorrect: ['beatiful', 'beutiful', 'beautifull', 'beautiul'],
    },
    {
        target: 'DIFFERENT',
        correct: ['different'],
        incorrect: ['diffrent', 'differant', 'diferent', 'differnt'],
    },
    {
        target: 'FAVORITE',
        correct: ['favorite'],
        incorrect: ['favorate', 'favrite', 'faverite', 'favorit'],
    },
    {
        target: 'LIBRARY',
        correct: ['library'],
        incorrect: ['libary', 'librarry', 'librery', 'librarey'],
    },
    {
        target: 'SCHOOL',
        correct: ['school'],
        incorrect: ['schl', 'skool', 'shcool', 'schoool'],
    },
    {
        target: 'ANIMAL',
        correct: ['animal'],
        incorrect: ['aminal', 'animel', 'anamal', 'animul'],
    },
    {
        target: 'HAPPENED',
        correct: ['happened'],
        incorrect: ['happend', 'hapened', 'happenned', 'happning'],
    },
    {
        target: 'FEBRUARY',
        correct: ['february'],
        incorrect: ['feburary', 'febuary', 'februray', 'februwary'],
    },
    {
        target: 'THROUGH',
        correct: ['through'],
        incorrect: ['thru', 'throuh', 'throug', 'throu'],
    },
    {
        target: 'MACHINE',
        correct: ['machine'],
        incorrect: ['machiene', 'machin', 'mashine', 'machiene'],
    },
    {
        target: 'ALREADY',
        correct: ['already'],
        incorrect: ['alredy', 'allready', 'alrady', 'alreaday'],
    },
    {
        target: 'KNOWLEDGE',
        correct: ['knowledge'],
        incorrect: ['knowlege', 'knowlage', 'knowldge', 'knowlegde'],
    },
    {
        target: 'QUESTION',
        correct: ['question'],
        incorrect: ['queston', 'qustion', 'questionn', 'qestion'],
    },
    {
        target: 'REMEMBER',
        correct: ['remember'],
        incorrect: ['rember', 'remeber', 'remeber', 'rememebr'],
    },
    {
        target: 'SEPARATE',
        correct: ['separate'],
        incorrect: ['seperate', 'seperat', 'seperete', 'sepperate'],
    },
    {
        target: 'SUPER',
        correct: ['super'],
        incorrect: ['supr', 'supper', 'supre', 'supeer'],
    },
    {
        target: 'TOMORROW',
        correct: ['tomorrow'],
        incorrect: ['tommorow', 'tomorow', 'tommorrow', 'tomoorrow'],
    },
    {
        target: 'DELIGHTFUL',
        correct: ['delightful'],
        incorrect: ['delightfull', 'deliteful', 'delightfule', 'delightful'],
    },
    {
        target: 'NEVER',
        correct: ['never'],
        incorrect: ['nevr', 'neverr', 'nevver', 'nver'],
    },
]
