"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { resetPassword } from "@/app/actions/password-reset"

const resetPasswordSchema = z
	.object({
		password: z.string().min(6, {
			message: "Password must be at least 6 characters",
		}),
		confirmPassword: z.string().min(6, {
			message: "Password must be at least 6 characters",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams.get("token")
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<ResetPasswordValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	})

	async function onSubmit(data: ResetPasswordValues) {
		if (!token) {
			toast.error("Missing token", {
				description: "The reset link is invalid. Please request a new one.",
			})
			return
		}

		setIsLoading(true)

		try {
			const formData = new FormData()
			formData.append("token", token)
			formData.append("password", data.password)

			const result = await resetPassword(formData)

			if (result.success) {
				toast.success("Password reset successful", {
					description: "You can now log in with your new password",
				})
				router.push("/login")
			} else {
				toast.error("Something went wrong", {
					description: result.message,
				})
			}
		} catch (error) {
			toast.error("Something went wrong", {
				description: "Please try again later",
			})
		} finally {
			setIsLoading(false)
		}
	}

	if (!token) {
		return (
			<div className="container flex h-screen w-screen flex-col items-center justify-center">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Invalid Reset Link</h1>
						<p className="text-sm text-muted-foreground">
							The password reset link is invalid or has expired. Please request a new one.
						</p>
					</div>
					<Button asChild>
						<Link href="/forgot-password">Request New Link</Link>
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
					<p className="text-sm text-muted-foreground">Enter your new password below</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
							Reset Password
						</Button>
					</form>
				</Form>

				<p className="px-8 text-center text-sm text-muted-foreground">
					<Link href="/login" className="hover:text-primary underline underline-offset-4">
						Back to login
					</Link>
				</p>
			</div>
		</div>
	)
}

