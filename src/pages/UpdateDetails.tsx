import { useState } from "react";
import { Contact } from "../models/Contact";
import { Button, IconButton, Snackbar, TextField } from "@mui/material";
import { useLocation } from "react-router";
import { updateContact } from "../api";
import { textFieldStyles, theme, validatePhoneNumber } from "../util";
import Loader from "../components/Loader";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UpdateDetails = () => {
  //   const [contacts, setContacts] = useState<Contact[]>([]);
  const contact = useLocation().state.contact as Contact;
  const [firstName, setFirstName] = useState<string>(contact.firstName);
  const [lastName, setLastName] = useState<string>(contact.lastName);
  const [email, setEmail] = useState<string>(contact.email);
  const [phone, setPhone] = useState<string>(contact.phone);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: theme.primary,
        height: "100vh",
      }}
    >
      <div
        style={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            color="primary"
            onClick={() => {
              navigate(-1);
            }}
            aria-label="edit"
          >
            <ArrowBack />
          </IconButton>
          <h1 style={{ color: theme.secondary }}>Update Contact Details</h1>
        </div>

        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={styles.textField}
          {...textFieldStyles}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={styles.textField}
          {...textFieldStyles}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.textField}
          {...textFieldStyles}
        />
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => {
            const phoneNumber = e.target.value;
            const isValid = validatePhoneNumber(phoneNumber);
            if (!isValid && phoneNumber !== "") {
              setError("Please enter a valid phone number");
            } else {
              setPhone(phoneNumber);
              setError("");
            }
          }}
          style={styles.textField}
          {...textFieldStyles}
        />
        <Button
          variant="contained"
          style={styles.textField}
          onClick={async () => {
            setLoading(true);
            const isValid = validatePhoneNumber(phone);
            if (!isValid) {
              setError("Please enter a valid phone number");
            } else if (!email.includes("@")) {
              setError("Please entera a valid email");
            } else if (
              firstName.length > 0 &&
              lastName.length > 0 &&
              email.length > 0 &&
              phone.length > 0
            ) {
              setError("");
              const updatedContact = await updateContact({
                id: contact.id,
                firstName,
                lastName,
                email,
                phone,
              });
              if (updatedContact) {
                setSnackbarOpen(true);
              }
            } else {
              setError("All fields are required");
            }
            setLoading(false);
          }}
        >
          Update Contact
        </Button>
        {error && <p style={{ color: theme.secondary }}>{error}</p>}
        <Loader loading={loading} />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message="Contact Updated"
        />
      </div>
    </div>
  );
};

const styles = {
  textField: {
    marginTop: 10,
    minWidth: 240,
  },
  button: {
    marginTop: 20,
    minWidth: 240,
  },
};

export default UpdateDetails;
