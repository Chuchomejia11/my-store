// src/redux/slices/dateSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const HOY = dayjs().startOf("day");
const LIMITE_INICIO = dayjs("2024-06-01").startOf("day");

const initialState = {
  fecha: HOY.toISOString(), // persistencia en string ISO
};

const dateHomeSlice = createSlice({
  name: "dateHome",
  initialState,
  reducers: {
    resetFecha: (state) => {
      state.fecha = HOY.toISOString();
    },
    moverAtras: (state) => {
      const fechaActual = dayjs(state.fecha);
      const nuevaFecha = fechaActual.subtract(7, "day");
      if (nuevaFecha.isBefore(LIMITE_INICIO)) {
        state.fecha = LIMITE_INICIO.toISOString();
      } else {
        state.fecha = nuevaFecha.toISOString();
      }
    },
    moverAdelante: (state) => {
      const fechaActual = dayjs(state.fecha);
      const nuevaFecha = fechaActual.add(7, "day");
      if (nuevaFecha.isAfter(HOY)) {
        state.fecha = HOY.toISOString();
      } else {
        state.fecha = nuevaFecha.toISOString();
      }
    },
  },
});

export const { resetFecha, moverAtras, moverAdelante } = dateHomeSlice.actions;
export default dateHomeSlice.reducer;
