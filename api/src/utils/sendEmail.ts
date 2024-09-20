import { resend } from "@/config/resend";

interface ISendingEmail {
	to: string;
	subject: string;
	html: string;
	text: string;
}

export async function sendingEmail({ to, subject, html, text }: ISendingEmail) {
	const { data, error } = await resend.emails.send({
		from: "onboarding@resend.dev",
		to: ["delivered@resend.dev"],
		subject,
		html,
		text,
	});

	return { data, error };
}
