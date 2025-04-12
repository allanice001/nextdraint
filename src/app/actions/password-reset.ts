"use server";

import { prisma } from "@/lib/prisma";
import { generatePasswordResetToken } from "@/lib/password-reset";
import { sendEmail } from "@/lib/email";
import { renderReactEmail } from "@/lib/react-email";
import { PasswordResetEmail } from "@/components/emails/password-reset-email";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export async function forgotPassword(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const validatedFields = forgotPasswordSchema.safeParse({ email });

    if (!validatedFields.success) {
      return { success: false, message: "Please enter a valid email address" };
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Don't reveal if user exists or not for security reasons
    if (!user) {
      // We still return success to prevent email enumeration attacks
      return {
        success: true,
        message:
          "If your email is registered, you will receive a password reset link",
      };
    }

    // Generate a password reset token
    const token = await generatePasswordResetToken(email);

    // Create the reset link
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    // Render the email template
    const emailHtml = await renderReactEmail(
      PasswordResetEmail({
        resetLink,
        username: user.name || undefined,
      }),
    );

    // Send the email
    await sendEmail({
      to: email,
      subject: "Reset your Draint password",
      html: emailHtml,
    });

    return {
      success: true,
      message:
        "If your email is registered, you will receive a password reset link",
    };
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export async function resetPassword(formData: FormData) {
  try {
    const token = formData.get("token") as string;
    const password = formData.get("password") as string;

    const validatedFields = resetPasswordSchema.safeParse({ token, password });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid input. Please check your password.",
      };
    }

    // Validate the token and get the associated email
    const email = await import("@/lib/password-reset").then((mod) =>
      mod.validatePasswordResetToken(token),
    );

    if (!email) {
      return {
        success: false,
        message:
          "Invalid or expired token. Please request a new password reset link.",
      };
    }

    // Hash the new password
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    // Delete the used token
    await import("@/lib/password-reset").then((mod) =>
      mod.deletePasswordResetToken(token),
    );

    return {
      success: true,
      message:
        "Your password has been reset successfully. You can now log in with your new password.",
    };
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
