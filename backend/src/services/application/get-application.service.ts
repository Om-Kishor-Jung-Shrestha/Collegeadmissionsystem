// import ApplicationModel from "../../models/application.model";
// import { AppError } from "../../errors/app.error";

// import {
//   toApplicationResponseDto,
// } from "../../mapper/applicaiton.mapper";

// export async function getApplicationService(
//   id: string
// ): Promise<
//   ReturnType<typeof toApplicationResponseDto>
// > {
//   const application =
//     await ApplicationModel.findById(id);

//   if (!application) {
//     throw new AppError(
//       "Application not found",
//       404,
//       "APPLICATION_NOT_FOUND"
//     );
//   }

//   return toApplicationResponseDto(
//     application
//   );
// }
import ApplicationModel from "../../models/application.model";
import { AppError } from "../../errors/app.error";

import {
  toApplicationResponseDto,
} from "../../mapper/applicaiton.mapper";

export async function getApplicationService(
  id: string
): Promise<
  ReturnType<
    typeof toApplicationResponseDto
  >
> {
  const application =
    await ApplicationModel.findById(
      id
    );

  if (!application) {
    throw new AppError(
      "Application not found",
      404,
      "APPLICATION_NOT_FOUND"
    );
  }

  return toApplicationResponseDto(
    application
  );
}