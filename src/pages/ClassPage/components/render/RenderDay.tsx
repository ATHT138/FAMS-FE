type Props = {
  days?: number | null;
  hours?: number | null;
};

const RenderDay = ({ days, hours }: Props) => {
  return (
    <>
      <strong>{days}</strong> days <i>({hours} hours)</i>
    </>
  );
};

export default RenderDay;
