import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

const Piechart = () => {
  const [reveal, setReveal] = useState(0);
  const [uncompletedValue, setUncompletedValue] = useState(90);
  const [completedValue, setCompletedValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReveal((oldReveal) => (oldReveal >= 100 ? 100 : oldReveal + 1));
    }, 50);

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      style={{
        position: "relative",
        width: "200px",
        height: "200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PieChart
        animate={true}
        animationDuration={500}
        animationEasing="ease-out"
        center={[50, 50]}
        data={[
          {
            color: uncompletedValue === 0 ? "#F2F4F7" : "#F2F4F7",
            title: "Uncompleted",
            value: uncompletedValue,
          },
          {
            color: completedValue === 0 ?   "#F2F4F7" : "#BC00DD",
            title: "Completed",
            value: completedValue,
          },
        ]}
        labelPosition={50}
        lengthAngle={360}
        lineWidth={28}
        paddingAngle={0}
        radius={50}
        startAngle={0}
        viewBoxSize={[100, 100]}
        reveal={reveal}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
      {completedValue}%
      </div>
    </div>
  );
};

export default Piechart;
