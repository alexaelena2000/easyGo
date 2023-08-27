import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Box,
    Group,
    Space,
    Button,
    Text,
    MediaQuery,
    Burger,
    ActionIcon,
    useMantineTheme,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MainLinks } from './MainLinks';
import { signOut } from '../util/auth';

export default function CustomAppShell(props) {

    const theme = useMantineTheme();
    const router = useRouter();
    const [opened, setOpened] = useState(false);

    const signout = () => {
        signOut();
        router.push("/login")
    }
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={<Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                <Navbar.Section>
                    <MainLinks />
                </Navbar.Section>
            </Navbar>}
            header={<Header height={70} p="md">
                <Group position="apart" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="xl"
                        />
                    </MediaQuery>
                    <Text className="text-lg ml-12 font-bold">EasyGo Admin Panel</Text>
                    <Button variant="subtle" onClick={signout} >Sign Out</Button>
                </Group>
            </Header>}
        >
            {props.children}
        </AppShell>
    )
}