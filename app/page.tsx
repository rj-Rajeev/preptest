import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, BarChart2, BookOpen, Award, Clock, Users } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import ExamCard from "@/components/exam-card"
import FeatureCard from "@/components/feature-card"
import StatCard from "@/components/stat-card"
import { HeroWave } from "@/components/hero-wave"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">ExamPrepPro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Features
            </Link>
            <Link href="#exams" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Exams
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Log in
            </Link>
            <Button className="bg-teal-600 hover:bg-teal-700">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-teal-600 to-teal-800 text-white">
          <div className="container relative z-10 py-16 md:py-24 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <Badge className="bg-white/20 hover:bg-white/30 text-white">#1 Exam Preparation Platform</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Ace Your Exams with Confidence
                </h1>
                <p className="max-w-[600px] text-lg text-teal-50 md:text-xl">
                  Personalized learning paths, realistic mock tests, and comprehensive study materials to help you
                  succeed in any exam.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-teal-800 hover:bg-teal-50">
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    Explore Mock Tests
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-teal-400 border-2 border-teal-600 flex items-center justify-center text-xs font-medium"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <p className="text-teal-50">
                    Joined by <span className="font-bold">50,000+</span> students
                  </p>
                </div>
              </div>
              <div className="relative mx-auto lg:mr-0">
                <div className="relative h-[400px] w-[300px] md:h-[500px] md:w-[350px] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=1000&width=700"
                    alt="ExamPrepPro Dashboard"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 h-32 w-64 rounded-lg bg-white p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Progress Update</p>
                      <p className="text-xs text-gray-500">You've completed 85% of your study plan!</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-2 w-[85%] rounded-full bg-teal-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HeroWave />
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <StatCard number="50K+" label="Active Students" />
              <StatCard number="95%" label="Success Rate" />
              <StatCard number="200+" label="Mock Tests" />
              <StatCard number="25+" label="Exam Categories" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200">Features</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Why Choose ExamPrepPro?
              </h2>
              <p className="mx-auto max-w-[800px] text-gray-500 md:text-lg">
                Our platform is designed to give you the best preparation experience with features that adapt to your
                learning style.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<BarChart2 className="h-6 w-6 text-teal-600" />}
                title="Personalized Learning Paths"
                description="AI-powered study plans tailored to your strengths and weaknesses."
              />
              <FeatureCard
                icon={<BookOpen className="h-6 w-6 text-teal-600" />}
                title="Comprehensive Study Materials"
                description="Access thousands of practice questions, flashcards, and detailed explanations."
              />
              <FeatureCard
                icon={<Clock className="h-6 w-6 text-teal-600" />}
                title="Realistic Mock Tests"
                description="Timed exams that simulate the actual test environment and conditions."
              />
              <FeatureCard
                icon={<Award className="h-6 w-6 text-teal-600" />}
                title="Performance Analytics"
                description="Detailed insights into your progress and areas that need improvement."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-teal-600" />}
                title="Community Support"
                description="Connect with fellow test-takers and expert tutors for guidance."
              />
              <FeatureCard
                icon={<CheckCircle className="h-6 w-6 text-teal-600" />}
                title="Guaranteed Results"
                description="Our proven methodology has helped thousands achieve their target scores."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200">Process</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">How ExamPrepPro Works</h2>
              <p className="mx-auto max-w-[800px] text-gray-500 md:text-lg">
                Our simple 4-step process will get you from beginner to exam-ready in record time.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-teal-200 hidden md:block"></div>
              <div className="space-y-12 relative">
                {[
                  {
                    step: 1,
                    title: "Take a Diagnostic Test",
                    description:
                      "Begin with an assessment that identifies your current knowledge level and areas for improvement.",
                  },
                  {
                    step: 2,
                    title: "Get Your Personalized Plan",
                    description:
                      "Receive a customized study schedule based on your goals, timeline, and diagnostic results.",
                  },
                  {
                    step: 3,
                    title: "Practice with Mock Tests",
                    description:
                      "Take realistic practice exams that mirror the format and difficulty of your actual test.",
                  },
                  {
                    step: 4,
                    title: "Track Progress & Improve",
                    description: "Monitor your improvement over time and adjust your study plan as needed.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}
                  >
                    <div className="md:w-1/2 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold z-10 hidden md:flex">
                        {item.step}
                      </div>
                      <Card className="border-teal-200">
                        <CardContent className="p-6 md:p-8">
                          <div className="md:hidden mb-4 h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                            {item.step}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-gray-500">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="md:w-1/2 h-48 relative rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={`/placeholder.svg?height=400&width=600`}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Exams Section */}
        <section id="exams" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200">Exam Categories</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Prepare for Any Exam</h2>
              <p className="mx-auto max-w-[800px] text-gray-500 md:text-lg">
                We offer comprehensive preparation materials for a wide range of standardized tests and professional
                certifications.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                { name: "GMAT", icon: "🎓", count: 45 },
                { name: "GRE", icon: "📚", count: 38 },
                { name: "LSAT", icon: "⚖️", count: 42 },
                { name: "MCAT", icon: "🔬", count: 56 },
                { name: "SAT", icon: "✏️", count: 50 },
                { name: "ACT", icon: "📝", count: 48 },
                { name: "TOEFL", icon: "🌎", count: 35 },
                { name: "IELTS", icon: "🗣️", count: 40 },
                { name: "PMP", icon: "📊", count: 32 },
                { name: "CFA", icon: "💹", count: 47 },
                { name: "Bar Exam", icon: "📜", count: 53 },
                { name: "NCLEX", icon: "🏥", count: 60 },
              ].map((exam, index) => (
                <ExamCard key={index} name={exam.name} icon={exam.icon} testCount={exam.count} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                View All Exam Categories
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-teal-50 to-white">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200">Testimonials</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Success Stories</h2>
              <p className="mx-auto max-w-[800px] text-gray-500 md:text-lg">
                Hear from students who achieved their target scores with ExamPrepPro.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                name="Sarah Johnson"
                exam="GMAT"
                score="720"
                quote="The personalized study plan and analytics helped me focus on my weak areas. I improved my score by 80 points in just 6 weeks!"
                imageSrc="/placeholder.svg?height=200&width=200"
              />
              <TestimonialCard
                name="Michael Chen"
                exam="GRE"
                score="328"
                quote="The mock tests were incredibly realistic. By the time I took the actual GRE, it felt like just another practice session."
                imageSrc="/placeholder.svg?height=200&width=200"
              />
              <TestimonialCard
                name="Jessica Patel"
                exam="LSAT"
                score="172"
                quote="The detailed explanations for each question helped me understand the reasoning patterns. ExamPrepPro was instrumental in my law school acceptance."
                imageSrc="/placeholder.svg?height=200&width=200"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200">Pricing</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto max-w-[800px] text-gray-500 md:text-lg">
                Choose the plan that fits your needs. All plans include access to our core features.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Basic",
                  price: "$19",
                  period: "per month",
                  description: "Perfect for casual test-takers",
                  features: [
                    "Access to 50+ mock tests",
                    "Basic study materials",
                    "Performance tracking",
                    "Mobile app access",
                    "Email support",
                  ],
                  buttonText: "Get Started",
                  popular: false,
                },
                {
                  name: "Premium",
                  price: "$39",
                  period: "per month",
                  description: "Ideal for serious exam preparation",
                  features: [
                    "Access to 200+ mock tests",
                    "Comprehensive study materials",
                    "Advanced analytics",
                    "Personalized study plan",
                    "Priority email support",
                    "Community access",
                  ],
                  buttonText: "Get Premium",
                  popular: true,
                },
                {
                  name: "Ultimate",
                  price: "$59",
                  period: "per month",
                  description: "For those who want the best results",
                  features: [
                    "Access to all mock tests",
                    "All study materials",
                    "1-on-1 tutoring sessions",
                    "Custom study plan",
                    "24/7 priority support",
                    "Score improvement guarantee",
                  ],
                  buttonText: "Get Ultimate",
                  popular: false,
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className={`relative ${plan.popular ? "border-teal-600 shadow-lg" : "border-gray-200"}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6 md:p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="mb-2">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-500">{plan.period}</span>
                      </div>
                      <p className="text-gray-500">{plan.description}</p>
                    </div>
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full ${plan.popular ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-teal-600 text-white">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready to Ace Your Exam?</h2>
                <p className="max-w-[600px] text-teal-50 md:text-lg">
                  Join thousands of successful students who have achieved their target scores with ExamPrepPro. Start
                  your journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-teal-800 hover:bg-teal-50">
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    Schedule a Demo
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto lg:ml-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-40 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart2 className="h-5 w-5" />
                        <span className="font-medium">Score Improvement</span>
                      </div>
                      <div className="h-24 flex items-end gap-1">
                        <div className="w-1/5 h-[30%] bg-teal-200 rounded-t"></div>
                        <div className="w-1/5 h-[45%] bg-teal-200 rounded-t"></div>
                        <div className="w-1/5 h-[60%] bg-teal-200 rounded-t"></div>
                        <div className="w-1/5 h-[75%] bg-teal-200 rounded-t"></div>
                        <div className="w-1/5 h-[90%] bg-teal-200 rounded-t"></div>
                      </div>
                    </div>
                    <div className="h-32 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">Study Time</span>
                      </div>
                      <div className="flex items-center justify-center h-16">
                        <div className="h-16 w-16 rounded-full border-4 border-teal-200 flex items-center justify-center text-xl font-bold">
                          85%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-32 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Completed</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 mt-2">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className={`h-4 rounded ${i < 9 ? "bg-teal-200" : "bg-white/20"}`}></div>
                        ))}
                      </div>
                    </div>
                    <div className="h-40 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5" />
                        <span className="font-medium">Your Progress</span>
                      </div>
                      <div className="space-y-3 mt-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Quantitative</span>
                            <span>85%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-white/20">
                            <div className="h-2 w-[85%] rounded-full bg-teal-200"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Verbal</span>
                            <span>70%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-white/20">
                            <div className="h-2 w-[70%] rounded-full bg-teal-200"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Analytical</span>
                            <span>90%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-white/20">
                            <div className="h-2 w-[90%] rounded-full bg-teal-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200">FAQ</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-[800px] text-gray-500 md:text-lg">
                Find answers to common questions about our platform and services.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {[
                {
                  question: "How long does it take to prepare for an exam with ExamPrepPro?",
                  answer:
                    "The preparation time varies depending on the exam and your starting level. Our personalized study plans typically range from 4 weeks to 3 months, but you can adjust the timeline based on your target date and available study time.",
                },
                {
                  question: "Are the mock tests similar to the actual exams?",
                  answer:
                    "Yes, our mock tests are designed to closely simulate the format, difficulty level, and timing of the actual exams. We regularly update our question bank based on the latest exam patterns and feedback from recent test-takers.",
                },
                {
                  question: "Can I access ExamPrepPro on mobile devices?",
                  answer:
                    "ExamPrepPro is fully responsive and works on all devices. We also offer dedicated mobile apps for iOS and Android, allowing you to study on the go.",
                },
                {
                  question: "Do you offer a score improvement guarantee?",
                  answer:
                    "Yes, our Ultimate plan comes with a score improvement guarantee. If your score doesn't improve after completing our recommended study plan, we'll extend your subscription for free until you achieve your target score.",
                },
                {
                  question: "Can I switch between different exam preparations?",
                  answer:
                    "Yes, all our plans allow you to prepare for multiple exams simultaneously. You can switch between different exam preparations at any time without any additional cost.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{faq.question}</h3>
                      <p className="text-gray-500">{faq.answer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50">
        <div className="container py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-teal-600" />
                <span className="text-xl font-bold">ExamPrepPro</span>
              </div>
              <p className="text-gray-500 mb-4">Your ultimate destination for exam preparation and success.</p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-teal-100 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-teal-100 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-teal-100 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-teal-100 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#exams" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Exams
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Exam Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Standardized Tests
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Professional Certifications
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Language Proficiency
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                    College Entrance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                    Graduate Admissions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
                    View All Exams
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600 mt-0.5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-gray-500">+1 (888) 123-4567</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600 mt-0.5"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-gray-500">support@examprepro.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600 mt-0.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-gray-500">
                    123 Education St, Suite 101
                    <br />
                    San Francisco, CA 94105
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} ExamPrepPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
