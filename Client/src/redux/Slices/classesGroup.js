import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getclassesGroup = createAsyncThunk(
  "classesGroup/getclassesGroup",
  async () => {
    const { data } = await axios.get("http://localhost:5000/classesGroup");

    return data;
  }
);

export const AddclassesGroup = createAsyncThunk(
  "classesGroup/AddclassesGroup",
  async (classesGroup) => {
    const promise = await axios
      .post("http://localhost:5000/classesGroup/", classesGroup)

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

export const GetclassesGroupById = createAsyncThunk(
  "classesGroup/GetclassesGroupById",
  async (Id) => {
    const promise = await axios
      .get("http://localhost:5000/classesGroup/" + Id)

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

export const EditclassesGroup = createAsyncThunk(
  "classesGroup/EditclassesGroup",
  async (classesGroup) => {
    //console.log(seanceId);

    const promise = await axios
      .put(
        "http://localhost:5000/classesGroup/" + classesGroup._id,
        classesGroup
      )

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

export const DeleteclassesGroup = createAsyncThunk(
  "classesGroup/DeleteclassesGroup",

  async (Id) => {
    const promise = await axios
      .delete("http://localhost:5000/classesGroup/" + Id)

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

export const StockURL = createAsyncThunk(
  "classesGroup/StockURL",

  async (Id) => {
    return Id;
  }
);

export const classesGroupSlice = createSlice({
  name: "classesGroup",
  initialState: {
    list: [],
    status: null,
    classesGroupById: null,
    classeGroupURL: null,
  },
  extraReducers: {
    [getclassesGroup.pending]: (state, action) => {
      state.status = "loading";
    },
    [getclassesGroup.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getclassesGroup.rejected]: (state, action) => {
      state.status = "failed";
    },
    [AddclassesGroup.fulfilled]: (state, action) => {
      state.list.push(action.payload.result);
    },
    [DeleteclassesGroup.fulfilled]: (state, action) => {
      state.list = state.list.filter((u) => {
        return u._id !== action.payload.result._id;
      });
    },
    [GetclassesGroupById.fulfilled]: (state, action) => {
      state.classesGroupById = action.payload;
    },
    [StockURL.fulfilled]: (state, action) => {
      state.classeGroupURL = action.payload;
    },

    [EditclassesGroup.fulfilled]: (state, action) => {
      let classeGroup = action.payload.result;
      let classesGroup = state.list.slice();
      for (let i = 0, n = classesGroup.length; i < n; i++) {
        if (classesGroup[i]._id === classeGroup._id) {
          classesGroup[i].name = classeGroup.name;

          break; // Stop this loop, we found it!
        }
      }
      state.list = classesGroup;
    },
  },
});

export default classesGroupSlice.reducer;
