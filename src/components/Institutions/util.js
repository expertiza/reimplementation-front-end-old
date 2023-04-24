
export const transformInstitutionsRequest = (values, headers) => {
  console.log("transformInstitutionsRequest", values, headers);
  const institution = {
    name: values.name,
  };
  return JSON.stringify(institution);
};


