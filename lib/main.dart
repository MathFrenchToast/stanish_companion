import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:stanish_protocol/screens/home_screen.dart';
import 'package:stanish_protocol/providers/workout_provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => WorkoutProvider(),
      child: MaterialApp(
        title: 'Stanish Protocol',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          useMaterial3: true,
        ),
        home: const HomeScreen(),
      ),
    );
  }
}