import React, { useState, useEffect } from 'react';
import FarmerSidebar from './farmersidebar';
import './farmercalendar.css';

const FarmerCalendar = () => {
  const [activeMenu, setActiveMenu] = useState('Calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('Week'); // Day, Week, Month, Year
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample farming events data
  const [events, setEvents] = useState([
    { id: 1, title: 'Monday Wake-Up Hour', time: '8:00 AM', date: '2021-02-22', type: 'routine', color: '#4dabf7' },
    { id: 2, title: 'All-Team Kickoff', time: '9:00 AM', date: '2021-02-22', type: 'meeting', color: '#51cf66' },
    { id: 3, title: 'Financial Update', time: '10:00 AM', date: '2021-02-22', type: 'report', color: '#4dabf7' },
    { id: 4, title: 'New Employee Welcome Lunch!', time: '11:00 AM', date: '2021-02-22', type: 'social', color: '#9775fa' },
    { id: 5, title: 'Design Review', time: '1:00 PM', date: '2021-02-22', type: 'review', color: '#4dabf7' },
    { id: 6, title: '1:1 with Jon', time: '2:00 PM', date: '2021-02-22', type: 'meeting', color: '#ff8787' },
    { id: 7, title: 'Plant Inspection', time: '9:00 AM', date: '2021-02-23', type: 'farming', color: '#51cf66' },
    { id: 8, title: 'Design System Kickoff Lunch', time: '12:00 PM', date: '2021-02-23', type: 'social', color: '#4dabf7' },
    { id: 9, title: 'Concept Design Review II', time: '2:00 PM', date: '2021-02-23', type: 'review', color: '#4dabf7' },
    { id: 10, title: 'Design Team', time: '4:00 PM', date: '2021-02-23', type: 'meeting', color: '#ff6b35' },
    { id: 11, title: 'Coffee Chat', time: '9:00 AM', date: '2021-02-24', type: 'social', color: '#4dabf7' },
    { id: 12, title: 'Coffee Chat', time: '9:00 AM', date: '2021-02-25', type: 'social', color: '#4dabf7' },
    { id: 13, title: 'Onboarding Presentation', time: '11:00 AM', date: '2021-02-24', type: 'presentation', color: '#9775fa' },
    { id: 14, title: 'MVP Prioritisation Workshop', time: '1:00 PM', date: '2021-02-24', type: 'workshop', color: '#4dabf7' },
    { id: 15, title: 'Health Benefits Walkthrough', time: '10:00 AM', date: '2021-02-25', type: 'info', color: '#9775fa' },
    { id: 16, title: 'Design Review', time: '1:00 PM', date: '2021-02-25', type: 'review', color: '#4dabf7' },
    { id: 17, title: 'Coffee Chat', time: '9:00 AM', date: '2021-02-26', type: 'social', color: '#4dabf7' },
    { id: 18, title: 'Marketing Meet-and-Greet', time: '12:00 PM', date: '2021-02-26', type: 'networking', color: '#4dabf7' },
    { id: 19, title: '1:1 with Heather', time: '2:00 PM', date: '2021-02-26', type: 'meeting', color: '#ff8787' },
    { id: 20, title: 'Happy Hour', time: '4:00 PM', date: '2021-02-26', type: 'social', color: '#ff8787' }
  ]);

  // Get current week dates
  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(startOfWeek);
      weekDay.setDate(startOfWeek.getDate() + i);
      weekDates.push(weekDay);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(currentDate);
  const timeSlots = [
    '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'
  ];

  const formatDate = (date) => date.toISOString().split('T')[0];

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const getTimeSlotIndex = (timeStr) => {
    const time = timeStr.toLowerCase();
    if (time.includes('7') && time.includes('am')) return 0;
    if (time.includes('8') && time.includes('am')) return 1;
    if (time.includes('9') && time.includes('am')) return 2;
    if (time.includes('10') && time.includes('am')) return 3;
    if (time.includes('11') && time.includes('am')) return 4;
    if (time.includes('12') && time.includes('pm')) return 5;
    if (time.includes('1') && time.includes('pm')) return 6;
    if (time.includes('2') && time.includes('pm')) return 7;
    if (time.includes('3') && time.includes('pm')) return 8;
    if (time.includes('4') && time.includes('pm')) return 9;
    if (time.includes('5') && time.includes('pm')) return 10;
    if (time.includes('6') && time.includes('pm')) return 11;
    return 0;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const getMonthEvents = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    }).slice(0, 10);
  };

  const getUpcomingEvents = () => {
    const upcoming = {};
    const today = new Date();

    events.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate >= today) {
        const dateKey = eventDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'numeric',
          day: 'numeric',
          year: 'numeric'
        });

        if (!upcoming[dateKey]) {
          upcoming[dateKey] = [];
        }
        upcoming[dateKey].push(event);
      }
    });

    return upcoming;
  };

  const monthEvents = getMonthEvents();
  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="fc-main-layout">
      <FarmerSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="fc-container">
        {/* Header */}
        <div className="fc-header">
          <h1 className="fc-greeting">Hello, Farmer!</h1>

          {/* ✅ fixed header actions alignment */}
          <div className="fc-header-actions">
            <div className="fc-search-container">
              <input
                type="text"
                placeholder="Search..."
                className="fc-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="fc-search-icon">🔍</span>
            </div>

            <div className="fc-notification">
              <span className="fc-notification-icon">🔔</span>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="fc-calendar-wrapper">
          {/* Calendar Controls */}
          <div className="fc-calendar-controls">
            <div className="fc-nav-controls">
              <button className="fc-nav-btn" onClick={() => navigateWeek(-1)}>&lt;</button>
              <span className="fc-current-period">Today</span>
              <button className="fc-nav-btn" onClick={() => navigateWeek(1)}>&gt;</button>
            </div>

            <div className="fc-view-controls">
              {['Day', 'Week', 'Month', 'Year'].map(mode => (
                <button
                  key={mode}
                  className={`fc-view-btn ${viewMode === mode ? 'active' : ''}`}
                  onClick={() => setViewMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="fc-search-calendar">
              <input type="text" placeholder="Search" className="fc-calendar-search" />
              <span className="fc-search-icon">🔍</span>
            </div>
          </div>

          <div className="fc-main-content">
            {/* Calendar Grid */}
            <div className="fc-calendar-section">
              {/* Week Header */}
              <div className="fc-week-header">
                {weekDates.map((date, index) => (
                  <div key={index} className="fc-day-header">
                    <div className="fc-day-name">
                      {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                    </div>
                    <div className="fc-day-number">{date.getDate()}</div>
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="fc-calendar-grid">
                {/* Time Column */}
                <div className="fc-time-column">
                  {timeSlots.map((time, index) => (
                    <div key={index} className="fc-time-slot">{time}</div>
                  ))}
                </div>

                {/* Days Columns */}
                {weekDates.map((date, dayIndex) => (
                  <div key={dayIndex} className="fc-day-column">
                    {timeSlots.map((time, timeIndex) => {
                      const dayEvents = getEventsForDate(date);
                      const slotEvents = dayEvents.filter(event => getTimeSlotIndex(event.time) === timeIndex);

                      return (
                        <div key={timeIndex} className="fc-time-cell">
                          {slotEvents.map(event => (
                            <div
                              key={event.id}
                              className="fc-event"
                              style={{ backgroundColor: event.color }}
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className="fc-event-time">{event.time}</div>
                              <div className="fc-event-title">{event.title}</div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="fc-right-sidebar">
              {/* Mini Calendar */}
              <div className="fc-mini-calendar">
                <div className="fc-mini-header">
                  <button className="fc-mini-nav">&lt;</button>
                  <span className="fc-mini-title">February <span className="fc-year">2021</span></span>
                  <button className="fc-mini-nav">&gt;</button>
                  <button className="fc-add-btn">+</button>
                </div>

                <div className="fc-mini-grid">
                  <div className="fc-mini-days">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                      <div key={day} className="fc-mini-day-header">{day}</div>
                    ))}
                  </div>
                  <div className="fc-mini-dates">
                    {Array.from({ length: 35 }, (_, i) => {
                      const date = i - 6;
                      const isCurrentMonth = date > 0 && date <= 28;
                      const isToday = date === 27;

                      return (
                        <div
                          key={i}
                          className={`fc-mini-date ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                        >
                          {date > 0 && date <= 28 ? date : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="fc-today-info">
                  <div className="fc-today-label">TODAY 2/27/2021</div>
                  <div className="fc-weather">55°/49° ❄</div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="fc-upcoming-events">
                {Object.entries(upcomingEvents).slice(0, 4).map(([date, dayEvents]) => (
                  <div key={date} className="fc-event-group">
                    <div className="fc-event-date">
                      {date.split(' ')[0]} {date.split(' ')[1]}/{date.split(' ')[2]}
                    </div>
                    <div className="fc-weather-info">55°/49° ❄</div>

                    {dayEvents.slice(0, 3).map(event => (
                      <div key={event.id} className="fc-upcoming-event">
                        <div className="fc-event-indicator" style={{ backgroundColor: event.color }}></div>
                        <div className="fc-event-details">
                          <div className="fc-event-time-range">{event.time} - {event.time}</div>
                          <div className="fc-event-description">{event.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerCalendar;
