import { }
import React, { useEffect, useState } from 'react';
import { fetchSurveyResponses } from '../utils/fetchSurveys';

const SurveyResults = ({ targetId, type }) => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        const data = await fetchSurveyResponses(targetId, type);
        setSurveys(data);
      } catch (err) {
        console.error('Failed to load surveys:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSurveys();
  }, [targetId, type]);

  if (loading) return <p>Loading surveys...</p>;

  if (surveys.length === 0) return <p>No survey responses yet.</p>;

  return (
    <div>
      <h2>Survey Results</h2>
      {surveys.map((survey, index) => (
        <div key={survey.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <p><strong>Anonymous:</strong> {survey.anonymous ? 'Yes' : 'No'}</p>
          <p><strong>Ratings:</strong> {survey.rating.join(', ')}</p>
          {survey.comments && (
            <>
              <p><strong>Comments:</strong></p>
              <ul>
                {survey.comments.map((comment, i) => (
                  <li key={i}>{comment}</li>
                ))}
              </ul>
            </>
          )}
          <p><strong>Submitted:</strong> {survey.createdAt?.toDate().toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default SurveyResults;
