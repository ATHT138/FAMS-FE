import { PieChart } from "@mui/x-charts";

type Props = {
  datas: {
    id: number;
    value: number;
    label: string;
    color: string;
  }[];
};

const TimeAllocate = ({ datas }: Props) => {
  const shouldRenderPieChart = datas.some((data) => data.value !== 0);

  return (
    <>
      {shouldRenderPieChart && (
        <PieChart
          colors={["#F4BE37", "#FF9F40", "#0D2535", "#5388D8", "#206EE5"]}
          series={[{ data: datas }]}
          margin={{ top: 10, left: 0, right: 30, bottom: 50 }}
          width={350}
          height={300}
          slotProps={{
            legend: {
              hidden: true,
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
            },
          }}
        />
      )}
    </>
  );
};

export default TimeAllocate;
