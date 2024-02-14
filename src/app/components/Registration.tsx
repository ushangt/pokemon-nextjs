"use client"
import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { ComponentProps } from "../page";

type Inputs = {
    name: string
    email: string
};

export default function RegistrationForm({appData, setAppData}: ComponentProps) {
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<Inputs>({
      defaultValues: {
        name: appData?.name,
        email: appData?.email
      }
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      setAppData({
        ...appData,
        name: data.name,
        email: data.email
      });
    }
    return(
      <Grid container spacing={5} my={25} justifyContent={'center'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} m={2}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <TextField {...field} error={!!errors.name} label={'Name'} required/>}
                />
              </Grid>
              <Grid item xs={12} m={2}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <TextField {...field} error={!!errors.email} label={'Email'} required/>}
                />
              </Grid>
              <Grid item xs={12} m={2} justifyContent={'center'}>
                <Button type="submit" variant="contained">Submit</Button>
              </Grid>
          </form>
        </Grid>
    );
  }