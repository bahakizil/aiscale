import { Hero } from '@/components-web-circle/home/Hero'
import { StatsStrip } from '@/components-web-circle/home/StatsStrip'
import { ProgramsOverview } from '@/components-web-circle/home/ProgramsOverview'
import { DailyLiveSection } from '@/components-web-circle/home/DailyLiveSection'
import { CommunityStrip } from '@/components-web-circle/home/CommunityStrip'
import { ComparisonSection } from '@/components-web-circle/home/ComparisonSection'
import { TimelineSection } from '@/components-web-circle/home/TimelineSection'
import { PricingSection } from '@/components-web-circle/home/PricingSection'
import { FAQSection } from '@/components-web-circle/home/FAQSection'
import PreventBackNavigation from '@/components/PreventBackNavigation'

export default function HomePage() {
  return (
    <>
      <PreventBackNavigation />
      <Hero />
      <StatsStrip />
      <ProgramsOverview />
      <DailyLiveSection />
      <CommunityStrip />
      <ComparisonSection />
      <TimelineSection />
      <PricingSection />
      <FAQSection />
    </>
  )
}
