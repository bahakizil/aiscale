'use client';

import { useState, useEffect } from 'react';

export default function SuccessPage() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Countdown timer
    const targetDate = new Date('2025-11-18T12:00:00-05:00'); // EST timezone

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTime({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (num: number) => String(num).padStart(2, '0');

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Banner */}
      <div className="bg-gray-900 text-white py-3 px-6 text-center border-b border-gray-800">
        <p className="text-sm">
          <span className="font-semibold">💾 Save The Date:</span> Sunday, 18th November at 12:00 PM EST (9:00 AM PST)
        </p>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Congratulations Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Congratulations
          </h1>
          <p className="text-xl text-gray-300">
            Your Spot is Reserved For The "All Business Masterclass" 🎉
          </p>
        </div>

        {/* Main Video Section */}
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
          {/* Video Placeholder */}
          <div className="aspect-video bg-gradient-to-br from-red-900 via-red-700 to-orange-600 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-white font-bold text-2xl mb-2">Step #1: Watch Video Below In Full</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-black p-6 text-center border-t border-gray-800">
            <p className="text-sm text-gray-400 mb-4">
              ⏱️ Training Starts on Sunday, 18th November at 12:00 PM EST (9:00 AM PST) ⏱️
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-white text-black px-6 py-3 rounded-lg min-w-[80px]">
                <div className="text-3xl font-bold">{pad(time.hours)}</div>
                <div className="text-xs text-gray-600 mt-1">HOURS</div>
              </div>
              <div className="bg-white text-black px-6 py-3 rounded-lg min-w-[80px]">
                <div className="text-3xl font-bold">{pad(time.minutes)}</div>
                <div className="text-xs text-gray-600 mt-1">MINUTES</div>
              </div>
              <div className="bg-white text-black px-6 py-3 rounded-lg min-w-[80px]">
                <div className="text-3xl font-bold">{pad(time.seconds)}</div>
                <div className="text-xs text-gray-600 mt-1">SECONDS</div>
              </div>
            </div>

            {/* Email Input */}
            <div className="max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-3 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Your Private Event Link
              </p>
              <div className="bg-gray-800 rounded-lg p-3 mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Loading your private link..."
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
                <p className="text-yellow-500 text-xs flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Action Required
                </p>
              </div>

              {/* Save Access Link */}
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">
                  Save your access link above 🎟️
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Check out the confirmation, and check your email for accessing it to maximize your experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step #2: Calendar Integration */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Step #2: Add Event To Calendar
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 3h-15A2.5 2.5 0 002 5.5v13A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0019.5 3z"/>
              </svg>
              <span>Apple Calendar</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 3h-15A2.5 2.5 0 002 5.5v13A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0019.5 3z"/>
              </svg>
              <span>Google Calendar</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 3h-15A2.5 2.5 0 002 5.5v13A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0019.5 3z"/>
              </svg>
              <span>Outlook</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 3h-15A2.5 2.5 0 002 5.5v13A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0019.5 3z"/>
              </svg>
              <span>Office 365</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 3h-15A2.5 2.5 0 002 5.5v13A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0019.5 3z"/>
              </svg>
              <span>Yahoo</span>
            </button>
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Select the calendar you use above to add this event to your calendar
          </p>
        </div>

        {/* Step #3: Explainer Videos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Step #3: Understand AI Business Better
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Watch the short explainer videos below
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "What we've been in the day to day, will I have?", duration: "1:39" },
              { title: "What kind of businesses can I sell to?", duration: "1:24" },
              { title: "If loads of people do this will it get saturated?", duration: "1:19" }
            ].map((video, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden group cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/50 group-hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs">
                    ▶ {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white text-sm font-medium">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get Questions Answered */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Get Your Questions Answered Before The Event!
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Question 1",
              "Question 2",
              "Question 3",
              "Question 4",
              "Question 5",
              "Question 6",
              "Question 7",
              "Question 8"
            ].map((question, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden group cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                <div className="aspect-video bg-gradient-to-br from-cyan-900 to-blue-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/50 group-hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Jordan Lee */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold mb-6">About Jordan Lee</h2>
          <div className="bg-gray-900 rounded-lg p-8">
            <p className="text-gray-400 text-lg">
              Jordan Lee is a Wealth Builder Coach
            </p>
          </div>
        </div>

        {/* Real Results Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">
            Real Results from Real Members
          </h2>
          <p className="text-center text-gray-400 mb-8">
            See how our members are building six-figure businesses and transforming their lives with AI automation
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { result: "From -€700 to €60,000+", subtitle: "in 7 months", name: "How we helped Bram & Wesley hit €60,000/mo in 7 months" },
              { result: "$45,000/mo", subtitle: "after quitting his 9-5", name: "James made $45,000/mo selling AI to businesses" },
              { result: "Scaled to $32,000/", subtitle: "with 3 clients", name: "Bk went from the corporate world to making $32,000/mo in 3 months" },
              { result: "Quit his job", subtitle: "& doubled his income in 60 days", name: "Jay quit his 9-5 and doubled his income in 60 days" },
              { result: "Went from $0-$53k/mo", subtitle: "with zero ads", name: "James went from working in a bar to making $30,000/mo using AI" },
              { result: "From working 9-5 to 6lot $175k of...", subtitle: "", name: "Elizabeth went from working a depressing 9-5 as an admin assistant to making $75,000 in 2 months" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden group cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                <div className="aspect-video bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative flex items-center justify-center">
                  <div className="text-center z-10">
                    <div className="w-16 h-16 mx-auto mb-4 bg-black/50 group-hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="text-white font-bold text-2xl mb-1">{item.result}</div>
                    <div className="text-white text-lg">{item.subtitle}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 text-sm">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Our Clients Say */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Clients Say
          </h2>

          <div className="space-y-6">
            {[
              {
                name: "Nik Williams",
                handle: "@nik_williams",
                date: "6:37 AM",
                text: "Pleased to share I signed an exciting client from $5k per month to a Growth Partnership at $10,200 per month plus an extra $14,400 for client deal-flow paid another $6,000 per month on top for 2 years. Thank you to the growth team and in particular @Nikolai Van Der Kleines. Thanks Jordan for bringing our services to market.",
                highlight: "Here you can see file agency at $10,200/month and for VA agency $18k+/month"
              },
              {
                name: "Nik Williams",
                handle: "@nik_williams",
                date: "2:47 PM",
                text: "Just got a verbal commitment on a 3 month project worth approx $135k. Per month. Twenty of clients a month in opportunity to prove we create value at $28k a month for 20 of their clients at $2k a month...",
                highlight: "I've was stuck in a corporate job for 30 years before replacing my salary with just 1 client"
              },
              {
                name: "James Kostka",
                handle: "@james_kostka",
                text: "NEW: ANOTHER ONE 🚀 $1200 + 10% deal | 3 month contract ✓ We're after one one deals with a client that reached out to us directly on LinkedIn last night. Happy Friday 🎉",
                highlight: "Now he agency does $30,000/mo and he just signed his agency for $35M"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 relative">
                <div className="absolute top-4 right-4 bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs">
                  {testimonial.highlight}
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-semibold">{testimonial.name}</span>
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                      </svg>
                      <span className="text-gray-500 text-sm">{testimonial.handle}</span>
                      {testimonial.date && <span className="text-gray-500 text-sm">· {testimonial.date}</span>}
                    </div>
                    <p className="text-gray-300 leading-relaxed">{testimonial.text}</p>
                    <div className="flex items-center gap-6 mt-4 text-gray-500 text-sm">
                      <button className="flex items-center gap-1 hover:text-red-500">
                        <span>❤️</span> <span>26</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-500">
                        <span>💬</span> <span>3</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-500">
                        <span>🔁</span> <span>2</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-500">
                        <span>↗️</span> <span>3</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Disclaimers */}
        <div className="text-center text-gray-500 text-xs space-y-4 pt-12 border-t border-gray-800">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <p className="max-w-4xl mx-auto">
            AI Acquisition and all individuals affiliated with this organization assumes no responsibility for the outcome, result, or success of the services.
            Services and products are tailored but come with no guarantees about results. Testimonials represent real individuals but should not be considered typical outcomes.
          </p>
          <p className="max-w-4xl mx-auto">
            In a survey of over 660 businesses with over 100 responding, business owners averaged $18,105 in monthly revenue after implementing our system.
          </p>
          <p className="font-semibold text-gray-400">
            NOT GOOGLE or FACEBOOK: This site is not a part of the Google website, Google Inc, Facebook/Meta website, or Meta, Inc.
            This site is NOT endorsed by Google or Meta in any way.
          </p>
          <div className="flex items-center justify-center gap-6 pt-6">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <span>·</span>
            <a href="mailto:support@aiarbitrageagency.com" className="hover:text-gray-300">Contact Us</a>
          </div>
          <p className="pt-4">
            © 2025 AI Acquisition LLC. All rights reserved
          </p>
        </div>
      </div>
    </main>
  );
}
