import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Location } from '@/types';

export interface SearchState {
  locationId: string | null;
  locationSlug: string | null;
  locationName: string | null;
  pickupDate: string | null;
  pickupTime: string | null;
  returnDate: string | null;
  returnTime: string | null;
  categoryId: string | null;
  brandId: string | null;
  vehicleClass: import('@/types').VehicleClass | null;
}

const initialState: SearchState = {
  locationId: null,
  locationSlug: null,
  locationName: null,
  pickupDate: null,
  pickupTime: null,
  returnDate: null,
  returnTime: null,
  categoryId: null,
  brandId: null,
  vehicleClass: 'TWO_WHEELER',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocation(
      state,
      action: PayloadAction<{ id: string; slug: string; name: string } | Location>,
    ) {
      state.locationId = action.payload.id;
      state.locationSlug = action.payload.slug;
      state.locationName = action.payload.name;
    },
    setDates(
      state,
      action: PayloadAction<{
        pickupDate: string;
        pickupTime: string;
        returnDate: string;
        returnTime: string;
      }>,
    ) {
      state.pickupDate = action.payload.pickupDate;
      state.pickupTime = action.payload.pickupTime;
      state.returnDate = action.payload.returnDate;
      state.returnTime = action.payload.returnTime;
    },
    setCategoryId(state, action: PayloadAction<string | null>) {
      state.categoryId = action.payload;
    },
    setBrandId(state, action: PayloadAction<string | null>) {
      state.brandId = action.payload;
    },
    setVehicleClass(state, action: PayloadAction<import('@/types').VehicleClass>) {
      state.vehicleClass = action.payload;
      state.categoryId = null;
    },
    resetSearch() {
      return initialState;
    },
  },
});

export const { setLocation, setDates, setCategoryId, setBrandId, setVehicleClass, resetSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
