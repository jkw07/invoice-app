import { TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";
import { useClientsStore } from "../store/clientsStore";

export const SearchInput = () => {
     const { 
        searchText, 
        setSearchText, 
      } = useClientsStore();
    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value);
      }
    return (
        <TextField
        label="Szukaj"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearchChange}
        sx={{
          marginBottom: 2,
          width: "100%",
          background: "white",
          marginTop: 2,
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          },
        }}
      />
    )
}