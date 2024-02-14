"use client"
import * as React from "react";
import Container from '@mui/material/Container';
import RegistrationForm from "./components/Registration";
import PokemonSelection from "./components/Pokemon";

export type AppData = {
  name: string;
  email: string;
  pokemonName: string;
  selectedPokemonUrl: string;
  selectedPokemonImageUrl: string;
}

export type ComponentProps = {
  appData: AppData;
  setAppData: (a: AppData) => void;
}

export default function Home() {
  const [appData, setAppData] = React.useState<AppData>({
    name: localStorage?.getItem("name") as string,
    email: localStorage?.getItem("email") as string,
    pokemonName: localStorage?.getItem("pokemonName") as string,
    selectedPokemonUrl: localStorage?.getItem("selectedPokemonUrl") as string,
    selectedPokemonImageUrl: localStorage?.getItem("selectedPokemonImageUrl") as string,
  }); 
  return (
    <Container maxWidth="lg">
      {/* @ts-ignore */}
      <div align="center">
        <h1> Pokemon - NextJS</h1>
      </div>
     {!appData?.name && <RegistrationForm appData={appData} setAppData={setAppData}/>}
     {appData?.name && <PokemonSelection appData={appData} setAppData={setAppData}/>}
    </Container>
  );
}
