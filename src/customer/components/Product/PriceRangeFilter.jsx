import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";

const PriceRangeFilter = ({
  onApply,
  initialMin = 0,
  initialMax = 10000000,
}) => {
  const [priceRange, setPriceRange] = useState([initialMin, initialMax]);
  const [manualMin, setManualMin] = useState(initialMin);
  const [manualMax, setManualMax] = useState(initialMax);

  useEffect(() => {
    setPriceRange([initialMin, initialMax]);
    setManualMin(initialMin);
    setManualMax(initialMax);
  }, [initialMin, initialMax]);

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
    setManualMin(newValue[0]);
    setManualMax(newValue[1]);
  };

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value <= priceRange[1]) {
      setManualMin(value);
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= priceRange[0]) {
      setManualMax(value);
      setPriceRange([priceRange[0], value]);
    }
  };

  const handleApply = () => {
    // Ensure max is not less than min
    const finalMin = Math.min(manualMin, manualMax);
    const finalMax = Math.max(manualMin, manualMax);
    onApply(finalMin, finalMax);
  };

  const handleClear = () => {
    setPriceRange([0, 10000000]);
    setManualMin(0);
    setManualMax(10000000);
    onApply(0, 10000000);
  };

  return (
    <div className="space-y-4">
      <Slider
        value={priceRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={10000000}
        step={100}
        sx={{
          color: "#9155fd",
          "& .MuiSlider-thumb": {
            borderRadius: "50%",
          },
        }}
      />
      <div className="flex gap-3 items-center">
        <TextField
          label="Min Price"
          type="number"
          size="small"
          value={manualMin}
          onChange={handleMinChange}
          inputProps={{ min: 0, max: manualMax }}
          sx={{ flex: 1 }}
        />
        <span className="text-gray-500">-</span>
        <TextField
          label="Max Price"
          type="number"
          size="small"
          value={manualMax}
          onChange={handleMaxChange}
          inputProps={{ min: manualMin }}
          sx={{ flex: 1 }}
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="contained"
          size="small"
          onClick={handleApply}
          sx={{
            bgcolor: "#9155fd",
            "&:hover": { bgcolor: "#7c3aed" },
            flex: 1,
          }}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleClear}
          sx={{
            color: "#9155fd",
            borderColor: "#9155fd",
            "&:hover": { borderColor: "#7c3aed", bgcolor: "transparent" },
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
