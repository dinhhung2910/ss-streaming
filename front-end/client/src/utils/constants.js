export const UserRole = {
  ROLE_TEACHER: 2,
  ROLE_STUDENT: 1,
  ROLE_ADMIN: 3,
};

export const NOTIFICATION_STYLE = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
};

export const PublicLinks = {
  SEARCH: '/search',
  COURSE_DETAIL: '/course',
  LIST_CATEGORIES: '/categories',
  ALL_COURSE_BY_TEACHER: '/all-course-by-teacher',
};

export const StudentLinks = {
  LESSON_DETAIL: '/student/lesson-detail',
  DO_ASSIGNMENT: '/student/do-assignment',
  ASSIGNMENT_RESULT: '/student/assignment-result',
  MY_COURSE: '/student/my-course',
  MY_LESSON: '/student/my-lesson',
  MY_ASSIGNMENT: '/student/my-assignment',
};

export const TeacherLinks = {
  ADD_COURSE: '/teacher/add-course',
  MY_COURSE: '/teacher/my-courses',
  EDIT_COURSE: '/teacher/edit-course',
  COURSE_DETAIL: '/teacher/course-detail',

  MY_LESSON: '/teacher/my-lesson',
  ADD_LESSON: '/teacher/add-lesson',
  EDIT_LESSON: '/teacher/edit-lesson',
  LESSON_DETAIL: '/teacher/lesson-detail',

  MY_ASSIGNMENT: '/teacher/my-assignment',
  ASSIGNMENT_DETAIL: '/teacher/assignment-detail',
  ASSIGNMENT_PREVIEW: '/teacher/assignment-preview',
};

export const MessageType = {
  ASSIGNMENT: 'assignment',
  NOTIFICATION: 'notification',
};

export const NotificationTag = {

  LESSON: {
    START_MEETING: 'lesson_start_meeting',
  },

};

export const reactStarsColor = {
  activeColor: '#febe42',
  color: '#ddd',
};

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 4000, min: 960},
    items: 4,
  },
  desktop: {
    breakpoint: {max: 960, min: 640},
    items: 3,
  },
  tablet: {
    breakpoint: {max: 640, min: 464},
    items: 2,
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 1,
  },
};

export const GOLDEN_RATIO = 1.618;
