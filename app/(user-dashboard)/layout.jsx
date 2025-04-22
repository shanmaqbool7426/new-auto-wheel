import Script from 'next/script';
import { AuthModalProvider } from '@/contexts/auth-modal';
import { UserProvider } from '@/contexts/user';

export const metadata = {
	title: "User Dashboard | AussieMotor",
	description: "Access your personalized AussieMotor user dashboard to manage listings, messages, saved vehicles, reviews, and account settings all in one place.",
	keywords: "user dashboard, automotive account, vehicle management, seller dashboard, buyer tools, account management, AussieMotor dashboard, automotive marketplace",
	openGraph: {
		title: "User Dashboard | AussieMotor",
		description: "Access your personalized AussieMotor user dashboard to manage listings, messages, saved vehicles, reviews, and account settings all in one place.",
		url: "https://www.aussiemotor.com/user-dashboard/",
		siteName: "AussieMotor",
		locale: "en_AU",
		type: "website",
		images: [
			{
				url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
				width: 1200,
				height: 630,
				alt: "AussieMotor User Dashboard",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "User Dashboard | AussieMotor",
		description: "Access your personalized AussieMotor user dashboard to manage listings, messages, saved vehicles, reviews, and account settings.",
		images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
	},
	alternates: {
		canonical: "https://www.aussiemotor.com/user-dashboard/",
	},
};

export default function DashboardLayout({ children }) {
	return (
		<AuthModalProvider>
			<UserProvider>
				{/* WebSite Schema.org structured data */}
				<Script
					id="dashboard-data"
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							"name": "AussieMotor User Dashboard",
							"url": "https://www.aussiemotor.com/user-dashboard/",
							"potentialAction": {
								"@type": "SearchAction",
								"target": {
									"@type": "EntryPoint",
									"urlTemplate": "https://www.aussiemotor.com/listing/search?q={search_term_string}"
								},
								"query-input": "required name=search_term_string"
							},
							"description": "Access your personalized AussieMotor user dashboard to manage listings, messages, saved vehicles, reviews, and account settings all in one place."
						})
					}}
				/>
				
				{children}
			</UserProvider>
		</AuthModalProvider>
	);
}