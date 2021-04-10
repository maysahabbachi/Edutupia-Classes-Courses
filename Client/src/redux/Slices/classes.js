import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getClasses = createAsyncThunk("classes/getClasses", async () => {
  const { data } = await axios.get("http://localhost:5000/class");

  return data;
});

export const getClassesByIdGroup = createAsyncThunk(
  "classes/getClassesByIdGroup",
  async (idGroup) => {
    const { data } = await axios.get(
      "http://localhost:5000/class/findByIdGroup/" + idGroup
    );

    return data;
  }
);

export const Addclasses = createAsyncThunk(
  "classes/Addclasses",
  async (classes) => {
    const promise = await axios
      .post("http://localhost:5000/class/", classes)

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

export const GetClaseesById = createAsyncThunk(
  "class/GetClaseesById",
  async (Id) => {
    const promise = await axios
      .get("http://localhost:5000/class/" + Id)

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

export const Editclasses = createAsyncThunk(
  "classes/Editclasses",
  async (classes) => {
    //console.log(seanceId);

    const promise = await axios
      .put("http://localhost:5000/class/" + classes._id, classes)

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

export const Deleteclasses = createAsyncThunk(
  "classes/Deleteclasses",

  async (Id) => {
    const promise = await axios
      .delete("http://localhost:5000/class/" + Id)

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

export const StockURLClass = createAsyncThunk(
  "classes/StockURLClass",

  async (Id) => {
    return Id;
  }
);

export const classesSlice = createSlice({
  name: "classes",
  initialState: {
    list: [],
    status: null,
    classById: null,
    classByGroup: [],
    classURL: null,
  },
  extraReducers: {
    [getClasses.pending]: (state, action) => {
      state.status = "loading";
    },
    [getClasses.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getClasses.rejected]: (state, action) => {
      state.status = "failed";
    },
    [Addclasses.fulfilled]: (state, action) => {
      state.list.push(action.payload.result);
    },
    [StockURLClass.fulfilled]: (state, action) => {
      state.classURL = action.payload;
    },
    [Deleteclasses.fulfilled]: (state, action) => {
      state.list = state.list.filter((u) => {
        return u._id !== action.payload.result._id;
      });
    },
    [GetClaseesById.fulfilled]: (state, action) => {
      state.classById = action.payload;
    },
    [getClassesByIdGroup.fulfilled]: (state, action) => {
      state.classByGroup = action.payload;
    },

    [Editclasses.fulfilled]: (state, action) => {
      state.statusUpdate = "success";
      let classe = action.payload.result;
      let classes = state.list.slice();
      for (let i = 0, n = classes.length; i < n; i++) {
        if (classes[i]._id === classe._id) {
          classes[i].idProf = classe.idProf;
          classes[i].name = classe.name;
          classes[i].section = classe.section;

          break; // Stop this loop, we found it!
        }
      }
      state.list = classes;
    },
  },
});

export default classesSlice.reducer;
