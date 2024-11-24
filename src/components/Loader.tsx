import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} color="primary" />
        </Box>
      )}
    </>
  );
};

export default Loader;
