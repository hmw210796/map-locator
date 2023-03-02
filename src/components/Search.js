import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import classes from "./Seach.module.css";
import { mapActions } from "../store/map-slice";
import { useDispatch, useSelector } from "react-redux";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import HistoryIcon from "@mui/icons-material/History";
import { searchActions } from "../store/search-slice";
import Error from "./Error";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import SearchList from "./SearchList";
import { fetchAddressData } from "../store/map-actions";
import { fetchSearchList } from "../store/map-actions";

const options = {
  fields: [
    "address_components",
    "geometry",
    "name",
    "place_id",
    "formatted_address",
  ],
  types: ["establishment"],
};

const Search = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const autoCompleteRef = useRef();
  const addressInputRef = useRef();
  const dispatch = useDispatch();

  const listOpen = useSelector((state) => state.search.listOpen);
  const { isError, message } = useSelector((state) => state.search.error);

  const searchHandler = (event) => {
    event.preventDefault();

    const enteredAddress = addressInputRef.current.value;

    if (enteredAddress.trim() !== "") {
      dispatch(fetchAddressData(enteredAddress, autoCompleteRef));
    } else {
      dispatch(searchActions.toggleError("Please input valid address"));
      return;
    }
  };

  const clickHandler = (event) => {
    dispatch(searchActions.toggleList());
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(fetchSearchList());
  }, [dispatch]);

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      addressInputRef.current,
      options
    );
  });

  return (
    <>
      <form className={classes.form} onSubmit={searchHandler}>
        <TextField
          id="filled-basic"
          variant="filled"
          inputRef={addressInputRef}
          fullWidth
        />
        <div className={classes.action}>
          <Button type="submit" variant="contained">
            Search
          </Button>
          <Typography></Typography>
          <div>
            <IconButton
              type="button"
              onClick={() => dispatch(mapActions.toggleMapPan())}
            >
              <MyLocationIcon />
            </IconButton>
            <IconButton onClick={clickHandler}>
              <HistoryIcon />
            </IconButton>

            <Popper
              transition
              placement="bottom-end"
              open={listOpen}
              anchorEl={anchorEl}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper
                    elevation={2}
                    sx={{
                      width: "100%",
                      overflowY: "scroll",
                      height: "30rem",
                      maxWidth: "40rem",
                    }}
                  >
                    <SearchList />
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        </div>
      </form>
      {isError && (
        <Error
          error={isError}
          message={message}
          onClose={() => dispatch(searchActions.toggleError())}
        />
      )}
    </>
  );
};

export default Search;
