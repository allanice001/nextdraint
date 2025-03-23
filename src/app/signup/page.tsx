"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import {signIn} from "next-auth/react";

const signupSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters",
	}),
	email: z.string().email({ message: "Please enter a valid email address" }),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters",
	}),
})

type SignupValues = z.infer<typeof signupSchema>

export default function SignupPage() {
	const router = useRouter()
	// Remove this line: const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<SignupValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	})

	async function onSubmit(data: SignupValues) {
		setIsLoading(true)

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.message)
			}

			toast.success("Account created!", {
				description: "You can now log in with your credentials",
			})

			router.push("/login")
		} catch (error) {
			toast.error("Something went wrong", {
				description: error instanceof Error ? error.message : "Please try again later",
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
					<p className="text-sm text-muted-foreground">Create an account to get started</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="mail@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
							Sign Up
						</Button>
					</form>
				</Form>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
					</div>
				</div>

				<Button
					variant="outline"
					type="button"
					disabled={isLoading}
					onClick={() => signIn("google", { callbackUrl: "/" })}
				>
					{isLoading ? (
						<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Icons.google className="mr-2 h-4 w-4" />
					)}{" "}
					Google
				</Button>

				<p className="px-8 text-center text-sm text-muted-foreground">
					<Link href="/login" className="hover:text-primary underline underline-offset-4">
						Already have an account? Log In
					</Link>
				</p>
			</div>
		</div>
	)
}

