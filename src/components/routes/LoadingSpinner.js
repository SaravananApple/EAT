import { ProgressSpinner } from "primereact/progressspinner";

const LoadingSpinner = () => {
  return (
    <>
      <div className="p-2 m-auto">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="6"
          fill="var(--surface-ground)"
          animationDuration=".7s"
        />
      </div>
    </>
  );
};

export default LoadingSpinner;
