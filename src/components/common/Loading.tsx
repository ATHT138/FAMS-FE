import { Box, CircularProgress } from "@mui/material";
import { useEffect, useRef } from "react";

type Loader = {
  onLoaderFinished: () => void;
};

const Loading = ({ onLoaderFinished }: Loader) => {
  const preLoader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (preLoader.current) {
        preLoader.current.classList.add("hide-load");
        onLoaderFinished();
      }
    }, 9620);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={90} />
    </Box>
  );
};

export default Loading;
