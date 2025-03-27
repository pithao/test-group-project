import React, { useEffect, useState } from 'react';
import { fetchSurveyResponses } from '.../.../Firebase/fetchSurveys';

const SurveyResponses = ({ targetId, type = 'lesson' }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        const data = await fetchSurveyResponses(targetId, type);
        setResponses(data);
      } catch (error) {
        console.error('Error loading surveys:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurveys();
  }, [targetId, type]);

  if (loading) return <p>Loading...</p>;

  if (responses.length === 0) return <p>No survey responses yet.</p>;

  return (
    <div>
      <h2>Survey Responses</h2>
      {responses.map((res) => (
        <div key={res.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <p><strong>Anonymous:</strong> {res.anonymous ? 'Yes' : 'No'}</p>
          {res.rating && (
            <p><strong>Ratings:</strong> {res.rating.join(', ')}</p>
          )}
          {res.comments && (
            <>
              <p><strong>Comments:</strong></p>
              <ul>
                {res.comments.map((comment, i) => (
                  <li key={i}>{comment}</li>
                ))}
              </ul>
            </>
          )}
          <p><strong>Submitted:</strong> {res.createdAt?.toDate().toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default SurveyResponses;
