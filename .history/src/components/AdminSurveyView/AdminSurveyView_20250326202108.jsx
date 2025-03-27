import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import useStore from "../zustand/useStore";

const AdminClassSurveyView = () => {
  const { fetchClassSurveys } = useStore();
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const loadSurveys = async () => {
      const data = await fetchClassSurveys();
      setSurveys(data);
    };

    loadSurveys();
  }, []);

  if (surveys.length === 0) {
    return (
      <Container>
        <Typography variant="h5">Admin View: Class Surveys</Typography>
        <Typography>No survey responses yet.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin View: Class Surveys
      </Typography>

      {surveys.map((survey, index) => (
        <Box
          key={survey.id || index}
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
              <Typography>Contact Permission: {survey.contactPermission ? "Yes" : "No"}</Typography>
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
              {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}: {value}
            </Typography>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1">Comments</Typography>
          <Typography>Liked About Class: {survey.classFeedback}</Typography>
          <Typography>Improvements: {survey.classImprovement}</Typography>
          <Typography>Lead Instructor Comments: {survey.leadInstructorComments}</Typography>
          <Typography>Follow Instructor Comments: {survey.followInstructorComments}</Typography>
          <Typography>Topic Suggestions: {survey.additionalTopics}</Typography>
          <Typography>Other Comments: {survey.generalComments}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default AdminClassSurveyView;
