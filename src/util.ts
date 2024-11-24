export const textFieldStyles = {
    sx: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#DADADB",
        },
        "&:hover fieldset": {
          borderColor: "#DADADB",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#DADADB",
        },
      },
    },
    slotProps: {
      input: {
        style: {
          color: "#DADADB",
        },
      },
      inputLabel: {
        style: {
          color: "#DADADB",
        },
      },
    },
  };
  

  export const theme = {
    primary: "#1D232A",
    secondary: "#DADADB",
  }


  export const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\+?[0-9]*$/;
    return phoneRegex.test(number);
  };