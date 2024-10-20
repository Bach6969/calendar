const monthYearDisplay = document.getElementById('monthYear');
const calendarDays = document.getElementById('calendarDays');
const clearBtn = document.getElementById('clearBtn');
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
let currentMonth = 10; // November
let currentYear = 2024;
const appointments = {};

// Initialize calendar for November 2024
updateCalendar();

// Event listeners for month navigation
document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
clearBtn.addEventListener('click', clearAppointments);

function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
}

function updateCalendar() {
  // Clear previous calendar content
  calendarDays.innerHTML = '';
  // Update month-year display
  monthYearDisplay.textContent = `${months[currentMonth]} ${currentYear}`;

  // Get the first day and number of days in the month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Add empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    calendarDays.appendChild(emptyCell);
  }

  // Generate days with appointment functionality
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');

    // Create date element and add to day
    const dateElement = document.createElement('div');
    dateElement.classList.add('date');
    dateElement.textContent = day;
    dayElement.appendChild(dateElement);

    // Check if there's an appointment for this day
    const key = `${currentYear}-${currentMonth}-${day}`;
    if (appointments[key]) {
      appointments[key].forEach(event => {
        const eventTitle = document.createElement('div');
        eventTitle.classList.add('event-title');
        eventTitle.textContent = event.title;
        dayElement.appendChild(eventTitle);

        const eventDetails = document.createElement('div');
        eventDetails.classList.add('event-details');
        eventDetails.textContent = event.details;
        dayElement.appendChild(eventDetails);
      });
    }

    dayElement.addEventListener('click', () => addAppointment(day));
    calendarDays.appendChild(dayElement);
  }
}

function addAppointment(day) {
  const key = `${currentYear}-${currentMonth}-${day}`;
  const title = prompt('Enter event title:');
  if (title) {
    const details = prompt('Enter event details:');
    if (!appointments[key]) {
      appointments[key] = [];
    }
    appointments[key].push({ title, details });
  }
  updateCalendar();
}

function clearAppointments() {
  if (confirm('Are you sure you want to clear all appointments?')) {
    Object.keys(appointments).forEach(key => delete appointments[key]);
    updateCalendar();
  }
}
