import { Center, Loader } from '@mantine/core';
export default function Loading() {
    return(
        <Center className='h-screen'>
          <Loader color="indigo" size="xl" />
        </Center>
    )
}