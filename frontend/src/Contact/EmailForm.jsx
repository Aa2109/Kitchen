import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup"; // Add Yup for validation
import toast from "react-hot-toast";
import { sendEmailWithFile, sendEmailWithoutFile } from "./EmailService";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import JoditEditor from "jodit-react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./JditEdit.css";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  subject: "",
  email: "",
  content: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  subject: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

const Contact = () => {
  const editor = useRef(null);

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpenContactForm = () => setOpen(true);
  const jwt = localStorage.getItem("jwt");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (values) => {
    console.log("Form values: ", values);

    if (values.content === "" || values.email === "" || values.subject === "") {
      toast.error("Invalid fields !!");
      return;
    }

    try {
      setSending(true);
      if (file) {
        const formData = new FormData();
        formData.append(
          "req",
          new Blob([JSON.stringify(values)], { type: "application/json" })
        ); // Convert values to JSON string
        formData.append("file", file);
        await sendEmailWithFile(formData, jwt);
      } else {
        await sendEmailWithoutFile(values, jwt);
      }
      toast.success("Email Sent Successfully !!");
      // Reset form values
      values = {
        subject: "",
        email: "",
        content: "",
      };
      setFile(null);
    } catch (err) {
      console.log(err);
      toast.error("Can't Send Email, Try Again !!");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Card className="p-8">
          <div className="flex space-x-4">
            <Button className="flex flex-col items-center cursor-pointer">
              <a
                href="https://www.instagram.com/aashif_857"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
                <p className="text-gray-400 pt-3">Instagram</p>
              </a>
            </Button>

            <Button className="flex flex-col items-center cursor-pointer">
              <a
                href="https://twitter.com/aashif_857"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon />
                <p className="text-gray-400 pt-3">X(Twitter)</p>
              </a>
            </Button>

            <Button
              variant="outlined"
              onClick={handleOpenContactForm}
              // className="mt-4"
              className="flex flex-col items-center cursor-pointer"
            >
              <MailIcon className="size-12" />
              <p className="text-gray-400 pt-3">Mail Us</p>
            </Button>
            <p></p>
          </div>
        </Card>
      </div>

      {/* <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader
            title={<span className="text-gray-300">Contact US</span>}
          />
          <CardContent>
            <div className="space-y-4 text-gray-200">
              <div className="flex">
                <p className="w-48">Email</p>
                <p className="text-gray-400">
                  <span className="pr-5">-</span>
                  aashif@gmail.com
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Mobile</p>
                <p className="text-gray-400">
                  <span className="pr-5">-</span>
                  857805209
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Social</p>
                <div className="flex text-gray-400 items-center pb-3 gap-2">
                  <span className="pr-5">-</span>
                  <a href="/">
                    <InstagramIcon sx={{ fontSize: "3rem" }} />
                  </a>
                  <a href="/">
                    <XIcon sx={{ fontSize: "3rem" }} />
                  </a>
                  <a href="/">
                    <LinkedInIcon sx={{ fontSize: "3rem" }} />
                  </a>
                  <a href="/">
                    <FacebookIcon sx={{ fontSize: "3rem" }} />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="subject"
                      label="Subject"
                      fullWidth
                      variant="outlined"
                      error={touched.subject && Boolean(errors.subject)}
                      helperText={touched.subject && errors.subject}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <Field
                      as={TextField}
                      name="content"
                      label="Content"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={5} // Make the content field bigger
                      error={touched.content && Boolean(errors.content)}
                      helperText={touched.content && errors.content}
                    /> */}
                    <JoditEditor
                      ref={editor}
                      value={initialValues.content}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) =>
                        setFieldValue("content", newContent)
                      }
                      config={{
                        readonly: false,
                        height: 200,
                      }}
                    />
                    {touched.content && errors.content && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.content}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <input type="file" onChange={handleFileChange} accept="*" />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Loader start */}
                    {sending && (
                      <div className="loader flex-col gap-2 items-center flex justify-center mt-3">
                        <div
                          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                          role="status"
                        >
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                          </span>
                        </div>
                        <h1>sending email</h1>
                      </div>
                    )}
                    {/* Loader end */}
                    <Button
                      disabled={sending}
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Contact;
