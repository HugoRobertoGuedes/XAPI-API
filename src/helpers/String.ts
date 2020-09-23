const BearerTokenHeader = (token: string) => {
  return token.replace("Bearer", "").replace(" ", "");
};

export { BearerTokenHeader };
