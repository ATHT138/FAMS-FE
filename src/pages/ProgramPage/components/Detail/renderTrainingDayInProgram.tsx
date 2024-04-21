import { Box, Divider } from "@mui/material";
import { TrainingUnits } from "../../../../models";


type Props = {
    index: number,
    day: number,
    data: TrainingUnits
};

const RenderDaysInProgram = ({ data, index }: Props) => {
    // const dateToString = (date: Date) => {
    //     return date.toLocaleDateString('en-GB', {
    //         year: 'numeric',
    //         month: '2-digit',
    //         day: '2-digit'
    //     });
    // }
    return (
        <Box padding={1} borderRadius="10px" width="100%">
            <Box sx={{ display: "flex" }}>
                <Box width="20%">Unit {index}</Box>
                <Box width="80%">
                    <Box>
                        {data.unitName}
                    </Box>
                    <Box>
                        {data.unitDuration} hour(s)
                    </Box>
                    {data.trainingContents?.map((content) => (
                        <Box sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            margin: "3px 0px 3px 0px",
                            display: "flex",
                            borderRadius: "7px"
                        }}>
                            <Box width='50%' marginLeft='10px'>{content.trainingContent1}</Box>
                            <Box width='20%'>{content.outputStandard}</Box>
                            <Box width='20%'>{content.duration}mins</Box>
                            <Box sx={{ width: '10%', paddingRight: '5px' }}>
                                {/* <MaterialListBoxUI
                                    trainingDay={day}
                                    unitIndex={index}
                                    unitName={data.unitName}
                                    materialList={content.materialViewModels}
                                >
                                </MaterialListBoxUI> */}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Divider sx={{ border: '1px inset' }} ></Divider>
        </Box >
    );
};

export default RenderDaysInProgram;
