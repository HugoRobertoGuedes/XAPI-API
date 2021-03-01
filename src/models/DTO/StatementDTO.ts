export interface StatementDTO {
  _id: string;
  actor: {
    name: string;
    mbox: string;
  };
  verb: {
    id: string;
    display: {
      "pt-BR": string;
    };
  };
  object: {
    id: string;
    definition: {
      name: {
        "pt-BR": string;
      };
    };
  };
  App_Id: string;
  App_Usuario_Id: string;
  Dt_Create: Date;
}
