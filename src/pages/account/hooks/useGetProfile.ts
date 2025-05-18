import { formatReadableDatetime } from '@/utils/functions/date';
import { useEffect, useState } from 'react';
import { useGetProfileQuery } from '../redux/account.api';
import { UserProfile } from '../redux/types';

export const useGetProfile = () => {
  const { data: profileData, isSuccess, isLoading, refetch } = useGetProfileQuery();
  const [formattedProfile, setFormattedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    refetch();
    if (isSuccess && profileData) {
      const { lastLogin, dateJoined, ...restValues } = profileData;

      setFormattedProfile({
        ...restValues,
        lastLogin: formatReadableDatetime(lastLogin),
        dateJoined: formatReadableDatetime(dateJoined)
      });
    }
  }, [isSuccess, profileData]);

  return {
    profileData: formattedProfile,
    isSuccess,
    refetch,
    isLoading
  };
};
