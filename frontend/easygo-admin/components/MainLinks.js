import React from 'react';
import { GitPullRequest, AlertCircle, Messages, Database, Badge, Train, BuildingSkyscraper, BuildingCarousel, ArrowRotaryStraight, Users, Radar, Home } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useRouter } from 'next/router';



function MainLink({ icon, color, label, url }) {

  const router = useRouter();

  const redirect = () => {
    router.push(url);
  }


  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,

        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      onClick={redirect}>
      {/* Fix Button Active when selected */}
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <Home strokeWidth={2.5} size={16} />, color: 'blue', label: 'Dashboard', url: "/dashboard/" },
  { icon: <Train strokeWidth={2.5} size={16} />, color: 'blue', label: 'Trains', url: "/dashboard/trains" },
  { icon: <Badge strokeWidth={2.5} size={16} />, color: 'blue', label: 'Stations', url: "/dashboard/stations" },
  { icon: <Radar strokeWidth={2.5} size={16} />, color: 'blue', label: 'Stations Radar', url: "/dashboard/nearbyStations" },
  { icon: <ArrowRotaryStraight strokeWidth={2.5} size={16} />, color: 'blue', label: 'Trips', url: "/dashboard/trips" },
  { icon: <Users strokeWidth={2.5} size={16} />, color: 'blue', label: 'Users', url: "/dashboard/users" }
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}