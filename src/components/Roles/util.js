export const transformRolesRequest = (values, headers) => {
  console.log("transformRolesRequest", values, headers);
  const role = {
    name: values.name,
  };
  return JSON.stringify(role);
};
