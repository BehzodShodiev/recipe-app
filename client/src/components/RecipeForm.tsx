import React from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Recipe } from "../interfaces";
import {
  TextField,
  Button,
  IconButton,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

interface RecipeFormProps {
  initialValues: Recipe;
  onSubmit: (values: Recipe) => void;
}

const RecipeFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
      })
    )
    .required("Must have ingredients")
    .min(1, "Minimum of 1 ingredient"),
  image: Yup.mixed().required('An image is required'),
  cookingTime: Yup.number().min(1, "Minimum 1 minute").required("Required"),
});

const RecipeForm: React.FC<RecipeFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <Container component="main" maxWidth="md">
      <Paper sx={{ p: 2 }}>
        <Typography component="h1" variant="h5">
          Add / Edit Recipe
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={RecipeFormSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
              />
              <ErrorMessage name="name" />
              <TextField
                fullWidth
                margin="normal"
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
              />
              <ErrorMessage name="description" />
              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <div>
                    <Typography component="h6" variant="h6">
                      Ingredients
                    </Typography>
                    {values.ingredients.map((ingredient, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={10}>
                          <TextField
                            fullWidth
                            margin="normal"
                            name={`ingredients.${index}.name`}
                            label={`Ingredient ${index + 1}`}
                            value={ingredient.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <ErrorMessage name={`ingredients.${index}.name`} />
                        <Grid item xs={2}>
                          <IconButton onClick={() => remove(index)}>
                            <Remove />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      variant="contained"
                      onClick={() => push({ name: "" })}
                      startIcon={<Add />}
                    >
                      Add Ingredient
                    </Button>
                  </div>
                )}
              </FieldArray>
              <TextField
                id="image"
                name="image"
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("image", event.currentTarget.files ? event.currentTarget.files[0] : null);
                }}
                inputProps={{ "aria-label": "Upload Image" }}
              />
              <ErrorMessage name="image" />

              <TextField
                fullWidth
                margin="normal"
                id="cookingTime"
                name="cookingTime"
                label="Cooking Time (minutes)"
                type="number"
                value={values.cookingTime}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cookingTime && Boolean(errors.cookingTime)}
              />
              <ErrorMessage name="cookingTime" />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default RecipeForm;
