import React from 'react';
import { SafeAreaView } from 'react-native';
import { Home } from '../layouts/home.layout';
import { Profile } from '../layouts/profile.layout';
import { Timetable } from '../layouts/timetable.layout';
import { useNavigation } from '../context/NavigationContext';
import { Teachers } from '../layouts/teachers.layout';
import { Courses } from '../layouts/courses.layout';
import { Contact } from '../layouts/contact.layout';
import { Settings } from '../layouts/settings.layout';


export const LayoutController = () => {
  const { currentPage } = useNavigation();

  return (
    <SafeAreaView >
      {currentPage === 'home' && <Home />}
      {currentPage === 'profile' && <Profile />}
      {currentPage === 'timetable' && <Timetable />}
      {currentPage === 'teachers' && <Teachers />}
      {currentPage === 'courses' && <Courses />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'settings' && <Settings />}
    </SafeAreaView>
  );
};

export default LayoutController;
