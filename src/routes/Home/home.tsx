import { Container, Group } from "@mantine/core";

import Column from '../../components/Column/column.component';
import { STATUS_TYPES } from '../../store/tasks-store';


export default function Home() {
    return (
        <Container size= "xl" className='App'>
            <Group  justify="center" align='flex-start' gap={"3.5rem"}>
                <Column state = {STATUS_TYPES.planned} />
                <Column state = {STATUS_TYPES.ongoing} />
                <Column state = {STATUS_TYPES.completed} />
            </Group>
        </Container>
    )
}