import React from 'react';
import SurveyResponses from '../SurveyResponses/SurveyResponses';

const AdminSurveyView = () => {
  // Replace this with dynamic ID if you're passing it from elsewhere
  const lessonId = 'lesson_001';

  return (
    <div>
      <h1>📋 Class Survey Responses (Admin View)</h1>
      <SurveyResponses targetId={lessonId} type="lesson" />
    </div>
  );
};

export default AdminSurveyView;
