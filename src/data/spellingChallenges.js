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
]
