import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { ControllerRenderProps } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
  code?: string;
}

interface OtpInputProps {
  field: ControllerRenderProps<LoginFormValues, "code">;
  length: number;
}

const OtpInput = ({ field, length }: OtpInputProps) => {
  const slots = Array.from({ length }, (_, i) => (
    <InputOTPSlot key={i} index={i} />
  ));
  return (
    <div className="flex justify-center items-center space-y-4">
      <InputOTP maxLength={length} pattern={REGEXP_ONLY_DIGITS} {...field}>
        <InputOTPGroup>{slots.slice(0, length / 2)}</InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>{slots.slice(length / 2)}</InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default OtpInput;
