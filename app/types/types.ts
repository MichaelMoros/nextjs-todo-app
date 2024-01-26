import * as z from 'zod'
import { ProofType, RoutineStatus, UserAction } from "../enums/enums";
import { Control, UseFormSetError, UseFormSetValue } from "react-hook-form";

const UpdateRoutineSchema = z.object({
  proofType: z.nativeEnum(ProofType),
  note: z.string().optional(),
  proof: z.string().min(1, { message: "Proof Required" }),
  checkBoxProof: z.string().array(),
  file: z.instanceof(File).nullable()
});

type Habit = {
  logs: Log[];
  id: number;
  routine: string;
  status: RoutineStatus;
  start: string;
  end: string;
  lastTouch: string;
  nextTouch: string;
  streak: number;
};

type CurrentUser = {
  email: string
  avatar: string,
  isVerified: boolean
}

type DashboardValidResponse = {
  owner: CurrentUser
  data: Habit[]
}

type Log = {
  id: number;
  createdAt: string,
  action: UserAction,
  logSummary: string,
  proof: string,
  proofType: ProofType
  note: string
}

type RefreshTokenApiResponse = {
  success: boolean
  at: number,
  rt: number
}

type Theme = "light" | "dark" | "system";
type SettingKey = "password" | "avatar" | "theme";


type TypeFormControlFields = Control<z.infer<typeof UpdateRoutineSchema>>;
type TypeFormSetValueFields = UseFormSetValue<z.infer<typeof UpdateRoutineSchema>>
type TypeFormSetErrorFields = UseFormSetError<z.infer<typeof UpdateRoutineSchema>>
export type { TypeFormControlFields, TypeFormSetValueFields, TypeFormSetErrorFields, Habit, Log, RefreshTokenApiResponse, DashboardValidResponse, CurrentUser, Theme, SettingKey }
export { UpdateRoutineSchema }
