import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
const ResponsiveLine = dynamic(() => import('@nivo/line').then(m => m.ResponsiveLine), { ssr: false });

const formatData = (data) => {
    const timeObj = data.hourly.time;

    const formattedData = [];
    for (let i=0; i < timeObj.length; i=i+2) {
        formattedData.push({
            x: new Date(timeObj[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            y: data.hourly.temperature_2m[i]
        });
    }
    return formattedData;
};

const WeatherChart = ({ data }) => {
    const chartData = [
        {
            id: 'Temperature',
            data: formatData(data),
        },
    ];

    return (
        <Box height="450px" width="100%">
            <ResponsiveLine
                data={chartData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.1f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'Time',
                    legendOffset: 40,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Temperature (°C)',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                pointSize={5}
                pointBorderWidth={1}
                pointLabelYOffset={-12}
                useMesh={true}
                tooltip={({ point }) => (
                    <div
                        style={{
                            background: 'white',
                            padding: '9px 12px',
                            border: '1px solid #ccc',
                            fontSize: '12px',
                            fontWeight: '500'
                        }}
                    >
                        Time: <strong>{point.data.x}</strong>
                        <br />
                        {point.serieId}: <strong>{point.data.yFormatted}</strong>
                    </div>
                )}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                    },
                ]}
            />
        </Box>
    );
};

export {WeatherChart};