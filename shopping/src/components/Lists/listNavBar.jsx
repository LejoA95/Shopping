"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Box, Collapse, ListSubheader } from "@mui/material";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

export default function ListNavBar({ title, items }) {
  const [open, setOpen] = useState(true);
  const [openNested, setOpenNested] = useState({});

  const handleClick = () => {
    setOpen(!open);
  };


  const handleNestedClick = (index, keySection) => {
    setOpenNested((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <List sx={{ padding: "0" }}>
      <ListSubheader onClick={handleClick}>
        <ListItemText sx={{ margin: '0', maxHeight: "42px" }}>
          <Typography variant="span" sx={{ fontWeight: 700, textTransform: "uppercase", padding: "16px 8px 8px 12px", marginBottom: "4px", color: '#999999' }}>
            {title}
          </Typography>
        </ListItemText>
      </ListSubheader>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {items.map((item, index) => (
          <Box key={index}>
            <ListItem disablePadding>
              <Link href={item.link} passHref style={{ width: "100%" }}>
                <ListItemButton
                  sx={{ borderRadius: ".5em", padding: "9px 8px 9px 12px", marginBottom: "4px" }}
                  onClick={() => handleNestedClick(index, item.keySection)}
                >
                  <ListItemIcon sx={{ minWidth: "24px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ margin: '0', maxHeight: "42px" }}>
                    <Typography
                      variant="h6p"
                      component="span"
                      sx={{
                        fontSize: "14px",
                        textTransform: "capitalize"
                      }}
                    >
                      {item.text}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          </Box>
        ))}
      </Collapse>
    </List>
  );
}
