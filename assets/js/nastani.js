
let today = new Date(); // get todays date
let currentMonth = today.getMonth(); // get current month 0 - 11 ... Jan - Dec
let currentYear = today.getFullYear(); // get full/long year 2020
let months = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] // define months array

// select prev/next buttons
let nextBtn = document.querySelector('#nextBtn');
let prevBtn = document.querySelector('#prevBtn');

// attach events for prev/next functions
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

// define array of events that will contain whatever data needs to be displayed,
// but must contain date: new Date(YYYY,M,D), to be able to find it on calendar
const eventsData = [
    {
        date: new Date(2020, 2, 26),
        title: 'Deep dive into Marketing',
        time: '17:00 - 19:00',
        bgColor: 'red',
        color: 'white'
    },
    {
        date: new Date(2020, 2, 29),
        title: 'Deep Dive into Data Science',
        time: '10:00 - 12:00',
        bgColor: 'yellow',
        color: 'black'
    },
    {
        date: new Date(2020, 2, 29),
        title: 'Deep Dive into Data Science2',
        time: '12:00 - 14:00',
        bgColor: 'blue',
        color: 'white'
    },
    {
        date: new Date(2020, 2, 6),
        title: 'Deep dive into Marketing',
        time: '19:00 - 21:00',
        bgColor: 'red',
        color: 'white'
    },
    {
      date: new Date(2020, 3, 5),
      title: 'Deep dive into Marketing',
      time: '10:00 - 12:00',
      bgColor: 'red',
      color: 'white'
  },
  {
    date: new Date(2020, 4, 10),
    title: 'Deep dive into Marketing',
    time: '10:00 - 12:00',
    bgColor: 'red',
    color: 'white'
},
{
  date: new Date(2020, 3, 23),
  title: 'Deep dive into Data Science',
  time: '10:00 - 12:00',
  bgColor: 'blue',
  color: 'white'
}
]

// call of renderCalendar with initials values of currentMonth, currentYear and eventsData
renderCalendar(currentMonth, currentYear, eventsData);

// next function that will calculate currentYear and currentMonth and 
// will make a call of renderCalendar with pre-calculated parameters
function next() {
    currentYear = (currentMonth == 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    renderCalendar(currentMonth, currentYear, eventsData);
}

// prev function that will calculate currentYear and currentMonth and 
// will make a call of renderCalendar with pre-calculated parameters
function prev() {
    currentYear = (currentMonth == 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth == 0) ? 11 : currentMonth - 1;
    renderCalendar(currentMonth, currentYear, eventsData);
}

// renederCalendar function that will draw each month, weeks and days, as well it will display events
// takes 3 arguments, 
// month/year: which month/year it should render,
// events: list of event objects that will need to be displayed
function renderCalendar(month, year, events) {
    // create another today object, not to be dependent from any global prameters, 
    // this kind of functions are also called "pure" functions
    let renderToday = new Date();

    // get first day of month by createing 
    // new Date(year, month) - if we dont assign 3rd paremeter in new Date() it will assume the start of the month
    // .getDay() will return day from week or 0 - 6 ... Sun - Sat
    let firstDay = new Date(year, month).getDay();

    // The function new Date(year, month, 32) returns the 32nd day 
    // after the month started. 
    // If we subtract that date from 32, we get the final day of that month.
    // Example, If we pass feb 2020 as an argument, 
    // its ‘32nd’ day will be 3th of march, 
    // subtract 32 from 3 and we get 29,
    // equal to how many days are in month of feb 2020.
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    // select calendar body and monthandyear
    let calendar = document.querySelector('#calendar-body');
    let monthAndYear = document.querySelector('#montyAndYear')

    // Fill html with current month and year in calendar-controls (top-right)
    monthAndYear.innerHTML = `${months[month]} ${year}`;
    // clear calendar-body html to be populated again
    calendar.innerHTML = '';

    // if any, find this year and this month events using filter
    let thisYearAndMonthEvents = events.filter(event => event.date.getFullYear() == year && event.date.getMonth() == month);

    // start the date counting
    let date = 1;

    // first for loop will iterate over the weeks
    for (let i = 0; i < 6; i++) {
        // create week element and add class 'calendar-week'
        let week = document.createElement('div');
        week.classList.add('calendar-week');

        // second for loop will iterate over the days
        for (let j = 0; j < 7; j++) {

            // first condition is ment to fill empty cells until we find firstDay 
            if (i == 0 && j < firstDay) {
                // fill empty cells until you find firstDay of month
                let emptyCell = document.createElement('div');
                emptyCell.classList.add('empty-cell');
                week.appendChild(emptyCell);

            } else if (date <= daysInMonth) {
                // fill current dates until you reach all daysInMonth
                let dayCell = document.createElement('div');
                dayCell.classList.add('day-cell');


                // find if date is today
                if (date == renderToday.getDate() && month == renderToday.getMonth() && year == renderToday.getFullYear()) {
                    dayCell.classList.add('today');
                }

                // create dayCellHTML for furthere population depending on if it is event day or regular day
                let dayCellHTML = '';

                // if there are events in current month and current year
                if (thisYearAndMonthEvents.length) {

                    // find todays events using filter over thisYearAndMonthEvents, take the date from the object and 
                    // check if it is equal to "date", the current date that we iterate
                    let todayEvent = thisYearAndMonthEvents.filter(event => event.date.getDate() == date);

                    // if there are todaysEvents go trough each of them and 
                    // generate dayCell html and store it into dayCellHTML variable with +=
                    // you can do better than me in creating html and css for displaying events!
                    if (todayEvent.length) {
                        dayCell.classList.add('event-day');

                        todayEvent.forEach(ev => {
                            dayCellHTML += `<div class="event" style="border-left:4px solid ${ev.bgColor}"><div>${ev.title}</div><div>${ev.time}</div></div><span>${date}</span>`;
                            dayCell.style.backgroundColor = ev.bgColor;
                            dayCell.style.color = ev.color;
                        });
                    }
                }

                // check if dayCellHTML == '' 
                // than into dayCell.innerHTML store this `<span>${date}</span>` 
                // else into dayCell.innerHTML store what is into dayCellHTML

                // equal to if(condtion) it will look like this: 
                // if(dayCellHTML == '') {
                //     dayCell.innerHTML = `<span>${date}</span>`;
                // }
                dayCell.innerHTML = (dayCellHTML == '') ? `<span>${date}</span>` : dayCellHTML;

                // to the current week append dayCell
                week.appendChild(dayCell);

                // and increese date++ (whick is equal to "date = date + 1")
                date++;
            } else if (date > daysInMonth) {
                // fill empty cells if date is greater than daysInMonth
                // after the end of the month
                let emptyCell = document.createElement('div');
                emptyCell.classList.add('empty-cell');
                week.appendChild(emptyCell);
            }
        }
        // when 1 week iteration is done, append it to the calendar-body
        calendar.appendChild(week);
    }
}

$(function () {
  $('[data-toggle="popover"]').popover()
})

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})