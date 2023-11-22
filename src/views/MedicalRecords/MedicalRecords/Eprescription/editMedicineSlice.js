import { createSlice } from '@reduxjs/toolkit'
//
export const medicineSlice = createSlice({
  name: 'editMedicine',
  initialState: {
    indx: '',
    value: {
      name: '',
      quantity: 1,
      dosage: 'Before',
      intake: ['morning'],
      duration: '',
      instruction: '',
      buttonText: '+ ADD',
      category: '',
      tbs: 'TBSP',
    },
  },
  reducers: {
    EDIT_MEDICINE: (state, action) => {
      state.value.name = {
        Sk: action.payload.medicine_name,
        category: action.payload.category,
      }
      state.value.quantity = action.payload.quantity
      state.value.dosage = action.payload.dosage_type
      state.value.intake = [
        action.payload.intake.breakfast && 'morning',
        action.payload.intake.lunch && 'lunch',
        action.payload.intake.dinner && 'dinner',
      ]
      state.value.duration = action.payload.duration
      state.value.instruction = action.payload.instruction
      state.value.category = action.payload.category
      state.value.buttonText = 'UPDATE'
      state.indx = action.index
    },
    CLEAR_INDEX: (state) => {
      state.indx = ''
    },
  },
})

export const medicineReducer = medicineSlice.reducer
