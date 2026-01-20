"use server"

import { SignUpInputs } from "@/types"
import registerUser from "@/utils/registerUser"

export async function RegisterUserFunc(data: SignUpInputs) {
	return registerUser(data);
}