// DownloadCell.jsx
import React from 'react';
import { Button, Box } from '@mui/material';
import Lottie from 'lottie-react';
import spinnerAnim from '../assets/spinner.json';

const DownloadCell = ({ format, downloadingMap, handleDownload }) => {
  return (
    <>
      {downloadingMap[format.format_id] ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "40px" }}
        >
          <Lottie
            animationData={spinnerAnim}
            loop
            autoplay
            style={{ height: 40, width: 40 }}
          />
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={() => handleDownload(format)}
        >
          Download
        </Button>
      )}
    </>
  );
};

export default DownloadCell;