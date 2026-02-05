import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: HolidayCalendar(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class HolidayCalendar extends StatefulWidget {
  const HolidayCalendar({super.key});

  @override
  State<HolidayCalendar> createState() => _HolidayCalendarState();
}

class _HolidayCalendarState extends State<HolidayCalendar> {
  DateTime _focusedDay = DateTime.now();

  // 1. Define your holidays here. 
  // Because this is the "User View," these are hardcoded or fetched from a database.
  final List<DateTime> _fixedHolidays = [
    DateTime(2026, 1, 1),   // New Year's Day
    DateTime(2026, 1, 19),  // Martin Luther King Jr. Day
    DateTime(2026, 2, 14),  // Valentine's Day
    DateTime(2026, 7, 4),   // Independence Day
    DateTime(2026, 12, 25), // Christmas
  ];

  // Helper function to check if a day is in our holiday list
  bool _isHoliday(DateTime day) {
    return _fixedHolidays.any((holiday) =>
        holiday.year == day.year &&
        holiday.month == day.month &&
        holiday.day == day.day);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Holiday Schedule'),
        backgroundColor: Colors.deepPurple.shade50,
      ),
      body: Column(
        children: [
          TableCalendar(
            firstDay: DateTime(2020),
            lastDay: DateTime(2030),
            focusedDay: _focusedDay,
            
            // 2. The holidayPredicate marks the days visually
            holidayPredicate: _isHoliday,

            // 3. Keep onDaySelected simple so users can click to see the date, 
            // but notice there is NO "toggleHoliday" function here.
            onDaySelected: (selectedDay, focusedDay) {
              setState(() {
                _focusedDay = focusedDay;
              });
            },

            calendarStyle: const CalendarStyle(
              // Styling for the days you have marked
              holidayDecoration: BoxDecoration(
                color: Colors.redAccent,
                shape: BoxShape.circle,
              ),
              holidayTextStyle: TextStyle(color: Colors.white),
              
              // Styling for the "Today" marker
              todayDecoration: BoxDecoration(
                color: Colors.blueAccent,
                shape: BoxShape.circle,
              ),
            ),
            
            // Custom header styling
            headerStyle: const HeaderStyle(
              formatButtonVisible: false,
              titleCentered: true,
            ),
          ),
          const SizedBox(height: 20),
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              "Note: Red days are official holidays and cannot be changed.",
              style: TextStyle(fontStyle: FontStyle.italic, color: Colors.grey),
            ),
          ),
        ],
      ),
    );
  }
}