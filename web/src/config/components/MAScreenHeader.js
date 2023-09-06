import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MAScreenHeader(props) {
  const { screenTitle, buttonsList } = props;

  let back = () => {
    window.history.back();
  };

  return (
    <>
      <Box className="darkth custom-rounded mb-3 bg-white shadow d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center  screenHeader">
          <IconButton onClick={back} aria-label="delete">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" className="fw-bold">
            {screenTitle}
          </Typography>
        </div>
        <div>
          {buttonsList}

        </div>
      </Box>
    </>
  );
}
export default MAScreenHeader;