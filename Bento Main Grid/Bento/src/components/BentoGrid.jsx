import SocialMediaCard from './cards/SocialMediaCard'
import ManageAccountsCard from './cards/ManageAccountsCard'
import ConsistentScheduleCard from './cards/ConsistentScheduleCard'
import SchedulePostsCard from './cards/SchedulePostsCard'
import GrowFollowersCard from './cards/GrowFollowersCard'
import AudienceGrowthCard from './cards/AudienceGrowthCard'
import CreatePostCard from './cards/CreatePostCard'
import AiContentCard from './cards/AiContentCard'

export default function BentoGrid() {
  return (
    // Keep the mobile reading order here; desktop placement belongs in CSS.
    <div className="grid grid-cols-1 gap-6">
      <SocialMediaCard />
      <ManageAccountsCard />
      <ConsistentScheduleCard />
      <SchedulePostsCard />
      <GrowFollowersCard />
      <AudienceGrowthCard />
      <CreatePostCard />
      <AiContentCard />
    </div>
  )
}
