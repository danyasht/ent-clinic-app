import Tag from './Tag';

import type { ProfileDetailItem } from '@/types';

interface ProfileDescriptionListProps {
  profileDetailsArray: ProfileDetailItem[];
}

export default function ProfileDesriptionList({ profileDetailsArray }: ProfileDescriptionListProps) {
  return (
    <dl className="flex h-full flex-col justify-between gap-2 py-2">
      {profileDetailsArray.map((detail) => (
        <div className="flex items-center justify-start gap-3" key={detail.name}>
          <dt className="flex items-center gap-2 text-stone-600">
            {detail.icon}
            {detail.name}
          </dt>
          <dd className="font-bold">
            <Tag toDisplay={detail.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
