import ProgramModel from "../../models/program.model";
//import { toProgramResponseDto } from "../../mappers/program.mapper";
 import { toProgramResponseDto } from "../../mapper/program.mapper";
export async function getProgramsService(p0: never): Promise<
  ReturnType<typeof toProgramResponseDto>[]
> {
  const programs = await ProgramModel.find()
    .sort({ name: 1 });

  return programs.map(toProgramResponseDto);
}