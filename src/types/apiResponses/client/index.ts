export interface ClientPermissionResponse {
  idClient: IdClient;
  clientName: string;
  isSelected: boolean;
}

export type IdClient = number | undefined;

export interface IdClientObj {
  idClient: IdClient;
}
