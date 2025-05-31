import 'package:flutter/foundation.dart';

class WorkoutProvider with ChangeNotifier {
  int _currentWeek = 1;
  int _currentDay = 1;
  bool _workoutCompleted = false;

  int get currentWeek => _currentWeek;
  int get currentDay => _currentDay;
  bool get workoutCompleted => _workoutCompleted;

  void setCurrentWeek(int week) {
    _currentWeek = week;
    notifyListeners();
  }

  void setCurrentDay(int day) {
    _currentDay = day;
    notifyListeners();
  }

  void completeWorkout() {
    _workoutCompleted = true;
    notifyListeners();
  }
}