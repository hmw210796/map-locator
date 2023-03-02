import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

import { mapActions } from "../store/map-slice";
import { searchActions } from "../store/search-slice";

const SearchList = () => {
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.search.list);

  return (
    <List dense={true} sx={{ width: "100%" }}>
      {searchHistory.map((item) => (
        <ListItem sx={{ width: "100%" }} key={item.id}>
          <IconButton
            onClick={() => {
              dispatch(searchActions.removeFromList(item.id));
            }}
          >
            <CloseIcon />
          </IconButton>
          <ListItemButton
            onClick={() => {
              dispatch(mapActions.setCurrentLocation(item.geometry));
              dispatch(searchActions.toggleList());
            }}
          >
            <ListItemText primary={item.name} secondary={item.address} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchList;
