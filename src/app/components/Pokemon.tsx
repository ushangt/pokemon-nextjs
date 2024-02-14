"use client"
import * as React from "react";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { ComponentProps } from "../page";
import Autocomplete from '@mui/material/Autocomplete';

type PokemonDropdown = {
    name: string;
    url: string;
  }

const BASE_URL = "https://pokeapi.co/api/v2";
  
export default function PokemonSelection({appData, setAppData}: ComponentProps) {
    const [pokemonData, setPokemonData] = React.useState<PokemonDropdown[]>();
    const [loading, setLoading] = React.useState<boolean>();
    React.useEffect(
      () => {
        (async () => {
            setLoading(true);
            const callCountAPI = await fetch(`${BASE_URL}/pokemon`);
            const data = await callCountAPI.json();
            const pokemonCount = data?.count; 
            const callDataAPI = await fetch(`${BASE_URL}/pokemon?limit=${pokemonCount}`);
            const pokemons = await callDataAPI.json();
            setPokemonData(pokemons?.results);
            setLoading(false);
        })();
      },[]
    );
  
    const handleChange = React.useCallback((event: React.SyntheticEvent<Element, Event>, newValue: PokemonDropdown|null) => {
      localStorage.setItem("selectedPokemonUrl", newValue?.url as string);
      localStorage.setItem("pokemonName", newValue?.name as string);
      const newAppData = {
        ...appData,
        selectedPokemonUrl: newValue?.url as string,
        pokemonName: newValue?.name as string
      }
      setAppData(newAppData);
      console.log(newAppData);
      (async () => {
        if(newValue?.url) {
            const pokemonDetailsAPI = await fetch(newValue?.url as string);
            const pokemonDetails = await pokemonDetailsAPI.json();
            const imageUrl = pokemonDetails?.sprites?.other?.["official-artwork"]?.front_default;
            localStorage.setItem("selectedPokemonImageUrl", imageUrl);
            const newState = {
                ...newAppData,
                selectedPokemonImageUrl: imageUrl
            };
            setAppData(newState);
        }
      })();
    }, [appData]);
  
    const selectedItem = React.useMemo(() => {
      return pokemonData?.find((pokemon) => pokemon.name === appData?.pokemonName && pokemon.url === appData?.selectedPokemonUrl);
    }, [pokemonData, appData?.selectedPokemonUrl, appData?.pokemonName]);

    const verb = React.useMemo(() => {
        return appData?.pokemonName ? "Update" : "Select";
    }, [appData?.selectedPokemonImageUrl]);
  
    return(
      <Grid container spacing={5} my={5} justifyContent={'center'}>
        <Grid item xs={12} lg={6}>
          <Autocomplete
            id="pokemon-select"
            fullWidth
            loading={loading}
            loadingText={"Loading..."}
            options={pokemonData as PokemonDropdown[]}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={handleChange}
            value={selectedItem || null}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`${verb} your favorite Pokémon`}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
            {appData?.name}'s Favorite Pokemon: {appData?.pokemonName || ""}
            {appData.selectedPokemonImageUrl && <img src={appData.selectedPokemonImageUrl} style={{ maxWidth: "100%" }}/>}
        </Grid>
      </Grid>
    );
};
