// src/components/SurveyResponses/SurveyResponses.jsx

import React, { useEffect, useState } from 'react';
import { fetchSurveyResponses } from '../../Firebase/fetchsurveys';


const SurveyResponses = ({ targetId, type = 'lesson' }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResponses = async () => {
      try {
        const data = await fetchSurveyResponses(targetId, type);
        setResponses(data);
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResponses();
  }, [targetId, type]);

  if (loading) return <p>Loading survey responses...</p>;

  if (responses.length === 0) return <p>No responses yet.</p>;

  return (
    <div>
      <h2>Survey Responses ({responses.length})</h2>
      {responses.map((res, index) => (
        <div
          key={res.id || index}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            backgroundColor: '#f9f9f9'
          }}
        >
          <p><strong>Anonymous:</strong> {res.anonymous ? 'Yes' : 'No'}</p>

          {res.rating && (
            <p><strong>Ratings:</strong> {res.rating.join(', ')}</p>
          )}

          {res.comments?.length > 0 && (
            <>
              <strong>Comments:</strong>
              <ul>
                {res.comments.map((comment, i) => (
                  <li key={i}>{comment}</li>
                ))}
              </ul>
            </>
          )}

          {res.createdAt?.toDate && (
            <p><em>Submitted: {res.createdAt.toDate().toLocaleString()}</em></p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SurveyResponses;
