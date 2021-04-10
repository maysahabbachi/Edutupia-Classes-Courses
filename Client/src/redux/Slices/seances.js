import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeances = createAsyncThunk("seance/getSeances", async () => {
  const { data } = await axios.get("http://localhost:5000/seance");

  return data;
});

export const AddSeances = createAsyncThunk(
  "seance/AddSeances",
  async (seances) => {
    const promise = await axios
      .post("http://localhost:5000/seance/", seances)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const GetSeancesById = createAsyncThunk(
  "seance/GetSeancesById",
  async (Id) => {
    const promise = await axios
      .get("http://localhost:5000/seance/" + Id)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const Editseances = createAsyncThunk(
  "seance/Editseances",
  async (seances) => {
    //console.log(seanceId);

    const promise = await axios
      .put("http://localhost:5000/seance/" + seances._id, seances)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const Deleteseances = createAsyncThunk(
  "seance/Deleteseances",

  async (Id) => {
    const promise = await axios
      .delete("http://localhost:5000/seance/" + Id)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const getseancesByIdClass = createAsyncThunk(
  "seance/getseancesByIdClass",
  async (idClass) => {
    const { data } = await axios.get(
      "http://localhost:5000/seance/findByIdClasses/" + idClass
    );

    return data;
  }
);

export const StockURLSeance = createAsyncThunk(
  "seance/StockURLSeance",

  async (Id) => {
    return Id;
  }
);

export const seancesSlice = createSlice({
  name: "seances",
  initialState: {
    list: [],
    status: null,
    seancesById: null,
    classBySeances: [],
    seanceURL: null,
  },
  extraReducers: {
    [getSeances.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSeances.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getSeances.rejected]: (state, action) => {
      state.status = "failed";
    },
    [AddSeances.fulfilled]: (state, action) => {
      state.list.push(action.payload.result);
    },
    [StockURLSeance.fulfilled]: (state, action) => {
      state.seanceURL = action.payload;
    },
    [Deleteseances.fulfilled]: (state, action) => {
      state.list = state.list.filter((u) => {
        return u._id !== action.payload.result._id;
      });
    },
    [GetSeancesById.fulfilled]: (state, action) => {
      state.seancesById = action.payload;
    },
    [getseancesByIdClass.fulfilled]: (state, action) => {
      state.classBySeances = action.payload;
    },

    [Editseances.fulfilled]: (state, action) => {
      state.statusUpdate = "success";
      let seance = action.payload.result;
      let seances = state.list.slice();
      for (let i = 0, n = seances.length; i < n; i++) {
        if (seances[i]._id === seance._id) {
          seances[i].idProf = seance.idProf;
          seances[i].name = seance.name;
          seances[i].section = seance.section;

          break; // Stop this loop, we found it!
        }
      }
      state.list = seances;
    },
  },
});

export default seancesSlice.reducer;
