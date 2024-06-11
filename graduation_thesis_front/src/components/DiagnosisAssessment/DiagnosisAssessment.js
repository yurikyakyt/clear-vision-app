import * as React from 'react';
import UncheckedUserimagesList from '../UncheckedUserimagesList/UncheckedUserimagesList';
import СheckedUserimagesList from '../UncheckedUserimagesList/СheckedUserimagesList';
import { Box, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function DiagnosisAssessment(props) {
    let { email } = props;
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const conditions = [
        'Катаракта',
        'Диабетическая ретинопатия',
        'Глаукома',
        'Здоровый глаз',
    ];

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    backgroundColor: '#2365b0',
                    marginBottom: '20px',
                    padding: '10px',
                    boxShadow: 3,
                    borderRadius: '7px',
                }}
            >
                <Typography sx={{ margin: '0px auto', color: '#fff' }}>
                    Оценка диагнозов
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    boxShadow: 3,
                    minHeight: 'calc(100vh - 180px)',
                    borderRadius: '7px',
                }}
            >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Доступные" value="1" />
                                <Tab label="Проверенные" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <UncheckedUserimagesList
                                email={email}
                                conditions={conditions}
                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <СheckedUserimagesList
                                email={email}
                                conditions={conditions}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </Box>
    );
}

export default DiagnosisAssessment;
