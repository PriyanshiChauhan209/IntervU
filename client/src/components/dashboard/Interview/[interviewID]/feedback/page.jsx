import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle } from "lucide-react";

export default function FeedbackPage() {
	const { interviewId } = useParams();
	const [answers, setAnswers] = useState([]);
	const [interview, setInterview] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!interviewId) return;

		const controller = new AbortController();

		const fetchAll = async () => {
			try {
				const [interviewRes, answersRes] = await Promise.all([
					fetch(`${import.meta.env.VITE_API_BASE_URL}/api/interviews/${interviewId}`, { signal: controller.signal }),
					fetch(`${import.meta.env.VITE_API_BASE_URL}/api/interviews/answers/${interviewId}`, { signal: controller.signal }),
				]);

				const interviewJson = await interviewRes.json();
				const answersJson = await answersRes.json();

				setInterview(Array.isArray(interviewJson) ? interviewJson[0] : interviewJson);
				setAnswers(Array.isArray(answersJson) ? answersJson : []);
			} catch (err) {
				console.error("Feedback fetch error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchAll();
		return () => controller.abort();
	}, [interviewId]);

	const avgRating = answers.length
		? Math.round(
				answers.reduce((s, a) => s + (Number(a.rating) || 0), 0) / answers.length
			)
		: 0;

	const percent = Math.round((avgRating / 10) * 100);

	return (
		<div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-primary dark:text-white transition-colors duration-300">
			<div className="max-w-5xl mx-auto">
				<header className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-2xl font-bold">Interview Feedback</h1>
						<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Performance summary for this mock interview</p>
					</div>

					<div className="flex items-center gap-4">
						<div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-36">
							<div className="flex items-center gap-2">
								<Star className="text-yellow-400" />
								<span className="text-lg font-semibold">{avgRating}/10</span>
							</div>
							<div className="text-sm text-gray-600 dark:text-gray-300">Average rating</div>
							<div className="mt-2 w-full">
								<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
									<div className="h-full bg-primary dark:bg-primaryDark" style={{ width: `${percent}%` }} />
								</div>
							</div>
							<div className="text-xs text-gray-500 mt-1">{percent}%</div>
						</div>

						<Link to="/dashboard">
							<Button className="bg-primary text-white">Back to Dashboard</Button>
						</Link>
					</div>
				</header>

				<section className="grid grid-cols-1 gap-6">
					{loading ? (
						<div className="p-6 bg-gray-50 dark:bg-gray-800 rounded">Loading feedback...</div>
					) : (
						<>
							{interview && (
								<div className="p-4 rounded border bg-white dark:bg-gray-800">
									<h3 className="font-semibold">Interview Info</h3>
									<p className="text-sm mt-1 text-gray-600 dark:text-gray-300"><strong>Position:</strong> {interview.jobPosition}</p>
									<p className="text-sm mt-1 text-gray-600 dark:text-gray-300"><strong>Experience:</strong> {interview.jobExperience}</p>
								</div>
							)}

							<div className="space-y-4">
								{answers.length === 0 ? (
									<div className="p-6 bg-gray-50 dark:bg-gray-800 rounded">No answers saved for this interview yet.</div>
								) : (
									answers.map((ans, idx) => (
										<div key={ans.id || idx} className="p-4 rounded-lg border bg-white dark:bg-gray-800">
											<div className="flex items-start justify-between">
												<h4 className="font-medium">Question {idx + 1}</h4>
												<div className="flex items-center gap-2">
													<CheckCircle className="text-primary" />
													<span className="text-sm text-gray-600 dark:text-gray-300">Rating: <strong>{ans.rating || "-"}</strong></span>
												</div>
											</div>

											<p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Q:</strong> {ans.question}</p>
											<p className="mt-2 text-gray-600 dark:text-gray-300"><strong>Your answer:</strong> {ans.userAns}</p>
											<p className="mt-2 text-gray-600 dark:text-gray-300"><strong>Expected:</strong> {ans.correctAns}</p>
											<div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 rounded">
												<strong className="text-sm">Feedback</strong>
												<p className="text-sm mt-1 text-gray-700 dark:text-gray-200">{ans.feedback}</p>
											</div>
										</div>
									))
								)}
							</div>
						</>
					)}
				</section>
			</div>
		</div>
	);
}

