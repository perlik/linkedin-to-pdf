import { useState } from "react";
import "./App.css";
import { Button, Grid, TextField } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useBearStore);
}

function App() {
  const bears = useBearStore((state: BearState) => state.bears);
  const increasePopulation = useBearStore((state: BearState) => state.increase);

  return (
    <div className="p-4">
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField fullWidth label="LinkedIn profile URL" size="small" />
              {bears}
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                startIcon={<LinkedInIcon />}
                size="medium"
                onClick={() => increasePopulation(2)}
              >
                Get LinkedIn profile data
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField fullWidth label="Name" size="small" margin="normal" />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Lastname"
                size="small"
                margin="normal"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
}

export default App;
