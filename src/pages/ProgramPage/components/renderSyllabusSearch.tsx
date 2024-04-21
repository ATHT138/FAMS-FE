import { Box } from "@mui/material";
import { Syllabus } from "../../../models";


const SyllabusSearchUI = (prop: any) => {
    const value: Syllabus = prop.prop;
    const dateToString = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ fontWeight: "bold", paddingY: "2px", fontSize: 20 }}>
                {value.topicName}
            </Box>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ fontStyle: "italic" }}>
                    {value.duration} days
                </Box>
                <Box sx={{ paddingLeft: "10%", display: "flex" }}>
                    {//@ts-expect-error
                        dateToString(new Date(value.createDate))} by
                    <Box sx={{ fontWeight: "bold" }}>
                        <span>&nbsp;</span>{value.createBy}
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
export default SyllabusSearchUI;