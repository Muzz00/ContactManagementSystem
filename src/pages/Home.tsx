import { useEffect, useState } from "react";
import {
  addContact,
  deleteContact,
  getAllContacts,
  searchContact,
} from "../api";
import Grid from "@mui/material/Grid2";
import { Contact } from "../models/Contact";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { textFieldStyles, theme, validatePhoneNumber } from "../util";
import Loader from "../components/Loader";

const Home = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedText, setSearchedText] = useState<string>("");
  const [searchedContacts, setSearchedContacts] = useState<Contact[]>([]);
  const navigate = useNavigate();
  const [openAddContactModal, setOpenAddContactModal] =
    useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [addContactError, setAddContactError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const retrieveContacts = async () => {
    const allContacts: Contact[] = await getAllContacts();
    setContacts(allContacts);
  };

  const search = async () => {
    setSearchedText(searchText);
    const searchedContacts: Contact[] = await searchContact(searchText);
    setSearchedContacts(searchedContacts);
  };

  useEffect(() => {
    setLoading(true);
    retrieveContacts();
    setLoading(false);
  }, []);

  const searchAddContactGrid = () => {
    return (
      <Grid container spacing={2} direction={"row"} alignItems={"center"}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
            {...textFieldStyles}
          />
        </Grid>
        <Grid size={{ xs: 3, md: 2 }}>
          <Button
            variant="contained"
            style={{ height: 55 }}
            onClick={() => {
              setSearchText("");
              setSearchedText("");
              setSearchedContacts([]);
            }}
          >
            Clear
          </Button>
        </Grid>
        <Grid size={{ xs: 3, md: 2 }}>
          <Button
            variant="contained"
            style={{ height: 55 }}
            onClick={async () => {
              setLoading(true);
              await search();
              setLoading(false);
            }}
          >
            Search
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            style={{ height: 55 }}
            onClick={() => {
              setOpenAddContactModal(true);
            }}
          >
            Add Contact
          </Button>
        </Grid>
      </Grid>
    );
  };

  const contactsTable = (contactsToDisplay: Contact[]) => {
    return (
      <TableContainer
        component={Paper}
        style={{ maxWidth: 650, marginTop: 10 }}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center">Edit/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {((searchedText && searchedContacts.length === 0) ||
              contactsToDisplay.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Contacts Found
                </TableCell>
              </TableRow>
            )}
            {contactsToDisplay.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.firstName}</TableCell>
                <TableCell>{c.lastName}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      navigate("/update", { state: { contact: c } });
                    }}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={async () => {
                      setLoading(true);
                      await deleteContact(c.id);
                      await retrieveContacts();
                      setSnackbarMessage("Contact Deleted");
                      setLoading(false);
                    }}
                    aria-label="edit"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const addCotactModal = () => {
    return (
      <Modal
        open={openAddContactModal}
        onClose={() => setOpenAddContactModal(false)}
      >
        <Box sx={styles.addContactBox}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.textField}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={styles.textField}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.textField}
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
                setAddContactError("Please enter a valid phone number");
              } else {
                setPhone(phoneNumber);
                setAddContactError("");
              }
            }}
            style={styles.textField}
          />
          <Button
            variant="contained"
            style={styles.textField}
            onClick={async () => {
              setLoading(true);
              const isValid = validatePhoneNumber(phone);
              if (!isValid) {
                setAddContactError("Please enter a valid phone number");
              } else if (!email.includes("@")) {
                setAddContactError("Please entera a valid email");
              } else if (
                firstName.length > 0 &&
                lastName.length > 0 &&
                email.length > 0 &&
                phone.length > 0
              ) {
                setAddContactError("");
                const addedContact = await addContact(
                  firstName,
                  lastName,
                  email,
                  phone
                );
                if (addedContact) {
                  retrieveContacts();
                  setOpenAddContactModal(false);
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setPhone("");
                  setSnackbarMessage("Contact Added");
                }
              } else {
                setAddContactError("All fields are required");
              }
              setLoading(false);
            }}
          >
            Add Contact
          </Button>
          {addContactError && <p>{addContactError}</p>}
        </Box>
      </Modal>
    );
  };

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
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div style={{ maxWidth: "100%" }}>
          <h2 style={{ color: theme.secondary }}>Contact Management Portal</h2>
          {searchAddContactGrid()}
          {searchedText && (
            <p style={{ color: theme.secondary }}>
              Showing Results for: {searchedText}
            </p>
          )}
          {searchedText
            ? contactsTable(searchedContacts)
            : contactsTable(contacts)}
          {addCotactModal()}
        </div>
      </div>
      <Loader loading={loading} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
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
  addContactBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: 24,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default Home;
