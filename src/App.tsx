import { useState } from "react";
import "./App.css";

function Input({ label, id, value, onchange }) {
  return (
    <div className="input">
      <label htmlFor="width">{label}</label>
      <input
        type="number"
        id={id}
        name={id}
        value={value}
        onChange={onchange}
      />
    </div>
  );
}

function WidthCalculation({
  sampleWidth,
  stitchNumber,
  humanWidth,
  handleSampleWidthChange,
  handleStitchNumberChange,
  handleHumanWidthChange,
}) {
  return (
    <>
      <Input
        label="Your sample width (cm):"
        id="sampleWidth"
        value={sampleWidth}
        onchange={handleSampleWidthChange}
      />
      <Input
        label="Number of stitches:"
        id="sampleStitches"
        value={stitchNumber}
        onchange={handleStitchNumberChange}
      />
      <Input
        label="Your width (cm):"
        id="humanWidth"
        value={humanWidth}
        onchange={handleHumanWidthChange}
      />
    </>
  );
}

function HeightCalculation({ humanHeight, handleHumanHeightChange }) {
  return (
    <>
      <Input
        label="Your height (cm):"
        id="humanHeight"
        value={humanHeight}
        onchange={handleHumanHeightChange}
      />
    </>
  );
}

function Calculation({ calculatePullWidth, calculatePullHeight }) {
  const [sampleWidth, setSampleWidth] = useState("");
  const [stitchNumber, setStitchNumber] = useState("");
  const [humanWidth, setHumanWidth] = useState("");
  const [humanHeight, setHumanHeight] = useState("");

  function handleSampleWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setSampleWidth(value);
  }

  function handleStitchNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setStitchNumber(value);
  }

  function handleHumanWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setHumanWidth(value);
  }

  function handleHumanHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setHumanHeight(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    calculatePullWidth(sampleWidth, stitchNumber, humanWidth);
    calculatePullHeight(humanHeight);
  }

  return (
    <>
      <section>
        <h1>Pull Builder</h1>
        <form>
          <WidthCalculation
            sampleWidth={sampleWidth}
            stitchNumber={stitchNumber}
            humanWidth={humanWidth}
            handleSampleWidthChange={handleSampleWidthChange}
            handleStitchNumberChange={handleStitchNumberChange}
            handleHumanWidthChange={handleHumanWidthChange}
          />
          <HeightCalculation
            humanHeight={humanHeight}
            handleHumanHeightChange={handleHumanHeightChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

function Result({ pullWidth, pullHeight }) {
  return (
    <>
      <section>
        <div>
          <h2>Pull Width</h2>
          <p>Number of stitches: {pullWidth}</p>
        </div>
        <div>
          <h2>Pull Height</h2>
          <p>First step: {pullHeight.firstStep} cm</p>
          <p>Second step: {pullHeight.secondStep} cm</p>
        </div>
      </section>
    </>
  );
}

function PullBuilder() {
  const [pullWidth, setPullWidth] = useState(0);
  const [pullHeight, setPullHeight] = useState({ firstStep: 0, secondStep: 0 });

  function calculatePullWidth(sampleWidth, stitchNumber, humanWidth) {
    if (sampleWidth > 0 && stitchNumber > 0 && humanWidth > 0) {
      const stichesForTenCm = Math.round((stitchNumber * 10) / sampleWidth);
      const pullWidth = (humanWidth * stichesForTenCm) / 10;
      setPullWidth(Math.round(pullWidth));
    }
  }

  function calculatePullHeight(humanHeight) {
    if (humanHeight > 0) {
      const firstStep = Math.round(humanHeight / 1.6);
      const secondStep = Math.round(humanHeight / 3);

      setPullHeight({ firstStep, secondStep });
    }
  }
  return (
    <>
      <Calculation
        calculatePullWidth={calculatePullWidth}
        calculatePullHeight={calculatePullHeight}
      />
      <Result pullWidth={pullWidth} pullHeight={pullHeight} />
    </>
  );
}

function App() {
  return (
    <div>
      <PullBuilder />
    </div>
  );
}

export default App;
