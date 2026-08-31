import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { DashboardPage } from '../pages/DashboardPage';
import { MindMapPage } from '../pages/MindMapPage';
import { RoadmapsPage } from '../pages/RoadmapsPage';
import { CoursesPage } from '../pages/CoursesPage';
import { LessonViewer } from '../components/learning/LessonViewer';
import { TechnologiesPage } from '../pages/TechnologiesPage';
import { ProgressPage } from '../pages/ProgressPage';
import { BookmarksPage } from '../pages/BookmarksPage';
import { SettingsPage } from '../pages/SettingsPage';
import { AboutPage } from '../pages/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'mindmap',
        element: <MindMapPage />
      },
      {
        path: 'roadmaps',
        element: <RoadmapsPage />
      },
      {
        path: 'courses',
        element: <CoursesPage />
      },
      {
        path: 'learn/:topicId/:lessonId',
        element: <LessonViewer />
      },
      {
        path: 'technologies',
        element: <TechnologiesPage />
      },
      {
        path: 'progress',
        element: <ProgressPage />
      },
      {
        path: 'bookmarks',
        element: <BookmarksPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);
