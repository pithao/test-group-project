import React, { useState } from "react";
import { Container, TextField, FormControl, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, RadioGroup, Radio, Button, Typography } from "@mui/material";

// test change

const ClassSurvey = () => {
  const [formData, setFormData] = useState({
    anonymous: true,
    name: "",
    email: "",
    contactPermission: false,
    dancerRole: "",
    age: "",
    gender: "",
    zipCode: "",
    classFeedback: "",
    classImprovement: "",
    leadInstructorComments: "",
    followInstructorComments: "",
    additionalTopics: "",
    generalComments: "",
    classRatings: {
      satisfaction: 3,
      leadInstructor: 3,
      followInstructor: 3,
      retakeLikelihood: 3,
      materialSatisfaction: 3,
      locationSatisfaction: 3,
      scheduleSatisfaction: 3,
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRatingChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
// this adds a space after all capital letters so we can use the objects for easier form submission to the database
      .trim()
// this removes any leading spaces for formatting
      .replace(/^./, (str) => str.toUpperCase());
// this converts the first letter of the first part of the camel case objects to a capital letter so it reads like real people words
  };
// writing this function almost ruined my life

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Survey Submitted! Thank you for your feedback.");
  };

  return (
    <Container maxWidth="md" sx={{ p: 4, bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Dance Class Survey</Typography>

{/* gutterBottom adds spacing ebtween this and the form for formatting. nifty. */}

      <form onSubmit={handleSubmit}>
        <FormControlLabel
          control={<Checkbox checked={formData.anonymous} onChange={handleChange} name="anonymous" />}
          label="Would you like to remain anonymous?"
        />
        {!formData.anonymous && (
          <>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" />
            <FormControlLabel
              control={<Checkbox checked={formData.contactPermission} onChange={handleChange} name="contactPermission" />}
              label="May we contact you?"
            />
          </>
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Dancer Role</InputLabel>
          <Select name="dancerRole" value={formData.dancerRole} onChange={handleChange}>
            <MenuItem value="Lead only">Lead only</MenuItem>
            <MenuItem value="Mostly lead">Mostly lead</MenuItem>
            <MenuItem value="Both">Both lead & follow</MenuItem>
            <MenuItem value="Mostly follow">Mostly follow</MenuItem>
            <MenuItem value="Only follow">Only follow</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} margin="normal" />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Nonbinary">Nonbinary</MenuItem>
            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} margin="normal" />
        
        <Typography variant="h6" gutterBottom mt={3}>Ratings</Typography>

 {/* mt is margain top for Material UI, also for spacing */}

        {Object.keys(formData.classRatings).map((key) => (
          <FormControl component="fieldset" fullWidth margin="normal" key={key}>
            <Typography>{formatLabel(key)}</Typography>
            <RadioGroup row>
              {[1, 2, 3, 4, 5].map((num) => (
                <FormControlLabel
                  key={num}
                  value={num.toString()}
                  control={<Radio checked={formData.classRatings[key] == num} onChange={() => handleRatingChange("classRatings", key, num)} />}
                  label={num}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
        
        <Typography variant="h6" gutterBottom mt={3}>Comments/Long Answers</Typography>
        <TextField fullWidth label="What did you like about the class?" name="classFeedback" multiline rows={3} value={formData.classFeedback} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="What could be improved?" name="classImprovement" multiline rows={3} value={formData.classImprovement} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Comments about the lead instructor" name="leadInstructorComments" multiline rows={3} value={formData.leadInstructorComments} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Comments about the follow instructor" name="followInstructorComments" multiline rows={3} value={formData.followInstructorComments} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Are there topics we're not offering that you would like us to offer?" name="additionalTopics" multiline rows={3} value={formData.additionalTopics} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Anything else you would like to share with us?" name="generalComments" multiline rows={3} value={formData.generalComments} onChange={handleChange} margin="normal" />
        
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>Submit</Button>
      </form>
    </Container>
  );
};

export default ClassSurvey;



