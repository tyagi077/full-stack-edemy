import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Navbar from './components/student/Navbar'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Home from './pages/student/Home'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import AddCourse from './pages/educator/AddCourse'
import "quill/dist/quill.snow.css";
import SignUp from './_auth/forms/SignUp'
import SignIn from './_auth/forms/SignIn'
import AuthLayout from './_auth/AuthLayout'
import { ToastContainer } from 'react-toastify';
import { NotFound } from './pages/student/NotFound'
import ProfilePage from './components/student/Profile'
function App() {
  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div>
      <ToastContainer position="top-right"
        autoClose={1500}
        pauseOnHover={false} />
      {!isEducatorRoute && <Navbar />}


      <Routes>

        <Route element={<AuthLayout />}>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/player/:courseId" element={<Player />} />


        <Route path='/educator' element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-course' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>

        <Route path="*" element={<NotFound/>} />

      </Routes>




    </div>
  )
}

export default App