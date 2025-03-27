import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import useStore from "../../zustand/store"; // adjust if yours is under /zustand/store

const AdminSurveyView = () => {
  const { fetchClassSurveys } = useStore();
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const loadSurveys = async () => {
      const data = await fetchClassSurveys();
      setSurveys(data);
    };
    loadSurveys();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin View: Class Surveys
      </Typography>

      {surveys.length === 0 ? (
        <Typography>No surveys submitted yet.</Typography>
      ) : (
        surveys.map((survey, i) => (
          <Box
            key={survey.id || i}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: 3,
              marginBottom: 3,
              backgroundColor: "#f9f9f9"
            }}
          >
            <Typography variant="h6">
              {survey.anonymous ? "Anonymous" : survey.name}
            </Typography>
            {!survey.anonymous && (
              <>
                <Typography>Email: {survey.email}</Typography>
                <Typography>
                  Contact Permission: {survey.contactPermission ? "Yes" : "No"}
                </Typography>
              </>
            )}
            <Typography>Dancer Role: {survey.dancerRole}</Typography>
            <Typography>Age: {survey.age}</Typography>
            <Typography>Gender: {survey.gender}</Typography>
            <Typography>Zip Code: {survey.zipCode}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1">Class Ratings</Typography>
            {Object.entries(survey.classRatings).map(([key, value]) => (
              <Typography key={key}>
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}: {value}
              </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1">Comments</Typography>
            <Typography>Liked: {survey.classFeedback}</Typography>
            <Typography>Improvement: {survey.classImprovement}</Typography>
            <Typography>Lead Instructor: {survey.leadInstructorComments}</Typography>
            <Typography>Follow Instructor: {survey.followInstructorComments}</Typography>
            <Typography>Additional Topics: {survey.additionalTopics}</Typography>
            <Typography>Other Comments: {survey.generalComments}</Typography>
          </Box>
        ))
      )}
    </Container>
  );
};

export default AdminSurveyView;
