export default function updateForm(state, payload) {
  return {
    ...state,
    formDetails: {
      ...state.formDetails,
      ...payload,
    },
  }
}
