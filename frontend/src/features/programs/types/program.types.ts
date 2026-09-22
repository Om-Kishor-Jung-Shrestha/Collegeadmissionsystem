export interface CreateProgramDto {
  mnemonic: string;
  name: string;
}

export interface UpdateProgramDto {
  mnemonic?: string;
  name?: string;
}

export interface ProgramIdParamDto {
  id: string;
}

export interface ProgramResponseDto {
  id: string;
  mnemonic: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
